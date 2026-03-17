import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { gradeLevel, subject, topic, regenerateAction } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are TeachKit, an expert curriculum designer. You create professional, printable exit tickets for K-12 teachers.

Always respond with a valid JSON object matching this exact structure (no markdown, no code fences):
{
  "title": "string — exit ticket title",
  "questions": [
    {
      "number": 1,
      "type": "comprehension" | "reflection" | "skill_application",
      "typeLabel": "string — human-readable label like 'Comprehension Check' or 'Reflection' or 'Skill Application'",
      "question": "string",
      "linesForResponse": 3
    }
  ]
}`;

    const userPrompt = `Create an exit ticket with the following details:

Grade Level: ${gradeLevel}
Subject: ${subject}
Topic: ${topic}

Requirements:
- Generate 3–5 quick assessment questions.
- Include at least one comprehension check question, one reflection question, and one skill application question.
- Questions should be concise and answerable in 2–5 minutes total.
- Make questions grade-appropriate, clear, and focused on the topic.
- Vary the cognitive demand across questions.
${regenerateAction === "simplify" ? "- IMPORTANT: Make questions simpler and more accessible." : ""}${regenerateAction === "challenge" ? "- IMPORTANT: Increase rigor — add analysis and synthesis questions." : ""}${regenerateAction === "shorten" ? "- IMPORTANT: Generate only 3 questions." : ""}${regenerateAction === "expand" ? "- IMPORTANT: Generate 5 questions with more depth." : ""}`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI generation failed");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("No content in AI response");

    let exitTicket;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      exitTicket = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse exit ticket");
    }

    return new Response(JSON.stringify({ exitTicket }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-exit-ticket error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
