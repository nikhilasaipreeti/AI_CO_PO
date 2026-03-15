import type { CourseOutcome } from "./CourseOutcomeCard";
import { Button } from "@/components/ui/button";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

interface OutputPanelProps {
  outcomes: CourseOutcome[];
}

const OutputPanel = ({ outcomes }: OutputPanelProps) => {
  const validOutcomes = outcomes.filter((o) => o.description.trim());

  const formatText = () =>
    validOutcomes
      .map((o, i) => `CO${i + 1}: ${o.verb} ${o.description} [${o.bloomLevel.charAt(0).toUpperCase() + o.bloomLevel.slice(1)}]`)
      .join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(formatText());
    toast.success("Course Outcomes copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([formatText()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "course-outcomes.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded course-outcomes.txt");
  };

  if (validOutcomes.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-foreground">Generated Output</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="font-body text-xs gap-1.5">
            <Copy className="h-3.5 w-3.5" /> Copy
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} className="font-body text-xs gap-1.5">
            <Download className="h-3.5 w-3.5" /> Download
          </Button>
        </div>
      </div>
      <div className="rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm leading-relaxed space-y-1">
        {validOutcomes.map((o, i) => (
          <p key={o.id}>
            <span className="font-bold text-primary">CO{i + 1}:</span>{" "}
            <span className="text-foreground">{o.verb} {o.description}</span>{" "}
            <span className="text-muted-foreground">[{o.bloomLevel.charAt(0).toUpperCase() + o.bloomLevel.slice(1)}]</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default OutputPanel;
