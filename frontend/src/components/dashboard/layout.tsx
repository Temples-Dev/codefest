import { DashboardSidebar } from "./sidebar";
import { DashboardNavbar } from "./navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(var(--primary-yellow))] to-[rgb(var(--primary-yellow))]/90">
      <DashboardSidebar />
      <DashboardNavbar />
      <main className="pl-64 pr-8 pt-24 pb-8 animate-fadeIn">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
