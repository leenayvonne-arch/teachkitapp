export interface PreviewPage {
  subject: string;
  title: string;
  directions: string;
  question: string;
  responseLines: number; // how many blank lines to show
}

export interface ShopProduct {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  gradeLevel: string;
  price: string;
  category: string;
  includes: string[];
  previewPages: PreviewPage[];
}

export const shopProducts: ShopProduct[] = [
  {
    slug: "math-classroom-bundle-3-5",
    title: "Grades 3–5 Math Classroom Resource Bundle (Best Value)",
    description: "Everything you need for a full math workflow in one bundle — 50 worksheets, 30 exit tickets, and 20 quizzes with answer keys.",
    fullDescription:
      "Everything you need for a full math workflow in one bundle. Perfect for daily practice, assessment, homework, and test prep. Includes 50 Math Worksheets, 30 Exit Tickets, and 20 Quizzes — all with answer keys included. Covers key topics like fractions, geometry, measurement, and word problems. Save hours of planning time with ready-to-use classroom resources.",
    gradeLevel: "Grades 3–5",
    price: "$12.99",
    category: "Bundles",
    includes: [
      "50 printable math worksheets",
      "30 ready-to-use exit tickets",
      "20 math quizzes with multiple question types",
      "Answer keys included for all resources",
      "Covers fractions, geometry, measurement & word problems",
      "Printable PDF format",
    ],
    previewPages: [
      {
        subject: "Math — Worksheets",
        title: "Worksheet — Adding Fractions with Unlike Denominators",
        directions: "Add each pair of fractions. Simplify your answer if possible. Show your work.",
        question: "1)  1/3 + 1/6 = ______\n2)  2/5 + 1/4 = ______\n3)  3/8 + 1/2 = ______",
        responseLines: 4,
      },
      {
        subject: "Math — Exit Tickets",
        title: "Exit Ticket — Place Value",
        directions: "Answer the question below. Show your work.",
        question: "What is the value of the digit 7 in the number 4,723? Explain how you know.",
        responseLines: 4,
      },
      {
        subject: "Math — Quizzes",
        title: "Quiz — Word Problems",
        directions: "Read each problem carefully. Show all work and label your answer.",
        question: "1) A baker made 144 muffins and packed them into boxes of 12. How many boxes did he fill?\n2) Sofia read 45 pages on Monday and 38 pages on Tuesday. How many pages did she read in all?",
        responseLines: 5,
      },
    ],
  },
  {
    slug: "exit-tickets-3-5",
    title: "100 Exit Tickets for Grades 3–5",
    description: "Ready-to-use daily exit tickets for Math, ELA, Science, Social Studies, and History.",
    fullDescription:
      "This comprehensive pack includes 100 carefully crafted exit tickets designed for upper elementary classrooms. Each ticket targets key concepts across five core subject areas — Math, ELA, Science, Social Studies, and History — and includes a mix of comprehension checks, short response prompts, and critical thinking questions. Perfect for daily formative assessment routines.",
    gradeLevel: "Grades 3–5",
    price: "$19.99",
    category: "Exit Tickets",
    includes: [
      "100 ready-to-print exit tickets",
      "5 subject areas: Math, ELA, Science, Social Studies, and History",
      "Mix of comprehension, short response & critical thinking",
      "Printable PDF format",
      "Student response lines included",
      "Professional cover page",
    ],
    previewPages: [
      {
        subject: "Math",
        title: "Exit Ticket — Fractions",
        directions: "Solve the problem below. Show your work in the space provided.",
        question: "Maria ate 2/4 of a pizza. Jake ate 1/4 of the same pizza. How much pizza did they eat altogether? Write your answer as a fraction and explain how you solved it.",
        responseLines: 4,
      },
      {
        subject: "ELA",
        title: "Exit Ticket — Main Idea",
        directions: "Read the passage your teacher provided, then answer the question below.",
        question: "What is the main idea of today's passage? Write one sentence that tells the main idea, and give one detail from the text that supports it.",
        responseLines: 4,
      },
      {
        subject: "Social Studies",
        title: "Exit Ticket — Communities",
        directions: "Think about what we learned today, then answer the question below.",
        question: "Name two ways that people in a community help each other. Give a real-life example for each one.",
        responseLines: 4,
      },
    ],
  },
  {
    slug: "exit-tickets-6-8",
    title: "100 Exit Tickets for Grades 6–8",
    description: "Engaging and higher-level exit tickets for Math, ELA, Science, Social Studies, and History.",
    fullDescription:
      "Elevate your formative assessment with 100 middle-school-level exit tickets that go beyond simple recall. These tickets feature analytical prompts, deeper critical thinking questions, and short written responses across Math, ELA, Science, Social Studies, and History. Ideal for building a daily exit ticket routine in grades 6–8.",
    gradeLevel: "Grades 6–8",
    price: "$20.00",
    category: "Exit Tickets",
    includes: [
      "100 ready-to-print exit tickets",
      "5 subject areas: Math, ELA, Science, Social Studies, and History",
      "Analytical & critical thinking prompts",
      "Printable PDF format",
      "Student response lines included",
      "Professional cover page",
    ],
    previewPages: [
      {
        subject: "Math",
        title: "Exit Ticket — Ratios & Unit Rates",
        directions: "Show all work. Use complete sentences to explain your reasoning.",
        question: "A store sells 3 notebooks for $7.50. Another store sells 5 notebooks for $11.25. Which store offers the better deal? Find the unit price for each and explain your answer.",
        responseLines: 5,
      },
      {
        subject: "ELA",
        title: "Exit Ticket — Author's Purpose",
        directions: "Refer to today's reading passage to answer the question below.",
        question: "What was the author's primary purpose in writing this passage — to inform, persuade, or entertain? Cite two specific pieces of evidence from the text to support your answer.",
        responseLines: 5,
      },
      {
        subject: "History",
        title: "Exit Ticket — Industrial Revolution",
        directions: "Use what you learned in today's lesson to answer the following.",
        question: "Describe two ways the Industrial Revolution changed daily life for ordinary people. Include at least one positive and one negative effect in your response.",
        responseLines: 5,
      },
    ],
  },
  {
    slug: "differentiated-lesson-bundle",
    title: "Differentiated Lesson Plan Bundle",
    description: "Pre-built lesson plans with Simplified, Advanced, ELL, and IEP versions included.",
    fullDescription:
      "Save hours of planning with this bundle of differentiated lesson plans. Each lesson comes in five versions — Standard, Simplified, Advanced, ELL Support, and IEP Accommodations — so every student in your classroom is supported. Covers key topics across multiple subjects.",
    gradeLevel: "Grades 3–8",
    price: "$10.00",
    category: "Lesson Plans",
    includes: [
      "Multiple fully differentiated lesson plans",
      "5 versions per lesson (Standard, Simplified, Advanced, ELL, IEP)",
      "Aligned to common standards",
      "Printable PDF format",
    ],
    previewPages: [
      {
        subject: "Civics",
        title: "Lesson Plan — Three Branches of Government (Standard)",
        directions: "Objective: Students will identify the three branches of U.S. government and explain their roles.",
        question: "Warm-Up: Look at the diagram on the board. Which branch do you think makes the laws? Write your prediction below.",
        responseLines: 3,
      },
      {
        subject: "Civics",
        title: "Lesson Plan — Three Branches of Government (ELL Support)",
        directions: "Vocabulary-first approach. Use visual aids and sentence frames provided on the next page.",
        question: "The branch that makes laws is called the ___________. Use the word bank: Legislative, Executive, Judicial.",
        responseLines: 3,
      },
    ],
  },
  {
    slug: "math-worksheet-mega-pack",
    title: "Math Worksheet Mega Pack",
    description: "50 printable math worksheets covering fractions, geometry, and word problems.",
    fullDescription:
      "A robust collection of 50 math worksheets covering essential upper-elementary topics including fractions, geometry, measurement, and multi-step word problems. Each worksheet includes clear instructions and an answer key.",
    gradeLevel: "Grades 3–5",
    price: "$7.00",
    category: "Worksheets",
    includes: [
      "50 printable math worksheets",
      "Topics: fractions, geometry, measurement, word problems",
      "Answer keys included",
      "Printable PDF format",
    ],
    previewPages: [
      {
        subject: "Math",
        title: "Worksheet — Adding Fractions with Unlike Denominators",
        directions: "Add each pair of fractions. Simplify your answer if possible. Show your work.",
        question: "1)  1/3 + 1/6 = ______\n2)  2/5 + 1/4 = ______\n3)  3/8 + 1/2 = ______",
        responseLines: 4,
      },
      {
        subject: "Math",
        title: "Worksheet — Area of Shapes",
        directions: "Find the area of each shape. Remember to label your answer with square units.",
        question: "1) A rectangle with length 8 cm and width 5 cm.\n2) A triangle with base 10 in and height 6 in.\n3) A parallelogram with base 7 m and height 4 m.",
        responseLines: 4,
      },
    ],
  },
  {
    slug: "reading-comprehension-toolkit",
    title: "Reading Comprehension Toolkit",
    description: "Passages and questions designed to build close-reading skills for middle schoolers.",
    fullDescription:
      "Build stronger readers with this toolkit of fiction and nonfiction passages paired with text-dependent questions. Designed for middle school ELA classrooms, each passage includes vocabulary support and a variety of question types.",
    gradeLevel: "Grades 6–8",
    price: "$8.00",
    category: "ELA",
    includes: [
      "Fiction & nonfiction reading passages",
      "Text-dependent comprehension questions",
      "Vocabulary support",
      "Printable PDF format",
    ],
    previewPages: [
      {
        subject: "ELA — Fiction",
        title: "Reading Passage — \"The Lighthouse Keeper\"",
        directions: "Read the passage carefully, then answer the questions below using evidence from the text.",
        question: "1) What is the central conflict the main character faces?\n2) How does the setting influence the mood of the story?\n3) Find one example of figurative language and explain its meaning.",
        responseLines: 5,
      },
      {
        subject: "ELA — Nonfiction",
        title: "Reading Passage — \"Coral Reefs in Danger\"",
        directions: "Read the informational text, then complete the questions using text evidence.",
        question: "1) What are two main threats to coral reefs described in the article?\n2) The author states coral reefs are \"the rainforests of the sea.\" What does this comparison mean?",
        responseLines: 5,
      },
    ],
  },
  {
    slug: "science-lab-report-templates",
    title: "Science Lab Report Templates",
    description: "Scaffolded lab report templates with vocabulary support and sentence starters.",
    fullDescription:
      "Help students write clear, organized lab reports with these scaffolded templates. Each template guides students through hypothesis, materials, procedure, data collection, and conclusion sections with sentence starters and vocabulary support.",
    gradeLevel: "Grades 4–8",
    price: "$4.00",
    category: "Science",
    includes: [
      "Scaffolded lab report templates",
      "Sentence starters & vocabulary support",
      "Multiple difficulty levels",
      "Printable PDF format",
    ],
    previewPages: [
      {
        subject: "Science",
        title: "Lab Report Template — Guided Version",
        directions: "Complete each section of the lab report using the sentence starters provided.",
        question: "Hypothesis: I think that _________ because _________.\n\nMaterials: List all materials you used.\n\nConclusion: My hypothesis was (supported / not supported) because _________.",
        responseLines: 4,
      },
      {
        subject: "Science",
        title: "Vocabulary Support — Key Lab Terms",
        directions: "Match each term to its definition, then use it in a sentence.",
        question: "1) Variable — _______________\n2) Control group — _______________\n3) Data — _______________",
        responseLines: 4,
      },
    ],
  },
  {
    slug: "social-studies-project-pack",
    title: "Social Studies Project Pack",
    description: "Research project guides, rubrics, and graphic organizers for history units.",
    fullDescription:
      "Everything you need to run engaging social studies research projects. This pack includes step-by-step project guides, customizable rubrics, and graphic organizers that help students organize their research and present their findings.",
    gradeLevel: "Grades 5–8",
    price: "$6.00",
    category: "Social Studies",
    includes: [
      "Research project guides",
      "Customizable rubrics",
      "Graphic organizers",
      "Printable PDF format",
    ],
    previewPages: [
      {
        subject: "Social Studies",
        title: "Research Project Guide — Step by Step",
        directions: "Follow each step to complete your research project. Check off each step as you finish.",
        question: "Step 1: Choose your topic from the list provided.\nStep 2: Find at least 3 reliable sources.\nStep 3: Take notes using the graphic organizer on the next page.\nStep 4: Write a short report (3–5 paragraphs).",
        responseLines: 3,
      },
      {
        subject: "Social Studies",
        title: "Graphic Organizer — Compare & Contrast",
        directions: "Use this organizer to compare two historical events, people, or places.",
        question: "Topic 1: _______________     Topic 2: _______________\n\nSimilarities:\n•\n•\n\nDifferences:\n•\n•",
        responseLines: 4,
      },
    ],
  },
  {
    slug: "classroom-quiz-builder-kit",
    title: "Classroom Quiz Builder Kit",
    description: "100 quiz questions with answer keys across core subjects including Social Studies and History.",
    fullDescription:
      "Quickly build quizzes with this collection of 100 pre-written questions spanning Math, ELA, Science, Social Studies, and History. Each question comes with an answer key and can be mixed and matched to create custom assessments for your classroom.",
    gradeLevel: "Grades 3–8",
    price: "$5.00",
    category: "Quizzes",
    includes: [
      "100 quiz questions across 5 subjects",
      "Answer keys included",
      "Mix-and-match format",
      "Printable PDF format",
    ],
    previewPages: [
      {
        subject: "Math",
        title: "Quiz — Fractions & Decimals",
        directions: "Choose the best answer for each question. Show your work where indicated.",
        question: "1) What is 3/5 as a decimal?\n   A) 0.35   B) 0.6   C) 0.53   D) 0.8\n\n2) Which fraction is equivalent to 0.75?\n   A) 3/5   B) 7/5   C) 3/4   D) 4/5",
        responseLines: 3,
      },
      {
        subject: "History",
        title: "Quiz — The American Revolution",
        directions: "Answer each question in complete sentences.",
        question: "1) What event is often considered the \"shot heard round the world\"? Why was it significant?\n\n2) Name two key figures of the American Revolution and describe their contributions.",
        responseLines: 5,
      },
    ],
  },
  {
    slug: "math-exit-ticket-pack-3-5",
    title: "Grades 3–5 Math Exit Ticket Pack (30 Pack)",
    description: "30 ready-to-use math exit tickets designed for quick daily assessment in Grades 3–5. Perfect for checking understanding, end-of-lesson assessment, and small group instruction.",
    fullDescription:
      "30 ready-to-use math exit tickets designed for quick daily assessment in Grades 3–5. Perfect for checking understanding, end-of-lesson assessment, and small group instruction. Includes 30 exit tickets covering mixed math topics in a printable format with student answer space. Great for quick, no-prep classroom use.",
    gradeLevel: "Grades 3–5",
    price: "$5.00",
    category: "Exit Tickets",
    includes: [
      "30 ready-to-use exit tickets",
      "Mixed math topics",
      "Printable format",
      "Student answer space",
      "No-prep classroom use",
    ],
    previewPages: [
      {
        subject: "Math",
        title: "Exit Ticket — Place Value",
        directions: "Answer the question below. Show your work.",
        question: "What is the value of the digit 7 in the number 4,723? Explain how you know.",
        responseLines: 4,
      },
      {
        subject: "Math",
        title: "Exit Ticket — Multiplication",
        directions: "Solve the problem and show your work.",
        question: "A classroom has 6 rows of desks with 4 desks in each row. How many desks are there in all? Write a multiplication equation and solve.",
        responseLines: 4,
      },
      {
        subject: "Math",
        title: "Exit Ticket — Fractions",
        directions: "Read carefully and answer the question below.",
        question: "Which is greater: 2/3 or 3/5? Use a drawing or explanation to prove your answer.",
        responseLines: 4,
      },
    ],
  },
  {
    slug: "math-quiz-pack-3-5",
    title: "Grades 3–5 Math Quiz Pack (20 Assessments)",
    description: "20 ready-to-use math quizzes for Grades 3–5 designed to assess student understanding. Perfect for weekly assessments, review, and test prep.",
    fullDescription:
      "20 ready-to-use math quizzes for Grades 3–5 designed to assess student understanding. Perfect for weekly assessments, review, and test prep. Includes 20 quizzes with multiple question types, answer keys included, in a printable format. Save time with ready-to-use assessments.",
    gradeLevel: "Grades 3–5",
    price: "$6.00",
    category: "Quizzes",
    includes: [
      "20 ready-to-use quizzes",
      "Multiple question types",
      "Answer keys included",
      "Printable format",
      "Aligned to Grades 3–5 math standards",
    ],
    previewPages: [
      {
        subject: "Math",
        title: "Quiz — Addition & Subtraction",
        directions: "Solve each problem. Show your work.",
        question: "1) 347 + 586 = ______\n2) 1,002 − 478 = ______\n3) Emma had 250 stickers and gave away 118. How many does she have left?",
        responseLines: 4,
      },
      {
        subject: "Math",
        title: "Quiz — Geometry Basics",
        directions: "Answer each question. Use complete sentences where needed.",
        question: "1) How many sides does a hexagon have?\n2) What is the difference between a square and a rectangle?\n3) Draw a line of symmetry on the shape your teacher provides.",
        responseLines: 4,
      },
      {
        subject: "Math",
        title: "Quiz — Word Problems",
        directions: "Read each problem carefully. Show all work and label your answer.",
        question: "1) A baker made 144 muffins and packed them into boxes of 12. How many boxes did he fill?\n2) Sofia read 45 pages on Monday and 38 pages on Tuesday. How many pages did she read in all?",
        responseLines: 5,
      },
    ],
  },
];

export function getProductBySlug(slug: string): ShopProduct | undefined {
  return shopProducts.find((p) => p.slug === slug);
}
