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
const t = (question: string, lines = 4): ExitTicketQuestion => ({ globalNumber: ++gn, type: "critical_thinking", typeLabel: "Critical Thinking", question, lines });

export const exitTicketData68: ExitTicketSection[] = [
  {
    subject: "Math",
    questions: [
      c("What is the greatest common factor (GCF) of 24 and 36?"),
      c("Convert 3/8 to a decimal. Show your work."),
      c("What is the value of 2⁵?"),
      c("Define 'ratio' and give one real-world example."),
      c("Plot −3 and 1.5 on a number line. Which is greater?"),
      c("What is the area of a triangle with base 10 cm and height 6 cm?"),
      c("Simplify the expression: 4(2x + 3)."),
      c("What is the difference between a constant and a variable?"),
      c("If a bag has 3 red, 5 blue, and 2 green marbles, what is the probability of drawing a blue marble?"),

      s("Explain how you would solve the equation 3x − 7 = 14. Walk through each step."),
      s("A store marks a $60 jacket down by 25%. What is the sale price? Show your reasoning."),
      s("Describe one real-world situation that could be modeled by the equation y = 2x + 5."),
      s("The mean of five test scores is 82. If four scores are 78, 85, 90, and 76, what is the fifth score? Explain."),
      s("Explain the difference between surface area and volume using a rectangular prism as an example."),
      s("Write an inequality for this situation: 'You must be at least 48 inches tall to ride.' Then graph it on a number line."),
      s("Describe what happens to the perimeter and area of a rectangle when you double both its length and width."),
      s("A proportional relationship passes through (0, 0) and (4, 12). Write the equation and explain the unit rate."),

      t("A student says −5 is greater than −2 because 5 > 2. Explain why this reasoning is incorrect."),
      t("Two rectangles have the same area but different perimeters. Is this possible? Provide an example or explain why not."),
      t("Why does dividing by a fraction produce a larger number? Use a model or example to explain."),
      t("Compare and contrast proportional and nonproportional linear relationships. Give an example of each."),
      t("A pizza shop charges $8 plus $1.50 per topping. Another charges $10 plus $1.00 per topping. When is each shop the better deal?"),
      t("Explain why any number raised to the power of 0 equals 1. Does this seem logical? Defend your answer."),
      t("How can two data sets have the same mean but very different distributions? Provide an example."),
      t("Design a real-world problem that requires solving a two-step inequality. Solve it and explain your answer."),
    ],
  },
  {
    subject: "ELA",
    questions: [
      c("What is the central idea of the article we read today?"),
      c("Define 'connotation.' How does it differ from 'denotation'?"),
      c("Identify the point of view used in the passage. How do you know?"),
      c("What is one piece of textual evidence that supports the author's claim?"),
      c("What does the word 'resilient' mean as used in paragraph 3?"),
      c("Name one type of figurative language you noticed in today's reading and give the example."),
      c("What is the difference between a primary source and a secondary source?"),
      c("Identify the conflict in the story. Is it internal or external?"),
      c("What is the author's tone in the passage? Cite one word or phrase that reveals it."),

      s("Summarize today's reading in 3–4 sentences. Include the main idea and key supporting details."),
      s("Choose a character from the text. How do their actions reveal their motivation?"),
      s("Write a claim and one piece of supporting evidence about the theme of the story."),
      s("How does the author use the structure of the text (e.g., cause/effect, chronological) to support their purpose?"),
      s("Select a quote from the text. Explain what it means and why it is significant."),
      s("Compare the perspectives of two characters or two sources on the same topic."),
      s("Write a counterclaim to the author's argument and provide one reason to support it."),
      s("How does the setting influence the mood of the story? Use specific details."),

      t("The author chose to end the story ambiguously. Why might they have done this? Do you think it was effective?"),
      t("How does an author's cultural or historical context shape the themes in their writing? Use today's text as an example."),
      t("Is the narrator of the story reliable? What clues in the text support your answer?"),
      t("Evaluate the strength of the author's argument. Is the evidence sufficient and relevant? Explain."),
      t("How would this story change if told from the antagonist's perspective? What new insights would the reader gain?"),
      t("Should students be required to read classic literature, or should they choose their own books? Construct a brief argument."),
      t("Analyze how a specific symbol in the text contributes to the overall theme."),
      t("If you were the editor, what is one revision you would suggest to the author and why?"),
    ],
  },
  {
    subject: "Science",
    questions: [
      c("What is the difference between an element and a compound?"),
      c("Define 'kinetic energy' and give one example."),
      c("What are the levels of organization in an ecosystem, from smallest to largest?"),
      c("What is the function of mitochondria in a cell?"),
      c("Describe one difference between mitosis and meiosis."),
      c("What is Newton's Third Law of Motion? Give an example."),
      c("What causes the phases of the Moon?"),
      c("Define 'density.' How do you calculate it?"),
      c("What is the difference between a genotype and a phenotype?"),

      s("Explain how convection currents drive the movement of tectonic plates."),
      s("Describe the relationship between predator and prey populations in an ecosystem. What happens when one changes?"),
      s("A student drops a ball from a height of 2 meters. Describe the energy transformations that occur."),
      s("Explain how natural selection leads to adaptation over time. Use an example."),
      s("Compare and contrast plant cells and animal cells. List at least two differences."),
      s("Describe the steps of the rock cycle. How can an igneous rock become a sedimentary rock?"),
      s("Explain how the tilt of Earth's axis causes seasons."),
      s("A chemical equation must be balanced. Why? What law does this demonstrate?"),

      t("If a new disease wiped out all decomposers in an ecosystem, what would happen over time? Explain the chain of effects."),
      t("A classmate says 'evolution means animals choose to change.' Evaluate this statement. What is inaccurate?"),
      t("Is a virus considered a living thing? Use the characteristics of life to defend your position."),
      t("Two students design experiments to test which fertilizer grows taller plants. One uses 5 plants, the other uses 50. Whose results are more reliable? Why?"),
      t("How might climate change affect ocean food webs? Consider at least two trophic levels."),
      t("Genetic engineering allows scientists to modify organisms. What is one potential benefit and one potential risk?"),
      t("Explain why correlation does not equal causation. Create a simple example."),
      t("Design a controlled experiment to test whether temperature affects the rate of dissolving sugar in water."),
    ],
  },
  {
    subject: "Social Studies",
    questions: [
      c("What are the three branches of the U.S. federal government and the main role of each?"),
      c("Define 'democracy' and name one country that practices it."),
      c("What was one major cause of the American Revolution?"),
      c("What is the difference between latitude and longitude?"),
      c("Name two rights protected by the First Amendment."),
      c("What is supply and demand? Give a simple example."),
      c("What was the purpose of the Underground Railroad?"),
      c("Define 'civilization.' What are two characteristics of early civilizations?"),
      c("What is the difference between a primary source and a secondary source in history?"),

      s("Explain how the system of checks and balances prevents any one branch of government from becoming too powerful. Give one example."),
      s("Describe one cause and one effect of the Industrial Revolution."),
      s("How did geography influence the development of ancient civilizations? Use one specific civilization as an example."),
      s("Compare the economies of the Northern and Southern states before the Civil War."),
      s("Explain what 'manifest destiny' meant and how it affected Native American populations."),
      s("Describe the significance of the Declaration of Independence in your own words."),
      s("How does the Electoral College work? Do you think it is a fair system?"),
      s("Explain one push factor and one pull factor related to immigration."),

      t("Some people argue that the U.S. Constitution is a 'living document' that should be reinterpreted over time. Others say it should be followed as originally written. Which perspective do you support? Why?"),
      t("Was the dropping of atomic bombs on Hiroshima and Nagasaki justified? Consider multiple perspectives in your response."),
      t("How can studying history help us solve problems in the present? Give a specific example."),
      t("Compare the civil rights strategies of Martin Luther King Jr. and Malcolm X. Which approach do you think was more effective, and why?"),
      t("If you could go back in time and change one historical event, which would you choose and why? What might be different today?"),
      t("Why is media literacy important when studying current events? How can bias affect our understanding of history?"),
      t("Evaluate whether colonialism had any lasting positive effects on colonized regions, or was it entirely harmful? Defend your position."),
      t("Should governments prioritize economic growth or environmental protection? Use historical examples to support your argument."),
    ],
  },
];
