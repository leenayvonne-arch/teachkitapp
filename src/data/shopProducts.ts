export interface ShopProduct {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  gradeLevel: string;
  price: string;
  category: string;
  includes: string[];
}

export const shopProducts: ShopProduct[] = [
  {
    slug: "exit-tickets-3-5",
    title: "100 Exit Tickets for Grades 3–5",
    description: "Ready-to-use daily exit tickets for Math, ELA, Science, and Social Studies.",
    fullDescription:
      "This comprehensive pack includes 100 carefully crafted exit tickets designed for upper elementary classrooms. Each ticket targets key concepts across five core subject areas — Math, ELA, Science, Social Studies, and History — and includes a mix of comprehension checks, short response prompts, and critical thinking questions. Perfect for daily formative assessment routines.",
    gradeLevel: "Grades 3–5",
    price: "$19",
    category: "Exit Tickets",
    includes: [
      "100 ready-to-print exit tickets",
      "5 subject areas: Math, ELA, Science, Social Studies, and History",
      "Mix of comprehension, short response & critical thinking",
      "Printable PDF format",
      "Student response lines included",
      "Professional cover page",
    ],
  },
  {
    slug: "exit-tickets-6-8",
    title: "100 Exit Tickets for Grades 6–8",
    description: "Engaging and higher-level exit tickets designed for middle school classrooms.",
    fullDescription:
      "Elevate your formative assessment with 100 middle-school-level exit tickets that go beyond simple recall. These tickets feature analytical prompts, deeper critical thinking questions, and short written responses across Math, ELA, Science, and Social Studies. Ideal for building a daily exit ticket routine in grades 6–8.",
    gradeLevel: "Grades 6–8",
    price: "$19",
    category: "Exit Tickets",
    includes: [
      "100 ready-to-print exit tickets",
      "5 subject areas: Math, ELA, Science, Social Studies, and History",
      "Analytical & critical thinking prompts",
      "Printable PDF format",
      "Student response lines included",
      "Professional cover page",
    ],
  },
  {
    slug: "differentiated-lesson-bundle",
    title: "Differentiated Lesson Plan Bundle",
    description: "Pre-built lesson plans with Simplified, Advanced, ELL, and IEP versions included.",
    fullDescription:
      "Save hours of planning with this bundle of differentiated lesson plans. Each lesson comes in five versions — Standard, Simplified, Advanced, ELL Support, and IEP Accommodations — so every student in your classroom is supported. Covers key topics across multiple subjects.",
    gradeLevel: "Grades 3–8",
    price: "$9.99",
    category: "Lesson Plans",
    includes: [
      "Multiple fully differentiated lesson plans",
      "5 versions per lesson (Standard, Simplified, Advanced, ELL, IEP)",
      "Aligned to common standards",
      "Printable PDF format",
    ],
  },
  {
    slug: "math-worksheet-mega-pack",
    title: "Math Worksheet Mega Pack",
    description: "50 printable math worksheets covering fractions, geometry, and word problems.",
    fullDescription:
      "A robust collection of 50 math worksheets covering essential upper-elementary topics including fractions, geometry, measurement, and multi-step word problems. Each worksheet includes clear instructions and an answer key.",
    gradeLevel: "Grades 3–5",
    price: "$6.99",
    category: "Worksheets",
    includes: [
      "50 printable math worksheets",
      "Topics: fractions, geometry, measurement, word problems",
      "Answer keys included",
      "Printable PDF format",
    ],
  },
  {
    slug: "reading-comprehension-toolkit",
    title: "Reading Comprehension Toolkit",
    description: "Passages and questions designed to build close-reading skills for middle schoolers.",
    fullDescription:
      "Build stronger readers with this toolkit of fiction and nonfiction passages paired with text-dependent questions. Designed for middle school ELA classrooms, each passage includes vocabulary support and a variety of question types.",
    gradeLevel: "Grades 6–8",
    price: "$7.99",
    category: "ELA",
    includes: [
      "Fiction & nonfiction reading passages",
      "Text-dependent comprehension questions",
      "Vocabulary support",
      "Printable PDF format",
    ],
  },
  {
    slug: "science-lab-report-templates",
    title: "Science Lab Report Templates",
    description: "Scaffolded lab report templates with vocabulary support and sentence starters.",
    fullDescription:
      "Help students write clear, organized lab reports with these scaffolded templates. Each template guides students through hypothesis, materials, procedure, data collection, and conclusion sections with sentence starters and vocabulary support.",
    gradeLevel: "Grades 4–8",
    price: "$3.99",
    category: "Science",
    includes: [
      "Scaffolded lab report templates",
      "Sentence starters & vocabulary support",
      "Multiple difficulty levels",
      "Printable PDF format",
    ],
  },
  {
    slug: "social-studies-project-pack",
    title: "Social Studies Project Pack",
    description: "Research project guides, rubrics, and graphic organizers for history units.",
    fullDescription:
      "Everything you need to run engaging social studies research projects. This pack includes step-by-step project guides, customizable rubrics, and graphic organizers that help students organize their research and present their findings.",
    gradeLevel: "Grades 5–8",
    price: "$5.99",
    category: "Social Studies",
    includes: [
      "Research project guides",
      "Customizable rubrics",
      "Graphic organizers",
      "Printable PDF format",
    ],
  },
  {
    slug: "classroom-quiz-builder-kit",
    title: "Classroom Quiz Builder Kit",
    description: "100 quiz questions with answer keys across core subjects, ready to customize.",
    fullDescription:
      "Quickly build quizzes with this collection of 100 pre-written questions spanning Math, ELA, Science, and Social Studies. Each question comes with an answer key and can be mixed and matched to create custom assessments for your classroom.",
    gradeLevel: "Grades 3–8",
    price: "$4.99",
    category: "Quizzes",
    includes: [
      "100 quiz questions across 4 subjects",
      "Answer keys included",
      "Mix-and-match format",
      "Printable PDF format",
    ],
  },
];

export function getProductBySlug(slug: string): ShopProduct | undefined {
  return shopProducts.find((p) => p.slug === slug);
}
