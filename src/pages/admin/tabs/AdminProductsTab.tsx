import { useState } from "react";
import { useProducts, Product } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2 } from "lucide-react";

const emptyProduct = {
  slug: "",
  title: "",
  subtitle: "",
  description: "",
  full_description: "",
  grade_level: "",
  price: "",
  original_price: "",
  category: "",
  stripe_price_id: "",
  includes: "",
  use_cases: "",
};

const AdminProductsTab = () => {
  const { products, loading, refetch } = useProducts();
  const { toast } = useToast();
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);

  const openCreate = () => {
    setForm(emptyProduct);
    setCreating(true);
    setEditing(null);
  };

  const openEdit = (p: Product) => {
    setForm({
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      full_description: p.full_description,
      grade_level: p.grade_level,
      price: p.price,
      original_price: p.original_price || "",
      category: p.category,
      stripe_price_id: p.stripe_price_id || "",
      includes: (p.includes || []).join("\n"),
      use_cases: (p.use_cases || []).join("\n"),
    });
    setEditing(p);
    setCreating(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      slug: form.slug,
      title: form.title,
      subtitle: form.subtitle,
      description: form.description,
      full_description: form.full_description,
      grade_level: form.grade_level,
      price: form.price,
      original_price: form.original_price || null,
      category: form.category,
      stripe_price_id: form.stripe_price_id || null,
      includes: form.includes.split("\n").filter(Boolean),
      use_cases: form.use_cases.split("\n").filter(Boolean),
    };

    let error;
    if (editing) {
      ({ error } = await supabase.from("products").update(payload as any).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from("products").insert(payload as any));
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editing ? "Product updated" : "Product created" });
      setCreating(false);
      setEditing(null);
      refetch();
    }
    setSaving(false);
  };

  const toggleActive = async (p: Product) => {
    const { error } = await supabase.from("products").update({ active: !p.active } as any).eq("id", p.id);
    if (!error) refetch();
  };

  const deleteProduct = async (p: Product) => {
    if (!confirm(`Delete "${p.title}"?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Product deleted" });
      refetch();
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading products…</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{products.length} Products</h2>
        <Button onClick={openCreate} size="sm"><Plus className="mr-1 h-4 w-4" /> Add Product</Button>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium max-w-[300px] truncate">{p.title}</TableCell>
                <TableCell><Badge variant="secondary">{p.category}</Badge></TableCell>
                <TableCell className="text-muted-foreground text-sm">{p.grade_level}</TableCell>
                <TableCell className="font-semibold">{p.price}</TableCell>
                <TableCell>
                  <Switch checked={p.active} onCheckedChange={() => toggleActive(p)} />
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteProduct(p)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={creating} onOpenChange={(o) => { if (!o) { setCreating(false); setEditing(null); } }}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} placeholder="my-product" /></div>
              <div><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} placeholder="Worksheets" /></div>
            </div>
            <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} /></div>
            <div><Label>Subtitle</Label><Input value={form.subtitle} onChange={(e) => setForm({...form, subtitle: e.target.value})} /></div>
            <div><Label>Short Description</Label><Textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={2} /></div>
            <div><Label>Full Description</Label><Textarea value={form.full_description} onChange={(e) => setForm({...form, full_description: e.target.value})} rows={3} /></div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label>Price</Label><Input value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} placeholder="$9.99" /></div>
              <div><Label>Original Price</Label><Input value={form.original_price} onChange={(e) => setForm({...form, original_price: e.target.value})} placeholder="$19.99" /></div>
              <div><Label>Grade Level</Label><Input value={form.grade_level} onChange={(e) => setForm({...form, grade_level: e.target.value})} placeholder="Grades 3–5" /></div>
            </div>
            <div><Label>Stripe Price ID</Label><Input value={form.stripe_price_id} onChange={(e) => setForm({...form, stripe_price_id: e.target.value})} placeholder="price_..." /></div>
            <div><Label>What's Included (one per line)</Label><Textarea value={form.includes} onChange={(e) => setForm({...form, includes: e.target.value})} rows={4} /></div>
            <div><Label>Use Cases (one per line)</Label><Textarea value={form.use_cases} onChange={(e) => setForm({...form, use_cases: e.target.value})} rows={3} /></div>
            <Button className="w-full" onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : editing ? "Update Product" : "Create Product"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProductsTab;
