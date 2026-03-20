import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash2, Star } from "lucide-react";

interface FeedbackRow {
  id: string;
  name: string | null;
  grade_level: string;
  message: string;
  featured: boolean;
  created_at: string;
}

const AdminFeedbackTab = () => {
  const [feedback, setFeedback] = useState<FeedbackRow[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFeedback = async () => {
    setLoading(true);
    const { data } = await supabase.from("feedback").select("*").order("created_at", { ascending: false });
    if (data) setFeedback(data as FeedbackRow[]);
    setLoading(false);
  };

  useEffect(() => { fetchFeedback(); }, []);

  const toggleFeatured = async (id: string, current: boolean) => {
    const { error } = await supabase.from("feedback").update({ featured: !current }).eq("id", id);
    if (!error) {
      setFeedback((prev) => prev.map((f) => (f.id === id ? { ...f, featured: !current } : f)));
      toast({ title: !current ? "Marked as featured" : "Removed from featured" });
    }
  };

  const deleteFeedback = async (id: string) => {
    const { error } = await supabase.from("feedback").delete().eq("id", id);
    if (!error) {
      setFeedback((prev) => prev.filter((f) => f.id !== id));
      toast({ title: "Feedback deleted" });
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading feedback…</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">{feedback.length} Submissions</h2>
        <Badge className="bg-primary text-primary-foreground">
          <Star className="mr-1 h-3 w-3" /> {feedback.filter((f) => f.featured).length} featured
        </Badge>
      </div>

      {feedback.length === 0 ? (
        <Card><CardContent className="py-10 text-center text-muted-foreground">No feedback yet.</CardContent></Card>
      ) : (
        <div className="grid gap-4">
          {feedback.map((f) => (
            <Card key={f.id} className={f.featured ? "ring-2 ring-primary bg-primary/[0.03]" : ""}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-semibold">{f.name || "Anonymous"}</CardTitle>
                    <Badge variant="outline" className="text-[11px]">{f.grade_level}</Badge>
                    {f.featured && <Badge className="bg-primary text-primary-foreground text-[11px]"><Star className="mr-1 h-3 w-3" /> Featured</Badge>}
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(f.created_at).toLocaleDateString()}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-foreground">"{f.message}"</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch checked={f.featured} onCheckedChange={() => toggleFeatured(f.id, f.featured)} />
                    <span className="text-xs text-muted-foreground">Show as testimonial</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => deleteFeedback(f.id)}>
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

export default AdminFeedbackTab;
