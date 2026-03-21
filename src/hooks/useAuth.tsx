import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const welcomeSentRef = useRef<Set<string>>(new Set());
  const initializedRef = useRef(false);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  useEffect(() => {
    // Get initial session first, then set up listener
    const initialize = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
      initializedRef.current = true;
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Only update after initialization to avoid race conditions
      if (initializedRef.current) {
        setUser(session?.user ?? null);
        setLoading(false);
      }

      // Send welcome email when user confirms their email
      if (event === "SIGNED_IN" && session?.user) {
        const userId = session.user.id;
        const emailConfirmed = session.user.email_confirmed_at;
        
        if (emailConfirmed && !welcomeSentRef.current.has(userId)) {
          welcomeSentRef.current.add(userId);
          
          const createdAt = new Date(session.user.created_at).getTime();
          const confirmedAt = new Date(emailConfirmed).getTime();
          const timeDiff = confirmedAt - createdAt;
          
          if (timeDiff < 24 * 60 * 60 * 1000) {
            try {
              await supabase.functions.invoke("send-transactional-email", {
                body: {
                  templateName: "welcome",
                  recipientEmail: session.user.email,
                  idempotencyKey: `welcome-${userId}`,
                },
              });
            } catch (err) {
              console.error("Failed to send welcome email:", err);
            }
          }
        }
      }

      if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    initialize();

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading, signOut };
}
