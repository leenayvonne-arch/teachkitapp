export interface MathExitTicket {
  id: number;
  topic: string;
  type: "comprehension" | "short_response" | "critical_thinking";
  typeLabel: string;
  question: string;
  lines: number;
}

let tid = 0;
const c = (topic: string, question: string, lines = 2): MathExitTicket => ({ id: ++tid, topic, type: "comprehension", typeLabel: "Comprehension", question, lines });
const s = (topic: string, question: string, lines = 3): MathExitTicket => ({ id: ++tid, topic, type: "short_response", typeLabel: "Short Response", question, lines });
const t = (topic: string, question: string, lines = 3): MathExitTicket => ({ id: ++tid, topic, type: "critical_thinking", typeLabel: "Critical Thinking", question, lines });

export const mathExitTicketData: MathExitTicket[] = [
  // Place Value & Number Sense (6)
  c("Place Value", "What is the value of the digit 7 in the number 3,742?"),
  c("Place Value", "Is 48 closer to 40 or 50? Explain how you know."),
  s("Place Value", "Round 4,678 to the nearest hundred. Explain your strategy."),
  c("Place Value", "Write the number 5,032 in expanded form."),
  t("Place Value", "Why is it important to line up the place values when adding large numbers?"),
  s("Place Value", "Compare 3,456 and 3,465 using > or <. Explain how you decided."),

  // Fractions (6)
  c("Fractions", "What fraction of a pizza is left if you ate 3 out of 8 slices?"),
  s("Fractions", "Draw a number line and show where 3/4 would go. Explain your thinking."),
  s("Fractions", "Write two equivalent fractions for 1/2 and explain how you know they are equal."),
  t("Fractions", "Maria says 1/3 is bigger than 1/2 because 3 is bigger than 2. Do you agree or disagree? Explain."),
  t("Fractions", "Jake ran 3/4 of a mile. Sam ran 2/3 of a mile. Who ran farther? How do you know?"),
  c("Fractions", "Which fraction is greater: 2/5 or 3/10? Explain your reasoning."),

  // Multiplication & Division (6)
  c("Multiplication", "What does the word 'product' mean in math?"),
  c("Multiplication", "Write a multiplication fact that equals 36."),
  s("Multiplication", "Write a word problem that uses the equation 5 × 7 = 35."),
  s("Multiplication", "A classroom has 6 rows of desks with 4 desks in each row. How many desks are there in total? Write an equation."),
  t("Multiplication", "If you skip count by 6 starting at 0, will you ever land on 45? Why or why not?"),
  t("Multiplication", "Why does multiplying a number by 10 add a zero to the end? Explain in your own words."),

  // Geometry & Measurement (6)
  c("Geometry", "What is the perimeter of a rectangle that is 6 cm long and 4 cm wide?"),
  c("Geometry", "How many minutes are in 2 hours and 15 minutes?"),
  s("Geometry", "Describe the difference between area and perimeter in your own words."),
  t("Geometry", "A rectangle and a square both have a perimeter of 20 cm. Can they have different areas? Explain."),
  s("Geometry", "Name one thing that is measured in liters. Explain why we use liters instead of inches."),
  c("Geometry", "What is the area of a rectangle with length 9 cm and width 4 cm?"),

  // Addition & Subtraction / Money (6)
  s("Operations", "Explain one strategy you can use to solve 99 + 47 in your head."),
  s("Operations", "If you have $5.00 and buy something for $3.25, show how you would figure out the change."),
  c("Operations", "What is 456 + 278? Show your work."),
  t("Operations", "Is it always true that adding two odd numbers gives an even result? Explain with examples."),
  s("Operations", "Explain what an array is and draw one for 4 × 3."),
  t("Operations", "Describe the pattern in this sequence: 2, 6, 18, 54. What comes next and why?"),
];

export const mathExitTicketTopics = ["Place Value", "Fractions", "Multiplication", "Geometry", "Operations"] as const;
