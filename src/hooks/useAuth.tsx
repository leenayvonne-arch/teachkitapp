import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const welcomeSentRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);

      // Send welcome email when user confirms their email
      if (event === "SIGNED_IN" && session?.user) {
        const userId = session.user.id;
        const emailConfirmed = session.user.email_confirmed_at;
        
        if (emailConfirmed && !welcomeSentRef.current.has(userId)) {
          welcomeSentRef.current.add(userId);
          
          // Check if this is a first-time verification (account created recently)
          const createdAt = new Date(session.user.created_at).getTime();
          const confirmedAt = new Date(emailConfirmed).getTime();
          const timeDiff = confirmedAt - createdAt;
          
          // Only send welcome email if verified within 24 hours of account creation
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
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
