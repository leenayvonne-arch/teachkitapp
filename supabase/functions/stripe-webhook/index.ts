import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
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

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2025-08-27.basil",
  });

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  let event: Stripe.Event;
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (webhookSecret && signature) {
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return new Response(JSON.stringify({ error: "Invalid signature" }), { status: 400 });
    }
  } else {
    // For testing without webhook secret
    event = JSON.parse(body);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const productSlug = session.metadata?.product_slug;
    const productName = session.metadata?.product_name;
    const productDescription = session.metadata?.product_description;
    const userId = session.metadata?.user_id;

    // Extract customer email and name from the session / Stripe customer
    let customerEmail = session.customer_details?.email || session.customer_email || null;
    let customerName = session.customer_details?.name || null;

    // If we have a customer ID, fetch full customer record for reliable data
    if (session.customer && (!customerEmail || !customerName)) {
      try {
        const customer = await stripe.customers.retrieve(session.customer as string);
        if (customer && !customer.deleted) {
          customerEmail = customerEmail || customer.email || null;
          customerName = customerName || customer.name || null;
        }
      } catch (e) {
        console.error("Error fetching Stripe customer:", e);
      }
    }

    if (userId && productSlug) {
      const { error } = await supabaseAdmin.from("purchases").insert({
        user_id: userId,
        product_slug: productSlug,
        product_name: productName || productSlug,
        product_description: productDescription || null,
        price_paid: session.amount_total || 0,
        currency: session.currency || "usd",
        stripe_session_id: session.id,
        customer_email: customerEmail,
        customer_name: customerName,
      });

      if (error) {
        console.error("Error inserting purchase:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: 200,
  });
});
