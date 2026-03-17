import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { downloadElementAsPDF } from "@/lib/resourceUtils";
import ExitTicketPackCover from "@/components/exit-ticket-pack/CoverPage";
import ExitTicketPackSection from "@/components/exit-ticket-pack/SectionBlock";
import { mathQuestions, elaQuestions, scienceQuestions, socialStudiesQuestions } from "@/components/exit-ticket-pack/questions";

const ExitTicketPack = () => {
  const handleDownload = () => downloadElementAsPDF("exit-ticket-pack", "100-Exit-Tickets-Pack");
  const handlePrint = () => window.print();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Exit Ticket Pack</h1>
          <p className="text-sm text-muted-foreground">100 ready-to-use exit tickets for grades 4–8</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button className="rounded-xl" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div id="exit-ticket-pack" className="space-y-0 rounded-2xl border bg-card">
        <ExitTicketPackCover />

        <ExitTicketPackSection
          title="Math"
          subtitle="Grades 4–8 • 25 Questions"
          color="primary"
          questions={mathQuestions}
        />

        <ExitTicketPackSection
          title="English Language Arts"
          subtitle="Grades 4–8 • 25 Questions"
          color="secondary"
          questions={elaQuestions}
        />

        <ExitTicketPackSection
          title="Science"
          subtitle="Grades 4–8 • 25 Questions"
          color="accent"
          questions={scienceQuestions}
        />

        <ExitTicketPackSection
          title="Social Studies"
          subtitle="Grades 4–8 • 25 Questions"
          color="muted"
          questions={socialStudiesQuestions}
        />

        {/* Footer */}
        <div className="border-t border-border p-6 text-center">
          <p className="text-xs text-muted-foreground">
            © TeachKit — 100 Exit Tickets for Any Classroom • Reproducible for classroom use only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExitTicketPack;
