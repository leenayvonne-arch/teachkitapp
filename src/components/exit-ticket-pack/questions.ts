export interface ExitTicketQuestion {
  type: "comprehension" | "reflection" | "critical_thinking";
  question: string;
  lines: number;
}

// ─── MATH (25) ──────────────────────────────────────────────
export const mathQuestions: ExitTicketQuestion[] = [
  // Comprehension (9)
  { type: "comprehension", question: "Explain the difference between a factor and a multiple. Give one example of each.", lines: 3 },
  { type: "comprehension", question: "What does it mean for two fractions to be equivalent? Show an example.", lines: 3 },
  { type: "comprehension", question: "Describe what happens to the value of a number when you multiply it by a fraction less than 1.", lines: 3 },
  { type: "comprehension", question: "How do you find the area of a rectangle? Write the formula and solve for a 7 × 4 rectangle.", lines: 3 },
  { type: "comprehension", question: "What is the order of operations? List the steps in the correct order.", lines: 3 },
  { type: "comprehension", question: "Define 'mean' in your own words and explain how to calculate it.", lines: 3 },
  { type: "comprehension", question: "What is a ratio? Give a real-world example.", lines: 3 },
  { type: "comprehension", question: "How do you convert a fraction to a decimal? Show your steps for 3/4.", lines: 3 },
  { type: "comprehension", question: "Explain the difference between a linear and a nonlinear equation.", lines: 3 },

  // Reflection (8)
  { type: "reflection", question: "What math concept was most challenging for you today and why?", lines: 3 },
  { type: "reflection", question: "How confident do you feel about solving today's problems? Rate 1–5 and explain.", lines: 3 },
  { type: "reflection", question: "Describe a strategy you used today that helped you solve a problem.", lines: 3 },
  { type: "reflection", question: "If you could re-learn one topic from today's lesson, what would it be?", lines: 3 },
  { type: "reflection", question: "How would you explain today's lesson to a friend who missed class?", lines: 3 },
  { type: "reflection", question: "What connection can you make between today's math lesson and your everyday life?", lines: 3 },
  { type: "reflection", question: "What is one question you still have about today's topic?", lines: 3 },
  { type: "reflection", question: "Did you prefer working individually or with a partner today? Why?", lines: 3 },

  // Critical Thinking (8)
  { type: "critical_thinking", question: "A store offers 30% off a $50 item. Your friend says the discount is $20. Is your friend correct? Explain.", lines: 3 },
  { type: "critical_thinking", question: "If a triangle has angles measuring 45° and 90°, what is the third angle? How do you know?", lines: 3 },
  { type: "critical_thinking", question: "You have 3/4 of a pizza and eat 1/3 of what you have. How much of the whole pizza did you eat? Show your work.", lines: 3 },
  { type: "critical_thinking", question: "Is 0.25 greater than, less than, or equal to 1/4? Prove your answer in two different ways.", lines: 3 },
  { type: "critical_thinking", question: "Create a word problem that would require someone to use division of fractions to solve.", lines: 4 },
  { type: "critical_thinking", question: "The ratio of boys to girls in a class is 3:5. If there are 24 students, how many are girls? Explain.", lines: 3 },
  { type: "critical_thinking", question: "A rectangle has a perimeter of 30 cm. List three possible sets of dimensions. Which gives the greatest area?", lines: 4 },
  { type: "critical_thinking", question: "Why is dividing by zero undefined? Explain using an example.", lines: 3 },
];

