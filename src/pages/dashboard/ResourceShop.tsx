import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import TeacherTestimonials from "@/components/TeacherTestimonials";
import FeedbackForm from "@/components/FeedbackForm";
import { useProducts, Product } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

type SortOption = "default" | "price-low" | "price-high" | "name";

const parsePrice = (price: string) => parseFloat(price.replace(/[^0-9.]/g, ""));

const ResourceShop = () => {
  const { products, loading: productsLoading } = useProducts();
  const [category, setCategory] = useState("All");
  const [buyingSlug, setBuyingSlug] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicRoute = location.pathname.startsWith("/shop");

  useEffect(() => {
    const payment = searchParams.get("payment");
    if (payment === "success") {
      toast({ title: "Payment successful! 🎉", description: "Thank you for your purchase. Your download will be available soon." });
      setSearchParams({}, { replace: true });
    } else if (payment === "canceled") {
      toast({ title: "Payment canceled", description: "Your payment was not completed." });
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const [sort, setSort] = useState<SortOption>("default");
  const [search, setSearch] = useState("");

  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], [products]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesSearch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
    if (sort === "price-low") list = [...list].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sort === "price-high") list = [...list].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    else if (sort === "name") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [category, sort, search, products]);

  const handleBuy = async (product: Product) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!product.stripe_price_id) {
      toast({ title: "Error", description: "Product not available for purchase yet.", variant: "destructive" });
      return;
    }
    setBuyingSlug(product.slug);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          priceId: product.stripe_price_id,
          productSlug: product.slug,
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
      setBuyingSlug(null);
    }
  };

  const shopBasePath = isPublicRoute ? "/shop" : "/dashboard/shop";

  const content = (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <ShoppingBag className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Teacher Resource Shop</h1>
          <p className="text-sm text-muted-foreground">Digital products to save you time in the classroom</p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search products…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            {categories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low → High</SelectItem>
            <SelectItem value="price-high">Price: High → Low</SelectItem>
            <SelectItem value="name">Name: A → Z</SelectItem>
          </SelectContent>
        </Select>
        {category !== "All" && (
          <Button variant="ghost" size="sm" onClick={() => setCategory("All")}>Clear filter</Button>
        )}
      </div>

      <h2 className="mb-4 text-lg font-semibold text-foreground">
        {category === "All" ? "All Products" : category}
        <span className="ml-2 text-sm font-normal text-muted-foreground">({filtered.length})</span>
      </h2>

      {productsLoading ? (
        <div className="py-12 text-center text-muted-foreground">Loading products…</div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <h3 className="text-lg font-semibold text-foreground">No products found</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">Try a different search or category</p>
          <Button variant="outline" size="sm" onClick={() => { setSearch(""); setCategory("All"); }}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product, i) => {
            const isBundle = product.is_bundle === true;
            return (
              <motion.div key={product.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={isBundle ? "sm:col-span-2 lg:col-span-2" : ""}>
                <Card className={`flex h-full flex-col transition-shadow hover:shadow-md ${isBundle ? "ring-2 ring-primary shadow-lg bg-primary/[0.03] relative overflow-hidden" : ""}`}>
                  {isBundle && <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/60" />}
                  <CardHeader className={isBundle ? "pb-3 pt-5" : "pb-3"}>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-[11px]">{product.category}</Badge>
                      <Badge variant="outline" className="text-[11px]">{product.grade_level}</Badge>
                      {isBundle && (
                        <>
                          <Badge className="bg-primary text-primary-foreground text-[11px] font-semibold">🏆 Best Value</Badge>
                          <Badge className="bg-accent text-accent-foreground text-[11px] font-semibold">🔥 Most Popular</Badge>
                        </>
                      )}
                    </div>
                    <h3 className={`font-semibold leading-snug text-foreground ${isBundle ? "text-lg" : "text-base"}`}>{product.title}</h3>
                    {isBundle && <p className="text-xs text-muted-foreground italic mt-1">Most teachers choose the bundle</p>}
                  </CardHeader>
                  <CardContent className="flex-1 pb-4">
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                    {isBundle && <p className="mt-2 text-sm font-medium text-foreground">✅ Everything you need for a full month of math instruction</p>}
                  </CardContent>
                  <CardFooter className="flex flex-col items-start border-t pt-4 gap-3">
                    <div className="flex w-full items-center justify-between">
                      <div>
                        {isBundle && <p className="text-xs text-muted-foreground mb-1">If purchased separately: <span className="line-through">{product.original_price}</span></p>}
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-foreground ${isBundle ? "text-xl" : "text-lg"}`}>{product.price}</span>
                          {isBundle && <Badge variant="outline" className="text-secondary border-secondary/30 text-[11px] font-semibold">Save over 50%</Badge>}
                        </div>
                        {isBundle && <span className="text-[11px] font-medium text-accent italic">⏳ Limited Time Launch Price</span>}
                      </div>
                      <Button size={isBundle ? "default" : "sm"} asChild>
                        <Link to={`${shopBasePath}/${product.slug}`}>View Details</Link>
                      </Button>
                    </div>
                    <Button size="sm" variant="outline" className="w-full" asChild>
                      <Link to="/contact">Coming Soon — Notify Me</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
      <TeacherTestimonials />
      {!isPublicRoute && <div className="mt-4"><FeedbackForm /></div>}
      {isPublicRoute && (
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Can't find what you need?{" "}
          <Link to="/contact" className="text-primary underline underline-offset-4">Request a resource</Link>
        </div>
      )}
    </div>
  );

  if (isPublicRoute) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          {content}
        </main>
        <Footer />
      </div>
    );
  }

  return content;
};

export default ResourceShop;
