import { Badge } from "@/components/ui/badge";

const BLOOM_LEVELS = [
  { key: "understand", label: "Understand", description: "Explain, describe, interpret", color: "bg-bloom-understand" },
  { key: "apply", label: "Apply", description: "Use, implement, demonstrate", color: "bg-bloom-apply" },
  { key: "analyze", label: "Analyze", description: "Compare, differentiate, examine", color: "bg-bloom-analyze" },
  { key: "evaluate", label: "Evaluate", description: "Justify, assess, critique", color: "bg-bloom-evaluate" },
  { key: "create", label: "Create", description: "Design, construct, develop", color: "bg-bloom-create" },
] as const;

export type BloomLevel = typeof BLOOM_LEVELS[number]["key"];

interface BloomSelectorProps {
  selected: BloomLevel[];
  onChange: (levels: BloomLevel[]) => void;
}

const BloomSelector = ({ selected, onChange }: BloomSelectorProps) => {
  const toggle = (level: BloomLevel) => {
    if (selected.includes(level)) {
      onChange(selected.filter((l) => l !== level));
    } else {
      onChange([...selected, level]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block font-display text-lg font-semibold text-foreground">
        Bloom's Taxonomy Levels
      </label>
      <p className="text-sm text-muted-foreground font-body">
        Select which cognitive levels to include in your Course Outcomes.
      </p>
      <div className="flex flex-wrap gap-2">
        {BLOOM_LEVELS.map((level) => {
          const isActive = selected.includes(level.key);
          return (
            <button
              key={level.key}
              onClick={() => toggle(level.key)}
              className={`group flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-body transition-all duration-200 ${
                isActive
                  ? "border-primary/30 bg-primary/5 shadow-card"
                  : "border-border bg-background hover:border-primary/20 hover:bg-muted"
              }`}
            >
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${level.color} ${isActive ? "opacity-100" : "opacity-40"} transition-opacity`} />
              <span className={`font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                {level.label}
              </span>
              <span className="hidden sm:inline text-xs text-muted-foreground">
                — {level.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BloomSelector;
export { BLOOM_LEVELS };
