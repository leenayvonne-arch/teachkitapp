import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import TeacherTestimonials from "@/components/TeacherTestimonials";
import { shopProducts } from "@/data/shopProducts";

const categories = ["All", ...Array.from(new Set(shopProducts.map((p) => p.category)))];

type SortOption = "default" | "price-low" | "price-high" | "name";

const parsePrice = (price: string) => parseFloat(price.replace(/[^0-9.]/g, ""));

const ResourceShop = () => {
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("default");

  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = shopProducts.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesSearch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
    if (sort === "price-low") list = [...list].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sort === "price-high") list = [...list].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    else if (sort === "name") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [category, sort, search]);

  return (
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
          <Input
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low → High</SelectItem>
            <SelectItem value="price-high">Price: High → Low</SelectItem>
            <SelectItem value="name">Name: A → Z</SelectItem>
          </SelectContent>
        </Select>

        {category !== "All" && (
          <Button variant="ghost" size="sm" onClick={() => setCategory("All")}>
            Clear filter
          </Button>
        )}
      </div>

      <h2 className="mb-4 text-lg font-semibold text-foreground">
        {category === "All" ? "All Products" : category}
        <span className="ml-2 text-sm font-normal text-muted-foreground">({filtered.length})</span>
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((product, i) => {
          const isBundle = product.slug === "math-classroom-bundle-3-5";
          return (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={isBundle ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <Card className={`flex h-full flex-col transition-shadow hover:shadow-md ${isBundle ? "ring-2 ring-primary shadow-lg bg-primary/[0.03] relative overflow-hidden" : ""}`}>
                {isBundle && (
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/60" />
                )}
                <CardHeader className={isBundle ? "pb-3 pt-5" : "pb-3"}>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-[11px]">{product.category}</Badge>
                    <Badge variant="outline" className="text-[11px]">{product.gradeLevel}</Badge>
                    {isBundle && (
                      <>
                        <Badge className="bg-primary text-primary-foreground text-[11px] font-semibold">🏆 Best Value</Badge>
                        <Badge className="bg-accent text-accent-foreground text-[11px] font-semibold">🔥 Most Popular</Badge>
                      </>
                    )}
                  </div>
                  <h3 className={`font-semibold leading-snug text-foreground ${isBundle ? "text-lg" : "text-base"}`}>{product.title}</h3>
                </CardHeader>
                <CardContent className="flex-1 pb-4">
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-4">
                  <div>
                    {isBundle && (
                      <span className="mr-2 text-sm text-muted-foreground line-through"><span className="mr-2 text-sm text-muted-foreground line-through">$26.00</span></span>
                    )}
                    <span className={`font-bold text-foreground ${isBundle ? "text-xl" : "text-lg"}`}>{product.price}</span>
                    {isBundle && (
                      <span className="ml-2 text-xs font-medium text-primary">Save 50%</span>
                    )}
                  </div>
                  <Button size={isBundle ? "default" : "sm"} asChild>
                    <Link to={`/dashboard/shop/${product.slug}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <TeacherTestimonials />
    </div>
  );
};

export default ResourceShop;
