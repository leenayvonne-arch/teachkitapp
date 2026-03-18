import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MessageSquarePlus, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const gradeLevels = [
  "Pre-K",
  "Kindergarten",
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "High School",
];

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!gradeLevel || !message.trim()) {
      toast({
        title: "Missing fields",
        description: "Please select a grade level and enter your feedback.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase.from("feedback").insert({
        user_id: user?.id ?? null,
        name: name.trim() || null,
        grade_level: gradeLevel,
        message: message.trim(),
      });

      if (error) throw error;
      setSubmitted(true);
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="border-primary/20 bg-primary/[0.03]">
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <CheckCircle2 className="h-10 w-10 text-primary" />
          <p className="text-lg font-semibold text-foreground">
            Thank you! Your feedback helps improve TeachKit.
          </p>
          <p className="text-sm text-muted-foreground">
            We appreciate you taking the time to share your thoughts.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <MessageSquarePlus className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Leave Feedback</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Help us make TeachKit better for teachers everywhere.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="feedback-name">Name (optional)</Label>
              <Input
                id="feedback-name"
                placeholder="e.g., Ms. Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="feedback-grade">Grade Level Taught</Label>
              <Select value={gradeLevel} onValueChange={setGradeLevel}>
                <SelectTrigger id="feedback-grade">
                  <SelectValue placeholder="Select grade level" />
                </SelectTrigger>
                <SelectContent>
                  {gradeLevels.map((g) => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback-message">Your Feedback</Label>
            <Textarea
              id="feedback-message"
              placeholder="Tell us what you think about TeachKit…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={1000}
              rows={3}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting…" : "Submit Feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
