import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { downloadElementAsPDF } from "@/lib/resourceUtils";
import {
  Search, BookOpen, FileText, HelpCircle, LogOut, Copy, Download, Pencil, Trash2, Library, Loader2,
} from "lucide-react";

type ResourceType = "lesson" | "worksheet" | "quiz" | "exit_ticket";

interface SavedResource {
  id: string;
  title: string;
  resource_type: ResourceType;
  grade_level: string | null;
  subject: string | null;
  topic: string | null;
  content: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

const TYPE_META: Record<ResourceType, { label: string; icon: React.ReactNode; color: string }> = {
  lesson: { label: "Lesson", icon: <BookOpen className="h-4 w-4" />, color: "bg-primary/10 text-primary" },
  worksheet: { label: "Worksheet", icon: <FileText className="h-4 w-4" />, color: "bg-secondary/10 text-secondary" },
  quiz: { label: "Quiz", icon: <HelpCircle className="h-4 w-4" />, color: "bg-accent/20 text-accent-foreground" },
  exit_ticket: { label: "Exit Ticket", icon: <LogOut className="h-4 w-4" />, color: "bg-muted text-muted-foreground" },
};

const LessonLibrary = () => {
  const [resources, setResources] = useState<SavedResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [editingResource, setEditingResource] = useState<SavedResource | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchResources = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from("saved_resources" as any)
      .select("*")
      .order("created_at", { ascending: false }) as any;

    if (filterType !== "all") {
      query = query.eq("resource_type", filterType);
    }

    const { data, error } = await query;
    if (error) {
      console.error(error);
      toast({ title: "Error loading library", description: error.message, variant: "destructive" });
    }
    setResources((data as SavedResource[]) || []);
    setLoading(false);
  }, [filterType]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const filtered = resources.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      (r.subject?.toLowerCase().includes(q)) ||
      (r.topic?.toLowerCase().includes(q)) ||
      (r.grade_level?.toLowerCase().includes(q))
    );
  });

  const handleDuplicate = async (resource: SavedResource) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("saved_resources" as any).insert({
      user_id: user.id,
      title: `${resource.title} (Copy)`,
      resource_type: resource.resource_type,
      grade_level: resource.grade_level,
      subject: resource.subject,
      topic: resource.topic,
      content: resource.content,
    } as any);

    if (error) {
      toast({ title: "Duplicate failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Duplicated!", description: "A copy has been added to your library." });
      fetchResources();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("saved_resources").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Resource removed from your library." });
      setResources((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleEditSave = async () => {
    if (!editingResource || !editTitle.trim()) return;
    const { error } = await supabase
      .from("saved_resources")
      .update({ title: editTitle.trim(), updated_at: new Date().toISOString() })
      .eq("id", editingResource.id);

    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Updated!", description: "Title has been updated." });
      setResources((prev) =>
        prev.map((r) => (r.id === editingResource.id ? { ...r, title: editTitle.trim() } : r))
      );
      setEditingResource(null);
    }
  };

  const handleDownload = async (resource: SavedResource) => {
    // Build a minimal printable div, append, PDF it, remove
    const wrapper = document.createElement("div");
    wrapper.id = "temp-pdf-export";
    wrapper.style.padding = "32px";
    wrapper.innerHTML = `
      <h1 style="font-size:24px;font-weight:bold;margin-bottom:8px;">${resource.title}</h1>
      <p style="color:#666;margin-bottom:16px;">${resource.grade_level || ""} • ${resource.subject || ""} • ${resource.topic || ""}</p>
      <pre style="white-space:pre-wrap;font-family:inherit;font-size:13px;">${JSON.stringify(resource.content, null, 2)}</pre>
    `;
    document.body.appendChild(wrapper);
    await downloadElementAsPDF("temp-pdf-export", resource.title);
    setTimeout(() => wrapper.remove(), 1000);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-1 font-display text-2xl font-bold text-foreground">Lesson Library</h1>
      <p className="mb-6 text-muted-foreground">Your saved lessons, worksheets, quizzes, and exit tickets.</p>

      {/* Search & Filter Bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, subject, topic…"
            className="pl-9 rounded-xl"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-44 rounded-xl">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="lesson">Lessons</SelectItem>
            <SelectItem value="worksheet">Worksheets</SelectItem>
            <SelectItem value="quiz">Quizzes</SelectItem>
            <SelectItem value="exit_ticket">Exit Tickets</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Resource Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="rounded-2xl">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Library className="mb-3 h-10 w-10 text-muted-foreground/50" />
            <p className="font-medium text-foreground">
              {searchQuery || filterType !== "all" ? "No matching resources found." : "Your library is empty."}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {searchQuery || filterType !== "all"
                ? "Try adjusting your search or filter."
                : "Generate a lesson, worksheet, quiz, or exit ticket and save it here."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((resource) => {
            const meta = TYPE_META[resource.resource_type];
            return (
              <Card key={resource.id} className="rounded-2xl transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-foreground">{resource.title}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {resource.grade_level && `${resource.grade_level} Grade`}
                        {resource.subject && ` • ${resource.subject}`}
                        {resource.topic && ` • ${resource.topic}`}
                      </p>
                    </div>
                    <Badge variant="outline" className={`shrink-0 gap-1 ${meta.color}`}>
                      {meta.icon} {meta.label}
                    </Badge>
                  </div>

                  <p className="mb-4 text-xs text-muted-foreground">
                    Saved {new Date(resource.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-lg text-xs"
                      onClick={() => {
                        setEditingResource(resource);
                        setEditTitle(resource.title);
                      }}
                    >
                      <Pencil className="mr-1 h-3 w-3" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs" onClick={() => handleDuplicate(resource)}>
                      <Copy className="mr-1 h-3 w-3" /> Duplicate
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs" onClick={() => handleDownload(resource)}>
                      <Download className="mr-1 h-3 w-3" /> Download
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs text-destructive hover:text-destructive" onClick={() => handleDelete(resource.id)}>
                      <Trash2 className="mr-1 h-3 w-3" /> Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingResource} onOpenChange={(open) => !open && setEditingResource(null)}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Edit Resource</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Title</Label>
              <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="mt-1 rounded-xl" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={() => setEditingResource(null)}>Cancel</Button>
            <Button className="rounded-xl" onClick={handleEditSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LessonLibrary;
