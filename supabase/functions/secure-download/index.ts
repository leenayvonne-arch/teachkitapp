import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    if (!user) throw new Error("Not authenticated");

    const { productSlug } = await req.json();
    if (!productSlug) throw new Error("Missing productSlug");

    // Verify user has purchased this product
    const { data: purchase, error: purchaseError } = await supabaseAdmin
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_slug", productSlug)
      .limit(1)
      .maybeSingle();

    if (purchaseError || !purchase) {
      return new Response(JSON.stringify({ error: "Purchase not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 403,
      });
    }

    // Get file_path from product
    const { data: product } = await supabaseAdmin
      .from("products")
      .select("file_path, title")
      .eq("slug", productSlug)
      .maybeSingle();

    if (!product?.file_path) {
      return new Response(JSON.stringify({ error: "No file available for this product" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Generate a signed URL (valid for 60 minutes)
    const { data: signedUrl, error: signError } = await supabaseAdmin.storage
      .from("product-files")
      .createSignedUrl(product.file_path, 3600);

    if (signError || !signedUrl) {
      throw new Error("Failed to generate download link");
    }

    return new Response(
      JSON.stringify({ url: signedUrl.signedUrl, fileName: product.title }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
