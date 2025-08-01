"use client"
import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { Card, CardContent } from "@/components/ui/card"

export function AuthLayout() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8 p-8">
          <div className="text-center space-y-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Worldskills_Ghana-fINOXRsGnwZsFN6315sTSxo1zZlRUW.png"
              alt="WorldSkills Ghana Logo"
              className="mx-auto h-32 w-auto"
            />
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 text-heading">HTU COMPSSA</h1>
              <div className="w-24 h-1 bg-orange-brand mx-auto rounded-full"></div>
              <h2 className="text-2xl text-gray-700">Dues Management System</h2>
              <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                Streamline your departmental dues management with our comprehensive system designed for the Computer
                Science department at HTU.
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4 w-full max-w-sm">
            <div className="flex items-center space-x-3 text-gray-700">
              <div className="w-2 h-2 bg-orange-brand rounded-full"></div>
              <span className="text-sm">Student Data Management</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <div className="w-2 h-2 bg-blue-brand rounded-full"></div>
              <span className="text-sm">Payment Processing</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-700">
              <div className="w-2 h-2 bg-yellow-brand rounded-full"></div>
              <span className="text-sm">Comprehensive Reports</span>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="w-full max-w-md mx-auto">
          <Card className="bg-white pt-0 shadow-xl border-0">
            <CardContent className="p-0">
              {/* Tab Headers */}
              <div className="flex bg-gray-50 rounded-t-lg">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-4 px-6 text-sm font-medium rounded-tl-lg transition-all duration-200 ${
                    isLogin
                      ? "bg-white text-blue-brand border-b-2 border-blue-brand shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-4 px-6 text-sm font-medium rounded-tr-lg transition-all duration-200 ${
                    !isLogin
                      ? "bg-white text-blue-brand border-b-2 border-blue-brand shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-8">{isLogin ? <LoginForm /> : <RegisterForm />}</div>
            </CardContent>
          </Card>

          {/* Mobile Branding */}
          <div className="lg:hidden text-center mt-8 space-y-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo_Worldskills_Ghana-fINOXRsGnwZsFN6315sTSxo1zZlRUW.png"
              alt="WorldSkills Ghana Logo"
              className="mx-auto h-16 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 text-heading">HTU COMPSSA</h1>
              <p className="text-gray-600">Dues Management System</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
