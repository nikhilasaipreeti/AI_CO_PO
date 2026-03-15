import { Button } from "@/components/ui/button";
import { Download, FileText, Table, BarChart3, FileDown } from "lucide-react";

const reports = [
  { title: "CO Attainment Report", desc: "Detailed Course Outcome attainment analysis with per-student breakdown", icon: BarChart3 },
  { title: "PO-PSO Mapping Report", desc: "Program Outcome and PSO correlation matrix with attainment levels", icon: Table },
  { title: "Bloom's Taxonomy Report", desc: "Distribution of questions and COs across Bloom's cognitive levels", icon: FileText },
  { title: "Student Performance Report", desc: "Individual and batch student performance analytics with marks distribution", icon: FileDown },
];

const Reports = () => (
  <div className="max-w-4xl mx-auto py-8 px-4">
    <div className="mb-6">
      <h1 className="text-xl font-bold text-primary mb-1">Academic Reports</h1>
      <p className="text-sm text-muted-foreground">Generate and download OBE reports for accreditation and department records.</p>
    </div>

    {/* Course selector */}
    <div className="bg-card rounded-lg p-5 shadow-sm border border-border mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Course", options: ["Computer Networks", "Operating Systems", "Machine Learning"] },
          { label: "Academic Year", options: ["2024–2025", "2023–2024"] },
          { label: "Semester", options: ["Semester 1", "Semester 2"] },
        ].map((s) => (
          <div key={s.label}>
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">
              {s.label}
            </label>
            <select className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {s.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>

    {/* Report cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reports.map((report) => (
        <div key={report.title} className="bg-card rounded-lg p-5 shadow-sm border border-border hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <report.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-foreground mb-1">{report.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{report.desc}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1.5 text-sm">
                  <Download className="h-3.5 w-3.5" /> PDF
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 text-sm">
                  <Download className="h-3.5 w-3.5" /> Excel
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Bulk download */}
    <div className="mt-6 bg-muted/30 rounded-lg p-6 border border-border text-center">
      <h3 className="text-sm font-bold text-primary mb-2">Download All Reports</h3>
      <p className="text-xs text-muted-foreground mb-4">Generate a complete OBE report package for accreditation submission.</p>
      <div className="flex gap-3 justify-center">
        <Button className="gap-2 text-sm">
          <Download className="h-4 w-4" /> Download PDF Bundle
        </Button>
        <Button variant="outline" className="gap-2 text-sm">
          <Download className="h-4 w-4" /> Download Excel Bundle
        </Button>
      </div>
    </div>
  </div>
);

export default Reports;
