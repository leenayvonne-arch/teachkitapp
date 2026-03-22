import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useProductBySlug } from "@/hooks/useProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, CheckCircle2, Target, MessageSquareQuote, Sparkles, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import WorksheetPreviewCard from "@/components/shop/WorksheetPreviewCard";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading } = useProductBySlug(slug || "");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isPublicRoute = location.pathname.startsWith("/shop");
  const shopBasePath = isPublicRoute ? "/shop" : "/dashboard/shop";

  if (loading) {
    return (
      <div className="py-16 text-center">
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-16 text-center">
        <h1 className="mb-2 text-xl font-bold text-foreground">Product not found</h1>
        <p className="mb-6 text-sm text-muted-foreground">The product you're looking for doesn't exist.</p>
        <Button asChild variant="outline">
          <Link to={shopBasePath}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const isBundle = product.is_bundle === true;
  const previewPages = product.preview_pages || [];
  const includes = product.includes || [];
  const useCases = product.use_cases || [];
  const testimonials = product.testimonials || [];
  const faqs = product.faqs || [];

  const handleBuy = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!product.stripe_price_id) {
      toast({ title: "Error", description: "Product not available for purchase yet.", variant: "destructive" });
      return;
    }
    setBuying(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          priceId: product.stripe_price_id,
          productSlug: slug,
          productName: product.title,
          productDescription: product.description,
        },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: any) {
      toast({ title: "Checkout failed", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setBuying(false);
    }
  };

  const detail = (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-4xl pb-28 lg:pb-16">
      <Button asChild variant="ghost" size="sm" className="mb-6 text-muted-foreground">
        <Link to={shopBasePath}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop</Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="space-y-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="outline">{product.grade_level}</Badge>
              {isBundle && (
                <>
                  <Badge className="bg-primary text-primary-foreground">🏆 Best Value</Badge>
                  <Badge className="bg-accent text-accent-foreground">🔥 Most Popular</Badge>
                </>
              )}
            </div>
            <h1 className="text-2xl font-extrabold text-foreground md:text-3xl">{product.title}</h1>
            <p className="mt-2 text-base text-muted-foreground leading-relaxed">{product.subtitle}</p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{product.full_description}</p>
            {isBundle && (
              <div className="mt-4 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3">
                <p className="text-sm font-semibold text-accent flex items-center gap-1.5"><Clock className="h-4 w-4" /> Limited Time Launch Price</p>
                <p className="text-xs text-muted-foreground mt-0.5">Price will increase as more resources are added.</p>
              </div>
            )}
          </motion.div>

          {previewPages.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-foreground">Preview This Resource</h2>
                <Badge variant="outline" className="text-xs">Preview Included</Badge>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">See exactly what you'll get before you buy.</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {previewPages.map((page, i) => (
                  <WorksheetPreviewCard key={i} page={page} compact onClick={() => setLightboxIndex(i)} />
                ))}
              </div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="border-border/60">
              <CardContent className="pt-6">
                <h2 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> What's Included
                </h2>
                <ul className="space-y-2.5">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" /><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="rounded-2xl border border-border/60 bg-muted/30 px-6 py-6">
              <h2 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Perfect For
              </h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {useCases.map((useCase) => (
                  <li key={useCase} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />{useCase}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {testimonials.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h2 className="mb-4 text-lg font-bold text-foreground flex items-center gap-2">
                <MessageSquareQuote className="h-5 w-5 text-primary" /> What Teachers Are Saying
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {testimonials.map((testimonial, i) => (
                  <Card key={i} className="border-border/60">
                    <CardContent className="pt-5 pb-5">
                      <p className="text-sm text-muted-foreground italic leading-relaxed">"{testimonial}"</p>
                      <p className="mt-3 text-xs font-medium text-foreground/60">— Verified Teacher</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {faqs.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="mb-4 text-lg font-bold text-foreground">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="rounded-xl border border-border/60 px-4">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-sm font-medium text-foreground">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          )}
        </div>

        <div className="lg:sticky lg:top-4 h-fit space-y-4">
          <Card className={isBundle ? "ring-2 ring-primary shadow-lg" : ""}>
            <CardContent className="space-y-5 pt-6">
              <div className="text-center">
                {product.original_price && (
                  <p className="mb-1 text-sm text-muted-foreground">If purchased separately: <span className="line-through">{product.original_price}</span></p>
                )}
                <span className="text-4xl font-extrabold text-foreground">{product.price}</span>
                <p className="mt-1.5 text-xs text-muted-foreground">{isBundle ? "Bundle price · Save over 50%" : "One-time purchase · Instant download"}</p>
              </div>
              {isBundle && (
                <div className="rounded-lg bg-primary/5 px-3 py-2 text-center">
                  <p className="text-sm font-bold text-primary">Save over 50%</p>
                  <p className="text-[11px] text-muted-foreground">Most teachers choose the bundle</p>
                </div>
              )}
              <Button className="w-full" size="lg" onClick={handleBuy} disabled={buying}>
                <ShoppingCart className="mr-2 h-4 w-4" />{buying ? "Processing…" : "Buy Now"}
              </Button>
              <p className="text-center text-[11px] text-muted-foreground">Instant digital download · PDF format</p>
              {isBundle && (
                <div className="rounded-lg border border-accent/30 bg-accent/5 px-3 py-2 text-center">
                  <p className="text-xs font-medium text-accent">⏳ Limited Time Launch Price</p>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="rounded-xl border border-border/60 px-4 py-4 space-y-2.5">
            {["Print-and-go — no prep required", "Answer keys included", "Unlimited classroom use", "Instant PDF download"].map((prop) => (
              <div key={prop} className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />{prop}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={lightboxIndex !== null} onOpenChange={() => setLightboxIndex(null)}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          {lightboxIndex !== null && previewPages[lightboxIndex] && (
            <div className="p-4">
              <WorksheetPreviewCard page={previewPages[lightboxIndex]} />
              <div className="mt-4 flex items-center justify-center gap-2">
                {previewPages.map((_, i) => (
                  <button key={i} type="button" onClick={() => setLightboxIndex(i)}
                    className={`h-2 w-2 rounded-full transition-colors ${i === lightboxIndex ? "bg-primary" : "bg-muted-foreground/30"}`} />
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between lg:hidden">
        <div>
          <span className="text-xl font-extrabold text-foreground">{product.price}</span>
          <p className="text-xs text-muted-foreground">One-time purchase</p>
        </div>
        <Button onClick={handleBuy} disabled={buying} className="px-8">
          <ShoppingCart className="mr-2 h-4 w-4" />
          {buying ? "Processing…" : "Buy Now"}
        </Button>
      </div>
    </motion.div>
  );

  if (isPublicRoute) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          {detail}
        </main>
        <Footer />
      </div>
    );
  }

  return detail;
};

export default ProductDetail;
