import { BookOpen, FileText, HelpCircle, LogOut, LayoutDashboard, Library, CreditCard, User, Sparkles, Package } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Lesson Generator", url: "/dashboard/lessons", icon: BookOpen },
  { title: "Worksheet Generator", url: "/dashboard/worksheets", icon: FileText },
  { title: "Quiz Generator", url: "/dashboard/quizzes", icon: HelpCircle },
  { title: "Exit Ticket Generator", url: "/dashboard/exit-tickets", icon: LogOut },
  { title: "Exit Ticket Mega Pack", url: "/dashboard/exit-ticket-mega-pack", icon: Package },
  { title: "Lesson Library", url: "/dashboard/library", icon: Library },
  { title: "Pricing", url: "/dashboard/pricing", icon: CreditCard },
  { title: "Account", url: "/dashboard/account", icon: User },
];

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon">
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="h-4 w-4" />
        </div>
        {!collapsed && <span className="text-lg font-bold font-display text-foreground">TeachKit</span>}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium">
                      <item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          {!collapsed && "Log Out"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
