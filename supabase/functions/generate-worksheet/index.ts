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
    const { gradeLevel, subject, topic, numberOfQuestions, difficultyLevel, mixedTypes, regenerateAction } =
      await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const total = Number(numberOfQuestions || 10);
    const useMixed = mixedTypes && total >= 4;

    let questionTypeInstruction: string;
    if (useMixed) {
      const mcCount = Math.max(1, Math.round(total * 0.3));
      const saCount = Math.max(1, Math.round(total * 0.3));
      const tfCount = Math.max(1, Math.round(total * 0.2));
      const sywCount = Math.max(1, total - mcCount - saCount - tfCount);
      questionTypeInstruction = `Include a specific mix of question types:
- Exactly ${mcCount} multiple choice question(s) with options A, B, C, D
- Exactly ${saCount} short answer question(s)
- Exactly ${tfCount} true/false question(s)
- Exactly ${sywCount} show-your-work problem(s) where students must show their reasoning, steps, or diagrams`;
    } else {
      questionTypeInstruction = `Mix question types (short answer, multiple choice, fill-in-the-blank, open-ended) as appropriate for the topic and grade level.`;
    }

    const systemPrompt = useMixed
      ? `You are TeachKit, an expert curriculum designer. You create professional, printable worksheets for K-12 teachers.

Always respond with a valid JSON object matching this exact structure (no markdown, no code fences):
{
  "title": "string — worksheet title",
  "instructions": "string — clear student-facing instructions",
  "multipleChoice": [
    { "number": 1, "question": "string", "options": { "A": "string", "B": "string", "C": "string", "D": "string" }, "correctAnswer": "A" }
  ],
  "trueFalse": [
    { "number": 1, "question": "string", "correctAnswer": "True" }
  ],
  "shortAnswer": [
    { "number": 1, "question": "string", "sampleAnswer": "string" }
  ],
  "showYourWork": [
    { "number": 1, "question": "string", "sampleAnswer": "string" }
  ],
  "answerKey": [
    { "number": 1, "section": "multiple_choice" | "true_false" | "short_answer" | "show_your_work", "answer": "string" }
  ]
}`
      : `You are TeachKit, an expert curriculum designer. You create professional, printable worksheets for K-12 teachers.

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
Number of Questions: ${total}
Difficulty Level: ${difficultyLevel || "Intermediate"}

Requirements:
- ${questionTypeInstruction}
- Questions should progress from easier to harder.
- Provide clear, student-friendly instructions.
- Include a complete answer key with correct or high-quality sample answers.
- Make questions rigorous, engaging, and grade-appropriate.
${useMixed ? "- For show-your-work problems, create problems where students must demonstrate their reasoning, show calculation steps, draw diagrams, or explain their thinking process.\n" : ""}${subject === "Social Studies" ? "- SUBJECT CONTEXT: Social Studies — Focus on general topics such as communities, geography, civics, and basic history concepts appropriate for elementary-level understanding.\n" : ""}${subject === "History" ? "- SUBJECT CONTEXT: History — Focus on specific historical topics such as events, timelines, historical figures, cause/effect relationships, and primary source analysis appropriate for middle and high school level.\n" : ""}${regenerateAction === "simplify" ? "- IMPORTANT: Make questions easier — use simpler language and more scaffolding." : ""}${regenerateAction === "challenge" ? "- IMPORTANT: Make questions harder — include critical thinking and complex problem-solving." : ""}${regenerateAction === "shorten" ? "- IMPORTANT: Reduce total questions to about 5." : ""}${regenerateAction === "expand" ? "- IMPORTANT: Add 5 more questions beyond the requested count." : ""}${regenerateAction === "add_questions" ? "- IMPORTANT: Add 5 additional questions beyond the requested count." : ""}`;

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
      // Ensure arrays exist for mixed type
      if (useMixed) {
        if (!worksheet.multipleChoice) worksheet.multipleChoice = [];
        if (!worksheet.trueFalse) worksheet.trueFalse = [];
        if (!worksheet.shortAnswer) worksheet.shortAnswer = [];
        if (!worksheet.showYourWork) worksheet.showYourWork = [];
      }
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
