import { useParams, Link } from "react-router-dom";
import { getProductBySlug } from "@/data/shopProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, ShoppingCart, ImageIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const [buying, setBuying] = useState(false);

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
        title: "Thanks for your interest!",
        description: "Checkout coming soon. We'll notify you when purchases go live.",
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

          {/* Preview placeholder */}
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-medium text-foreground">Preview</h3>
              <p className="mt-1 text-xs text-muted-foreground">A sample preview will be available here soon.</p>
            </CardContent>
          </Card>
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
    </motion.div>
  );
};

export default ProductDetail;
