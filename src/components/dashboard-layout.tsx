"use client"

import type React from "react"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Users, CreditCard, FileText, LogOut, Menu, X, Home, Database, User } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  user?: any
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const navigation = [
    { name: "Dashboard", href: "/control", icon: Home },
    { name: "Student Data", href: "/data", icon: Users },
    { name: "Payments", href: "/payment", icon: CreditCard },
    { name: "Reports", href: "/reports", icon: FileText },
    { name: "Profile", href: "/profile", icon: User },
    ...(user?.role === "Administrator" ? [{ name: "Admin Panel", href: "/admin", icon: Database }] : []),
  ]

  return (
    <div className="min-h-screen bg-gray-50 font-arial flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex lg:flex-col border-r border-gray-200`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Worldskills_Ghana-fINOXRsGnwZsFN6315sTSxo1zZlRUW.png"
                alt="WorldSkills Ghana Logo"
                className="h-6 sm:h-8 w-auto flex-shrink-0"
              />
              <div className="min-w-0">
                <h1 className="text-sm sm:text-lg font-bold text-gray-900 text-heading truncate">HTU COMPSSA</h1>
                <p className="text-xs text-gray-500 truncate">Dues Management</p>
              </div>
            </div>
            <button
              type="button"
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 flex-shrink-0"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 sm:px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.href)
                    setSidebarOpen(false)
                  }}
                  className={`${
                    isActive
                      ? "bg-blue-brand text-white shadow-sm"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  } group flex items-center px-2 sm:px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 w-full text-left`}
                >
                  <item.icon
                    className={`${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-gray-600"
                    } mr-2 sm:mr-3 flex-shrink-0 h-4 sm:h-5 w-4 sm:w-5 transition-colors duration-200`}
                  />
                  <span className="truncate">{item.name}</span>
                </button>
              )
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-3 sm:p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3">
              <div className="w-6 sm:w-8 h-6 sm:h-8 bg-orange-brand rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs sm:text-sm font-medium">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{user?.username}</p>
                <p className="text-xs text-gray-500 truncate">{user?.role}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent text-xs sm:text-sm"
            >
              <LogOut className="h-3 sm:h-4 w-3 sm:w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-3 sm:px-4 lg:px-6 xl:px-8">
            <div className="flex justify-between h-14 sm:h-16">
              <div className="flex items-center">
                <button
                  type="button"
                  className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-brand transition-colors duration-200"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Menu className="h-5 sm:h-6 w-5 sm:w-6" />
                </button>

                <div className="lg:hidden flex items-center ml-3 sm:ml-4 min-w-0">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Worldskills_Ghana-fINOXRsGnwZsFN6315sTSxo1zZlRUW.png"
                    alt="WorldSkills Ghana Logo"
                    className="h-6 sm:h-8 w-auto mr-2 sm:mr-3 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h1 className="text-sm sm:text-lg font-bold text-gray-900 text-heading truncate">HTU COMPSSA</h1>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="hidden sm:block text-right">
                  <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{user?.username}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.role}</p>
                </div>
                <div className="w-6 sm:w-8 h-6 sm:h-8 bg-orange-brand rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm font-medium">
                    {user?.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
