import { subjectTopics } from "@/data/subjectTopics";

interface TopicSuggestionsProps {
  subject: string;
  onSelect: (topic: string) => void;
}

const TopicSuggestions = ({ subject, onSelect }: TopicSuggestionsProps) => {
  const suggestions = subjectTopics[subject];
  if (!suggestions?.length) return null;

  return (
    <div className="mt-1.5 flex flex-wrap gap-1.5">
      {suggestions.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onSelect(t)}
          className="rounded-lg border border-border bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
        >
          {t}
        </button>
      ))}
    </div>
  );
};

export default TopicSuggestions;
