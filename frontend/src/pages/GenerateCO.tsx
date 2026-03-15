import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BloomSelector, { type BloomLevel } from "@/components/BloomSelector";
import CourseOutcomeCard, { type CourseOutcome } from "@/components/CourseOutcomeCard";
import OutputPanel from "@/components/OutputPanel";
import api from "@/lib/api";

const BLOOM_VERBS: Record<BloomLevel, string[]> = {
  understand: ["Explain", "Describe", "Interpret", "Summarize", "Classify", "Discuss", "Identify"],
  apply: ["Apply", "Implement", "Demonstrate", "Use", "Solve", "Execute", "Operate"],
  analyze: ["Analyze", "Compare", "Differentiate", "Examine", "Distinguish", "Categorize", "Investigate"],
  evaluate: ["Evaluate", "Justify", "Assess", "Critique", "Judge", "Defend", "Appraise"],
  create: ["Design", "Construct", "Develop", "Formulate", "Propose", "Create", "Compose"],
};

let idCounter = 0;
const makeId = () => `co-${++idCounter}`;

const GenerateCO = () => {
  const navigate = useNavigate();
  const [selectedBlooms, setSelectedBlooms] = useState<BloomLevel[]>(["understand", "apply", "analyze"]);
  const [outcomes, setOutcomes] = useState<CourseOutcome[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [syllabus, setSyllabus] = useState("");
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    const storedSyllabus = localStorage.getItem("obe_syllabus") || "";
    const storedCourse = localStorage.getItem("obe_course_name") || "";
    setSyllabus(storedSyllabus);
    setCourseName(storedCourse);
    const storedCos = localStorage.getItem("obe_cos");
    if (storedCos) {
      try {
        const parsed = JSON.parse(storedCos) as CourseOutcome[];
        if (Array.isArray(parsed)) setOutcomes(parsed);
      } catch {
        // ignore
      }
    }
  }, []);

  const addOutcome = () => {
    const level = selectedBlooms.length > 0 ? selectedBlooms[outcomes.length % selectedBlooms.length] : "understand";
    setOutcomes((prev) => [
      ...prev,
      { id: makeId(), code: `CO${prev.length + 1}`, bloomLevel: level, verb: BLOOM_VERBS[level][0], description: "" },
    ]);
  };

  const updateOutcome = (id: string, updated: CourseOutcome) => {
    setOutcomes((prev) => prev.map((o) => (o.id === id ? updated : o)));
  };

  const removeOutcome = (id: string) => {
    setOutcomes((prev) => prev.filter((o) => o.id !== id));
  };

  const generateTemplate = () => {
    if (selectedBlooms.length === 0) return;
    const count = Math.min(Math.max(selectedBlooms.length, 4), 6);
    const newOutcomes: CourseOutcome[] = [];
    for (let i = 0; i < count; i++) {
      const level = selectedBlooms[i % selectedBlooms.length];
      newOutcomes.push({ id: makeId(), code: `CO${i + 1}`, bloomLevel: level, verb: BLOOM_VERBS[level][0], description: "" });
    }
    setOutcomes(newOutcomes);
  };

  const generateWithAI = async () => {
    setError("");
    if (!syllabus.trim()) {
      setError("Please enter syllabus in the previous step.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.generateCO({
        courseName: courseName || "Course",
        syllabus,
        programOutcomes: localStorage.getItem("obe_pos") || undefined,
        programSpecificOutcomes: localStorage.getItem("obe_psos") || undefined,
      });
      const data = res.data || [];
      const mapped: CourseOutcome[] = data.map((co, i) => ({
        id: makeId(),
        code: co.code || `CO${i + 1}`,
        bloomLevel: (co.bloomLevel || "understand").toLowerCase() as BloomLevel,
        verb: (co.description || "Explain").split(" ")[0] || "Explain",
        description: co.description || "",
      }));
      setOutcomes(mapped);
      localStorage.setItem("obe_cos", JSON.stringify(mapped));
    } catch (err: any) {
      setError(err?.message || "Failed to generate COs.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    localStorage.setItem("obe_cos", JSON.stringify(outcomes));
    navigate("/question-mapping");
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <div>
        <h1 className="text-xl font-bold text-primary mb-1">Generate Course Outcomes</h1>
        <p className="text-sm text-muted-foreground">Select Bloom's levels and create COs aligned to your syllabus.</p>
      </div>

      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3">Bloom's Taxonomy Levels</h2>
        <BloomSelector selected={selectedBlooms} onChange={setSelectedBlooms} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Course Outcomes</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="default" onClick={generateTemplate} disabled={selectedBlooms.length === 0} className="text-sm gap-1.5">
              <BookOpen className="h-4 w-4" /> Generate Template
            </Button>
            <Button variant="outline" size="default" onClick={generateWithAI} disabled={loading} className="text-sm gap-1.5">
              {loading ? "Generating..." : "Generate with AI"}
            </Button>
            <Button size="default" onClick={addOutcome} className="text-sm gap-1.5">
              <Plus className="h-4 w-4" /> Add CO
            </Button>
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        {outcomes.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center">
            <p className="text-sm text-muted-foreground">Click "Generate Template" or add COs manually.</p>
          </div>
        )}

        <div className="space-y-3">
          {outcomes.map((outcome, i) => (
            <CourseOutcomeCard key={outcome.id} outcome={outcome} index={i} onChange={(u) => updateOutcome(outcome.id, u)} onRemove={() => removeOutcome(outcome.id)} />
          ))}
        </div>
      </section>

      <OutputPanel outcomes={outcomes} />

      <div className="flex justify-end">
        <Button className="gap-2 text-sm" onClick={handleNext}>
          Next: Question Mapping <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GenerateCO;
