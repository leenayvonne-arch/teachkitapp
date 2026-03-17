import { Button } from "@/components/ui/button";
import { Save, Download, Printer } from "lucide-react";
import { saveResource, downloadElementAsPDF } from "@/lib/resourceUtils";
import type { LessonPlan, LessonQuiz } from "@/pages/dashboard/LessonPlanGenerator";
import QuizOutput from "@/components/quiz/QuizOutput";

interface Props {
  quiz: LessonQuiz;
  lessonPlan: LessonPlan;
}

const LessonQuizOutput = ({ quiz, lessonPlan }: Props) => {
  const handleSave = async () => {
    await saveResource({
      title: quiz.title,
      resourceType: "quiz",
      gradeLevel: lessonPlan.gradeLevel,
      subject: lessonPlan.subject,
      topic: lessonPlan.topic,
      content: quiz as unknown as Record<string, unknown>,
    });
  };

  const handleDownloadPDF = () =>
    downloadElementAsPDF("lesson-quiz-output", quiz.title || "quiz");

  // Adapt LessonQuiz to Quiz shape (add trueFalse if missing)
  const quizData = {
    ...quiz,
    trueFalse: (quiz as any).trueFalse || [],
    fillInTheBlank: (quiz as any).fillInTheBlank || [],
  };

  return (
    <div>
      <h2 className="mb-3 font-display text-xl font-bold text-foreground">Generated Quiz</h2>

      <div className="mb-4 flex flex-wrap gap-2">
        <Button variant="outline" className="rounded-xl" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Save Quiz
        </Button>
        <Button variant="outline" className="rounded-xl" onClick={handleDownloadPDF}>
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
      </div>

      <QuizOutput
        quiz={quizData}
        gradeLevel={lessonPlan.gradeLevel}
        subject={lessonPlan.subject}
        topic={lessonPlan.topic}
        elementId="lesson-quiz-output"
      />
    </div>
  );
};

export default LessonQuizOutput;
