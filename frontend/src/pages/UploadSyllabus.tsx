import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UploadSyllabus = () => {
  const [syllabus, setSyllabus] = useState("");
  const [courseName, setCourseName] = useState("");
  const [pos, setPos] = useState("");
  const [psos, setPsos] = useState("");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const handleNext = () => {
    localStorage.setItem("obe_course_name", courseName.trim());
    localStorage.setItem("obe_syllabus", syllabus.trim());
    localStorage.setItem("obe_pos", pos.trim());
    localStorage.setItem("obe_psos", psos.trim());
    navigate("/generate-co");
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
    setSyllabus(text);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-xl font-bold text-primary mb-1">Upload Syllabus</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Enter the course details and syllabus to generate Course Outcomes.
      </p>

      <div className="bg-card rounded-lg p-6 shadow-sm border border-border space-y-5">
        <div>
          <label className="text-sm font-semibold text-foreground mb-1.5 block">
            Course Name
          </label>
          <input
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="e.g., Computer Networks"
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-foreground mb-1.5 block">
              Program Outcomes (PO)
            </label>
            <textarea
              placeholder="PO1: Engineering knowledge&#10;PO2: Problem analysis&#10;..."
              value={pos}
              onChange={(e) => setPos(e.target.value)}
              className="w-full min-h-[90px] rounded-md border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground mb-1.5 block">
              Program Specific Outcomes (PSO)
            </label>
            <textarea
              placeholder="PSO1: Apply CS fundamentals&#10;PSO2: Design software solutions&#10;..."
              value={psos}
              onChange={(e) => setPsos(e.target.value)}
              className="w-full min-h-[90px] rounded-md border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-foreground mb-1.5">
            <FileText className="h-4 w-4" />
            <span className="text-sm font-semibold">Course Syllabus</span>
          </div>
          <textarea
            value={syllabus}
            onChange={(e) => setSyllabus(e.target.value)}
            placeholder="Paste your course syllabus here...&#10;&#10;Unit 1: Introduction to Operating Systems – Process Management, CPU Scheduling&#10;Unit 2: Memory Management – Paging, Segmentation&#10;..."
            className="w-full min-h-[200px] rounded-md border border-input bg-background p-4 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring resize-y"
          />
        </div>

        <div className="flex justify-between items-center pt-2">
          <Button variant="outline" size="default" className="gap-2 text-sm" onClick={handleSelect}>
            <Upload className="h-4 w-4" /> Upload File
          </Button>
          <Button
            size="default"
            className="gap-2 text-sm"
            disabled={!syllabus.trim()}
            onClick={handleNext}
          >
            Next: Generate CO <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
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

export default UploadSyllabus;
