import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, XCircle, Loader2 } from "lucide-react";

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

const UnsubscribePage = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const validate = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        const res = await fetch(
          `${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: anonKey } }
        );
        const data = await res.json();
        if (res.ok && data.valid === true) setStatus("valid");
        else if (data.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      } catch {
        setStatus("invalid");
      }
    };

    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success) setStatus("success");
      else if (data?.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md text-center">
        <Link to="/" className="mb-8 inline-flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold font-display text-foreground">TeachKit</span>
        </Link>

        <div className="mt-6 rounded-2xl border bg-card p-8 shadow-lg">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Validating your request…</p>
            </div>
          )}

          {status === "valid" && (
            <div className="flex flex-col items-center gap-4">
              <h1 className="text-xl font-bold text-foreground">Unsubscribe from emails</h1>
              <p className="text-sm text-muted-foreground">
                Are you sure you want to unsubscribe from TeachKit emails?
              </p>
              <Button
                onClick={handleUnsubscribe}
                disabled={processing}
                className="w-full rounded-xl"
                size="lg"
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing…
                  </>
                ) : (
                  "Confirm Unsubscribe"
                )}
              </Button>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <h1 className="text-xl font-bold text-foreground">You've been unsubscribed</h1>
              <p className="text-sm text-muted-foreground">
                You won't receive any more emails from TeachKit.
              </p>
            </div>
          )}

          {status === "already" && (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle2 className="h-10 w-10 text-muted-foreground" />
              <h1 className="text-xl font-bold text-foreground">Already unsubscribed</h1>
              <p className="text-sm text-muted-foreground">
                You're already unsubscribed from TeachKit emails.
              </p>
            </div>
          )}

          {(status === "invalid" || status === "error") && (
            <div className="flex flex-col items-center gap-3">
              <XCircle className="h-10 w-10 text-destructive" />
              <h1 className="text-xl font-bold text-foreground">
                {status === "invalid" ? "Invalid link" : "Something went wrong"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {status === "invalid"
                  ? "This unsubscribe link is invalid or has expired."
                  : "Please try again later."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnsubscribePage;
