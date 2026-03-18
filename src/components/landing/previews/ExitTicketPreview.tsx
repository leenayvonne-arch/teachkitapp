const ExitTicketPreview = () => (
  <div className="rounded-2xl border border-border bg-card p-5 font-serif text-[11px] leading-relaxed text-card-foreground shadow-sm">
    <div className="mb-3 rounded-lg bg-gradient-to-r from-primary/80 to-primary px-3 py-2 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wider text-primary-foreground">TeachKit Exit Ticket</p>
      <p className="text-xs font-bold text-primary-foreground">Equivalent Fractions</p>
    </div>
    <div className="mb-3 flex justify-between border-b border-dashed border-border pb-2 text-[10px] text-muted-foreground">
      <span>Name: _______________</span>
      <span>Date: ________</span>
    </div>
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-muted/30 p-2.5">
        <p className="mb-1.5 font-bold text-card-foreground">
          <span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">1</span>
          Are 2/4 and 3/6 equivalent? Explain.
        </p>
        <div className="mt-2 space-y-1.5">
          <div className="h-px w-full border-b border-dotted border-border" />
          <div className="h-px w-full border-b border-dotted border-border" />
        </div>
      </div>
      <div className="rounded-lg border border-border bg-muted/30 p-2.5">
        <p className="mb-1.5 font-bold text-card-foreground">
          <span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">2</span>
          Write a fraction equivalent to 1/3.
        </p>
        <div className="mt-2 space-y-1.5">
          <div className="h-px w-full border-b border-dotted border-border" />
        </div>
      </div>
      <div className="rounded-lg border border-border bg-muted/30 p-2.5">
        <p className="mb-1.5 font-bold text-card-foreground">
          <span className="mr-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[9px] font-bold text-primary">3</span>
          Rate your understanding: 😊 😐 😕
        </p>
      </div>
    </div>
  </div>
);

export default ExitTicketPreview;
