"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { BackButton } from "@/components/back-button"
import { CheckCircle, XCircle, Clock, Search, User, DollarSign, Calendar, CreditCard } from "lucide-react"

interface ManualPayment {
  id: string
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

export default function AdminManualPayments() {
  const { toast } = useToast()
  const [payments, setPayments] = useState<ManualPayment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [isLoading, setIsLoading] = useState(true)

  // Load payments from localStorage (in real app, this would be from API)
  useEffect(() => {
    const loadPayments = () => {
      const storedPayments = JSON.parse(localStorage.getItem("pending-payments") || "[]")
      setPayments(storedPayments)
      setIsLoading(false)
    }

    loadPayments()

    // Poll for updates every 30 seconds
    const interval = setInterval(loadPayments, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleApprove = async (paymentId: string) => {
    const updatedPayments = payments.map((payment) =>
      payment.id === paymentId
        ? {
            ...payment,
            status: "approved" as const,
            processedAt: new Date().toISOString(),
            adminNotes: "Payment verified and approved",
          }
        : payment,
    )

    setPayments(updatedPayments)
    localStorage.setItem("pending-payments", JSON.stringify(updatedPayments))

    toast({
      title: "Payment Approved",
      description: "User has been granted access to their selected package.",
    })
  }

  const handleReject = async (paymentId: string) => {
    const reason = prompt("Enter rejection reason (optional):")

    const updatedPayments = payments.map((payment) =>
      payment.id === paymentId
        ? {
            ...payment,
            status: "rejected" as const,
            processedAt: new Date().toISOString(),
            adminNotes: reason || "Payment rejected by admin",
          }
        : payment,
    )

    setPayments(updatedPayments)
    localStorage.setItem("pending-payments", JSON.stringify(updatedPayments))

    toast({
      title: "Payment Rejected",
      description: "User has been notified of the rejection.",
      variant: "destructive",
    })
  }

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.mpesaCode.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || payment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const pendingCount = payments.filter((p) => p.status === "pending").length
  const approvedCount = payments.filter((p) => p.status === "approved").length
  const rejectedCount = payments.filter((p) => p.status === "rejected").length

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-yellow-400">Loading payments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 p-4 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <BackButton />
        <h1 className="text-3xl font-bold text-yellow-400">Manual Payments</h1>
        <div className="w-16"></div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="black-section border-orange-600/50">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-300">{pendingCount}</p>
            <p className="text-sm text-orange-500">Pending</p>
          </CardContent>
        </Card>

        <Card className="black-section border-green-600/50">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-300">{approvedCount}</p>
            <p className="text-sm text-green-500">Approved</p>
          </CardContent>
        </Card>

        <Card className="black-section border-red-600/50">
          <CardContent className="p-4 text-center">
            <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-300">{rejectedCount}</p>
            <p className="text-sm text-red-500">Rejected</p>
          </CardContent>
        </Card>

        <Card className="black-section border-blue-600/50">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-300">{payments.length}</p>
            <p className="text-sm text-blue-500">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="black-section border-yellow-600/30">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 w-4 h-4" />
                <Input
                  placeholder="Search by name, email, or M-Pesa code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-yellow-900/20 border-yellow-600/50 text-white placeholder-yellow-500/70"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                className="text-yellow-400 border-yellow-600"
              >
                All ({payments.length})
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                onClick={() => setStatusFilter("pending")}
                className="text-orange-400 border-orange-600"
              >
                Pending ({pendingCount})
              </Button>
              <Button
                variant={statusFilter === "approved" ? "default" : "outline"}
                onClick={() => setStatusFilter("approved")}
                className="text-green-400 border-green-600"
              >
                Approved ({approvedCount})
              </Button>
              <Button
                variant={statusFilter === "rejected" ? "default" : "outline"}
                onClick={() => setStatusFilter("rejected")}
                className="text-red-400 border-red-600"
              >
                Rejected ({rejectedCount})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.length === 0 ? (
          <Card className="black-section border-yellow-600/30">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">No payments found</h3>
              <p className="text-yellow-600">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No manual payments have been submitted yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredPayments.map((payment) => (
            <Card
              key={payment.id}
              className={`black-section transition-all duration-200 ${
                payment.status === "pending"
                  ? "border-orange-600/50 hover:border-orange-400"
                  : payment.status === "approved"
                    ? "border-green-600/50"
                    : "border-red-600/50"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* User Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-yellow-900/30 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-white">{payment.userName}</h3>
                          <p className="text-yellow-500 text-sm">{payment.userEmail}</p>
                        </div>
                      </div>

                      <Badge
                        className={
                          payment.status === "pending"
                            ? "bg-orange-500 text-white"
                            : payment.status === "approved"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                        }
                      >
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </div>

                    {/* Payment Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-blue-400" />
                        <div>
                          <p className="text-sm text-yellow-500">Package</p>
                          <p className="font-medium text-white">{payment.packageName}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <div>
                          <p className="text-sm text-yellow-500">Amount</p>
                          <p className="font-medium text-green-400">{payment.amount.toLocaleString()} KES</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-purple-400" />
                        <div>
                          <p className="text-sm text-yellow-500">M-Pesa Code</p>
                          <p className="font-mono font-bold text-purple-300">{payment.mpesaCode}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-yellow-400" />
                        <div>
                          <p className="text-sm text-yellow-500">Submitted</p>
                          <p className="font-medium text-white">{new Date(payment.submittedAt).toLocaleDateString()}</p>
                          <p className="text-xs text-yellow-600">
                            {new Date(payment.submittedAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Admin Notes */}
                    {payment.adminNotes && (
                      <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3">
                        <p className="text-sm text-yellow-500 font-medium">Admin Notes:</p>
                        <p className="text-yellow-300 text-sm">{payment.adminNotes}</p>
                        {payment.processedAt && (
                          <p className="text-xs text-yellow-600 mt-1">
                            Processed: {new Date(payment.processedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {payment.status === "pending" && (
                    <div className="flex flex-col gap-2 lg:w-48">
                      <Button
                        onClick={() => handleApprove(payment.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(payment.id)}
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-900/20"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
