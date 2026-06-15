import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Loader2, UserPlus, KeyRound, Ban, CheckCircle2, ShieldOff } from "lucide-react";

const PROTECTED_EMAIL = "teachkitadmin@gmail.com";

type AdminUser = {
  id: string;
  email?: string;
  banned_until: string | null;
  created_at: string;
};

const AdminAdminsTab = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [me, setMe] = useState<string | null>(null);

  const call = async (payload: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("manage-admins", { body: payload });
    if (error) throw new Error(error.message);
    if (data?.error) throw new Error(data.error);
    return data;
  };

  const load = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setMe(user?.id ?? null);
      const data = await call({ action: "list" });
      setAdmins(data.admins ?? []);
    } catch (e) {
      toast({ title: "Failed to load admins", description: (e as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setBusy("create");
    try {
      await call({ action: "create", email, password: password || undefined });
      toast({ title: "Admin created", description: `${email} now has admin access.` });
      setEmail(""); setPassword("");
      await load();
    } catch (e) {
      toast({ title: "Failed to create admin", description: (e as Error).message, variant: "destructive" });
    } finally {
      setBusy(null);
    }
  };

  const handleAction = async (action: string, user: AdminUser, label: string) => {
    if (!confirm(`${label} ${user.email}?`)) return;
    setBusy(user.id + action);
    try {
      await call({ action, user_id: user.id, email: user.email });
      toast({ title: `${label} sent` });
      await load();
    } catch (e) {
      toast({ title: `Failed`, description: (e as Error).message, variant: "destructive" });
    } finally {
      setBusy(null);
    }
  };

  const handleReset = async (user: AdminUser) => {
    setBusy(user.id + "reset");
    try {
      await call({ action: "reset_password", email: user.email, redirect_to: `${window.location.origin}/reset-password` });
      toast({ title: "Password reset email sent", description: user.email });
    } catch (e) {
      toast({ title: "Failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setBusy(null);
    }
  };

  const isProtected = (u: AdminUser) => u.email?.toLowerCase() === PROTECTED_EMAIL;
  const isSelf = (u: AdminUser) => u.id === me;
  const isDisabled = (u: AdminUser) => !!u.banned_until && new Date(u.banned_until) > new Date();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base"><UserPlus className="h-4 w-4" /> Add admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <div>
              <Label htmlFor="admin-email">Email</Label>
              <Input id="admin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="newadmin@example.com" />
            </div>
            <div>
              <Label htmlFor="admin-pwd">Password (optional)</Label>
              <Input id="admin-pwd" type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Auto-generated if blank" />
            </div>
            <Button type="submit" disabled={busy === "create"}>
              {busy === "create" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add admin"}
            </Button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">Existing users with this email are promoted. New users are created with confirmed email; send a password reset to let them set their own.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base">Current admins</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((u) => {
                  const protectedRow = isProtected(u);
                  const self = isSelf(u);
                  const disabled = isDisabled(u);
                  return (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium">
                        {u.email}
                        {protectedRow && <Badge variant="secondary" className="ml-2">Primary</Badge>}
                        {self && <Badge variant="outline" className="ml-2">You</Badge>}
                      </TableCell>
                      <TableCell>
                        {disabled ? <Badge variant="destructive">Disabled</Badge> : <Badge variant="secondary">Active</Badge>}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleReset(u)} disabled={busy === u.id + "reset"}>
                          <KeyRound className="mr-1 h-3.5 w-3.5" /> Reset password
                        </Button>
                        {!protectedRow && !self && (
                          <>
                            {disabled ? (
                              <Button size="sm" variant="outline" onClick={() => handleAction("enable", u, "Re-enable")} disabled={busy === u.id + "enable"}>
                                <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Enable
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" onClick={() => handleAction("disable", u, "Disable")} disabled={busy === u.id + "disable"}>
                                <Ban className="mr-1 h-3.5 w-3.5" /> Disable
                              </Button>
                            )}
                            <Button size="sm" variant="destructive" onClick={() => handleAction("revoke", u, "Revoke admin from")} disabled={busy === u.id + "revoke"}>
                              <ShieldOff className="mr-1 h-3.5 w-3.5" /> Revoke
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {admins.length === 0 && (
                  <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-6">No admins yet.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAdminsTab;
