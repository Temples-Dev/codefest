"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Upload, Search, Plus, Edit, ChevronLeft, ChevronRight, Users } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function DataPage() {
  const [user, setUser] = useState<any>(null)
  const [students, setStudents] = useState<any[]>([])
  const [filteredStudents, setFilteredStudents] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [programmeFilter, setProgrammeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [studentsPerPage] = useState(10)
  const router = useRouter()

  // Sample student data
  const sampleStudents = [
    {
      id: 1,
      indexNo: "HTU/CS/2023/001",
      firstName: "John",
      surname: "Doe",
      programme: "Computer Science",
      phone: "0244123456",
      email: "john.doe@htu.edu.gh",
      position: "Student",
      academicYear: "2023/2024",
      duesAmount: 500,
      startDate: "2023-09-01",
      paidAmount: 300,
    },
    {
      id: 2,
      indexNo: "HTU/CS/2023/002",
      firstName: "Jane",
      surname: "Smith",
      programme: "Computer Science",
      phone: "0244654321",
      email: "jane.smith@htu.edu.gh",
      position: "Class Rep",
      academicYear: "2023/2024",
      duesAmount: 500,
      startDate: "2023-09-01",
      paidAmount: 500,
    },
    {
      id: 3,
      indexNo: "HTU/IT/2023/001",
      firstName: "Alice",
      surname: "Johnson",
      programme: "Information Technology",
      phone: "0244789012",
      email: "alice.johnson@htu.edu.gh",
      position: "Student",
      academicYear: "2023/2024",
      duesAmount: 500,
      startDate: "2023-09-01",
      paidAmount: 250,
    },
    {
      id: 4,
      indexNo: "HTU/SE/2023/001",
      firstName: "Bob",
      surname: "Wilson",
      programme: "Software Engineering",
      phone: "0244345678",
      email: "bob.wilson@htu.edu.gh",
      position: "Course Rep",
      academicYear: "2023/2024",
      duesAmount: 500,
      startDate: "2023-09-01",
      paidAmount: 0,
    },
    {
      id: 5,
      indexNo: "HTU/CS/2022/001",
      firstName: "Carol",
      surname: "Brown",
      programme: "Computer Science",
      phone: "0244901234",
      email: "carol.brown@htu.edu.gh",
      position: "Student",
      academicYear: "2022/2023",
      duesAmount: 450,
      startDate: "2022-09-01",
      paidAmount: 450,
    },
  ]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
      setStudents(sampleStudents)
      setFilteredStudents(sampleStudents)
    }
  }, [router])

  // Filter and search logic
  useEffect(() => {
    const filtered = students.filter((student) => {
      const matchesSearch =
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.indexNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesProgramme = programmeFilter === "all" || student.programme === programmeFilter
      const matchesYear = yearFilter === "all" || student.academicYear === yearFilter

      let matchesStatus = true
      if (statusFilter === "paid") {
        matchesStatus = student.paidAmount >= student.duesAmount
      } else if (statusFilter === "outstanding") {
        matchesStatus = student.paidAmount < student.duesAmount
      }

      return matchesSearch && matchesProgramme && matchesYear && matchesStatus
    })

    setFilteredStudents(filtered)
    setCurrentPage(1)
  }, [searchTerm, programmeFilter, statusFilter, yearFilter, students])

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Simulate CSV processing
      alert("CSV file uploaded successfully! Data will be processed and imported.")
      // Reset the input
      event.target.value = ""
    }
  }

  const handleImportClick = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".csv"
    input.onchange = handleCSVUpload
    input.click()
  }

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)

  const canEdit = user?.role === "Administrator" || user?.role === "Supervisor" || user?.role === "Cashier"

  // Get unique values for filters
  const programmes = [...new Set(students.map((s) => s.programme))]
  const academicYears = [...new Set(students.map((s) => s.academicYear))]

  if (!user) return null

  return (
    <DashboardLayout user={user}>
      <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="bg-orange-brand rounded-xl p-4 sm:p-6 text-white shadow-brand-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-heading mb-2">Student Data Management</h1>
              <p className="text-sm sm:text-lg text-white/90">Manage student information and records</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {canEdit && (
                <>
                  <div className="relative group">
                    <Button
                      onClick={handleImportClick}
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30 flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Import Data
                    </Button>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                      <div className="text-center">
                        <div className="font-semibold mb-1">CSV Format Required:</div>
                        <div>Index No, First Name, Surname, Programme,</div>
                        <div>Phone, Email, Position, Academic Year,</div>
                        <div>Dues Amount, Start Date</div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                  <Button
                    onClick={() => router.push("/data/add")}
                    className="bg-yellow-brand hover:bg-yellow-400 text-black flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Student
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white pt-0 shadow-brand">
          <CardHeader className="bg-blue-brand text-white">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Search className="h-4 sm:h-5 w-4 sm:w-5" />
              Search & Filter Students
            </CardTitle>
            <CardDescription className="text-blue-100 text-xs sm:text-sm">
              Find students using various criteria
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search" className="text-sm font-medium text-gray-700">
                  Search
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Name, index no, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Programme</Label>
                <Select value={programmeFilter} onValueChange={setProgrammeFilter}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programmes</SelectItem>
                    {programmes.map((programme) => (
                      <SelectItem key={programme} value={programme}>
                        {programme}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Academic Year</Label>
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {academicYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Payment Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-brand focus:ring-blue-brand/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="outstanding">Outstanding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  Showing {currentStudents.length} of {filteredStudents.length} students
                  {filteredStudents.length !== students.length && ` (filtered from ${students.length} total)`}
                </span>
              </div>
              {(searchTerm || programmeFilter !== "all" || statusFilter !== "all" || yearFilter !== "all") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("")
                    setProgrammeFilter("all")
                    setStatusFilter("all")
                    setYearFilter("all")
                  }}
                  className="text-xs"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card className="bg-white pt-0 shadow-brand">
          <CardHeader className="bg-orange-brand text-white">
            <CardTitle className="text-sm sm:text-base">Student Records</CardTitle>
            <CardDescription className="text-orange-100 text-xs sm:text-sm">
              Complete list of registered students
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">Index No</TableHead>
                    <TableHead className="font-semibold text-gray-900">Name</TableHead>
                    <TableHead className="font-semibold text-gray-900">Programme</TableHead>
                    <TableHead className="font-semibold text-gray-900">Position</TableHead>
                    <TableHead className="font-semibold text-gray-900">Academic Year</TableHead>
                    <TableHead className="font-semibold text-gray-900">Contact</TableHead>
                    <TableHead className="font-semibold text-gray-900">Dues</TableHead>
                    <TableHead className="font-semibold text-gray-900">Status</TableHead>
                    {canEdit && <TableHead className="font-semibold text-gray-900">Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentStudents.length > 0 ? (
                    currentStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-gray-50 transition-colors">
                        <TableCell className="font-medium text-blue-brand">{student.indexNo}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">
                              {student.firstName} {student.surname}
                            </div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700">{student.programme}</TableCell>
                        <TableCell>
                          <Badge
                            variant={student.position === "Student" ? "secondary" : "default"}
                            className={
                              student.position === "Student" ? "bg-gray-100 text-gray-800" : "bg-blue-100 text-blue-800"
                            }
                          >
                            {student.position}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700">{student.academicYear}</TableCell>
                        <TableCell className="text-sm text-gray-600">{student.phone}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="text-gray-900">₵{student.duesAmount}</div>
                            <div className="text-green-600">Paid: ₵{student.paidAmount}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={student.paidAmount >= student.duesAmount ? "default" : "destructive"}
                            className={
                              student.paidAmount >= student.duesAmount
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-red-100 text-red-800 hover:bg-red-200"
                            }
                          >
                            {student.paidAmount >= student.duesAmount ? "Paid" : "Outstanding"}
                          </Badge>
                        </TableCell>
                        {canEdit && (
                          <TableCell>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={canEdit ? 9 : 8} className="text-center py-8 text-gray-500">
                        No students found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="h-8 w-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
