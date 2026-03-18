export interface QuizQuestion {
  number: number;
  question: string;
  responseType: "short_answer" | "multiple_choice" | "open_ended" | "fill_in_blank";
  options?: string[];
  linesForResponse: number;
  answer: string;
}

export interface MathQuiz {
  id: number;
  topic: string;
  title: string;
  instructions: string;
  questions: QuizQuestion[];
}

let qid = 0;

const quizData: MathQuiz[] = [
  // Addition & Subtraction (4)
  {
    id: ++qid, topic: "Addition & Subtraction", title: "Addition & Subtraction Basics",
    instructions: "Solve each problem. Show your work.",
    questions: [
      { number: 1, question: "347 + 586 = ______", responseType: "short_answer", linesForResponse: 2, answer: "933" },
      { number: 2, question: "1,002 − 478 = ______", responseType: "short_answer", linesForResponse: 2, answer: "524" },
      { number: 3, question: "Emma had 250 stickers and gave away 118. How many does she have left?", responseType: "short_answer", linesForResponse: 2, answer: "132" },
      { number: 4, question: "Which is greater: 489 + 213 or 350 + 360? Show how you know.", responseType: "open_ended", linesForResponse: 3, answer: "350 + 360 = 710, 489 + 213 = 702. 710 is greater." },
      { number: 5, question: "Round 867 to the nearest hundred, then subtract 400.", responseType: "short_answer", linesForResponse: 2, answer: "900 − 400 = 500" },
    ],
  },
  {
    id: ++qid, topic: "Addition & Subtraction", title: "Multi-Digit Addition",
    instructions: "Solve each addition problem. Regroup when necessary.",
    questions: [
      { number: 1, question: "2,345 + 1,678 = ______", responseType: "short_answer", linesForResponse: 2, answer: "4,023" },
      { number: 2, question: "999 + 456 = ______", responseType: "short_answer", linesForResponse: 2, answer: "1,455" },
      { number: 3, question: "3,102 + 2,898 = ______", responseType: "short_answer", linesForResponse: 2, answer: "6,000" },
      { number: 4, question: "A school collected 1,245 cans in Week 1 and 1,387 cans in Week 2. How many total?", responseType: "short_answer", linesForResponse: 2, answer: "2,632 cans" },
      { number: 5, question: "Explain why we need to regroup when adding 567 + 485.", responseType: "open_ended", linesForResponse: 3, answer: "When digits in a column sum to 10 or more, we carry the extra ten to the next column." },
    ],
  },
  {
    id: ++qid, topic: "Addition & Subtraction", title: "Subtraction with Regrouping",
    instructions: "Solve each subtraction problem. Show your work.",
    questions: [
      { number: 1, question: "5,003 − 2,147 = ______", responseType: "short_answer", linesForResponse: 2, answer: "2,856" },
      { number: 2, question: "800 − 365 = ______", responseType: "short_answer", linesForResponse: 2, answer: "435" },
      { number: 3, question: "4,210 − 1,875 = ______", responseType: "short_answer", linesForResponse: 2, answer: "2,335" },
      { number: 4, question: "A library had 3,500 books. They donated 1,278. How many are left?", responseType: "short_answer", linesForResponse: 2, answer: "2,222" },
      { number: 5, question: "True or False: 6,000 − 2,999 = 3,001. Explain.", responseType: "open_ended", linesForResponse: 3, answer: "True. 6,000 − 2,999 = 3,001." },
    ],
  },
  {
    id: ++qid, topic: "Addition & Subtraction", title: "Word Problems — Add & Subtract",
    instructions: "Read carefully. Show all work and label your answer.",
    questions: [
      { number: 1, question: "A farmer has 1,250 apples. He sells 478 and picks 320 more. How many does he have now?", responseType: "open_ended", linesForResponse: 3, answer: "1,250 − 478 = 772; 772 + 320 = 1,092 apples" },
      { number: 2, question: "Two classes collected cans: Class A collected 389, Class B collected 412. How many more did Class B collect?", responseType: "short_answer", linesForResponse: 2, answer: "23 more cans" },
      { number: 3, question: "Maya saved $456. She spent $189 on supplies. How much does she have left?", responseType: "short_answer", linesForResponse: 2, answer: "$267" },
      { number: 4, question: "A school has 1,100 students. 475 are in primary grades and the rest are in upper grades. How many are in upper grades?", responseType: "short_answer", linesForResponse: 2, answer: "625 students" },
      { number: 5, question: "Write your own word problem that uses subtraction with regrouping. Then solve it.", responseType: "open_ended", linesForResponse: 4, answer: "Answers will vary." },
    ],
  },

  // Multiplication (4)
  {
    id: ++qid, topic: "Multiplication", title: "Multiplication Facts",
    instructions: "Solve each multiplication problem.",
    questions: [
      { number: 1, question: "7 × 8 = ______", responseType: "short_answer", linesForResponse: 2, answer: "56" },
      { number: 2, question: "9 × 6 = ______", responseType: "short_answer", linesForResponse: 2, answer: "54" },
      { number: 3, question: "12 × 5 = ______", responseType: "short_answer", linesForResponse: 2, answer: "60" },
      { number: 4, question: "What is the product of 11 and 8?", responseType: "short_answer", linesForResponse: 2, answer: "88" },
      { number: 5, question: "Draw an array for 3 × 7 and find the product.", responseType: "open_ended", linesForResponse: 3, answer: "21 (array of 3 rows and 7 columns)" },
    ],
  },
  {
    id: ++qid, topic: "Multiplication", title: "Multi-Digit Multiplication",
    instructions: "Multiply. Show your work.",
    questions: [
      { number: 1, question: "34 × 6 = ______", responseType: "short_answer", linesForResponse: 2, answer: "204" },
      { number: 2, question: "52 × 14 = ______", responseType: "short_answer", linesForResponse: 3, answer: "728" },
      { number: 3, question: "125 × 8 = ______", responseType: "short_answer", linesForResponse: 2, answer: "1,000" },
      { number: 4, question: "A box holds 24 crayons. How many crayons are in 15 boxes?", responseType: "short_answer", linesForResponse: 3, answer: "360 crayons" },
      { number: 5, question: "Explain the strategy you used to solve 52 × 14.", responseType: "open_ended", linesForResponse: 3, answer: "Answers will vary (e.g., partial products, standard algorithm)." },
    ],
  },
  {
    id: ++qid, topic: "Multiplication", title: "Word Problems — Multiplication",
    instructions: "Read each problem carefully. Show all work.",
    questions: [
      { number: 1, question: "A baker made 144 muffins and packed them into boxes of 12. How many boxes did he fill?", responseType: "short_answer", linesForResponse: 2, answer: "12 boxes" },
      { number: 2, question: "Sofia read 45 pages on Monday and 38 pages on Tuesday. How many pages total?", responseType: "short_answer", linesForResponse: 2, answer: "83 pages" },
      { number: 3, question: "There are 8 rows of chairs with 15 chairs in each row. How many chairs in all?", responseType: "short_answer", linesForResponse: 2, answer: "120 chairs" },
      { number: 4, question: "A store sells pencils in packs of 6. Mrs. Kim buys 9 packs. How many pencils?", responseType: "short_answer", linesForResponse: 2, answer: "54 pencils" },
      { number: 5, question: "Write a multiplication word problem using the numbers 7 and 12. Then solve it.", responseType: "open_ended", linesForResponse: 3, answer: "Answers will vary. Product should be 84." },
    ],
  },
  {
    id: ++qid, topic: "Multiplication", title: "Properties of Multiplication",
    instructions: "Answer each question about multiplication properties.",
    questions: [
      { number: 1, question: "What is the Commutative Property of Multiplication? Give an example.", responseType: "open_ended", linesForResponse: 3, answer: "Changing the order doesn't change the product. E.g., 3 × 4 = 4 × 3." },
      { number: 2, question: "Use the Distributive Property to solve 6 × 14. Show your work.", responseType: "open_ended", linesForResponse: 3, answer: "6 × (10 + 4) = 60 + 24 = 84" },
      { number: 3, question: "Any number multiplied by 1 equals ______.", responseType: "fill_in_blank", linesForResponse: 2, answer: "itself (Identity Property)" },
      { number: 4, question: "Any number multiplied by 0 equals ______.", responseType: "fill_in_blank", linesForResponse: 2, answer: "0 (Zero Property)" },
      { number: 5, question: "Is 5 × (3 × 2) the same as (5 × 3) × 2? What property is this?", responseType: "open_ended", linesForResponse: 3, answer: "Yes. Associative Property." },
    ],
  },

  // Fractions (4)
  {
    id: ++qid, topic: "Fractions", title: "Identifying & Comparing Fractions",
    instructions: "Answer each question about fractions.",
    questions: [
      { number: 1, question: "Which is greater: 3/4 or 2/3? Explain.", responseType: "open_ended", linesForResponse: 3, answer: "3/4 is greater. 3/4 = 9/12, 2/3 = 8/12." },
      { number: 2, question: "Write a fraction equivalent to 4/6.", responseType: "short_answer", linesForResponse: 2, answer: "2/3" },
      { number: 3, question: "Order from least to greatest: 1/2, 3/8, 5/8.", responseType: "short_answer", linesForResponse: 2, answer: "3/8, 1/2, 5/8" },
      { number: 4, question: "What fraction of a foot is 4 inches?\n  A) 4/10   B) 1/3   C) 4/12   D) 4/8", responseType: "multiple_choice", options: ["4/10", "1/3", "4/12", "4/8"], linesForResponse: 2, answer: "B) 1/3 (which is equivalent to C) 4/12)" },
      { number: 5, question: "Draw a model to show 2/5 of a rectangle.", responseType: "open_ended", linesForResponse: 3, answer: "Rectangle divided into 5 parts with 2 shaded." },
    ],
  },
  {
    id: ++qid, topic: "Fractions", title: "Adding & Subtracting Fractions",
    instructions: "Solve each fraction problem. Simplify when possible.",
    questions: [
      { number: 1, question: "1/4 + 2/4 = ______", responseType: "short_answer", linesForResponse: 2, answer: "3/4" },
      { number: 2, question: "3/5 − 1/5 = ______", responseType: "short_answer", linesForResponse: 2, answer: "2/5" },
      { number: 3, question: "1/3 + 1/6 = ______", responseType: "short_answer", linesForResponse: 2, answer: "3/6 = 1/2" },
      { number: 4, question: "5/8 − 1/4 = ______", responseType: "short_answer", linesForResponse: 2, answer: "5/8 − 2/8 = 3/8" },
      { number: 5, question: "A recipe needs 2/3 cup of sugar. You have 1/2 cup. How much more do you need? Show work.", responseType: "open_ended", linesForResponse: 3, answer: "2/3 − 1/2 = 4/6 − 3/6 = 1/6 cup" },
    ],
  },
  {
    id: ++qid, topic: "Fractions", title: "Fractions on a Number Line",
    instructions: "Use number lines to answer the questions.",
    questions: [
      { number: 1, question: "Place 1/4, 1/2, and 3/4 on a number line from 0 to 1.", responseType: "open_ended", linesForResponse: 3, answer: "Correctly placed at 0.25, 0.5, 0.75." },
      { number: 2, question: "What fraction is exactly halfway between 0 and 1/2?", responseType: "short_answer", linesForResponse: 2, answer: "1/4" },
      { number: 3, question: "Is 5/8 closer to 1/2 or 1? Explain.", responseType: "open_ended", linesForResponse: 3, answer: "Closer to 1/2. 5/8 = 0.625, midpoint of 1/2 and 1 is 0.75." },
      { number: 4, question: "Place 2/3 on a number line. Is it greater or less than 3/4?", responseType: "open_ended", linesForResponse: 3, answer: "Less than 3/4. 2/3 ≈ 0.667, 3/4 = 0.75." },
      { number: 5, question: "How many sixths are between 0 and 1?", responseType: "short_answer", linesForResponse: 2, answer: "5 (1/6, 2/6, 3/6, 4/6, 5/6)" },
    ],
  },
  {
    id: ++qid, topic: "Fractions", title: "Mixed Numbers & Improper Fractions",
    instructions: "Convert between mixed numbers and improper fractions.",
    questions: [
      { number: 1, question: "Convert 7/3 to a mixed number.", responseType: "short_answer", linesForResponse: 2, answer: "2 1/3" },
      { number: 2, question: "Convert 2 3/4 to an improper fraction.", responseType: "short_answer", linesForResponse: 2, answer: "11/4" },
      { number: 3, question: "Which is greater: 1 2/5 or 8/5? Explain.", responseType: "open_ended", linesForResponse: 3, answer: "They are equal. 1 2/5 = 7/5. Wait — 8/5 = 1 3/5 which is greater." },
      { number: 4, question: "Add: 1 1/2 + 2/3 = ______", responseType: "short_answer", linesForResponse: 3, answer: "3/2 + 2/3 = 9/6 + 4/6 = 13/6 = 2 1/6" },
      { number: 5, question: "Explain in your own words what a mixed number is.", responseType: "open_ended", linesForResponse: 3, answer: "A number with a whole number part and a fraction part." },
    ],
  },

  // Geometry (4)
  {
    id: ++qid, topic: "Geometry", title: "Geometry Basics",
    instructions: "Answer each question. Use complete sentences where needed.",
    questions: [
      { number: 1, question: "How many sides does a hexagon have?", responseType: "short_answer", linesForResponse: 2, answer: "6" },
      { number: 2, question: "What is the difference between a square and a rectangle?", responseType: "open_ended", linesForResponse: 3, answer: "A square has all 4 sides equal; a rectangle has 2 pairs of equal sides." },
      { number: 3, question: "How many lines of symmetry does an equilateral triangle have?", responseType: "short_answer", linesForResponse: 2, answer: "3" },
      { number: 4, question: "Name a shape that has no straight sides.", responseType: "short_answer", linesForResponse: 2, answer: "Circle (or oval)" },
      { number: 5, question: "Is a square always a rectangle? Is a rectangle always a square? Explain.", responseType: "open_ended", linesForResponse: 3, answer: "Yes, a square is always a rectangle. No, a rectangle is not always a square." },
    ],
  },
  {
    id: ++qid, topic: "Geometry", title: "Perimeter",
    instructions: "Find the perimeter of each shape. Show your work.",
    questions: [
      { number: 1, question: "A rectangle is 12 cm long and 5 cm wide. What is its perimeter?", responseType: "short_answer", linesForResponse: 2, answer: "34 cm" },
      { number: 2, question: "A square has sides of 9 inches. What is the perimeter?", responseType: "short_answer", linesForResponse: 2, answer: "36 inches" },
      { number: 3, question: "A triangle has sides 7 m, 8 m, and 10 m. What is the perimeter?", responseType: "short_answer", linesForResponse: 2, answer: "25 m" },
      { number: 4, question: "A garden has a perimeter of 48 feet. If it is a square, how long is each side?", responseType: "short_answer", linesForResponse: 2, answer: "12 feet" },
      { number: 5, question: "Can two different rectangles have the same perimeter? Draw two examples.", responseType: "open_ended", linesForResponse: 3, answer: "Yes. E.g., 6×4 (P=20) and 7×3 (P=20)." },
    ],
  },
  {
    id: ++qid, topic: "Geometry", title: "Area",
    instructions: "Find the area of each shape. Label your answer with square units.",
    questions: [
      { number: 1, question: "A rectangle with length 8 cm and width 5 cm.", responseType: "short_answer", linesForResponse: 2, answer: "40 sq cm" },
      { number: 2, question: "A square with sides of 7 inches.", responseType: "short_answer", linesForResponse: 2, answer: "49 sq in" },
      { number: 3, question: "A rectangle with length 15 m and width 3 m.", responseType: "short_answer", linesForResponse: 2, answer: "45 sq m" },
      { number: 4, question: "Which has a greater area: a 6×8 rectangle or a 7×7 square?", responseType: "open_ended", linesForResponse: 3, answer: "7×7 = 49, 6×8 = 48. The square has greater area." },
      { number: 5, question: "A classroom floor is 10 m by 8 m. How many 1 sq m tiles are needed to cover it?", responseType: "short_answer", linesForResponse: 2, answer: "80 tiles" },
    ],
  },
  {
    id: ++qid, topic: "Geometry", title: "Lines, Angles & Shapes",
    instructions: "Answer each question about lines and angles.",
    questions: [
      { number: 1, question: "What is the difference between a line, a line segment, and a ray?", responseType: "open_ended", linesForResponse: 3, answer: "A line extends infinitely. A segment has two endpoints. A ray has one endpoint." },
      { number: 2, question: "What type of angle is exactly 90°?\n  A) Acute   B) Right   C) Obtuse   D) Straight", responseType: "multiple_choice", options: ["Acute", "Right", "Obtuse", "Straight"], linesForResponse: 2, answer: "B) Right" },
      { number: 3, question: "Name a real-world example of parallel lines.", responseType: "short_answer", linesForResponse: 2, answer: "Railroad tracks, lines on a road, etc." },
      { number: 4, question: "How many right angles does a rectangle have?", responseType: "short_answer", linesForResponse: 2, answer: "4" },
      { number: 5, question: "Draw an acute angle and an obtuse angle. Label each.", responseType: "open_ended", linesForResponse: 3, answer: "Acute: less than 90°; obtuse: between 90° and 180°." },
    ],
  },

  // Word Problems & Mixed Review (4)
  {
    id: ++qid, topic: "Word Problems", title: "Mixed Word Problems 1",
    instructions: "Read each problem carefully. Show all work and label your answer.",
    questions: [
      { number: 1, question: "A farmer has 348 apples. He gives away 129. How many are left?", responseType: "short_answer", linesForResponse: 2, answer: "219 apples" },
      { number: 2, question: "There are 5 shelves with 18 books each. How many books total?", responseType: "short_answer", linesForResponse: 2, answer: "90 books" },
      { number: 3, question: "Sam walked 3/4 of a mile to school and 1/2 mile to the park. How far in total?", responseType: "short_answer", linesForResponse: 3, answer: "3/4 + 1/2 = 3/4 + 2/4 = 5/4 = 1 1/4 miles" },
      { number: 4, question: "A rectangle is 14 cm long and 6 cm wide. What is its area and perimeter?", responseType: "open_ended", linesForResponse: 3, answer: "Area = 84 sq cm, Perimeter = 40 cm" },
      { number: 5, question: "Lisa has $20. She buys a notebook for $4.75 and pens for $3.50. How much change?", responseType: "short_answer", linesForResponse: 2, answer: "$11.75" },
    ],
  },
  {
    id: ++qid, topic: "Word Problems", title: "Mixed Word Problems 2",
    instructions: "Solve each problem. Show your work.",
    questions: [
      { number: 1, question: "A store sold 256 items on Monday and 189 on Tuesday. How many more on Monday?", responseType: "short_answer", linesForResponse: 2, answer: "67 more items" },
      { number: 2, question: "Each bus holds 45 students. How many buses are needed for 315 students?", responseType: "short_answer", linesForResponse: 2, answer: "7 buses" },
      { number: 3, question: "Tom ate 2/8 of a pie. Sara ate 3/8. How much is left?", responseType: "short_answer", linesForResponse: 2, answer: "3/8 of the pie" },
      { number: 4, question: "A garden is shaped like a square with 11-meter sides. What is the perimeter?", responseType: "short_answer", linesForResponse: 2, answer: "44 meters" },
      { number: 5, question: "Create your own two-step word problem using multiplication and addition. Then solve it.", responseType: "open_ended", linesForResponse: 4, answer: "Answers will vary." },
    ],
  },
  {
    id: ++qid, topic: "Word Problems", title: "Multi-Step Problems",
    instructions: "Each problem requires more than one step. Show all work.",
    questions: [
      { number: 1, question: "A school ordered 8 boxes of pencils with 24 pencils each. They gave 50 to the art room. How many are left?", responseType: "open_ended", linesForResponse: 3, answer: "8 × 24 = 192; 192 − 50 = 142 pencils" },
      { number: 2, question: "Maria earns $7 per hour. She works 6 hours on Saturday and 4 hours on Sunday. How much does she earn?", responseType: "short_answer", linesForResponse: 2, answer: "$70" },
      { number: 3, question: "A bookstore had 500 books. They sold 1/4 of them. How many are left?", responseType: "short_answer", linesForResponse: 2, answer: "375 books" },
      { number: 4, question: "Jack ran 3 laps of 400 meters each. Jill ran 1,500 meters. Who ran farther and by how much?", responseType: "open_ended", linesForResponse: 3, answer: "Jack: 1,200 m. Jill: 1,500 m. Jill ran 300 m farther." },
      { number: 5, question: "A class has 28 students. Each needs 3 sheets of paper for a project. Paper comes in packs of 25. How many packs?", responseType: "open_ended", linesForResponse: 3, answer: "28 × 3 = 84 sheets. 84 ÷ 25 = 3.36 → 4 packs needed." },
    ],
  },
  {
    id: ++qid, topic: "Word Problems", title: "Challenge Problems",
    instructions: "These are challenge-level problems. Show all reasoning.",
    questions: [
      { number: 1, question: "A rectangle has a perimeter of 30 cm and a length of 9 cm. What is the area?", responseType: "open_ended", linesForResponse: 3, answer: "Width = (30 − 18) ÷ 2 = 6 cm. Area = 9 × 6 = 54 sq cm." },
      { number: 2, question: "Three friends share 2 pizzas equally. How much does each person get? Write as a fraction.", responseType: "short_answer", linesForResponse: 2, answer: "2/3 of a pizza" },
      { number: 3, question: "A number multiplied by 6 gives 252. What is the number?", responseType: "short_answer", linesForResponse: 2, answer: "42" },
      { number: 4, question: "If you double the length of a square's sides, what happens to its area? Show with an example.", responseType: "open_ended", linesForResponse: 3, answer: "Area quadruples. E.g., 3×3=9 → 6×6=36. 36 = 4 × 9." },
      { number: 5, question: "Write and solve a two-step problem that uses both fractions and whole numbers.", responseType: "open_ended", linesForResponse: 4, answer: "Answers will vary." },
    ],
  },
];

export const mathQuizData = quizData;
export const mathQuizTopics = ["Addition & Subtraction", "Multiplication", "Fractions", "Geometry", "Word Problems"] as const;