// ─── ELA (25) ───────────────────────────────────────────────
export const elaQuestions: ExitTicketQuestion[] = [
  // Comprehension (9)
  { type: "comprehension", question: "Summarize the main idea of today's reading in 2–3 sentences.", lines: 3 },
  { type: "comprehension", question: "Who is the protagonist? Describe one character trait and provide textual evidence.", lines: 3 },
  { type: "comprehension", question: "What is the setting of the story? How does it influence the plot?", lines: 3 },
  { type: "comprehension", question: "Define 'theme' and identify the theme of today's reading.", lines: 3 },
  { type: "comprehension", question: "What is the difference between a simile and a metaphor? Give one example of each.", lines: 3 },
  { type: "comprehension", question: "Identify the point of view used in today's text. How do you know?", lines: 3 },
  { type: "comprehension", question: "What does the word '________' mean in the context of today's reading? Use clues from the text.", lines: 3 },
  { type: "comprehension", question: "Describe the conflict in the story. Is it internal or external?", lines: 3 },
  { type: "comprehension", question: "What is the author's purpose in this text: to inform, persuade, or entertain? Explain.", lines: 3 },

  // Reflection (8)
  { type: "reflection", question: "What reading strategy helped you most today? Why?", lines: 3 },
  { type: "reflection", question: "Which character do you relate to most and why?", lines: 3 },
  { type: "reflection", question: "How did today's reading change your thinking about the topic?", lines: 3 },
  { type: "reflection", question: "What part of today's lesson do you want to explore further?", lines: 3 },
  { type: "reflection", question: "Rate your understanding of today's lesson on a scale of 1–5. What would help you improve?", lines: 3 },
  { type: "reflection", question: "What was the most interesting thing you learned today? Why?", lines: 3 },
  { type: "reflection", question: "If you could ask the author one question, what would it be?", lines: 3 },
  { type: "reflection", question: "Describe a moment during today's lesson when you felt challenged. How did you push through?", lines: 3 },

  // Critical Thinking (8)
  { type: "critical_thinking", question: "How would the story change if it were told from a different character's perspective?", lines: 3 },
  { type: "critical_thinking", question: "Compare today's text to something else you have read. What are two similarities and one difference?", lines: 4 },
  { type: "critical_thinking", question: "Do you agree with the main character's decision? Why or why not? Support with evidence.", lines: 3 },
  { type: "critical_thinking", question: "What might happen next in the story? Make a prediction and support it with text evidence.", lines: 3 },
  { type: "critical_thinking", question: "Identify one example of figurative language from the text. What effect does it create?", lines: 3 },
  { type: "critical_thinking", question: "Is the narrator reliable? What evidence supports your answer?", lines: 3 },
  { type: "critical_thinking", question: "Write an alternative ending for today's story in 3–4 sentences.", lines: 4 },
  { type: "critical_thinking", question: "How does the author use foreshadowing in the text? Give a specific example.", lines: 3 },
];

// ─── SCIENCE (25) ───────────────────────────────────────────
export const scienceQuestions: ExitTicketQuestion[] = [
  // Comprehension (9)
  { type: "comprehension", question: "What is the difference between an independent variable and a dependent variable?", lines: 3 },
  { type: "comprehension", question: "List the steps of the scientific method in order.", lines: 3 },
  { type: "comprehension", question: "What is photosynthesis? Write the simplified equation.", lines: 3 },
  { type: "comprehension", question: "Describe the three states of matter and give one example of each.", lines: 3 },
  { type: "comprehension", question: "What is the water cycle? Name and describe its four main stages.", lines: 4 },
  { type: "comprehension", question: "Explain the difference between a physical change and a chemical change.", lines: 3 },
  { type: "comprehension", question: "What are the parts of a cell? Name at least three and their functions.", lines: 3 },
  { type: "comprehension", question: "Define 'ecosystem' and list two biotic and two abiotic factors.", lines: 3 },
  { type: "comprehension", question: "What is Newton's First Law of Motion? Give an everyday example.", lines: 3 },

  // Reflection (8)
  { type: "reflection", question: "What scientific concept from today was hardest to understand? What would help?", lines: 3 },
  { type: "reflection", question: "How does today's science topic connect to something you see in everyday life?", lines: 3 },
  { type: "reflection", question: "If you could design an experiment related to today's lesson, what would you test?", lines: 3 },
  { type: "reflection", question: "What surprised you most about today's lesson? Why?", lines: 3 },
  { type: "reflection", question: "Rate your understanding of today's experiment on a scale of 1–5. Explain your rating.", lines: 3 },
  { type: "reflection", question: "How did working with your lab group help (or hinder) your learning today?", lines: 3 },
  { type: "reflection", question: "What is one thing you want to investigate further after today's lesson?", lines: 3 },
  { type: "reflection", question: "Describe one safety rule you followed during today's activity and why it matters.", lines: 3 },

  // Critical Thinking (8)
  { type: "critical_thinking", question: "If the sun suddenly disappeared, what would happen to the food chain? Explain step by step.", lines: 4 },
  { type: "critical_thinking", question: "A student says 'ice melting is a chemical change.' Do you agree or disagree? Defend your answer.", lines: 3 },
  { type: "critical_thinking", question: "Design a simple experiment to test whether plants grow better in sunlight or shade. List your variables.", lines: 4 },
  { type: "critical_thinking", question: "How is the human body like a machine? Give at least two comparisons.", lines: 3 },
  { type: "critical_thinking", question: "Why is biodiversity important for an ecosystem's health? Use an example.", lines: 3 },
  { type: "critical_thinking", question: "What would happen if Earth had no atmosphere? List three consequences.", lines: 3 },
  { type: "critical_thinking", question: "Compare and contrast mitosis and meiosis. When does each occur?", lines: 4 },
  { type: "critical_thinking", question: "A classmate says gravity only works on Earth. How would you correct this misconception?", lines: 3 },
];

