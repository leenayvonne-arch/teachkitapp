import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PROTECTED_EMAIL = "teachkitadmin@gmail.com";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON = Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "") ?? "";
    if (!token) return json({ error: "Not authenticated" }, 401);

    const userClient = createClient(SUPABASE_URL, ANON, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: userData } = await userClient.auth.getUser(token);
    const caller = userData.user;
    if (!caller) return json({ error: "Not authenticated" }, 401);

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

    // Re-check the caller against the auth admin API so disabled (banned) users
    // are rejected even if their JWT is still within its expiry window.
    const { data: fresh } = await admin.auth.admin.getUserById(caller.id);
    const freshUser = fresh?.user as
      | { banned_until?: string | null; id: string }
      | null
      | undefined;
    const bannedUntil = freshUser?.banned_until ?? null;
    if (!freshUser || (bannedUntil && new Date(bannedUntil) > new Date())) {
      return json({ error: "Not authenticated" }, 401);
    }

    // Verify caller is admin
    const { data: roleRow } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", caller.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) return json({ error: "Forbidden" }, 403);

    const body = await req.json().catch(() => ({}));
    const action = body.action as string;

    if (action === "list") {
      const { data: roles, error: rErr } = await admin
        .from("user_roles")
        .select("user_id")
        .eq("role", "admin");
      if (rErr) throw rErr;
      const ids = (roles ?? []).map((r) => r.user_id);
      const admins: Array<{ id: string; email: string | undefined; banned_until: string | null; created_at: string }> = [];
      for (const id of ids) {
        const { data } = await admin.auth.admin.getUserById(id);
        const u = data?.user;
        if (u) {
          admins.push({
            id: u.id,
            email: u.email,
            // @ts-ignore - banned_until exists on user
            banned_until: (u as any).banned_until ?? null,
            created_at: u.created_at,
          });
        }
      }
      return json({ admins });
    }

    if (action === "create") {
      const email = (body.email as string)?.trim().toLowerCase();
      const password = body.password as string | undefined;
      if (!email) return json({ error: "Email required" }, 400);

      // Find or create
      let userId: string | undefined;
      const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      const existing = list?.users.find((u) => u.email?.toLowerCase() === email);
      if (existing) {
        userId = existing.id;
      } else {
        const { data: created, error: cErr } = await admin.auth.admin.createUser({
          email,
          password: password || crypto.randomUUID() + "Aa1!",
          email_confirm: true,
        });
        if (cErr) return json({ error: cErr.message }, 400);
        userId = created.user!.id;
      }

      const { error: roleErr } = await admin
        .from("user_roles")
        .insert({ user_id: userId, role: "admin" });
      if (roleErr && !roleErr.message.includes("duplicate")) {
        return json({ error: roleErr.message }, 400);
      }
      return json({ ok: true, user_id: userId });
    }

    if (action === "revoke") {
      const userId = body.user_id as string;
      if (!userId) return json({ error: "user_id required" }, 400);
      const { data: target } = await admin.auth.admin.getUserById(userId);
      if (target?.user?.email?.toLowerCase() === PROTECTED_EMAIL) {
        return json({ error: "Cannot modify primary admin" }, 403);
      }
      if (userId === caller.id) return json({ error: "Cannot revoke yourself" }, 400);
      const { error } = await admin
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", "admin");
      if (error) return json({ error: error.message }, 400);
      return json({ ok: true });
    }

    if (action === "disable" || action === "enable") {
      const userId = body.user_id as string;
      if (!userId) return json({ error: "user_id required" }, 400);
      const { data: target } = await admin.auth.admin.getUserById(userId);
      if (target?.user?.email?.toLowerCase() === PROTECTED_EMAIL) {
        return json({ error: "Cannot modify primary admin" }, 403);
      }
      if (userId === caller.id) return json({ error: "Cannot disable yourself" }, 400);
      const ban_duration = action === "disable" ? "876000h" : "none";
      // @ts-ignore - ban_duration supported on updateUserById
      const { error } = await admin.auth.admin.updateUserById(userId, { ban_duration });
      if (error) return json({ error: error.message }, 400);
      return json({ ok: true });
    }

    if (action === "reset_password") {
      const email = (body.email as string)?.trim().toLowerCase();
      if (!email) return json({ error: "Email required" }, 400);
      const redirectTo = (body.redirect_to as string) || `${new URL(req.url).origin}/reset-password`;
      const { error } = await admin.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) return json({ error: error.message }, 400);
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
