interface ExitTicketQuestion {
  globalNumber: number;
  type: "comprehension" | "short_response" | "critical_thinking";
  typeLabel: string;
  question: string;
  lines: number;
}

interface ExitTicketSection {
  subject: string;
  questions: ExitTicketQuestion[];
}

let gn = 0;
const c = (question: string, lines = 2): ExitTicketQuestion => ({ globalNumber: ++gn, type: "comprehension", typeLabel: "Comprehension", question, lines });
const s = (question: string, lines = 3): ExitTicketQuestion => ({ globalNumber: ++gn, type: "short_response", typeLabel: "Short Response", question, lines });
const t = (question: string, lines = 3): ExitTicketQuestion => ({ globalNumber: ++gn, type: "critical_thinking", typeLabel: "Critical Thinking", question, lines });

export const exitTicketData: ExitTicketSection[] = [
  {
    subject: "Math",
    questions: [
      // Comprehension (9)
      c("What is the value of the digit 7 in the number 3,742?"),
      c("Is 48 closer to 40 or 50? Explain how you know."),
      c("What fraction of a pizza is left if you ate 3 out of 8 slices?"),
      c("What is the perimeter of a rectangle that is 6 cm long and 4 cm wide?"),
      c("How many minutes are in 2 hours and 15 minutes?"),
      c("Round 4,678 to the nearest hundred."),
      c("Name one thing that is measured in liters."),
      c("What does the word 'product' mean in math?"),
      c("Write a multiplication fact that equals 36."),

      // Short Response (8)
      s("Draw a number line and show where 3/4 would go. Explain your thinking."),
      s("Write a word problem that uses the equation 5 × 7 = 35."),
      s("Explain one strategy you can use to solve 99 + 47 in your head."),
      s("Describe the difference between area and perimeter in your own words."),
      s("If you have $5.00 and buy something for $3.25, show how you would figure out the change."),
      s("Write two equivalent fractions for 1/2 and explain how you know they are equal."),
      s("Explain what an array is and draw one for 4 × 3."),
      s("Describe the pattern in this sequence: 2, 6, 18, 54. What comes next?"),

      // Critical Thinking (8)
      t("Maria says 1/3 is bigger than 1/2 because 3 is bigger than 2. Do you agree or disagree? Explain."),
      t("Why is it important to line up the place values when adding large numbers?"),
      t("A rectangle and a square both have a perimeter of 20 cm. Can they have different areas? Explain."),
      t("If you skip count by 6 starting at 0, will you ever land on 45? Why or why not?"),
      t("Jake ran 3/4 of a mile. Sam ran 2/3 of a mile. Who ran farther? How do you know?"),
      t("Why does multiplying a number by 10 add a zero to the end? Explain in your own words."),
      t("Can a triangle have two right angles? Why or why not?"),
      t("You need to share 7 granola bars equally among 4 friends. How would you do it? Will there be leftovers?"),
    ],
  },
  {
    subject: "ELA",
    questions: [
      // Comprehension (9)
      c("What is the main idea of the passage we read today?"),
      c("Who is the main character in the story? Describe them in one sentence."),
      c("What does the word 'determined' mean in the sentence: 'She was determined to finish the race'?"),
      c("What is the setting of the story we read?"),
      c("Is the text we read today fiction or nonfiction? How do you know?"),
      c("Name one text feature you saw today and tell what it does."),
      c("What happened at the beginning, middle, and end of the story?", 4),
      c("What is a synonym for the word 'enormous'?"),
      c("What is the author's purpose for writing this text?"),

      // Short Response (8)
      s("Write a sentence using a simile to describe your favorite animal."),
      s("What lesson or moral did the main character learn? Use evidence from the text."),
      s("Write a summary of today's reading in 2–3 sentences."),
      s("Think of a different ending for the story. Write 2–3 sentences describing it."),
      s("Choose a vocabulary word from today. Use it in a new sentence of your own."),
      s("What connection can you make between the story and your own life?"),
      s("Write a question you still have about the text we read today."),
      s("Describe the problem and solution in the story."),

      // Critical Thinking (8)
      t("Do you think the main character made the right decision? Why or why not?"),
      t("How would the story be different if it were told from a different character's point of view?"),
      t("Why do you think the author chose that title for the story? Would you change it?"),
      t("Compare two characters from the story. How are they alike and different?"),
      t("If you could give advice to the main character, what would you say and why?"),
      t("What is the theme of the story? How does the author develop it?"),
      t("Would you recommend this book to a friend? Give two reasons for your answer."),
      t("What clues in the text help you predict what might happen next?"),
    ],
  },
  {
    subject: "Science",
    questions: [
      // Comprehension (9)
      c("Name one thing all living things need to survive."),
      c("What is the water cycle? Name its main stages."),
      c("What is the difference between a solid and a liquid?"),
      c("What does a thermometer measure?"),
      c("Name the three types of rocks."),
      c("What is the function of a plant's roots?"),
      c("What is an ecosystem? Give one example."),
      c("What happens when water reaches 100°C (212°F)?"),
      c("Name one renewable energy source."),

      // Short Response (8)
      s("Explain what happens to a shadow when the sun moves across the sky during the day."),
      s("Describe one way animals adapt to survive in cold environments."),
      s("What would happen to a food chain if one animal were removed? Explain your thinking."),
      s("In your own words, explain the difference between weather and climate."),
      s("Describe the steps of the scientific method you remember."),
      s("Explain how erosion changes the surface of the Earth. Give one example."),
      s("What is the difference between a physical change and a chemical change? Give an example of each."),
      s("Describe how plants make their own food using sunlight."),

      // Critical Thinking (8)
      t("Why is it important to only change one variable at a time in an experiment?"),
      t("If all the bees disappeared, what do you think would happen to plants? Explain."),
      t("A student says the sun moves across the sky. Is that accurate? What is really happening?"),
      t("Why do some objects float in water while others sink? Use what you know about density."),
      t("How might building a new road through a forest affect the animals living there?"),
      t("Do you think all scientists agree on every topic? Why might they disagree?"),
      t("If you could design an experiment to test which soil is best for growing beans, what would you do?"),
      t("Why is recycling important for the environment? Give two reasons."),
    ],
  },
  {
    subject: "Social Studies",
    questions: [
      // Comprehension (9)
      c("What are the three branches of the U.S. government?"),
      c("Name one right that citizens of the United States have."),
      c("What is a community? Give one example."),
      c("What is the difference between a want and a need? Give an example of each."),
      c("What continent do we live on?"),
      c("Name one reason people immigrate to a new country."),
      c("What is a map legend and why is it useful?"),
      c("Who makes the laws in the United States?"),
      c("Name one important event in American history."),

      // Short Response (8)
      s("Why do communities have rules and laws? Give one example."),
      s("Describe one way geography affects how people live. For example, near mountains vs. near the coast."),
      s("What does it mean to be a good citizen? Write two things a good citizen does."),
      s("Pick one historical figure we studied. Why is that person important?"),
      s("Explain the difference between rural, suburban, and urban communities."),
      s("What is one way people in your community help each other?"),
      s("Why is it important to learn about other cultures? Give one reason."),
      s("Describe one cause and one effect of a historical event we studied."),

      // Critical Thinking (8)
      t("If you were the president for a day, what is one problem you would try to solve? Why?"),
      t("Why do you think it is important to vote in elections?"),
      t("How would your life be different if you lived 200 years ago? Name two differences."),
      t("Do you think every country should have the same rules? Why or why not?"),
      t("Why is it important to protect natural resources like water and forests?"),
      t("Compare life in your community today with how it might have been 100 years ago."),
      t("If you could add one amendment to the Constitution, what would it be and why?"),
      t("Why do historians study primary sources like letters and diaries instead of just textbooks?"),
    ],
  },
];
