import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event from the auth state change
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });
    // Also check hash for recovery type
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setReady(true);
    }
    return () => subscription.unsubscribe();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ variant: "destructive", title: "Passwords don't match" });
      return;
    }
    if (password.length < 6) {
      toast({ variant: "destructive", title: "Password too short", description: "Must be at least 6 characters." });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } else {
      toast({ title: "Password updated!", description: "You can now log in with your new password." });
      navigate("/dashboard");
    }
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border bg-card p-8 shadow-lg text-center">
            <h1 className="mb-2 text-2xl font-bold text-foreground">Invalid or expired link</h1>
            <p className="mb-6 text-sm text-muted-foreground">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link to="/forgot-password">
              <Button className="rounded-xl" size="lg">Request New Link</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold font-display text-foreground">TeachKit</span>
          </Link>
        </div>
        <div className="rounded-2xl border bg-card p-8 shadow-lg">
          <h1 className="mb-2 text-2xl font-bold text-foreground">Set new password</h1>
          <p className="mb-6 text-sm text-muted-foreground">Enter your new password below.</p>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" minLength={6} required className="mt-1 rounded-xl" />
            </div>
            <div>
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" minLength={6} required className="mt-1 rounded-xl" />
            </div>
            <Button type="submit" className="w-full rounded-xl" size="lg" disabled={loading}>
              {loading ? "Updating…" : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
