const QuizPreview = () => (
  <div className="rounded-2xl border border-border bg-card p-5 font-serif text-[11px] leading-relaxed text-card-foreground shadow-sm">
    <div className="mb-3 rounded-lg bg-gradient-to-r from-primary/80 to-primary px-3 py-2 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground">TeachKit Quiz</p>
      <p className="text-xs font-bold text-primary-foreground">American Revolution</p>
    </div>
    <div className="mb-3 flex justify-between border-b border-dashed border-border pb-2 text-[10px] text-muted-foreground">
      <span>Name: _______________</span>
      <span>Score: ____ / 10</span>
    </div>
    <div className="space-y-3">
      <div>
        <p className="mb-1 font-bold text-card-foreground">1. Multiple Choice</p>
        <p className="mb-1.5 text-muted-foreground">What year did the Declaration of Independence get signed?</p>
        <div className="grid grid-cols-2 gap-1 text-muted-foreground">
          <p>○ A) 1774</p>
          <p>○ B) 1776</p>
          <p>○ C) 1781</p>
          <p>○ D) 1783</p>
        </div>
      </div>
      <div>
        <p className="mb-1 font-bold text-card-foreground">2. True or False</p>
        <p className="mb-1 text-muted-foreground">The Boston Tea Party occurred in 1773.</p>
        <p className="text-muted-foreground">○ True &nbsp;&nbsp; ○ False</p>
      </div>
      <div>
        <p className="mb-1 font-bold text-card-foreground">3. Short Answer</p>
        <p className="mb-1.5 text-muted-foreground">Name two causes of the American Revolution.</p>
        <div className="h-px w-full border-b border-dotted border-border" />
      </div>
    </div>
  </div>
);

export default QuizPreview;
