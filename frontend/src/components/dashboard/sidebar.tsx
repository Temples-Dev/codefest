import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    name: "Data Window",
    href: "/data",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    ),
  },
  {
    name: "Payment Window",
    href: "/payment",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    name: "Report Window",
    href: "/report",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
];

export function DashboardSidebar() {
  return (
    <div className="w-64 h-screen fixed left-0 animate-slideRight">
      <div className="h-full flex flex-col bg-[rgb(var(--primary-white))] shadow-[4px_0_10px_rgba(0,0,0,0.1)] relative z-10">
        <div className="p-6 space-y-8">
          {/* Logo */}
          <div className="flex justify-center py-2">
            <div className="bg-[rgb(var(--primary-orange-brown))] p-4 rounded-xl shadow-lg">
              <Image
                src="/Logo_Worldskills_Ghana.png"
                alt="WorldSkills Ghana Logo"
                width={140}
                height={45}
                priority
                className="object-contain"
              />
            </div>
          </div>

          <Separator className="bg-[rgb(var(--primary-blue))] opacity-20" />

          {/* Navigation */}
          <nav className="space-y-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <div className="group">
                  <Button
                    className="w-full py-4 px-5 text-left rounded-xl transition-all duration-300 animate-fadeIn hover:translate-x-1 group flex items-center gap-4 bg-[rgb(var(--primary-white))] text-[rgb(var(--primary-blue))] shadow-md hover:shadow-lg border border-[rgb(var(--primary-blue))]/10"
                    style={{
                      fontFamily: "Arial",
                      fontSize: "14px",
                    }}
                  >
                    <div className="p-2 rounded-lg bg-[rgb(var(--primary-blue))] text-[rgb(var(--primary-white))] group-hover:bg-[rgb(var(--primary-orange-brown))] transition-colors">
                      {item.icon}
                    </div>
                    <span className="font-semibold">{item.name}</span>
                  </Button>
                </div>
              </Link>
            ))}

            <div className="pt-4">
              <Button
                className="w-full py-4 px-5 text-left rounded-xl transition-all duration-300 animate-fadeIn hover:translate-x-1 group flex items-center gap-4 bg-[rgb(var(--primary-orange-brown))] text-[rgb(var(--primary-white))] shadow-md hover:shadow-lg hover:bg-[rgb(var(--primary-orange-brown))]/90"
                style={{
                  fontFamily: "Arial",
                  fontSize: "14px",
                }}
              >
                <div className="p-2 rounded-lg bg-[rgb(var(--primary-white))] text-[rgb(var(--primary-orange-brown))]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                <span className="font-semibold">Close App</span>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
