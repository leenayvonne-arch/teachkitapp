import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const {
      gradeLevel,
      subject,
      topic,
      lessonTitle,
      classDuration,
      standards,
      objectives,
      differentiationLevel,
      studentNeeds,
      instructionalStyle,
      regenerateAction,
    } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are TeachKit, an expert curriculum designer and lesson planning assistant for K-12 teachers. You create professional, standards-aligned, ready-to-use lesson plans.

Always respond with a valid JSON object matching this exact structure (no markdown, no code fences):
{
  "lessonTitle": "string",
  "gradeLevel": "string",
  "subject": "string",
  "topic": "string",
  "duration": "string",
  "standards": ["string array of 2-3 academic standards, e.g. CCSS or NGSS codes with descriptions"],
  "objectives": ["string array of 2-3 measurable learning objectives using Bloom's taxonomy verbs"],
  "keyVocabulary": [{"term": "string", "definition": "string"}],  // IMPORTANT: Generate at least 5-8 vocabulary terms
  "materials": ["string array of materials and resources needed"],
  "instructionalStrategies": ["string array of 2-3 teaching strategies"],
  "procedures": {
    "hook": {"duration": "string", "description": "string", "activities": ["string"]},
    "instruction": {"duration": "string", "description": "string", "activities": ["string"]},
    "guidedPractice": {"duration": "string", "description": "string", "activities": ["string"]},
    "independentPractice": {"duration": "string", "description": "string", "activities": ["string"]},
    "closure": {"duration": "string", "description": "string", "activities": ["string"]}
  },
  "differentiation": {
    "belowLevel": ["string array of accommodations"],
    "onLevel": ["string array of activities"],
    "aboveLevel": ["string array of extensions"]
  },
  "exitTicket": {
    "prompt": "string",
    "questions": ["string array of 2-3 exit ticket questions"]
  }
}`;

    const userPrompt = `Create a detailed lesson plan with the following information:

Grade Level: ${gradeLevel}
Subject: ${subject}
Topic: ${topic}
${lessonTitle ? `Lesson Title: ${lessonTitle}` : "Generate an appropriate lesson title."}
Class Duration: ${classDuration || "45 minutes"}
${standards ? `Standards to align to: ${standards}` : "Generate appropriate academic standards (CCSS, NGSS, or relevant state standards)."}
${objectives ? `Learning Objectives: ${objectives}` : "Generate 2-3 measurable learning objectives using Bloom's taxonomy action verbs."}
${differentiationLevel ? `Differentiation Level: ${differentiationLevel}` : ""}
${studentNeeds ? `Student Needs to Address: ${studentNeeds}` : ""}
${instructionalStyle ? `Preferred Instructional Style: ${instructionalStyle}` : ""}

Ensure all time allocations fit within the class duration. Make the lesson engaging, rigorous, and practical for classroom use.`;

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

    // Parse JSON from response, handling potential markdown fences
    let lessonPlan;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      lessonPlan = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse lesson plan");
    }

    return new Response(JSON.stringify({ lessonPlan }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-lesson error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