// ─── SOCIAL STUDIES (25) ────────────────────────────────────
export const socialStudiesQuestions: ExitTicketQuestion[] = [
  // Comprehension (9)
  { type: "comprehension", question: "What are the three branches of the U.S. government? Name one responsibility of each.", lines: 3 },
  { type: "comprehension", question: "Define 'democracy' in your own words.", lines: 3 },
  { type: "comprehension", question: "What is the difference between a primary source and a secondary source? Give an example of each.", lines: 3 },
  { type: "comprehension", question: "Name two causes of the American Revolution.", lines: 3 },
  { type: "comprehension", question: "What are the five themes of geography? List them.", lines: 3 },
  { type: "comprehension", question: "Explain the difference between imports and exports.", lines: 3 },
  { type: "comprehension", question: "What is the Bill of Rights? Name two rights it protects.", lines: 3 },
  { type: "comprehension", question: "Describe the concept of supply and demand in your own words.", lines: 3 },
  { type: "comprehension", question: "What is a civilization? List three characteristics that define one.", lines: 3 },

  // Reflection (8)
  { type: "reflection", question: "Which historical figure from today's lesson do you admire most? Why?", lines: 3 },
  { type: "reflection", question: "How does today's topic connect to current events?", lines: 3 },
  { type: "reflection", question: "If you could travel back in time to today's historical period, what would you want to see?", lines: 3 },
  { type: "reflection", question: "What is one thing about today's lesson that changed your perspective?", lines: 3 },
  { type: "reflection", question: "Why is it important to study history? Give a specific reason related to today's topic.", lines: 3 },
  { type: "reflection", question: "How would your life be different if you lived during the time period we studied today?", lines: 3 },
  { type: "reflection", question: "What question do you still have about today's topic?", lines: 3 },
  { type: "reflection", question: "Rate how well you understood today's lesson (1–5). What concept needs more review?", lines: 3 },

  // Critical Thinking (8)
  { type: "critical_thinking", question: "If the Constitution were written today, what is one amendment you would add? Explain why.", lines: 4 },
  { type: "critical_thinking", question: "Compare the perspectives of two groups involved in today's historical event. How were they different?", lines: 4 },
  { type: "critical_thinking", question: "Do you think this historical event was inevitable? Why or why not?", lines: 3 },
  { type: "critical_thinking", question: "How might history have been different if one key event had not occurred? Be specific.", lines: 4 },
  { type: "critical_thinking", question: "Is it possible to have a government without taxes? Explain the trade-offs.", lines: 3 },
  { type: "critical_thinking", question: "A classmate says 'maps are always accurate.' Do you agree? Why or why not?", lines: 3 },
  { type: "critical_thinking", question: "What lessons can modern leaders learn from the civilization we studied today?", lines: 3 },
  { type: "critical_thinking", question: "Explain how geography influenced the development of the society we discussed today.", lines: 3 },
];
