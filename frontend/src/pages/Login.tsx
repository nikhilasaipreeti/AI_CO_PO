import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import vignanLogo from "@/assets/vignan-logo.png";

type Role = "faculty" | "coordinator";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("faculty");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Login failed");
      }
      localStorage.setItem("obe_token", data.token);
      localStorage.setItem("obe_user", JSON.stringify(data.user));
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left branding panel */}
      <div className="hidden lg:flex flex-col justify-center items-center flex-1 px-12">
        <img src={vignanLogo} alt="Vignan University" className="h-60 w-100 mb-6" />
        <p className="text-xs text-secondary font-semibold font-display tracking-wide uppercase mt-4">
          AI-Based OBE Attainment System
        </p>
      </div>

      {/* Right login form */}
      <div className="flex-1 flex items-center justify-center p-20">
        <div className="w-full max-w-md bg-card rounded-lg shadow-md border border-border p-8">
          {/* Mobile logo */}
          <div className="lg:hidden flex flex-col items-center mb-6">
            <img src={vignanLogo} alt="Vignan" className="h-14 w-14 mb-2" />
            <p className="text-base font-bold text-primary text-center">
              Vignan CSE OBE Platform
            </p>
          </div>

          <h2 className="text-xl font-bold text-foreground mb-1">Faculty Login</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Sign in to access the OBE analytics platform
          </p>

          {/* Role selector */}
          <div className="flex gap-2 mb-6">
            {(["faculty", "coordinator"] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  role === r
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {r === "faculty" ? "Faculty" : "Coordinator"}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium mb-1.5 block">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="faculty@vignan.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 text-base"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium mb-1.5 block">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-base font-semibold"
            >
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Don't have an account?{" "}
            <button className="text-primary font-semibold" onClick={() => navigate("/register")}>
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
