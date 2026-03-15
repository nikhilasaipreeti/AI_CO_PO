import { BLOOM_LEVELS, type BloomLevel } from "./BloomSelector";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

export interface CourseOutcome {
  id: string;
  code: string;
  bloomLevel: BloomLevel;
  verb: string;
  description: string;
}

interface CourseOutcomeCardProps {
  outcome: CourseOutcome;
  index: number;
  onChange: (updated: CourseOutcome) => void;
  onRemove: () => void;
}

const BLOOM_VERBS: Record<BloomLevel, string[]> = {
  understand: ["Explain", "Describe", "Interpret", "Summarize", "Classify", "Discuss", "Identify"],
  apply: ["Apply", "Implement", "Demonstrate", "Use", "Solve", "Execute", "Operate"],
  analyze: ["Analyze", "Compare", "Differentiate", "Examine", "Distinguish", "Categorize", "Investigate"],
  evaluate: ["Evaluate", "Justify", "Assess", "Critique", "Judge", "Defend", "Appraise"],
  create: ["Design", "Construct", "Develop", "Formulate", "Propose", "Create", "Compose"],
};

const CourseOutcomeCard = ({ outcome, index, onChange, onRemove }: CourseOutcomeCardProps) => {
  const bloomInfo = BLOOM_LEVELS.find((b) => b.key === outcome.bloomLevel);
  const verbs = BLOOM_VERBS[outcome.bloomLevel];

  return (
    <div className="relative rounded-xl border border-border bg-card p-4 shadow-card space-y-3 transition-shadow hover:shadow-elevated">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-display text-base font-bold text-primary">CO{index + 1}</span>
          <span className={`inline-block h-2 w-2 rounded-full ${bloomInfo?.color}`} />
          <span className="text-xs font-medium text-muted-foreground font-body">{bloomInfo?.label}</span>
        </div>
        <button
          onClick={onRemove}
          className="rounded-md p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground font-body">Bloom Level</label>
          <Select
            value={outcome.bloomLevel}
            onValueChange={(val) => {
              const newLevel = val as BloomLevel;
              const newVerbs = BLOOM_VERBS[newLevel];
              onChange({ ...outcome, bloomLevel: newLevel, verb: newVerbs[0] });
            }}
          >
            <SelectTrigger className="text-sm font-body">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {BLOOM_LEVELS.map((b) => (
                <SelectItem key={b.key} value={b.key}>{b.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground font-body">Action Verb</label>
          <Select value={outcome.verb} onValueChange={(val) => onChange({ ...outcome, verb: val })}>
            <SelectTrigger className="text-sm font-body">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {verbs.map((v) => (
                <SelectItem key={v} value={v}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-muted-foreground font-body">Course Outcome Description</label>
        <Input
          value={outcome.description}
          onChange={(e) => onChange({ ...outcome, description: e.target.value })}
          placeholder="e.g., the principles of object-oriented programming and apply them to solve real-world problems"
          className="text-sm font-body"
        />
      </div>

      <p className="text-xs text-muted-foreground font-body italic rounded-md bg-muted/50 px-3 py-2">
        <span className="font-semibold not-italic">Preview: </span>
        {outcome.verb} {outcome.description || "..."}
      </p>
    </div>
  );
};

export default CourseOutcomeCard;
