import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type ResourceType = "lesson" | "worksheet" | "quiz" | "exit_ticket";

export async function saveResource({
  title,
  resourceType,
  gradeLevel,
  subject,
  topic,
  content,
}: {
  title: string;
  resourceType: ResourceType;
  gradeLevel: string;
  subject: string;
  topic: string;
  content: Record<string, unknown>;
}) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    toast({ title: "Not signed in", description: "Please sign in to save resources.", variant: "destructive" });
    return null;
  }

  const { data, error } = await supabase.from("saved_resources" as any).insert({
    user_id: user.id,
    title,
    resource_type: resourceType,
    grade_level: gradeLevel,
    subject,
    topic,
    content,
  } as any).select().single();

  if (error) {
    console.error("Save error:", error);
    toast({ title: "Save failed", description: error.message, variant: "destructive" });
    return null;
  }

  toast({ title: "Saved!", description: `"${title}" saved to your library.` });
  return data;
}

export async function downloadElementAsPDF(elementId: string, filename: string) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const html2pdf = (await import("html2pdf.js")).default;
  html2pdf()
    .set({
      margin: [10, 10, 10, 10],
      filename: `${filename}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    })
    .from(el)
    .save();
}
