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
import { CreditCard, Search } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function PaymentPage() {
  const [user, setUser] = useState<any>(null)
  const [selectedStudent, setSelectedStudent] = useState("")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [payments, setPayments] = useState<any[]>([])
  const router = useRouter()

  const students = [
    { id: 1, indexNo: "HTU/CS/2023/001", name: "John Doe", duesAmount: 500, paidAmount: 300 },
    { id: 2, indexNo: "HTU/CS/2023/002", name: "Jane Smith", duesAmount: 500, paidAmount: 500 },
  ]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
    } else {
      setUser(JSON.parse(userData))
      // Load sample payment history
      setPayments([
        {
          id: 1,
          studentName: "John Doe",
          indexNo: "HTU/CS/2023/001",
          amount: 300,
          method: "Mobile Money",
          date: "2024-01-15",
          reference: "MM001234",
        },
      ])
    }
  }, [router])

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    const student = students.find((s) => s.id.toString() === selectedStudent)
    if (student && paymentAmount) {
      const payment = {
        id: payments.length + 1,
        studentName: student.name,
        indexNo: student.indexNo,
        amount: Number.parseFloat(paymentAmount),
        method: paymentMethod,
        date: new Date().toISOString().split("T")[0],
        reference: `PAY${Date.now()}`,
      }
      setPayments([...payments, payment])
      setSelectedStudent("")
      setPaymentAmount("")
      setPaymentMethod("")
      alert("Payment recorded successfully!")
    }
  }

  const canProcessPayments = user?.role === "Administrator" || user?.role === "Cashier"

  if (!user) return null

  return (
    <DashboardLayout user={user}>
      <div className="p-6 space-y-6">
        <div className="bg-blue-brand rounded-xl p-6 text-white shadow-brand-lg">
          <h1 className="text-3xl font-bold text-heading mb-2">Payment Management</h1>
          <p className="text-lg text-white/90">Process payments and track dues</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {canProcessPayments && (
            <Card className="bg-white pt-0">
              <CardHeader className="bg-blue-brand text-white">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Process Payment
                </CardTitle>
                <CardDescription className="text-blue-100">Record a new payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student">Select Student</Label>
                    <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a student" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.id.toString()}>
                            {student.name} ({student.indexNo}) - Outstanding: ₵{student.duesAmount - student.paidAmount}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Payment Amount (₵)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="method">Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Cheque">Cheque</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800">
                    Record Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <Card className="bg-white pt-0">
            <CardHeader className="bg-orange-brand text-white">
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Student Dues Status
              </CardTitle>
              <CardDescription className="text-orange-100">View outstanding dues</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="search">Search Student</Label>
                <Input
                  id="search"
                  placeholder="Enter name or index number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                {students
                  .filter(
                    (student) =>
                      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      student.indexNo.toLowerCase().includes(searchTerm.toLowerCase()),
                  )
                  .map((student) => (
                    <div key={student.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{student.name}</p>
                          <p className="text-sm text-gray-600">{student.indexNo}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">Total Dues: ₵{student.duesAmount}</p>
                          <p className="text-sm">Paid: ₵{student.paidAmount}</p>
                          <p
                            className={`text-sm font-semibold ${
                              student.paidAmount >= student.duesAmount ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            Outstanding: ₵{student.duesAmount - student.paidAmount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white pt-0 mt-6">
          <CardHeader className="bg-yellow-brand text-white">
            <CardTitle>Payment History</CardTitle>
            <CardDescription className="text-yellow-100">Recent payment transactions</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Index No</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell className="font-medium">{payment.studentName}</TableCell>
                      <TableCell>{payment.indexNo}</TableCell>
                      <TableCell>₵{payment.amount}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell className="font-mono text-sm">{payment.reference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
