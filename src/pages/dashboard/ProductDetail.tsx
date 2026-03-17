import { useParams, Link } from "react-router-dom";
import { getProductBySlug } from "@/data/shopProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, CheckCircle2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import WorksheetPreviewCard from "@/components/shop/WorksheetPreviewCard";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const [buying, setBuying] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!product) {
    return (
      <div className="py-16 text-center">
        <h1 className="mb-2 text-xl font-bold text-foreground">Product not found</h1>
        <p className="mb-6 text-sm text-muted-foreground">The product you're looking for doesn't exist.</p>
        <Button asChild variant="outline">
          <Link to="/dashboard/shop">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
          </Link>
        </Button>
      </div>
    );
  }

  const handleBuy = () => {
    setBuying(true);
    setTimeout(() => {
      setBuying(false);
      toast({
        title: "Thank you for your purchase!",
        description: "Download will be available soon.",
      });
    }, 1200);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-3xl">
      <Button asChild variant="ghost" size="sm" className="mb-6 text-muted-foreground">
        <Link to="/dashboard/shop">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-[1fr_280px]">
        {/* Main content */}
        <div className="space-y-6">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="outline">{product.gradeLevel}</Badge>
            </div>
            <h1 className="text-2xl font-bold text-foreground">{product.title}</h1>
            <p className="mt-2 text-muted-foreground">{product.fullDescription}</p>
          </div>

          {/* What's included */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="mb-4 text-base font-semibold text-foreground">What's Included</h2>
              <ul className="space-y-2.5">
                {product.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Preview section */}
          {product.previewPages.length > 0 && (
            <div>
              <h2 className="mb-1 text-base font-semibold text-foreground">Preview This Resource</h2>
              <p className="mb-4 text-sm text-muted-foreground">See exactly what you'll get before you buy.</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {product.previewPages.map((page, i) => (
                  <WorksheetPreviewCard
                    key={i}
                    page={page}
                    compact
                    onClick={() => setLightboxIndex(i)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar buy card */}
        <div className="md:sticky md:top-4 h-fit">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="text-center">
                <span className="text-3xl font-bold text-foreground">{product.price}</span>
                <p className="mt-1 text-xs text-muted-foreground">One-time purchase</p>
              </div>
              <Button className="w-full" size="lg" onClick={handleBuy} disabled={buying}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {buying ? "Processing…" : "Buy Now"}
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">
                Instant digital download · PDF format
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lightbox dialog */}
      <Dialog open={lightboxIndex !== null} onOpenChange={() => setLightboxIndex(null)}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          {lightboxIndex !== null && product.previewPages[lightboxIndex] && (
            <div className="p-4">
              <WorksheetPreviewCard page={product.previewPages[lightboxIndex]} />
              {/* Navigation dots */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {product.previewPages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      i === lightboxIndex ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ProductDetail;
