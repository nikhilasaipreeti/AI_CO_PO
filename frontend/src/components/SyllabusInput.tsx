import { Textarea } from "@/components/ui/textarea";

interface SyllabusInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SyllabusInput = ({ value, onChange }: SyllabusInputProps) => {
  return (
    <div className="space-y-3">
      <label className="block font-display text-lg font-semibold text-foreground">
        Course Syllabus
      </label>
      <p className="text-sm text-muted-foreground font-body">
        Paste your complete syllabus below — include topics, units, and learning goals.
      </p>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"Unit 1: Introduction to Data Structures\n- Arrays, Linked Lists, Stacks, Queues\n\nUnit 2: Trees and Graphs\n- Binary Trees, BST, Graph Traversals\n\nUnit 3: Sorting and Searching\n- Quick Sort, Merge Sort, Hashing..."}
        className="min-h-[220px] font-body text-sm leading-relaxed resize-y bg-background border-border focus:ring-ring"
      />
    </div>
  );
};

export default SyllabusInput;
