"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Save } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function AddStudentPage() {
  const [user, setUser] = useState<any>(null)
  const [newStudent, setNewStudent] = useState({
    indexNo: "",
    firstName: "",
    surname: "",
    programme: "",
    phone: "",
    email: "",
    position: "Student",
    academicYear: "",
    duesAmount: "",
    startDate: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      const parsedUser = JSON.parse(userData)
      const canEdit =
        parsedUser.role === "Administrator" || parsedUser.role === "Supervisor" || parsedUser.role === "Cashier"

      if (!canEdit) {
        router.push("/data")
        return
      }

      setUser(parsedUser)
    }
  }, [router])

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would save to database here
    alert("Student added successfully!")

    setIsLoading(false)
    router.push("/data")
  }

  const handleCancel = () => {
    router.push("/data")
  }

  if (!user) return null

  return (
    <DashboardLayout user={user}>
      <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="bg-green-600 rounded-xl p-4 sm:p-6 text-white shadow-brand-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Button variant="ghost" size="sm" onClick={handleCancel} className="text-white hover:bg-white/20 p-2">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl sm:text-3xl font-bold text-heading">Add New Student</h1>
              </div>
              <p className="text-sm sm:text-lg text-white/90">Enter details for a new student registration</p>
            </div>
            <div className="bg-white/20 rounded-full p-3 sm:p-4">
              <Plus className="h-8 sm:h-10 lg:h-12 w-8 sm:w-10 lg:w-12 text-white" />
            </div>
          </div>
        </div>

        {/* Add Student Form */}
        <Card className="bg-white pt-0 shadow-brand">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-sm sm:text-base">Student Information</CardTitle>
            <CardDescription className="text-green-100 text-xs sm:text-sm">
              Fill in all required fields to register a new student
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleAddStudent} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="indexNo" className="text-sm font-medium text-gray-700">
                    Index Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="indexNo"
                    placeholder="e.g., HTU/CS/2024/001"
                    value={newStudent.indexNo}
                    onChange={(e) => setNewStudent({ ...newStudent, indexNo: e.target.value })}
                    className="border-gray-300 focus:border-green-600 focus:ring-green-600/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    value={newStudent.firstName}
                    onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                    className="border-gray-300 focus:border-green-600 focus:ring-green-600/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="surname" className="text-sm font-medium text-gray-700">
                    Surname <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="surname"
                    placeholder="Enter surname"
                    value={newStudent.surname}
                    onChange={(e) => setNewStudent({ ...newStudent, surname: e.target.value })}
                    className="border-gray-300 focus:border-green-600 focus:ring-green-600/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="programme" className="text-sm font-medium text-gray-700">
                    Programme <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={newStudent.programme}
                    onValueChange={(value) => setNewStudent({ ...newStudent, programme: value })}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-green-600 focus:ring-green-600/20">
                      <SelectValue placeholder="Select programme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Information Technology">Information Technology</SelectItem>
                      <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                      <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="e.g., 0244123456"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    className="border-gray-300 focus:border-green-600 focus:ring-green-600/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@htu.edu.gh"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    className="border-gray-300 focus:border-green-600 focus:ring-green-600/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position" className="text-sm font-medium text-gray-700">
                    Position
                  </Label>
                  <Select
                    value={newStudent.position}
                    onValueChange={(value) => setNewStudent({ ...newStudent, position: value })}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-green-600 focus:ring-green-600/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Class Rep">Class Rep</SelectItem>
                      <SelectItem value="Course Rep">Course Rep</SelectItem>
                      <SelectItem value="Executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="academicYear" className="text-sm font-medium text-gray-700">
                    Academic Year <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={newStudent.academicYear}
                    onValueChange={(value) => setNewStudent({ ...newStudent, academicYear: value })}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-green-600 focus:ring-green-600/20">
                      <SelectValue placeholder="Select academic year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024/2025">2024/2025</SelectItem>
                      <SelectItem value="2023/2024">2023/2024</SelectItem>
                      <SelectItem value="2022/2023">2022/2023</SelectItem>
                      <SelectItem value="2021/2022">2021/2022</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duesAmount" className="text-sm font-medium text-gray-700">
                    Dues Amount (₵) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="duesAmount"
                    type="number"
                    step="0.01"
                    placeholder="500.00"
                    value={newStudent.duesAmount}
                    onChange={(e) => setNewStudent({ ...newStudent, duesAmount: e.target.value })}
                    className="border-gray-300 focus:border-green-600 focus:ring-green-600/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                    Start Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newStudent.startDate}
                    onChange={(e) => setNewStudent({ ...newStudent, startDate: e.target.value })}
                    className="border-gray-300 focus:border-green-600 focus:ring-green-600/20"
                    required
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 flex-1 sm:flex-none"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Adding Student...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Add Student
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
