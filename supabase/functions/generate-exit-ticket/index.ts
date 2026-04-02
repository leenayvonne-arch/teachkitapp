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
    const { gradeLevel, subject, topic, numberOfQuestions, mixedTypes, regenerateAction } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const total = Number(numberOfQuestions || 0);
    const useMixed = mixedTypes && total >= 4;

    let questionTypeInstruction: string;
    if (useMixed) {
      // Distribute: ~30% MC, ~30% SA, ~20% T/F, ~20% show-your-work
      const mcCount = Math.max(1, Math.round(total * 0.3));
      const saCount = Math.max(1, Math.round(total * 0.3));
      const tfCount = Math.max(1, Math.round(total * 0.2));
      const sywCount = Math.max(1, total - mcCount - saCount - tfCount);
      questionTypeInstruction = `Include a mix of question types:
- ${mcCount} multiple choice question(s) with options A, B, C, D
- ${saCount} short answer question(s)
- ${tfCount} true/false question(s)
- ${sywCount} show-your-work problem(s) (students must show their reasoning/steps)`;
    } else {
      questionTypeInstruction = `Generate ${total || "3–5"} quick assessment questions.
- Include at least one comprehension check question, one reflection question, and one skill application question.`;
    }

    const systemPrompt = useMixed
      ? `You are TeachKit, an expert curriculum designer. You create professional, printable exit tickets for K-12 teachers.

Always respond with a valid JSON object matching this exact structure (no markdown, no code fences):
{
  "title": "string — exit ticket title",
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
      : `You are TeachKit, an expert curriculum designer. You create professional, printable exit tickets for K-12 teachers.

Always respond with a valid JSON object matching this exact structure (no markdown, no code fences):
{
  "title": "string — exit ticket title",
  "questions": [
    {
      "number": 1,
      "type": "comprehension" | "reflection" | "skill_application",
      "typeLabel": "string — human-readable label like 'Comprehension Check' or 'Reflection' or 'Skill Application'",
      "question": "string",
      "sampleAnswer": "string — the correct or sample answer for this question",
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

    const userPrompt = `Create an exit ticket with the following details:

Grade Level: ${gradeLevel}
Subject: ${subject}
Topic: ${topic}

Requirements:
- ${questionTypeInstruction}
- Questions should be concise and answerable in 2–5 minutes total.
- Make questions grade-appropriate, clear, and focused on the topic.
- Vary the cognitive demand across questions.
- Provide a complete answer key with correct or high-quality sample answers for every question.
${useMixed ? "- For show-your-work problems, create problems where students must demonstrate their reasoning, show steps, draw diagrams, or explain their thinking process.\n- Provide a complete answer key covering all questions.\n" : ""}${subject === "Social Studies" ? "- SUBJECT CONTEXT: Social Studies — Focus on general topics such as communities, geography, civics, and basic history concepts appropriate for elementary-level understanding.\n" : ""}${subject === "History" ? "- SUBJECT CONTEXT: History — Focus on specific historical topics such as events, timelines, historical figures, cause/effect relationships, and primary source analysis appropriate for middle and high school level.\n" : ""}${regenerateAction === "simplify" ? "- IMPORTANT: Make questions simpler and more accessible." : ""}${regenerateAction === "challenge" ? "- IMPORTANT: Increase rigor — add analysis and synthesis questions." : ""}${regenerateAction === "shorten" ? "- IMPORTANT: Generate only 3 questions." : ""}${regenerateAction === "expand" ? "- IMPORTANT: Generate 5 questions with more depth." : ""}`;

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
          max_tokens: 8192,
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

    const rawText = await response.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      console.error("Failed to parse AI gateway response:", rawText.slice(0, 500));
      throw new Error("Invalid AI gateway response");
    }

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      // Check for refusal or finish_reason issues
      const finishReason = data.choices?.[0]?.finish_reason;
      console.error("No content in AI response. finish_reason:", finishReason, "full response:", JSON.stringify(data).slice(0, 1000));
      
      // Retry once on empty content
      const retryResponse = await fetch(
        "https://ai.gateway.lovable.dev/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            max_tokens: 8192,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
          }),
        }
      );
      if (!retryResponse.ok) throw new Error("AI retry failed with status " + retryResponse.status);
      const retryData = await retryResponse.json();
      const retryContent = retryData.choices?.[0]?.message?.content;
      if (!retryContent) throw new Error("No content in AI response after retry");
      // Use retryContent below
      data.choices[0].message.content = retryContent;
    }

    const finalContent = data.choices[0].message.content;

    let exitTicket;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      exitTicket = JSON.parse(cleaned);
      // Ensure arrays exist for mixed type
      if (useMixed) {
        if (!exitTicket.multipleChoice) exitTicket.multipleChoice = [];
        if (!exitTicket.trueFalse) exitTicket.trueFalse = [];
        if (!exitTicket.shortAnswer) exitTicket.shortAnswer = [];
        if (!exitTicket.showYourWork) exitTicket.showYourWork = [];
      }
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
