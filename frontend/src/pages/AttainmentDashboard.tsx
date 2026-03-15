import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Target, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

const fallbackCoData = [
  { name: "CO1", attainment: 78, target: 60 },
  { name: "CO2", attainment: 65, target: 60 },
  { name: "CO3", attainment: 82, target: 60 },
  { name: "CO4", attainment: 55, target: 60 },
  { name: "CO5", attainment: 71, target: 60 },
];

const fallbackPoData = [
  { po: "PO1", value: 3.2 }, { po: "PO2", value: 2.8 }, { po: "PO3", value: 3.0 },
  { po: "PO4", value: 2.5 }, { po: "PO5", value: 2.9 }, { po: "PO6", value: 1.8 },
  { po: "PO7", value: 2.1 }, { po: "PO8", value: 2.6 },
];

const fallbackBloomDist = [
  { name: "Understand", value: 20 },
  { name: "Apply", value: 30 },
  { name: "Analyze", value: 25 },
  { name: "Evaluate", value: 15 },
  { name: "Create", value: 10 },
];

const fallbackStudentPerf = [
  { range: "0-40", count: 5 }, { range: "41-60", count: 18 },
  { range: "61-80", count: 28 }, { range: "81-100", count: 12 },
];

const BLOOM_COLORS = ["hsl(210, 60%, 45%)", "hsl(150, 45%, 38%)", "hsl(35, 70%, 50%)", "hsl(15, 65%, 50%)", "hsl(270, 45%, 50%)"];

const StatCard = ({ label, value, sub, icon: Icon }: { label: string; value: string; sub: string; icon: any }) => (
  <div className="bg-card rounded-lg p-4 shadow-sm border border-border">
    <div className="flex items-center justify-between mb-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
      <Icon className="h-4 w-4 text-secondary" />
    </div>
    <p className="text-2xl font-bold text-primary">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{sub}</p>
  </div>
);

const AttainmentDashboard = () => {
  const navigate = useNavigate();
  const [coData, setCoData] = useState(fallbackCoData);
  const [poData, setPoData] = useState(fallbackPoData);
  const [bloomDist, setBloomDist] = useState(fallbackBloomDist);
  const [studentPerf, setStudentPerf] = useState(fallbackStudentPerf);
  const [stats, setStats] = useState({ avg: "70.2%", pos: "8 / 12", psos: "2 / 3", students: "63" });
  const [error, setError] = useState("");

  const applyReport = (report: any) => {
    if (Array.isArray(report.co_attainments)) {
      setCoData(report.co_attainments.map((c: any) => ({
        name: c.co,
        attainment: Math.round(c.percentage),
        target: 60,
      })));
      const avg = report.student_stats?.avg ? `${Math.round(report.student_stats.avg)}%` : "70.2%";
      const pos = report.po_attainments?.length ? `${report.po_attainments.length} / 12` : "8 / 12";
      const psos = report.pso_attainments?.length ? `${report.pso_attainments.length} / 3` : "2 / 3";
      setStats((s) => ({ ...s, avg, pos, psos }));
    }
    if (Array.isArray(report.po_attainments)) {
      setPoData(report.po_attainments.map((p: any) => ({
        po: p.po,
        value: Math.round(p.percentage || 0),
      })));
    }
    if (report.bloom_stats) {
      const entries = Object.entries(report.bloom_stats);
      setBloomDist(entries.map(([name, value]) => ({ name, value: Math.round(value as number) })));
    }
  };

  const loadReport = async () => {
    setError("");
    try {
      const res = await api.getReports();
      if (res?.data) {
        applyReport(res.data);
        localStorage.setItem("obe_report", JSON.stringify(res.data));
        return;
      }
      throw new Error("No report data available.");
    } catch (err: any) {
      setError(err?.message || "Unable to load report.");
    }
  };

  useEffect(() => {
    void loadReport();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary">Attainment Dashboard</h1>
          <p className="text-sm text-muted-foreground">CO-PO-PSO attainment analytics for the selected course.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 text-sm" onClick={() => navigate("/reports")}>
            <Download className="h-4 w-4" /> PDF
          </Button>
          <Button variant="outline" className="gap-2 text-sm" onClick={() => navigate("/reports")}>
            <Download className="h-4 w-4" /> Excel
          </Button>
          <Button variant="outline" className="gap-2 text-sm" onClick={loadReport}>
            Refresh
          </Button>
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="CO Attainment" value={stats.avg} sub="Average across COs" icon={TrendingUp} />
        <StatCard label="PO Mapped" value={stats.pos} sub="Program Outcomes" icon={Target} />
        <StatCard label="PSO Attained" value={stats.psos} sub="Above threshold" icon={Award} />
        <StatCard label="Students" value={stats.students} sub="Total enrolled" icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-card rounded-lg p-5 shadow-sm border border-border">
          <h3 className="text-sm font-bold text-foreground mb-4">CO Attainment (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={coData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 12%, 87%)" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="attainment" fill="hsl(213, 72%, 24%)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="target" fill="hsl(43, 96%, 50%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg p-5 shadow-sm border border-border">
          <h3 className="text-sm font-bold text-foreground mb-4">PO Attainment</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={poData}>
              <PolarGrid stroke="hsl(210, 12%, 87%)" />
              <PolarAngleAxis dataKey="po" fontSize={11} />
              <PolarRadiusAxis fontSize={10} domain={[0, 100]} />
              <Radar dataKey="value" stroke="hsl(213, 72%, 24%)" fill="hsl(213, 72%, 24%)" fillOpacity={0.15} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-card rounded-lg p-5 shadow-sm border border-border">
          <h3 className="text-sm font-bold text-foreground mb-4">Bloom's Taxonomy Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={bloomDist} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={{ fontSize: 11 }}>
                {bloomDist.map((_, i) => (
                  <Cell key={i} fill={BLOOM_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg p-5 shadow-sm border border-border">
          <h3 className="text-sm font-bold text-foreground mb-4">Student Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={studentPerf}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 12%, 87%)" />
              <XAxis dataKey="range" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(150, 45%, 38%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AttainmentDashboard;
