import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Brain, FileQuestion, BarChart3, ClipboardList, FileDown, GraduationCap, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WorkflowTimeline from "@/components/WorkflowTimeline";
import vignanLogo from "@/assets/vignan-logo.png";

const featureCards = [
  { icon: Brain, title: "AI CO Generator", desc: "Generate Course Outcomes from syllabus using Bloom's Taxonomy" },
  { icon: FileQuestion, title: "Question Mapper", desc: "Map exam questions to CO and Bloom's levels automatically" },
  { icon: ClipboardList, title: "Student Analytics", desc: "Upload marks and analyze student performance data" },
  { icon: BarChart3, title: "Attainment Dashboard", desc: "Visualize CO-PO-PSO attainment with interactive charts" },
  { icon: FileDown, title: "Report Generation", desc: "Export academic reports in PDF and Excel formats" },
];

const stats = [
  { value: "60+", label: "Programs", icon: GraduationCap },
  { value: "835+", label: "Faculty", icon: Users },
  { value: "12K+", label: "Students", icon: Award },
  { value: "85%", label: "Placements", icon: BarChart3 },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full">
      {/* Hero Banner */}
      <section className="vignan-hero-gradient text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
{/* Hero logo removed to avoid redundancy with navbar; typography takes center stage */}
          <h1 className="text-3xl md:text-5xl font-display font-black mb-4 tracking-tight leading-tight">
            Learn. Thrive. Excel.
          </h1>
          <p className="text-base text-white/90 mb-1">
            Department of Computer Science and Engineering
          </p>
          <p className="text-sm text-white/70 mb-6">
            Vignan's Foundation for Science, Technology & Research
          </p>
          <div className="vignan-terracotta-stripe max-w-32 mx-auto mb-6 rounded-3xl" />
          <p className="text-sm text-white/70 max-w-xl mx-auto mb-8">
            Automating Outcome Based Education through AI — CO-PO-PSO attainment analysis, question mapping, and academic report generation.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button size="lg" className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 text-base px-6" onClick={() => navigate("/upload-syllabus")}>
              Start Analysis <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-white/30 text-white hover:bg-white/10 text-base px-6" onClick={() => navigate("/dashboard")}>
              <Play className="h-4 w-4" /> Open Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-5 border-r border-border last:border-r-0">
              <stat.icon className="h-5 w-5 text-secondary mb-2" />
              <span className="text-2xl font-bold text-primary">{stat.value}</span>
              <span className="text-xs text-muted-foreground mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-display font-bold text-primary mb-6 tracking-tight">About Vignan OBE Platform</h2>
          <div className="vignan-terracotta-stripe max-w-12 mx-auto mb-4 rounded-2xl" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            The Department of CSE at Vignan's Foundation for Science, Technology & Research focuses on innovation, research, and advanced computing education. This platform assists faculty in automating OBE processes including CO generation, question-CO mapping, marks processing, and CO-PO-PSO attainment analytics powered by AI.
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-12 px-4 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-primary text-center mb-6 tracking-tight">Platform Capabilities</h2>
          <div className="vignan-terracotta-stripe max-w-16 mx-auto mb-12 rounded-3xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="group bg-background rounded-3xl p-8 py-10 border border-border/50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
        <div className="h-14 w-14 rounded-3xl bg-gradient-to-br from-primary to-secondary shadow-xl flex items-center justify-center mb-6 ring-2 ring-primary/20 hover:scale-110 transition-all duration-300">
          <card.icon className="h-7 w-7 text-primary-foreground" />
        </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{card.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-primary mb-6 tracking-tight">Faculty Workflow</h2>
          <div className="vignan-terracotta-stripe max-w-16 mx-auto mb-12 rounded-3xl" />
          <WorkflowTimeline />
        </div>
      </section>

      {/* Quick Access */}
      <section className="py-10 px-4 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-bold text-primary mb-5 text-center">Quick Access</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Course", options: ["Computer Networks", "Operating Systems", "Machine Learning", "DBMS", "Data Structures"] },
              { label: "Academic Year", options: ["2024–2025", "2023–2024", "2022–2023"] },
              { label: "Semester", options: ["Semester 1", "Semester 2"] },
            ].map((s) => (
              <div key={s.label} className="group bg-background rounded-3xl p-6 py-8 border border-border/50 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                  {s.label}
                </label>
                <select className="w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  {s.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="vignan-hero-gradient text-white py-8">
        <div className="max-w-3xl mx-auto text-center px-4">
          <img src={vignanLogo} alt="Vignan University" className="h-12 w-12 mx-auto mb-4 rounded-3xl shadow-xl ring-1 ring-white/40" />
          <p className="text-sm font-semibold">
            Vignan's Foundation for Science, Technology & Research
          </p>
          <p className="text-xs text-white/70 mt-1">
            Department of Computer Science and Engineering
          </p>
          <div className="vignan-terracotta-stripe max-w-20 mx-auto my-4 rounded-3xl" />
          <p className="text-xs text-white/60">
            AI-Based OBE Automation System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
