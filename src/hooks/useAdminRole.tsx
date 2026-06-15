import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Verifies the current user has the `admin` role by querying the database
 * (RLS on `user_roles` is the source of truth). Re-verifies on auth state
 * changes so a logout / token swap immediately revokes client access.
 */
export const useAdminRole = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      setLoading(true);
      // getUser() round-trips to the auth server, so a banned/revoked session
      // returns null here instead of trusting the cached JWT.
      const { data: { user }, error: userErr } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!user || userErr) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (cancelled) return;
      setIsAdmin(!error && !!data);
      setLoading(false);
    };

    verify();

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      verify();
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { isAdmin, loading };
};
