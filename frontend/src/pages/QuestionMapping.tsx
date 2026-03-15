import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

const bloomColors: Record<string, string> = {
  Understand: "bg-blue-50 text-blue-700 border border-blue-200",
  Apply: "bg-green-50 text-green-700 border border-green-200",
  Analyze: "bg-amber-50 text-amber-700 border border-amber-200",
  Evaluate: "bg-orange-50 text-orange-700 border border-orange-200",
  Create: "bg-purple-50 text-purple-700 border border-purple-200",
};

type MappingRow = { q: string; co: string; bloom: string; marks: number };

const QuestionMapping = () => {
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState("");
  const [rows, setRows] = useState<MappingRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const storedMappings = localStorage.getItem("obe_mappings");
    if (storedMappings) {
      try {
        const parsed = JSON.parse(storedMappings) as MappingRow[];
        if (Array.isArray(parsed)) setRows(parsed);
      } catch {
        // ignore
      }
    }
  }, []);

  const parseQuestions = (text: string) =>
    text
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => line.replace(/^\d+[\).\s]+/, ""));

  const handleMap = async () => {
    setError("");
    const questions = parseQuestions(questionText);
    if (questions.length === 0) {
      setError("Please paste question paper text.");
      return;
    }
    const storedCos = localStorage.getItem("obe_cos");
    if (!storedCos) {
      setError("Please generate COs first.");
      return;
    }
    let cos: { id?: string; code?: string; description: string }[] = [];
    try {
      cos = JSON.parse(storedCos);
    } catch {
      cos = [];
    }
    setLoading(true);
    try {
      const res = await api.mapQuestions({ questions, cos });
      const mapped: MappingRow[] = (res.data || []).map((m, i) => ({
        q: m.question,
        co: m.co_id || `CO${i + 1}`,
        bloom: (m.bloom_level || "Understand").replace(/^\w/, (c) => c.toUpperCase()),
        marks: 10,
      }));
      setRows(mapped);
      localStorage.setItem("obe_mappings", JSON.stringify(mapped));
    } catch (err: any) {
      setError(err?.message || "Failed to map questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = () => fileRef.current?.click();

  const handleFile = async (file: File) => {
    setError("");
    const allowed = [".txt", ".md", ".csv"];
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!allowed.includes(ext)) {
      setError("Please upload a .txt, .md, or .csv file.");
      return;
    }
    const text = await file.text();
    setQuestionText(text);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-xl font-bold text-primary mb-1">Question-CO Mapping</h1>
      <p className="text-sm text-muted-foreground mb-6">Map each exam question to its Course Outcome and Bloom's taxonomy level.</p>

      <div className="bg-card rounded-lg p-6 shadow-sm border border-border mb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-foreground mb-1.5 block">Exam Type</label>
            <select className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Mid-Term 1</option>
              <option>Mid-Term 2</option>
              <option>End Semester</option>
              <option>Assignment</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-1.5 block">Total Marks</label>
            <input type="number" defaultValue={70} className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground mb-1.5 block">Question Paper Text</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Paste your question paper text here..."
            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="default" className="gap-1.5 text-sm" onClick={handleSelect}>
            <Upload className="h-4 w-4" /> Upload Question Paper
          </Button>
          <Button size="default" className="gap-1.5 text-sm" onClick={handleMap} disabled={loading}>
            <FileText className="h-4 w-4" /> Map Questions
          </Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {/* Mapping table */}
      <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="px-4 py-3 bg-primary">
          <span className="text-sm font-semibold text-primary-foreground">Question-CO Mapping Result</span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Question</th>
              <th className="text-center px-4 py-3 font-semibold text-muted-foreground w-24">CO</th>
              <th className="text-center px-4 py-3 font-semibold text-muted-foreground w-28">Bloom's Level</th>
              <th className="text-center px-4 py-3 font-semibold text-muted-foreground w-20">Marks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item, i) => (
              <tr key={i} className="border-t border-border hover:bg-muted/20">
                <td className="px-4 py-3 text-foreground">{item.q}</td>
                <td className="px-4 py-3 text-center">
                  <select className="rounded border border-input bg-background px-2 py-1.5 text-sm focus:ring-2 focus:ring-ring" defaultValue={item.co}>
                    {["CO1", "CO2", "CO3", "CO4", "CO5"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-block px-2.5 py-1 rounded text-xs font-semibold ${bloomColors[item.bloom] || "bg-muted text-muted-foreground"}`}>
                    {item.bloom}
                  </span>
                </td>
                <td className="px-4 py-3 text-center font-medium">{item.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-6">
        <Button className="gap-2 text-sm" onClick={() => navigate("/marks-upload")}>
          Next: Upload Marks <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept=".txt,.md,.csv"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
    </div>
  );
};

export default QuestionMapping;
