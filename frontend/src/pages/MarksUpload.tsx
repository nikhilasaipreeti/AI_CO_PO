import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, ArrowRight, Download, FileText, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

const MarksUpload = () => {
  const navigate = useNavigate();
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleSelect = () => fileRef.current?.click();

  const handleFile = async (file: File) => {
    setError("");
    setLoading(true);
    try {
      const res = await api.uploadMarks(file);
      setUploaded(true);
      localStorage.setItem("obe_report", JSON.stringify(res.data || res));
    } catch (err: any) {
      setError(err?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-xl font-bold text-primary mb-1">Upload Student Marks</h1>
      <p className="text-sm text-muted-foreground mb-6">Upload marks data (CSV/Excel) to compute CO attainment levels.</p>

      <div className="bg-card rounded-lg p-6 shadow-sm border border-border text-center space-y-4">
        <div
          className="border-2 border-dashed border-border rounded-lg p-10 hover:border-primary/40 transition-colors cursor-pointer"
          onClick={handleSelect}
        >
          {uploaded ? (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="h-10 w-10 text-green-600" />
              <p className="text-sm font-medium text-foreground">student_marks.csv uploaded successfully</p>
              <p className="text-xs text-muted-foreground">63 students · 5 questions</p>
            </div>
          ) : (
            <>
              <Upload className="h-10 w-10 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-sm text-muted-foreground">Drag and drop CSV/Excel file here, or click to browse</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Supported formats: .csv, .xlsx, .xls</p>
            </>
          )}
        </div>
        <div className="flex gap-3 justify-center pt-2">
          <Button variant="outline" className="gap-2 text-sm" onClick={handleSelect} disabled={loading}>
            <Upload className="h-4 w-4" /> Select File
          </Button>
          <Button variant="outline" className="gap-2 text-sm">
            <Download className="h-4 w-4" /> Download Template
          </Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept=".csv,.xlsx,.xls"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />

      {/* CSV Format guide */}
      <div className="mt-6 bg-muted/30 rounded-lg p-5 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Expected CSV Format</span>
        </div>
        <pre className="text-xs font-mono bg-card rounded-lg p-3 border border-border overflow-x-auto text-muted-foreground">
{`Student,Q1,Q2,Q3,Q4,Q5
21CSE001,8,7,12,10,15
21CSE002,6,5,10,12,18
21CSE003,9,8,11,9,14`}
        </pre>
      </div>

      {/* Sample preview */}
      <div className="mt-6 bg-card rounded-lg shadow-sm border border-border overflow-hidden">
        <div className="px-4 py-3 bg-muted/50 border-b border-border">
          <span className="text-sm font-semibold text-muted-foreground">Preview (Sample Data)</span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/30">
            <tr>
              {["Roll No", "Q1 (CO1)", "Q2 (CO2)", "Q3 (CO3)", "Q4 (CO4)", "Q5 (CO5)"].map((h) => (
                <th key={h} className="px-3 py-2.5 text-left font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["21CSE001", "8", "7", "9", "6", "8"],
              ["21CSE002", "6", "8", "7", "9", "7"],
              ["21CSE003", "9", "6", "8", "7", "9"],
            ].map((row, i) => (
              <tr key={i} className="border-t border-border">
                {row.map((cell, j) => (
                  <td key={j} className="px-3 py-2.5">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-6">
        <Button className="gap-2 text-sm" onClick={() => navigate("/dashboard")}>
          Next: View Attainment <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MarksUpload;
