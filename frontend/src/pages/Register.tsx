import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, User, Building2, IdCard } from "lucide-react";
import vignanLogo from "@/assets/vignan-logo.png";

type Role = "faculty" | "hod" | "dean" | "admin";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [role, setRole] = useState<Role>("faculty");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill name, email, and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          department,
          employeeId,
          role,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Registration failed");
      }
      localStorage.setItem("obe_token", data.token);
      localStorage.setItem("obe_user", JSON.stringify(data.user));
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex flex-col justify-center items-center flex-1 px-12">
        <img src={vignanLogo} alt="Vignan University" className="h-60 w-100 mb-6" />
        <p className="text-xs text-secondary font-semibold font-display tracking-wide uppercase mt-4">
          AI-Based OBE Attainment System
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-20">
        <div className="w-full max-w-md bg-card rounded-lg shadow-md border border-border p-8">
          <div className="lg:hidden flex flex-col items-center mb-6">
            <img src={vignanLogo} alt="Vignan" className="h-14 w-14 mb-2" />
            <p className="text-base font-bold text-primary text-center">
              Vignan CSE OBE Platform
            </p>
          </div>

          <h2 className="text-xl font-bold text-foreground mb-1">Create Account</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Register to access the OBE analytics platform
          </p>

          <div className="flex gap-2 mb-6">
            {(["faculty", "hod", "dean", "admin"] as Role[]).map((r) => (
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
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium mb-1.5 block">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Dr. Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-11 text-base"
                />
              </div>
            </div>

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
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 text-base"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="department" className="text-sm font-medium mb-1.5 block">
                Department
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="department"
                  placeholder="Computer Science"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="pl-10 h-11 text-base"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="employeeId" className="text-sm font-medium mb-1.5 block">
                Employee ID
              </Label>
              <div className="relative">
                <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="employeeId"
                  placeholder="FAC001"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="pl-10 h-11 text-base"
                />
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
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Already have an account?{" "}
            <button className="text-primary font-semibold" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
