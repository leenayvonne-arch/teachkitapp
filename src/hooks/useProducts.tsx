import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface PreviewPage {
  subject: string;
  title: string;
  directions: string;
  question: string;
  responseLines: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  full_description: string;
  grade_level: string;
  price: string;
  original_price: string | null;
  category: string;
  includes: string[];
  use_cases: string[];
  testimonials: string[];
  faqs: ProductFAQ[];
  preview_pages: PreviewPage[];
  stripe_price_id: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) {
      setProducts(data as unknown as Product[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, refetch: fetchProducts };
}

export function useProductBySlug(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      setProduct(data as unknown as Product | null);
      setLoading(false);
    };
    if (slug) fetch();
  }, [slug]);

  return { product, loading };
}
