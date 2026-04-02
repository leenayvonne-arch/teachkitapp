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
    const { gradeLevel, subject, topic, numberOfQuestions, regenerateAction, mcPercent, tfPercent, fitbPercent, difficulty, differentiationLevel } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const total = Number(numberOfQuestions || 10);
    let mcCount: number;
    let tfCount: number;
    let fitbCount: number;
    let saCount: number;
    let sywCount = 0;

    if (mcPercent !== undefined && mcPercent !== null) {
      const tf = tfPercent ?? 0;
      const fitb = fitbPercent ?? 0;
      mcCount = Math.round(total * mcPercent / 100);
      tfCount = Math.round(total * tf / 100);
      fitbCount = Math.round(total * fitb / 100);
      saCount = total - mcCount - tfCount - fitbCount;
      if (saCount < 0) { saCount = 0; fitbCount = total - mcCount - tfCount; }
      if (fitbCount < 0) { fitbCount = 0; tfCount = total - mcCount; }
    } else if (total <= 5) {
      // Small quizzes: 2 MC, 1 SA, 1 T/F, 1 show-your-work
      mcCount = Math.max(1, Math.ceil(total * 0.3));
      tfCount = Math.max(1, Math.ceil(total * 0.2));
      sywCount = Math.max(1, Math.ceil(total * 0.2));
      saCount = total - mcCount - tfCount - sywCount;
      fitbCount = 0;
      if (saCount < 0) { saCount = 0; sywCount = total - mcCount - tfCount; }
    } else if (total <= 10) {
      mcCount = Math.ceil(total * 0.3);
      tfCount = Math.ceil(total * 0.2);
      sywCount = Math.ceil(total * 0.2);
      fitbCount = Math.ceil(total * 0.1);
      saCount = total - mcCount - tfCount - fitbCount - sywCount;
    } else if (total <= 25) {
      mcCount = Math.ceil(total * 0.3);
      tfCount = Math.ceil(total * 0.15);
      sywCount = Math.ceil(total * 0.15);
      fitbCount = Math.ceil(total * 0.1);
      saCount = total - mcCount - tfCount - fitbCount - sywCount;
    } else {
      saCount = 5;
      sywCount = Math.ceil(total * 0.1);
      tfCount = Math.ceil(total * 0.15);
      fitbCount = Math.ceil(total * 0.1);
      mcCount = total - saCount - tfCount - fitbCount - sywCount;
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
  "fillInTheBlank": [
    {
      "number": 1,
      "question": "string — use _____ to indicate the blank",
      "correctAnswer": "string"
    }
  ],
  "shortAnswer": [
    {
      "number": 1,
      "question": "string",
      "sampleAnswer": "string"
    }
  ],
  "showYourWork": [
    {
      "number": 1,
      "question": "string — a problem requiring students to show their reasoning/steps",
      "sampleAnswer": "string"
    }
  ],
  "answerKey": [
    {
      "number": 1,
      "section": "multiple_choice" | "true_false" | "fill_in_the_blank" | "short_answer" | "show_your_work",
      "answer": "string"
    }
  ]
}`;

    const userPrompt = `Create a quiz with the following details:

Grade Level: ${gradeLevel}
Subject: ${subject}
Topic: ${topic}

Requirements:
- Difficulty: ${difficulty === "easy" ? "EASY — Focus on basic recall, simple vocabulary, and straightforward facts. Avoid complex reasoning." : difficulty === "hard" ? "HARD — Focus on analysis, application, evaluation, and higher-order thinking. Include nuanced distractors." : "MEDIUM — Balance recall with comprehension and application. Standard grade-level rigor."}
- Include exactly ${mcCount} multiple choice questions with options A, B, C, D.
- Include exactly ${tfCount} true/false questions. Each true/false question must have a correctAnswer of either "True" or "False".
- Include exactly ${fitbCount} fill in the blank questions. Each question must contain _____ where the blank is. Provide the correct word or phrase as correctAnswer.
- Include exactly ${saCount} short answer questions.
- Number multiple choice questions 1–${mcCount}, true/false questions 1–${tfCount}, fill in the blank questions 1–${fitbCount}, and short answer questions 1–${saCount}.
- Questions should be rigorous, engaging, and grade-appropriate.
- Provide a complete answer key covering all questions.
${subject === "Social Studies" ? "- SUBJECT CONTEXT: Social Studies — Focus on general topics such as communities, geography, civics, and basic history concepts appropriate for elementary-level understanding.\n" : ""}${subject === "History" ? "- SUBJECT CONTEXT: History — Focus on specific historical topics such as events, timelines, historical figures, cause/effect relationships, and primary source analysis appropriate for middle and high school level.\n" : ""}
${regenerateAction === "simplify" ? "- IMPORTANT: Make questions easier — use simpler language, more straightforward questions, and basic recall.\n" : ""}${regenerateAction === "challenge" ? "- IMPORTANT: Make questions harder — include analysis, application, and higher-order thinking.\n" : ""}${regenerateAction === "shorten" ? "- IMPORTANT: Reduce the total number of questions by about half.\n" : ""}${regenerateAction === "expand" ? "- IMPORTANT: Add 5 more questions beyond the requested count.\n" : ""}${regenerateAction === "add_questions" ? "- IMPORTANT: Add 5 additional questions beyond the requested count.\n" : ""}${differentiationLevel === "simplified" ? `- DIFFERENTIATION — SIMPLIFIED VERSION: This quiz is for struggling learners. Use simple vocabulary, shorter sentences, basic recall questions. Add scaffolding hints where possible. Label the quiz title with "(Simplified Version)".\n` : ""}${differentiationLevel === "standard" ? `- DIFFERENTIATION — STANDARD VERSION: This is the grade-level version. Maintain standard complexity and vocabulary. Label the quiz title with "(Standard Version)".\n` : ""}${differentiationLevel === "advanced" ? `- DIFFERENTIATION — ADVANCED VERSION: This quiz is for advanced/gifted learners. Use higher-order thinking (analysis, evaluation, synthesis), complex vocabulary, and deeper application. Label the quiz title with "(Advanced Version)".\n` : ""}${differentiationLevel === "ell" ? `- DIFFERENTIATION — ELL SUPPORT VERSION: This quiz is for English Language Learners. Use simplified sentence structures, define key vocabulary in parentheses, avoid idioms and complex phrasing, and provide context clues within questions. Label the quiz title with "(ELL Support Version)".\n` : ""}${differentiationLevel === "iep" ? `- DIFFERENTIATION — IEP ACCOMMODATIONS VERSION: This quiz includes IEP accommodations. Use clear and direct wording, reduce answer choices to 3 where appropriate, break complex questions into simpler parts, add sentence starters for short answer questions, and reduce overall complexity. Label the quiz title with "(IEP Accommodations Version)".\n` : ""}`;

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
      if (!quiz.trueFalse) quiz.trueFalse = [];
      if (!quiz.fillInTheBlank) quiz.fillInTheBlank = [];
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
