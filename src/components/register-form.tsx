"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, UserPlus } from "lucide-react"

export function RegisterForm() {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    programme: "",
    academicYear: "",
    indexNo: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    alert("Registration successful! Please sign in.")
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 text-heading">Create Account</h2>
        <p className="text-gray-600">Join the HTU COMPSSA community</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4 max-h-96 overflow-y-auto pr-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
              First Name
            </Label>
            <Input
              id="firstName"
              value={registerData.firstName}
              onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
              className="h-10 border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="surname" className="text-sm font-medium text-gray-700">
              Surname
            </Label>
            <Input
              id="surname"
              value={registerData.surname}
              onChange={(e) => setRegisterData({ ...registerData, surname: e.target.value })}
              className="h-10 border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="regUsername" className="text-sm font-medium text-gray-700">
            Username
          </Label>
          <Input
            id="regUsername"
            value={registerData.username}
            onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
            className="h-10 border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            className="h-10 border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone
          </Label>
          <Input
            id="phone"
            value={registerData.phone}
            onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
            className="h-10 border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="programme" className="text-sm font-medium text-gray-700">
            Programme
          </Label>
          <Input
            id="programme"
            value={registerData.programme}
            onChange={(e) => setRegisterData({ ...registerData, programme: e.target.value })}
            className="h-10 border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20"
            placeholder="e.g., Computer Science"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="academicYear" className="text-sm font-medium text-gray-700">
              Academic Year
            </Label>
            <Input
              id="academicYear"
              value={registerData.academicYear}
              onChange={(e) => setRegisterData({ ...registerData, academicYear: e.target.value })}
              className="h-10 border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20"
              placeholder="e.g., 2023/2024"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="indexNo" className="text-sm font-medium text-gray-700">
              Index Number
            </Label>
            <Input
              id="indexNo"
              value={registerData.indexNo}
              onChange={(e) => setRegisterData({ ...registerData, indexNo: e.target.value })}
              className="h-10 border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20"
              placeholder="e.g., HTU/CS/2023/001"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="regPassword" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Input
              id="regPassword"
              type={showPassword ? "text" : "password"}
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              className="h-10 border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
              className="h-10 border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 bg-orange-brand hover:bg-orange-600 text-white font-medium mt-6"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating account...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Create Account
            </div>
          )}
        </Button>
      </form>
    </div>
  )
}
