import { Upload, BookOpen, FileQuestion, ClipboardList, BarChart3, FileDown } from "lucide-react";

const steps = [
  { icon: Upload, label: "Upload Syllabus", num: 1 },
  { icon: BookOpen, label: "Generate CO", num: 2 },
  { icon: FileQuestion, label: "Map Questions", num: 3 },
  { icon: ClipboardList, label: "Upload Marks", num: 4 },
  { icon: BarChart3, label: "View Attainment", num: 5 },
  { icon: FileDown, label: "Download Reports", num: 6 },
];

const WorkflowTimeline = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0">
    {steps.map((step, i) => (
      <div key={step.num} className="flex items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
              <step.icon className="h-5 w-5" />
            </div>
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-bold">
              {step.num}
            </span>
          </div>
          <span className="text-xs font-medium text-foreground text-center w-20">
            {step.label}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div className="hidden sm:block w-8 h-0.5 bg-secondary mx-1 mt-[-20px]" />
        )}
      </div>
    ))}
  </div>
);

export default WorkflowTimeline;
