import { useParams, Link } from "react-router-dom";
import { getProductBySlug } from "@/data/shopProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, CheckCircle2, ShoppingCart, Eye, Target, MessageSquareQuote, Sparkles, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import WorksheetPreviewCard from "@/components/shop/WorksheetPreviewCard";
import { stripePriceMap } from "@/data/stripePrices";
import { supabase } from "@/integrations/supabase/client";

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

  const isBundle = slug === "math-classroom-bundle-3-5";

  const handleBuy = async () => {
    const priceId = stripePriceMap[slug || ""];
    if (!priceId) {
      toast({ title: "Error", description: "Product not available for purchase yet.", variant: "destructive" });
      return;
    }
    setBuying(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          priceId,
          productSlug: slug,
          productName: product.title,
          productDescription: product.description,
        },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      toast({ title: "Checkout failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setBuying(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-4xl pb-16">
      {/* Back link */}
      <Button asChild variant="ghost" size="sm" className="mb-6 text-muted-foreground">
        <Link to="/dashboard/shop">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* ─── Main Column ─── */}
        <div className="space-y-10">

          {/* 1. PRODUCT HEADER */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="outline">{product.gradeLevel}</Badge>
              {isBundle && (
                <>
                  <Badge className="bg-primary text-primary-foreground">🏆 Best Value</Badge>
                  <Badge className="bg-accent text-accent-foreground">🔥 Most Popular</Badge>
                </>
              )}
            </div>
            <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">{product.title}</h1>
            <p className="mt-2 text-base text-muted-foreground leading-relaxed">{product.subtitle}</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{product.fullDescription}</p>

            {isBundle && (
              <div className="mt-4 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3">
                <p className="text-sm font-semibold text-accent flex items-center gap-1.5">
                  <Clock className="h-4 w-4" /> Limited Time Launch Price
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Price will increase as more resources are added.</p>
              </div>
            )}
          </motion.div>

          {/* 2. VISUAL PREVIEW */}
          {product.previewPages.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-foreground">Preview This Resource</h2>
                <Badge variant="outline" className="text-xs">Preview Included</Badge>
              </div>
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
            </motion.div>
          )}

          {/* 3. WHAT'S INCLUDED */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="border-border/60">
              <CardContent className="pt-6">
                <h2 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> What's Included
                </h2>
                <ul className="space-y-2.5">
                  {product.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* 4. USE CASES */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="rounded-2xl border border-border/60 bg-muted/30 px-6 py-6">
              <h2 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Perfect For
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {product.useCases.map((useCase) => (
                  <li key={useCase} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* 5. SOCIAL PROOF */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <h2 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
              <MessageSquareQuote className="h-5 w-5 text-primary" /> What Teachers Are Saying
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {product.testimonials.map((testimonial, i) => (
                <Card key={i} className="border-border/60">
                  <CardContent className="pt-5 pb-5">
                    <p className="text-sm text-muted-foreground italic leading-relaxed">"{testimonial}"</p>
                    <p className="mt-3 text-xs font-medium text-foreground/60">— Verified Teacher</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* 9. FAQ */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="mb-4 text-lg font-bold text-foreground">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="rounded-xl border border-border/60 px-4">
              {product.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-sm font-medium text-foreground">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>

        {/* ─── Sidebar ─── */}
        <div className="lg:sticky lg:top-4 h-fit space-y-4">
          {/* Pricing Card */}
          <Card className={isBundle ? "ring-2 ring-primary shadow-lg" : ""}>
            <CardContent className="space-y-5 pt-6">
              <div className="text-center">
                {product.originalPrice && (
                  <p className="mb-1 text-sm text-muted-foreground">
                    If purchased separately: <span className="line-through">{product.originalPrice}</span>
                  </p>
                )}
                <span className="text-4xl font-extrabold text-foreground">{product.price}</span>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {isBundle ? "Bundle price · Save over 50%" : "One-time purchase · Instant download"}
                </p>
              </div>

              {isBundle && (
                <div className="rounded-lg bg-primary/5 px-3 py-2 text-center">
                  <p className="text-sm font-bold text-primary">Save over 50%</p>
                  <p className="text-[11px] text-muted-foreground">Most teachers choose the bundle</p>
                </div>
              )}

              <Button className="w-full" size="lg" onClick={handleBuy} disabled={buying}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                {buying ? "Processing…" : "Buy Now"}
              </Button>

              <p className="text-center text-[11px] text-muted-foreground">
                Instant digital download · PDF format
              </p>

              {isBundle && (
                <div className="rounded-lg border border-accent/30 bg-accent/5 px-3 py-2 text-center">
                  <p className="text-xs font-medium text-accent">⏳ Limited Time Launch Price</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick value props */}
          <div className="rounded-xl border border-border/60 px-4 py-4 space-y-2.5">
            {[
              "Print-and-go — no prep required",
              "Answer keys included",
              "Unlimited classroom use",
              "Instant PDF download",
            ].map((prop) => (
              <div key={prop} className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                {prop}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxIndex !== null} onOpenChange={() => setLightboxIndex(null)}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          {lightboxIndex !== null && product.previewPages[lightboxIndex] && (
            <div className="p-4">
              <WorksheetPreviewCard page={product.previewPages[lightboxIndex]} />
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
