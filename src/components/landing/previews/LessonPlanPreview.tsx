const LessonPlanPreview = () => (
  <div className="rounded-2xl border border-border bg-card p-5 font-serif text-[11px] leading-relaxed text-card-foreground shadow-sm">
    <div className="mb-3 rounded-lg bg-gradient-to-r from-primary/80 to-primary px-3 py-2 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground">TeachKit Lesson Plan</p>
      <p className="text-xs font-bold text-primary-foreground">Introduction to Photosynthesis</p>
    </div>
    <div className="mb-3 flex gap-3 text-[10px] text-muted-foreground">
      <span className="rounded-md bg-muted px-1.5 py-0.5">Grade 5</span>
      <span className="rounded-md bg-muted px-1.5 py-0.5">Science</span>
      <span className="rounded-md bg-muted px-1.5 py-0.5">45 min</span>
    </div>
    <div className="space-y-2.5">
      <div>
        <p className="mb-1 font-bold text-primary">Objective</p>
        <p className="text-muted-foreground">Students will explain how plants convert sunlight into energy through photosynthesis.</p>
      </div>
      <div>
        <p className="mb-1 font-bold text-primary">Hook (5 min)</p>
        <p className="text-muted-foreground">Show a wilting plant vs. a healthy plant. Ask: "What does this plant need to survive?"</p>
      </div>
      <div>
        <p className="mb-1 font-bold text-primary">Direct Instruction (15 min)</p>
        <p className="text-muted-foreground">Introduce the photosynthesis equation using a labeled diagram...</p>
      </div>
      <div>
        <p className="mb-1 font-bold text-primary">Vocabulary</p>
        <p className="text-muted-foreground">Chlorophyll, glucose, carbon dioxide, oxygen</p>
      </div>
    </div>
  </div>
);

export default LessonPlanPreview;
