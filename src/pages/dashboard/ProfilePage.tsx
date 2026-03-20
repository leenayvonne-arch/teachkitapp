import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Download, Loader2, Package, Save, ShoppingBag, User } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Purchase {
  id: string;
  product_slug: string;
  product_name: string;
  product_description: string | null;
  price_paid: number;
  currency: string;
  created_at: string;
}

const ProfilePage = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [school, setSchool] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, school, avatar_url")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      }

      if (data) {
        setFullName(data.full_name ?? "");
        setSchool(data.school ?? "");
        setAvatarUrl(data.avatar_url);
      }
      setLoading(false);
    };

    fetchProfile();

    const fetchPurchases = async () => {
      const { data, error } = await supabase
        .from("purchases" as any)
        .select("id, product_slug, product_name, product_description, price_paid, currency, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching purchases:", error);
      } else {
        setPurchases((data as any) || []);
      }
      setLoadingPurchases(false);
    };

    fetchPurchases();
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      toast.error("Failed to upload avatar");
      setUploading(false);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    const url = `${publicUrl.publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: url, updated_at: new Date().toISOString() })
      .eq("user_id", user.id);

    if (updateError) {
      toast.error("Failed to save avatar");
    } else {
      setAvatarUrl(url);
      toast.success("Avatar updated!");
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!user) return;

    const trimmedName = fullName.trim();
    const trimmedSchool = school.trim();

    if (trimmedName.length > 100) {
      toast.error("Name must be less than 100 characters");
      return;
    }
    if (trimmedSchool.length > 200) {
      toast.error("School name must be less than 200 characters");
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: trimmedName || null,
        school: trimmedSchool || null,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (error) {
      toast.error("Failed to save profile");
    } else {
      toast.success("Profile saved!");
    }
    setSaving(false);
  };

  const initials = fullName
    ? fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user?.email?.charAt(0).toUpperCase() ?? "?";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Profile</h1>
        <p className="mt-1 text-muted-foreground">Manage your personal information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Avatar</CardTitle>
          <CardDescription>Click on the avatar to upload a new photo.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <button
            type="button"
            className="group relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Avatar className="h-20 w-20 border-2 border-border">
              <AvatarImage src={avatarUrl ?? undefined} alt="Profile avatar" />
              <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-foreground/40 opacity-0 transition-opacity group-hover:opacity-100">
              {uploading ? (
                <Loader2 className="h-5 w-5 animate-spin text-background" />
              ) : (
                <Camera className="h-5 w-5 text-background" />
              )}
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarUpload}
          />
          <div className="text-sm text-muted-foreground">
            <p>Recommended: Square image, at least 200×200px.</p>
            <p>Max size: 2MB. JPG, PNG, or WebP.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Personal Information</CardTitle>
          <CardDescription>Update your name and school details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user?.email ?? ""} disabled className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="e.g. Jane Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="school">School</Label>
            <Input
              id="school"
              placeholder="e.g. Lincoln Elementary"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              maxLength={200}
            />
          </div>
          <Button onClick={handleSave} disabled={saving} className="mt-2">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
