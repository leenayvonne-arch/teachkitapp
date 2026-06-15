import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { assertEquals, assert } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL")!;
const ANON = Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY")!;
const FN_URL = `${SUPABASE_URL}/functions/v1/manage-admins`;

const ADMIN_EMAIL = Deno.env.get("TEST_ADMIN_EMAIL") ?? "teachkitadmin@gmail.com";
const ADMIN_PASSWORD = Deno.env.get("TEST_ADMIN_PASSWORD") ?? "Teach2782$";

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
  const client = createClient(SUPABASE_URL, ANON);
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw new Error(`signIn ${email} failed: ${error.message}`);
  return data.session!.access_token;
}

Deno.test("manage-admins: unauthenticated request is rejected", async () => {
  const r = await call({ action: "list" });
  assertEquals(r.status, 401);
  assert(r.json?.error, "expected error body");
});

Deno.test("manage-admins: anon key without user token is rejected", async () => {
  // apikey header is present (via call helper) but no Bearer token
  const r = await call({ action: "list" });
  assertEquals(r.status, 401);
});

Deno.test("manage-admins: non-admin user cannot list or mutate", async () => {
  const email = `nonadmin+${crypto.randomUUID().slice(0, 8)}@example.com`;
  const password = `Test!${crypto.randomUUID().slice(0, 12)}`;
  const client = createClient(SUPABASE_URL, ANON);
  const { data, error } = await client.auth.signUp({ email, password });
  if (error) throw error;
  // If email confirmation is required, sign-in may fail — handle both paths.
  let token = data.session?.access_token;
  if (!token) {
    const signed = await client.auth.signInWithPassword({ email, password });
    token = signed.data.session?.access_token;
  }
  assert(token, "expected non-admin session token");

  const list = await call({ action: "list" }, token);
  assertEquals(list.status, 403, `expected 403, got ${list.status}: ${list.text}`);

  const create = await call(
    { action: "create", email: `evil+${crypto.randomUUID().slice(0, 6)}@example.com` },
    token,
  );
  assertEquals(create.status, 403);

  const revoke = await call({ action: "revoke", user_id: crypto.randomUUID() }, token);
  assertEquals(revoke.status, 403);

  const disable = await call({ action: "disable", user_id: crypto.randomUUID() }, token);
  assertEquals(disable.status, 403);
});

Deno.test("manage-admins: admin can list; disabled admin loses access immediately", async () => {
  const adminToken = await signIn(ADMIN_EMAIL, ADMIN_PASSWORD);

  // Sanity: admin can list
  const list = await call({ action: "list" }, adminToken);
  assertEquals(list.status, 200, `admin list failed: ${list.text}`);
  assert(Array.isArray(list.json?.admins));

  // Create a temp admin
  const tempEmail = `tempadmin+${crypto.randomUUID().slice(0, 8)}@example.com`;
  const tempPassword = `Temp!${crypto.randomUUID().slice(0, 12)}aA1`;
  const created = await call(
    { action: "create", email: tempEmail, password: tempPassword },
    adminToken,
  );
  assertEquals(created.status, 200, `create failed: ${created.text}`);
  const tempUserId = created.json.user_id as string;
  assert(tempUserId);

  try {
    // Temp admin can sign in and call the function
    const tempToken = await signIn(tempEmail, tempPassword);
    const tempList = await call({ action: "list" }, tempToken);
    assertEquals(tempList.status, 200, `temp admin should access: ${tempList.text}`);

    // Disable the temp admin
    const disabled = await call({ action: "disable", user_id: tempUserId }, adminToken);
    assertEquals(disabled.status, 200, `disable failed: ${disabled.text}`);

    // Existing token should no longer be valid — getUser returns null for banned users
    const afterDisable = await call({ action: "list" }, tempToken);
    assert(
      afterDisable.status === 401 || afterDisable.status === 403,
      `expected 401/403 after disable, got ${afterDisable.status}: ${afterDisable.text}`,
    );

    // And they cannot sign in again
    const client = createClient(SUPABASE_URL, ANON);
    const reSignIn = await client.auth.signInWithPassword({
      email: tempEmail,
      password: tempPassword,
    });
    assert(reSignIn.error, "disabled admin should not be able to sign in");
  } finally {
    // Cleanup: re-enable then revoke admin role so the orphan account is harmless
    await call({ action: "enable", user_id: tempUserId }, adminToken);
    await call({ action: "revoke", user_id: tempUserId }, adminToken);
  }
});

Deno.test("manage-admins: primary admin cannot be revoked or disabled", async () => {
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
