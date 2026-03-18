import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Trash2, Mail, ShieldCheck, Reply, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdminRole } from "@/hooks/useAdminRole";

interface ContactRow {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

const AdminContactSubmissions = () => {
  const { isAdmin, loading: roleLoading } = useAdminRole();
  const [submissions, setSubmissions] = useState<ContactRow[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubmissions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error loading submissions", description: error.message, variant: "destructive" });
    } else {
      setSubmissions((data as ContactRow[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) fetchSubmissions();
  }, [isAdmin]);

  const deleteSubmission = async (id: string) => {
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      toast({ title: "Submission deleted" });
    }
  };

  if (roleLoading) {
    return <div className="py-12 text-center text-muted-foreground">Checking permissions…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="py-12 text-center">
        <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">Access Denied</h2>
        <p className="text-sm text-muted-foreground">You need admin privileges to view this page.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contact Submissions</h1>
          <p className="text-sm text-muted-foreground">
            Review messages from the contact form
          </p>
        </div>
      </div>

      <div className="mb-4">
        <Badge variant="secondary">{submissions.length} total</Badge>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : submissions.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            No contact submissions yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {submissions.map((s) => (
            <Card key={s.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-semibold">{s.name}</CardTitle>
                    <a
                      href={`mailto:${s.email}`}
                      className="text-xs text-primary hover:underline"
                    >
                      {s.email}
                    </a>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(s.created_at).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-foreground">{s.message}</p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                  >
                    <a href={`mailto:${s.email}?subject=${encodeURIComponent(`Re: Your message to TeachKit`)}`}>
                      <Reply className="mr-1 h-3 w-3" /> Reply
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => deleteSubmission(s.id)}
                  >
                    <Trash2 className="mr-1 h-3 w-3" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContactSubmissions;
