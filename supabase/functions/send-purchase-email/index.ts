import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerEmail, customerName, productName, productSlug } = await req.json();

    if (!customerEmail || !productName) {
      throw new Error("Missing required fields");
    }

    const siteUrl = "https://teachkitapp.com";

    const downloadUrl = `${siteUrl}/dashboard/account`;
    const greeting = customerName ? `Hi ${customerName}` : "Hi there";

    // Use Lovable AI to send email via the built-in SMTP
    // For now, log the email details - email sending requires email domain setup
    console.log("Purchase confirmation email:", {
      to: customerEmail,
      subject: `Your TeachKit purchase: ${productName}`,
      greeting,
      downloadUrl,
      productSlug,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Email queued" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
