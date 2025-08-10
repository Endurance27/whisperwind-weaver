import { useState } from "react";
import { BarChart3, Users, FileText, Bot, Home, LogOut } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Influencers", url: "/influencers", icon: Users },
  { title: "Generate Report", url: "/reports", icon: FileText },
  { title: "Tweet Classifier", url: "/classifier", icon: Bot },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-accent";

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log out.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sidebar
      className="bg-analytics-blue text-white"
      collapsible="icon"
    >
      <SidebarContent className="bg-analytics-blue">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-analytics-blue" />
            </div>
            {state === "expanded" && (
              <div>
                <h2 className="font-semibold text-sm">AI4InclusiveGh</h2>
                <p className="text-xs text-white/70">AI4InclusiveGh Analytics</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="pt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${getNavCls({ isActive })}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {state === "expanded" && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile at bottom */}
        <div className="mt-auto p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-analytics-orange rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            {state === "expanded" && (
              <div className="flex-1 text-sm">
                <p className="font-medium truncate">{user?.email || 'User'}</p>
                <p className="text-xs text-white/70">Account</p>
              </div>
            )}
          </div>
          {state === "expanded" && (
            <Button 
              onClick={handleLogout}
              variant="ghost" 
              size="sm" 
              className="w-full justify-start gap-2 text-white hover:bg-white/10 h-8"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
          {state === "collapsed" && (
            <Button 
              onClick={handleLogout}
              variant="ghost" 
              size="sm" 
              className="w-full p-2 text-white hover:bg-white/10 h-8"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}