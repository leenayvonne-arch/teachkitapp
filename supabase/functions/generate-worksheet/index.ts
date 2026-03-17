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
    const { gradeLevel, subject, topic, numberOfQuestions, difficultyLevel, regenerateAction } =
      await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are TeachKit, an expert curriculum designer. You create professional, printable worksheets for K-12 teachers.

Always respond with a valid JSON object matching this exact structure (no markdown, no code fences):
{
  "title": "string — worksheet title",
  "instructions": "string — clear student-facing instructions",
  "questions": [
    {
      "number": 1,
      "question": "string — the question text",
      "responseType": "short_answer" | "multiple_choice" | "fill_in_blank" | "open_ended",
      "options": ["string array — only for multiple_choice, otherwise empty array"],
      "linesForResponse": 3
    }
  ],
  "answerKey": [
    {
      "number": 1,
      "answer": "string — the correct or sample answer"
    }
  ]
}`;

    const userPrompt = `Create a worksheet with the following details:

Grade Level: ${gradeLevel}
Subject: ${subject}
Topic: ${topic}
Number of Questions: ${numberOfQuestions || 10}
Difficulty Level: ${difficultyLevel || "Intermediate"}

Requirements:
- Mix question types (short answer, multiple choice, fill-in-the-blank, open-ended) as appropriate for the topic and grade level.
- Questions should progress from easier to harder.
- Provide clear, student-friendly instructions.
- Include a complete answer key with correct or high-quality sample answers.
- Make questions rigorous, engaging, and grade-appropriate.`;

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

    let worksheet;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      worksheet = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse worksheet");
    }

    return new Response(JSON.stringify({ worksheet }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-worksheet error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
