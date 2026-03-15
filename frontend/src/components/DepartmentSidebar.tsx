import {
  BookOpen, Upload, FileQuestion, ClipboardList, BarChart3, Bot, Home, Settings, FileDown
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Upload Syllabus", url: "/upload-syllabus", icon: Upload },
  { title: "CO Generator", url: "/generate-co", icon: BookOpen },
  { title: "Question Mapper", url: "/question-mapping", icon: FileQuestion },
  { title: "Marks Upload", url: "/marks-upload", icon: ClipboardList },
  { title: "Attainment Dashboard", url: "/dashboard", icon: BarChart3 },
  { title: "Reports", url: "/reports", icon: FileDown },
];

const toolItems = [
  { title: "OBE Assistant", url: "/chatbot", icon: Bot },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function DepartmentSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const renderGroup = (label: string, items: typeof mainItems) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider font-semibold">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  end
                  className="group hover:bg-sidebar-accent/70 active:bg-sidebar-primary rounded-xl px-4 py-3 transition-all flex items-center gap-3 data-[state=open]:bg-sidebar-accent"
                  activeClassName="bg-sidebar-secondary text-sidebar-primary font-semibold shadow-sm rounded-xl ring-1 ring-sidebar-primary/50"
                >
                  <item.icon className="mr-2.5 h-4 w-4" />
                  {!collapsed && <span className="text-sm">{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="bg-sidebar pt-4">
        {renderGroup("OBE Workflow", mainItems)}
        {renderGroup("Tools", toolItems)}
      </SidebarContent>
    </Sidebar>
  );
}
