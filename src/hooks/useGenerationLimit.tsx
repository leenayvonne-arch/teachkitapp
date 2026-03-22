import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const FREE_LIMIT = 5;

export function useGenerationLimit() {
  const { user } = useAuth();
  const [generationsUsed, setGenerationsUsed] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUsage = useCallback(async () => {
    if (!user) { setLoading(false); return; }

    const { data, error } = await supabase
      .from("profiles")
      .select("generations_used, generations_reset_at")
      .eq("user_id", user.id)
      .single();

    if (error || !data) { setLoading(false); return; }

    // Check if we need a monthly reset
    const resetAt = new Date(data.generations_reset_at);
    const now = new Date();
    const monthsSinceReset =
      (now.getFullYear() - resetAt.getFullYear()) * 12 +
      (now.getMonth() - resetAt.getMonth());

    if (monthsSinceReset >= 1) {
      // Reset the counter
      await supabase
        .from("profiles")
        .update({ generations_used: 0, generations_reset_at: now.toISOString() })
        .eq("user_id", user.id);
      setGenerationsUsed(0);
    } else {
      setGenerationsUsed(data.generations_used);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => { fetchUsage(); }, [fetchUsage]);

  const remaining = Math.max(0, FREE_LIMIT - generationsUsed);
  const hasReachedLimit = generationsUsed >= FREE_LIMIT;

  const incrementUsage = useCallback(async () => {
    if (!user) return;
    const newCount = generationsUsed + 1;
    setGenerationsUsed(newCount);
    await supabase
      .from("profiles")
      .update({ generations_used: newCount })
      .eq("user_id", user.id);
  }, [user, generationsUsed]);

  return { generationsUsed, remaining, hasReachedLimit, incrementUsage, loading, FREE_LIMIT };
}
