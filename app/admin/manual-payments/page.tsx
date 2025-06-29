"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BackButton } from "@/components/back-button"
import { Search, CheckCircle, XCircle, Clock, Eye, User, CreditCard, Calendar } from "lucide-react"

interface ManualPayment {
  userId: string
  userName: string
  userEmail: string
  packageId: number
  packageName: string
  amount: number
  mpesaCode: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  processedAt?: string
  adminNotes?: string
}

export default function ManualPaymentsPage() {
  const [payments, setPayments] = useState<ManualPayment[]>([])
  const [filteredPayments, setFilteredPayments] = useState<ManualPayment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedPayment, setSelectedPayment] = useState<ManualPayment | null>(null)

  useEffect(() => {
    // Load payments from localStorage (in real app, fetch from API)
    const storedPayments = JSON.parse(localStorage.getItem("manual-payments") || "[]")
    setPayments(storedPayments)
    setFilteredPayments(storedPayments)
  }, [])

  useEffect(() => {
    let filtered = payments

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (payment) =>
          payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.mpesaCode.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((payment) => payment.status === statusFilter)
    }

    setFilteredPayments(filtered)
  }, [payments, searchTerm, statusFilter])

  const handleApprove = (paymentIndex: number, notes?: string) => {
    const updatedPayments = [...payments]
    updatedPayments[paymentIndex] = {
      ...updatedPayments[paymentIndex],
      status: "approved",
      processedAt: new Date().toISOString(),
      adminNotes: notes,
    }
    setPayments(updatedPayments)
    localStorage.setItem("manual-payments", JSON.stringify(updatedPayments))
  }

  const handleReject = (paymentIndex: number, notes?: string) => {
    const updatedPayments = [...payments]
    updatedPayments[paymentIndex] = {
      ...updatedPayments[paymentIndex],
      status: "rejected",
      processedAt: new Date().toISOString(),
      adminNotes: notes,
    }
    setPayments(updatedPayments)
    localStorage.setItem("manual-payments", JSON.stringify(updatedPayments))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-600 text-white">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="secondary" className="bg-green-600 text-white">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="secondary" className="bg-red-600 text-white">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  const stats = {
    total: payments.length,
    pending: payments.filter((p) => p.status === "pending").length,
    approved: payments.filter((p) => p.status === "approved").length,
    rejected: payments.filter((p) => p.status === "rejected").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900 via-yellow-800 to-amber-900">
      <div className="container mx-auto px-4 py-8">
        <BackButton />

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-yellow-400 mb-2">Manual Payment Management</h1>
          <p className="text-yellow-300">Review and approve M-Pesa payment submissions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-yellow-900/20 border-yellow-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.total}</div>
              <div className="text-yellow-300 text-sm">Total Payments</div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-900/20 border-yellow-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
              <div className="text-yellow-300 text-sm">Pending</div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-900/20 border-yellow-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{stats.approved}</div>
              <div className="text-yellow-300 text-sm">Approved</div>
            </CardContent>
          </Card>
          <Card className="bg-yellow-900/20 border-yellow-700">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{stats.rejected}</div>
              <div className="text-yellow-300 text-sm">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-yellow-900/20 border-yellow-700 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 w-4 h-4" />
                  <Input
                    placeholder="Search by name, email, or M-Pesa code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-yellow-900/30 border-yellow-700 text-yellow-300 placeholder-yellow-500"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                  className="text-yellow-300 border-yellow-700"
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  onClick={() => setStatusFilter("pending")}
                  className="text-yellow-300 border-yellow-700"
                >
                  Pending
                </Button>
                <Button
                  variant={statusFilter === "approved" ? "default" : "outline"}
                  onClick={() => setStatusFilter("approved")}
                  className="text-yellow-300 border-yellow-700"
                >
                  Approved
                </Button>
                <Button
                  variant={statusFilter === "rejected" ? "default" : "outline"}
                  onClick={() => setStatusFilter("rejected")}
                  className="text-yellow-300 border-yellow-700"
                >
                  Rejected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payments List */}
        <div className="space-y-4">
          {filteredPayments.length === 0 ? (
            <Card className="bg-yellow-900/20 border-yellow-700">
              <CardContent className="p-8 text-center">
                <div className="text-yellow-400 text-lg">No payments found</div>
                <div className="text-yellow-300 text-sm">No payment submissions match your current filters</div>
              </CardContent>
            </Card>
          ) : (
            filteredPayments.map((payment, index) => (
              <Card key={index} className="bg-yellow-900/20 border-yellow-700">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-4 h-4 text-yellow-400" />
                        <div>
                          <div className="text-yellow-400 font-semibold">{payment.userName}</div>
                          <div className="text-yellow-300 text-sm">{payment.userEmail}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-yellow-400" />
                          <div>
                            <div className="text-yellow-300">Package: {payment.packageName}</div>
                            <div className="text-yellow-400 font-semibold">KES {payment.amount}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 text-yellow-400 font-bold text-xs">MP</div>
                          <div>
                            <div className="text-yellow-300">M-Pesa Code</div>
                            <div className="text-yellow-400 font-mono">{payment.mpesaCode}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-yellow-400" />
                          <div>
                            <div className="text-yellow-300">Submitted</div>
                            <div className="text-yellow-400">{new Date(payment.submittedAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                      {getStatusBadge(payment.status)}

                      {payment.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(index, "Payment approved")}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(index, "Payment rejected")}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedPayment(payment)}
                        className="text-yellow-300 border-yellow-700 hover:bg-yellow-800/20"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>

                  {payment.adminNotes && (
                    <div className="mt-3 p-2 bg-yellow-800/30 rounded text-yellow-300 text-sm">
                      <strong>Admin Notes:</strong> {payment.adminNotes}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
