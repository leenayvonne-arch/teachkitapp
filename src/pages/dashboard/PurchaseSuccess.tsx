import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Download, Loader2, Package, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface Purchase {
  id: string;
  product_slug: string;
  product_name: string;
  product_description: string | null;
  created_at: string;
}

const PurchaseSuccess = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchRecentPurchases = async () => {
      // Fetch purchases from the last 10 minutes (to capture the just-completed one)
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const { data, error } = await supabase
        .from("purchases" as any)
        .select("id, product_slug, product_name, product_description, created_at")
        .eq("user_id", user.id)
        .gte("created_at", tenMinutesAgo)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPurchases(data as any);
      }
      setLoading(false);
    };

    // Small delay to allow webhook to process
    const timer = setTimeout(fetchRecentPurchases, 1500);
    return () => clearTimeout(timer);
  }, [user]);

  const handleDownload = async (productSlug: string) => {
    setDownloading(productSlug);
    try {
      const { data, error } = await supabase.functions.invoke("secure-download", {
        body: { productSlug },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      } else if (data?.error) {
        toast.error(data.error);
      }
    } catch (err: any) {
      toast.error(err.message || "Download failed. You can try again from My Purchases.");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="mx-auto max-w-2xl py-8 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-8"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Purchase Successful!</h1>
        <p className="mt-2 text-muted-foreground">
          Your download is ready below. You can also access it anytime from your profile.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">Loading your purchase…</span>
        </div>
      ) : purchases.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="flex flex-col items-center py-10 text-center">
              <Package className="mb-3 h-10 w-10 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground mb-1">
                Your purchase is being processed. It may take a moment to appear.
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                You can always find your purchases in your profile.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" asChild>
                  <Link to="/dashboard/account">
                    <Package className="mr-2 h-4 w-4" />
                    My Purchases
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/dashboard/shop">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {purchases.map((purchase, i) => (
            <motion.div
              key={purchase.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Card className="border-primary/20 shadow-sm">
                <CardContent className="flex items-center justify-between py-5">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-foreground truncate">
                      {purchase.product_name}
                    </h3>
                    {purchase.product_description && (
                      <p className="mt-0.5 text-sm text-muted-foreground truncate">
                        {purchase.product_description}
                      </p>
                    )}
                  </div>
                  <Button
                    size="default"
                    className="ml-4 shrink-0"
                    disabled={downloading === purchase.product_slug}
                    onClick={() => handleDownload(purchase.product_slug)}
                  >
                    {downloading === purchase.product_slug ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    Download
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-3 pt-4"
          >
            <Button variant="outline" asChild>
              <Link to="/dashboard/account">
                <Package className="mr-2 h-4 w-4" />
                My Purchases
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/dashboard/shop">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PurchaseSuccess;
