import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import vignanLogo from "@/assets/vignan-logo.png";

const CSENavbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-md shadow-sm">
      <div className="vignan-terracotta-stripe" />
      <div className="px-6 py-4 flex items-center justify-between gap-6">
        {/* Left — Branding */}
        <div className="flex items-center gap-6">
          <img src={vignanLogo} alt="Vignan University" className="h-20 w-50 " />
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-primary leading-tight tracking-tight text-align-center">
              OBE Platform
            </h1>
            <p className="text-xs text-muted-foreground">
              Department of Computer Science & Engineering
            </p>
          </div>
        </div>


        {/* Right — Faculty */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="text-right">
              <span className="text-sm font-medium block">Faculty</span>
              <span className="text-xs text-muted-foreground">CSE Dept.</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive h-9 w-9"
            onClick={() => navigate("/login")}
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default CSENavbar;
