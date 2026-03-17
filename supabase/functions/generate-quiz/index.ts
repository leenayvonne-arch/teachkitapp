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
    const { gradeLevel, subject, topic, numberOfQuestions, regenerateAction, mcPercent, tfPercent } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const total = Number(numberOfQuestions || 10);
    let mcCount: number;
    let tfCount: number;
    let saCount: number;

    if (mcPercent !== undefined && mcPercent !== null) {
      // Custom split from user
      const tf = tfPercent ?? 0;
      mcCount = Math.round(total * mcPercent / 100);
      tfCount = Math.round(total * tf / 100);
      saCount = total - mcCount - tfCount;
      if (saCount < 0) { saCount = 0; tfCount = total - mcCount; }
    } else if (total <= 10) {
      mcCount = Math.ceil(total * 0.5);
      tfCount = Math.ceil(total * 0.2);
      saCount = total - mcCount - tfCount;
    } else if (total <= 25) {
      mcCount = Math.ceil(total * 0.5);
      tfCount = Math.ceil(total * 0.25);
      saCount = total - mcCount - tfCount;
    } else {
      saCount = 5;
      tfCount = Math.ceil(total * 0.2);
      mcCount = total - saCount - tfCount;
    }

    const systemPrompt = `You are TeachKit, an expert curriculum designer. You create professional, printable quizzes for K-12 teachers.

Always respond with a valid JSON object matching this exact structure (no markdown, no code fences):
{
  "title": "string — quiz title",
  "multipleChoice": [
    {
      "number": 1,
      "question": "string",
      "options": { "A": "string", "B": "string", "C": "string", "D": "string" },
      "correctAnswer": "A"
    }
  ],
  "trueFalse": [
    {
      "number": 1,
      "question": "string",
      "correctAnswer": "True"
    }
  ],
  "shortAnswer": [
    {
      "number": 1,
      "question": "string",
      "sampleAnswer": "string"
    }
  ],
  "answerKey": [
    {
      "number": 1,
      "section": "multiple_choice" | "true_false" | "short_answer",
      "answer": "string"
    }
  ]
}`;

    const userPrompt = `Create a quiz with the following details:

Grade Level: ${gradeLevel}
Subject: ${subject}
Topic: ${topic}

Requirements:
- Include exactly ${mcCount} multiple choice questions with options A, B, C, D.
- Include exactly ${tfCount} true/false questions. Each true/false question must have a correctAnswer of either "True" or "False".
- Include exactly ${saCount} short answer questions.
- Number multiple choice questions 1–${mcCount}, true/false questions 1–${tfCount}, and short answer questions 1–${saCount}.
- Questions should be rigorous, engaging, and grade-appropriate.
- Provide a complete answer key covering all questions.
${regenerateAction === "simplify" ? "- IMPORTANT: Make questions easier — use simpler language, more straightforward questions, and basic recall." : ""}${regenerateAction === "challenge" ? "- IMPORTANT: Make questions harder — include analysis, application, and higher-order thinking." : ""}${regenerateAction === "shorten" ? "- IMPORTANT: Reduce the total number of questions by about half." : ""}${regenerateAction === "expand" ? "- IMPORTANT: Add 5 more questions beyond the requested count." : ""}${regenerateAction === "add_questions" ? "- IMPORTANT: Add 5 additional questions beyond the requested count." : ""}`;

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

    let quiz;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      quiz = JSON.parse(cleaned);
      // Ensure trueFalse array exists
      if (!quiz.trueFalse) quiz.trueFalse = [];
    } catch {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse quiz");
    }

    return new Response(JSON.stringify({ quiz }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-quiz error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
