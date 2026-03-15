import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DepartmentSidebar } from "@/components/DepartmentSidebar";
import CSENavbar from "@/components/CSENavbar";
import VignanLoader from "@/components/VignanLoader";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import UploadSyllabus from "./UploadSyllabus";
import GenerateCO from "./GenerateCO";
import QuestionMapping from "./QuestionMapping";
import MarksUpload from "./MarksUpload";
import AttainmentDashboard from "./AttainmentDashboard";
import OBEChatbot from "./OBEChatbot";
import Reports from "./Reports";
import { MessageCircle } from "lucide-react";

const Layout = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <VignanLoader onComplete={() => setLoading(false)} />;
  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route
        path="*"
        element={
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <DepartmentSidebar />
              <div className="flex-1 flex flex-col min-w-0">
                <CSENavbar />
                <main className="flex-1 overflow-auto">
                  <Suspense fallback={<div className="flex h-full items-center justify-center p-8">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary shadow-sm animate-spin" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-primary mb-2">Loading Dashboard</h3>
                        <p className="text-muted-foreground text-sm">Please wait while we prepare your modules...</p>
                      </div>
                    </div>}>
                    <Routes>
                      <Route index element={<Home />} />
                      <Route path="upload-syllabus" element={<UploadSyllabus />} />
                      <Route path="generate-co" element={<GenerateCO />} />
                      <Route path="question-mapping" element={<QuestionMapping />} />
                      <Route path="marks-upload" element={<MarksUpload />} />
                      <Route path="dashboard" element={<AttainmentDashboard />} />
                      <Route path="reports" element={<Reports />} />
                      <Route path="chatbot" element={<OBEChatbot />} />
                      <Route path="settings" element={<div className="p-8 text-muted-foreground">Settings page — coming soon.</div>} />
                    </Routes>
                  </Suspense>
                </main>
                <a href="https://wa.me/9490339137" className="whatsapp-fab" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-2 w-2" />
                  Message Us
                </a>
              </div>
            </div>
          </SidebarProvider>
        }
      />
    </Routes>
  );
};

export default Layout;
