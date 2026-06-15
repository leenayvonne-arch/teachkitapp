import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { assertEquals, assert } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL")!;
const ANON = Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY")!;
const FN_URL = `${SUPABASE_URL}/functions/v1/manage-admins`;

const ADMIN_EMAIL = Deno.env.get("TEST_ADMIN_EMAIL") ?? "teachkitadmin@gmail.com";
const ADMIN_PASSWORD = Deno.env.get("TEST_ADMIN_PASSWORD") ?? "Teach2782$";

function mkClient() {
  return createClient(SUPABASE_URL, ANON, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function call(body: unknown, token?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: ANON,
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(FN_URL, { method: "POST", headers, body: JSON.stringify(body) });
  const text = await res.text();
  let json: any = null;
  try { json = JSON.parse(text); } catch { /* ignore */ }
  return { status: res.status, json, text };
}

async function signIn(email: string, password: string) {
  const client = mkClient();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw new Error(`signIn ${email} failed: ${error.message}`);
  return data.session!.access_token;
}

// Provision a confirmed non-admin user by creating via the admin function
// (which confirms the email) and then revoking the admin role.
async function provisionNonAdmin(adminToken: string) {
  const email = `nonadmin+${crypto.randomUUID().slice(0, 8)}@example.com`;
  const password = `NonA!${crypto.randomUUID().slice(0, 12)}aA1`;
  const created = await call({ action: "create", email, password }, adminToken);
  if (created.status !== 200) throw new Error(`provision create failed: ${created.text}`);
  const userId = created.json.user_id as string;
  const revoked = await call({ action: "revoke", user_id: userId }, adminToken);
  if (revoked.status !== 200) throw new Error(`provision revoke failed: ${revoked.text}`);
  return { email, password, userId };
}

Deno.test("unauthenticated request is rejected", async () => {
  const r = await call({ action: "list" });
  assertEquals(r.status, 401);
  assert(r.json?.error, "expected error body");
});

Deno.test("non-admin user is forbidden from every action", async () => {
  const adminToken = await signIn(ADMIN_EMAIL, ADMIN_PASSWORD);
  const { email, password, userId } = await provisionNonAdmin(adminToken);

  const userToken = await signIn(email, password);

  const list = await call({ action: "list" }, userToken);
  assertEquals(list.status, 403, `list: ${list.text}`);

  const create = await call(
    { action: "create", email: `evil+${crypto.randomUUID().slice(0, 6)}@example.com` },
    userToken,
  );
  assertEquals(create.status, 403);

  const revoke = await call({ action: "revoke", user_id: crypto.randomUUID() }, userToken);
  assertEquals(revoke.status, 403);

  const disable = await call({ action: "disable", user_id: userId }, userToken);
  assertEquals(disable.status, 403);

  const reset = await call({ action: "reset_password", email }, userToken);
  assertEquals(reset.status, 403);
});

Deno.test("admin can list; disabled admin loses access immediately", async () => {
  const adminToken = await signIn(ADMIN_EMAIL, ADMIN_PASSWORD);

  const list = await call({ action: "list" }, adminToken);
  assertEquals(list.status, 200, `admin list failed: ${list.text}`);
  assert(Array.isArray(list.json?.admins));

  const tempEmail = `tempadmin+${crypto.randomUUID().slice(0, 8)}@example.com`;
  const tempPassword = `Temp!${crypto.randomUUID().slice(0, 12)}aA1`;
  const created = await call(
    { action: "create", email: tempEmail, password: tempPassword },
    adminToken,
  );
  assertEquals(created.status, 200, `create failed: ${created.text}`);
  const tempUserId = created.json.user_id as string;

  try {
    const tempToken = await signIn(tempEmail, tempPassword);
    const okList = await call({ action: "list" }, tempToken);
    assertEquals(okList.status, 200, `temp admin should access: ${okList.text}`);

    const disabled = await call({ action: "disable", user_id: tempUserId }, adminToken);
    assertEquals(disabled.status, 200, `disable failed: ${disabled.text}`);

    // Existing JWT must be rejected even though it has not yet expired.
    const afterDisable = await call({ action: "list" }, tempToken);
    assertEquals(
      afterDisable.status,
      401,
      `expected 401 after disable, got ${afterDisable.status}: ${afterDisable.text}`,
    );

    // And they cannot sign in again.
    const client = mkClient();
    const reSignIn = await client.auth.signInWithPassword({
      email: tempEmail,
      password: tempPassword,
    });
    assert(reSignIn.error, "disabled admin should not be able to sign in");
  } finally {
    await call({ action: "enable", user_id: tempUserId }, adminToken);
    await call({ action: "revoke", user_id: tempUserId }, adminToken);
  }
});

Deno.test("primary admin cannot be revoked or disabled", async () => {
  const adminToken = await signIn(ADMIN_EMAIL, ADMIN_PASSWORD);
  const list = await call({ action: "list" }, adminToken);
  const primary = list.json.admins.find(
    (a: { email?: string }) => a.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase(),
  );
  assert(primary, "primary admin must be present in list");

  const revoke = await call({ action: "revoke", user_id: primary.id }, adminToken);
  assertEquals(revoke.status, 403);

  const disable = await call({ action: "disable", user_id: primary.id }, adminToken);
  assertEquals(disable.status, 403);
});
