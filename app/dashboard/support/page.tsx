"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Phone, Mail, MessageCircle, HelpCircle, Clock, CheckCircle, Search } from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

interface SupportTicket {
  id: string
  subject: string
  status: "open" | "pending" | "resolved"
  date: string
  priority: "low" | "medium" | "high"
}

export default function SupportPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketMessage, setTicketMessage] = useState("")

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I withdraw my earnings?",
      answer:
        "You can withdraw up to 500 KES at a time after activating your account. Go to the Withdraw section and choose between Task Balance or Invite Balance (not both in one transaction).",
      category: "withdrawals",
    },
    {
      id: "2",
      question: "What are the different job tiers?",
      answer:
        "Job tiers range from Intern (free) to Job 9. Higher tiers require larger security deposits but offer more daily tasks and higher earnings. Each tier has specific task quotas and unit prices.",
      category: "account",
    },
    {
      id: "3",
      question: "How does the referral program work?",
      answer:
        "Earn 8% commission on direct referrals, plus multi-level bonuses: 3% (A-Level), 2% (B-Level), and 1% (C-Level). Commissions are paid when referred users activate their accounts.",
      category: "referrals",
    },
    {
      id: "4",
      question: "When do tasks reset?",
      answer:
        "Tasks automatically reset at midnight (12:00 AM) daily. New videos and ads are generated based on your preferences and performance history.",
      category: "tasks",
    },
    {
      id: "5",
      question: "Is my money safe?",
      answer:
        "Yes! We use advanced security measures including fraud detection, secure payment processing, and encrypted data storage. Your deposits are protected and withdrawals are processed within 24 hours.",
      category: "security",
    },
    {
      id: "6",
      question: "How do I upgrade my job tier?",
      answer:
        "You can upgrade anytime by paying the difference between your current tier and the desired tier. Higher tiers unlock more tasks and increase your daily earning potential.",
      category: "account",
    },
  ]

  const supportTickets: SupportTicket[] = [
    {
      id: "T001",
      subject: "Withdrawal not received",
      status: "pending",
      date: "2024-01-15",
      priority: "high",
    },
    {
      id: "T002",
      subject: "Task completion issue",
      status: "resolved",
      date: "2024-01-12",
      priority: "medium",
    },
  ]

  const categories = [
    { id: "all", label: "All Topics" },
    { id: "account", label: "Account" },
    { id: "withdrawals", label: "Withdrawals" },
    { id: "tasks", label: "Tasks" },
    { id: "referrals", label: "Referrals" },
    { id: "security", label: "Security" },
  ]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const submitTicket = () => {
    if (!ticketSubject.trim() || !ticketMessage.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both subject and message fields.",
        variant: "destructive",
      })
      return
    }

    // Simulate ticket submission
    toast({
      title: "Ticket Submitted!",
      description: "Our support team will respond within 24 hours.",
    })

    setTicketSubject("")
    setTicketMessage("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      case "resolved":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-900 to-green-800">
        <CardContent className="p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Support Center 📞</h1>
          <p className="text-blue-200">Get expert assistance from our dedicated team</p>
        </CardContent>
      </Card>

      {/* Quick Contact */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-green-950/20 border-green-900/50">
          <CardContent className="p-3 text-center">
            <Phone className="w-6 h-6 mx-auto mb-1 text-green-500" />
            <p className="text-xs text-green-600">Call Us</p>
            <p className="text-sm font-bold">24/7</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-950/20 border-blue-900/50">
          <CardContent className="p-3 text-center">
            <Mail className="w-6 h-6 mx-auto mb-1 text-blue-500" />
            <p className="text-xs text-blue-600">Email</p>
            <p className="text-sm font-bold">2-4h</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-950/20 border-purple-900/50">
          <CardContent className="p-3 text-center">
            <MessageCircle className="w-6 h-6 mx-auto mb-1 text-purple-500" />
            <p className="text-xs text-purple-600">Live Chat</p>
            <p className="text-sm font-bold">Instant</p>
          </CardContent>
        </Card>
      </div>

      {/* Search FAQs */}
      <Card className="bg-yellow-950/20 border-yellow-900/50">
        <CardHeader>
          <CardTitle className="text-yellow-500">Search Help Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-600" />
              <Input
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/30 border-yellow-900 text-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  size="sm"
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id ? "gold-gradient text-black" : "border-yellow-900 text-yellow-500"
                  }
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQs */}
      <Card className="bg-yellow-950/20 border-yellow-900/50">
        <CardHeader>
          <CardTitle className="text-yellow-500">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredFAQs.map((faq) => (
              <details key={faq.id} className="group">
                <summary className="flex items-center justify-between p-3 bg-black/30 rounded-lg cursor-pointer hover:bg-black/50 transition-colors">
                  <span className="font-semibold">{faq.question}</span>
                  <HelpCircle className="w-4 h-4 text-yellow-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2 p-3 bg-black/20 rounded-lg">
                  <p className="text-sm text-yellow-200">{faq.answer}</p>
                </div>
              </details>
            ))}

            {filteredFAQs.length === 0 && (
              <div className="text-center py-6">
                <HelpCircle className="w-12 h-12 mx-auto mb-2 text-yellow-600" />
                <p className="text-yellow-600">No results found. Try different keywords.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Submit Ticket */}
      <Card className="bg-yellow-950/20 border-yellow-900/50">
        <CardHeader>
          <CardTitle className="text-yellow-500">Submit Support Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <Input
                placeholder="Brief description of your issue"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="bg-black/30 border-yellow-900 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                placeholder="Describe your issue in detail..."
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                rows={4}
                className="bg-black/30 border-yellow-900 text-white"
              />
            </div>

            <Button onClick={submitTicket} className="w-full gold-gradient text-black font-bold">
              Submit Ticket
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* My Tickets */}
      {supportTickets.length > 0 && (
        <Card className="bg-yellow-950/20 border-yellow-900/50">
          <CardHeader>
            <CardTitle className="text-yellow-500">My Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="p-4 bg-black/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">{ticket.subject}</p>
                      <p className="text-sm text-yellow-600">
                        #{ticket.id} • {ticket.date}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                      <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    {ticket.status === "resolved" ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-500" />
                    )}
                    <span className="text-yellow-200">
                      {ticket.status === "resolved" ? "Issue resolved" : "Response within 24 hours"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Information */}
      <Card className="bg-yellow-950/20 border-yellow-900/50">
        <CardHeader>
          <CardTitle className="text-yellow-500">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
              <Phone className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-semibold">Phone Support</p>
                <p className="text-sm text-yellow-600">+254 700 123 456</p>
                <p className="text-xs text-yellow-700">Available 24/7</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
              <Mail className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-semibold">Email Support</p>
                <p className="text-sm text-yellow-600">support@goldedge.com</p>
                <p className="text-xs text-yellow-700">Response within 2-4 hours</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg">
              <MessageCircle className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-semibold">Live Chat</p>
                <p className="text-sm text-yellow-600">Available on website</p>
                <p className="text-xs text-yellow-700">Instant response</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
