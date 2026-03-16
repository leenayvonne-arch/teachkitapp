import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface GeneratorPageProps {
  title: string;
  description: string;
}

const GeneratorPage = ({ title, description }: GeneratorPageProps) => {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-foreground">{title}</h1>
      <p className="mb-8 text-muted-foreground">{description}</p>

      <div className="rounded-2xl border bg-card p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Grade Level</Label>
            <Select>
              <SelectTrigger className="mt-1 rounded-xl">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {["K", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"].map((g) => (
                  <SelectItem key={g} value={g}>{g} Grade</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Subject</Label>
            <Input placeholder="e.g. Math, Science, ELA" className="mt-1 rounded-xl" />
          </div>
        </div>
        <div className="mt-4">
          <Label>Topic</Label>
          <Textarea placeholder="Describe the topic you want to cover…" className="mt-1 rounded-xl" rows={3} />
        </div>
        <Button className="mt-6 rounded-xl" size="lg">
          Generate {title.replace(" Generator", "")}
        </Button>
      </div>
    </div>
  );
};

export default GeneratorPage;
