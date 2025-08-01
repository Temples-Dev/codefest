import { Bell, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function DashboardNavbar() {
  return (
    <nav className="h-16 fixed top-0 right-0 left-64 z-20 bg-[rgb(var(--primary-white))] shadow-md px-8">
      <div className="h-full flex items-center justify-between">
        {/* Left side - WorldSkills Ghana Text */}
        <div>
          <h2
            className="text-[20px] font-bold"
            style={{
              fontFamily: "Arial",
              color: "rgb(5, 5, 137)",
            }}
          >
            WorldSkills Ghana
          </h2>
        </div>

        {/* Right side - Notification and Profile */}
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-[rgb(var(--primary-blue))]/5"
          >
            <Bell className="h-5 w-5 text-[rgb(var(--primary-blue))]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[rgb(var(--primary-orange-brown))] rounded-full" />
          </Button>

          <Separator orientation="vertical" className="h-8" />

          <Button
            variant="ghost"
            className="flex items-center gap-2 px-2 hover:bg-[rgb(var(--primary-blue))]/5"
          >
            <UserCircle className="h-6 w-6 text-[rgb(var(--primary-blue))]" />
            <span
              className="text-[14px] font-semibold"
              style={{
                fontFamily: "Arial",
                color: "rgb(5, 5, 137)",
              }}
            >
              Profile
            </span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
