"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, BarChart3, FileText } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function ReportsPage() {
  const [user, setUser] = useState<any>(null)
  const [reportType, setReportType] = useState("summary")
  const router = useRouter()

  const reportData = {
    summary: {
      totalStudents: 150,
      totalDues: 75000,
      totalPaid: 45000,
      outstanding: 30000,
      paymentRate: 60,
    },
    byProgramme: [
      { programme: "Computer Science", students: 80, paid: 25000, outstanding: 15000 },
      { programme: "Information Technology", students: 45, paid: 15000, outstanding: 10000 },
      { programme: "Software Engineering", students: 25, paid: 5000, outstanding: 5000 },
    ],
    byYear: [
      { year: "2023/2024", students: 60, paid: 20000, outstanding: 10000 },
      { year: "2022/2023", students: 50, paid: 15000, outstanding: 10000 },
      { year: "2021/2022", students: 40, paid: 10000, outstanding: 10000 },
    ],
    defaulters: [
      { name: "John Doe", indexNo: "HTU/CS/2023/001", programme: "Computer Science", outstanding: 200 },
      { name: "Alice Johnson", indexNo: "HTU/IT/2023/015", programme: "Information Technology", outstanding: 500 },
    ],
  }

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleExport = () => {
    alert("Report exported successfully!")
  }

  if (!user) return null

  return (
    <DashboardLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="bg-yellow-brand rounded-xl p-6 text-black shadow-brand-lg">
          <h1 className="text-3xl font-bold text-heading mb-2">Reports & Analytics</h1>
          <p className="text-lg text-black/80">Generate comprehensive reports and insights</p>
        </div>

        <div className="mb-6">
          <Card className="bg-white pt-0">
            <CardHeader className="bg-yellow-brand text-white">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Report Generator
              </CardTitle>
              <CardDescription className="text-yellow-100">Select report type and generate insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center gap-4">
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary Report</SelectItem>
                    <SelectItem value="programme">By Programme</SelectItem>
                    <SelectItem value="year">By Academic Year</SelectItem>
                    <SelectItem value="defaulters">Defaulters Report</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleExport} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {reportType === "summary" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="bg-white pt-0">
              <CardHeader className="bg-blue-brand text-white">
                <CardTitle className="text-lg">Total Students</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-blue-900">{reportData.summary.totalStudents}</p>
              </CardContent>
            </Card>

            <Card className="bg-white pt-0">
              <CardHeader className="bg-orange-brand text-white">
                <CardTitle className="text-lg">Total Dues</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-orange-600">₵{reportData.summary.totalDues.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="bg-white pt-0">
              <CardHeader className="bg-green-600 text-white">
                <CardTitle className="text-lg">Total Paid</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-green-600">₵{reportData.summary.totalPaid.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="bg-white pt-0">
              <CardHeader className="bg-red-600 text-white">
                <CardTitle className="text-lg">Outstanding</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-3xl font-bold text-red-600">₵{reportData.summary.outstanding.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>
        )}

        {reportType === "programme" && (
          <Card className="bg-white pt-0">
            <CardHeader className="bg-orange-brand text-white">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Dues by Programme
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Programme</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Amount Paid</TableHead>
                    <TableHead>Outstanding</TableHead>
                    <TableHead>Payment Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.byProgramme.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.programme}</TableCell>
                      <TableCell>{item.students}</TableCell>
                      <TableCell>₵{item.paid.toLocaleString()}</TableCell>
                      <TableCell>₵{item.outstanding.toLocaleString()}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            (item.paid / (item.paid + item.outstanding)) * 100 > 70
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {Math.round((item.paid / (item.paid + item.outstanding)) * 100)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {reportType === "year" && (
          <Card className="bg-white pt-0">
            <CardHeader className="bg-blue-brand text-white">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Dues by Academic Year
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Academic Year</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Amount Paid</TableHead>
                    <TableHead>Outstanding</TableHead>
                    <TableHead>Payment Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.byYear.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.year}</TableCell>
                      <TableCell>{item.students}</TableCell>
                      <TableCell>₵{item.paid.toLocaleString()}</TableCell>
                      <TableCell>₵{item.outstanding.toLocaleString()}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            (item.paid / (item.paid + item.outstanding)) * 100 > 70
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {Math.round((item.paid / (item.paid + item.outstanding)) * 100)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {reportType === "defaulters" && (
          <Card className="bg-white pt-0">
            <CardHeader className="bg-red-600 text-white">
              <CardTitle>Defaulters Report</CardTitle>
              <CardDescription className="text-red-100">Students with outstanding dues</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Index Number</TableHead>
                    <TableHead>Programme</TableHead>
                    <TableHead>Outstanding Amount</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.defaulters.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.indexNo}</TableCell>
                      <TableCell>{student.programme}</TableCell>
                      <TableCell className="text-red-600 font-semibold">₵{student.outstanding}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Send Reminder
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
