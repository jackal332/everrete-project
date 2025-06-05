"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Smartphone, Shield, Zap, Globe } from "lucide-react"

export function TechnicalDocumentation() {
  const techStack = {
    frontend: [
      { name: "Next.js 14", description: "React framework with App Router", icon: "⚛️" },
      { name: "TypeScript", description: "Type-safe JavaScript", icon: "📘" },
      { name: "Tailwind CSS", description: "Utility-first CSS framework", icon: "🎨" },
      { name: "shadcn/ui", description: "Modern UI component library", icon: "🧩" },
    ],
    backend: [
      { name: "Node.js", description: "JavaScript runtime for server-side", icon: "🟢" },
      { name: "API Routes", description: "Next.js built-in API handling", icon: "🔗" },
      { name: "Server Actions", description: "React Server Components actions", icon: "⚡" },
    ],
    database: [
      { name: "PostgreSQL", description: "Relational database for transactions", icon: "🐘" },
      { name: "Firebase", description: "Real-time database for live updates", icon: "🔥" },
      { name: "MongoDB", description: "Document database for user data", icon: "🍃" },
    ],
    payments: [
      { name: "M-Pesa API", description: "Safaricom mobile money integration", icon: "📱" },
      { name: "Airtel Money", description: "Airtel mobile money services", icon: "📲" },
      { name: "Paystack", description: "Global payment processing", icon: "💳" },
    ],
    security: [
      { name: "2FA Authentication", description: "Two-factor authentication", icon: "🔐" },
      { name: "JWT Tokens", description: "Secure session management", icon: "🎫" },
      { name: "Encryption", description: "Data encryption at rest and transit", icon: "🔒" },
      { name: "Rate Limiting", description: "API abuse prevention", icon: "⏱️" },
    ],
    deployment: [
      { name: "Vercel", description: "Frontend deployment platform", icon: "▲" },
      { name: "Docker", description: "Containerization for consistency", icon: "🐳" },
      { name: "CI/CD", description: "Automated testing and deployment", icon: "🔄" },
    ],
  }

  const features = [
    {
      title: "Real-time Transactions",
      description: "Instant balance updates with WebSocket connections",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      status: "Implemented",
    },
    {
      title: "Mobile Money Integration",
      description: "M-Pesa and Airtel Money API integration",
      icon: <Smartphone className="w-6 h-6 text-green-400" />,
      status: "Active",
    },
    {
      title: "Admin Dashboard",
      description: "Comprehensive user and transaction management",
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      status: "Complete",
    },
    {
      title: "Responsive Design",
      description: "Mobile-first responsive user interface",
      icon: <Globe className="w-6 h-6 text-purple-400" />,
      status: "Optimized",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Technical Overview */}
      <Card className="black-section border-yellow-600/30">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center gap-2">
            <Code className="w-6 h-6" />
            Technical Architecture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-200 mb-4">
            Everett platform is built with modern web technologies ensuring scalability, security, and optimal
            performance across all devices.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-600/30">
                <div className="flex items-center gap-3 mb-2">
                  {feature.icon}
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                </div>
                <p className="text-sm text-yellow-200 mb-2">{feature.description}</p>
                <Badge className="bg-green-500 text-white text-xs">{feature.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(techStack).map(([category, technologies]) => (
          <Card key={category} className="black-section border-yellow-600/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 capitalize flex items-center gap-2">
                {category === "frontend" && <Code className="w-5 h-5" />}
                {category === "backend" && <Database className="w-5 h-5" />}
                {category === "database" && <Database className="w-5 h-5" />}
                {category === "payments" && <Smartphone className="w-5 h-5" />}
                {category === "security" && <Shield className="w-5 h-5" />}
                {category === "deployment" && <Globe className="w-5 h-5" />}
                {category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {technologies.map((tech, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-yellow-900/20 rounded-lg">
                    <span className="text-2xl">{tech.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white">{tech.name}</h4>
                      <p className="text-sm text-yellow-200">{tech.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Endpoints */}
      <Card className="black-section border-yellow-600/30">
        <CardHeader>
          <CardTitle className="text-yellow-400">API Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-600/30">
                <h4 className="font-semibold text-green-300 mb-2">Authentication</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-200">POST /api/auth/login</span>
                    <Badge className="bg-green-600 text-white text-xs">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-200">POST /api/auth/register</span>
                    <Badge className="bg-green-600 text-white text-xs">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-200">POST /api/auth/2fa</span>
                    <Badge className="bg-green-600 text-white text-xs">Active</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-600/30">
                <h4 className="font-semibold text-blue-300 mb-2">Transactions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-200">POST /api/transactions/deposit</span>
                    <Badge className="bg-blue-600 text-white text-xs">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">POST /api/transactions/withdraw</span>
                    <Badge className="bg-blue-600 text-white text-xs">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-200">GET /api/transactions/history</span>
                    <Badge className="bg-blue-600 text-white text-xs">Active</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-600/30">
                <h4 className="font-semibold text-purple-300 mb-2">Mobile Money</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-200">POST /api/mpesa/stk-push</span>
                    <Badge className="bg-purple-600 text-white text-xs">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">POST /api/airtel/payment</span>
                    <Badge className="bg-purple-600 text-white text-xs">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-200">GET /api/payment/status</span>
                    <Badge className="bg-purple-600 text-white text-xs">Active</Badge>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-600/30">
                <h4 className="font-semibold text-orange-300 mb-2">Admin</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-orange-200">GET /api/admin/users</span>
                    <Badge className="bg-orange-600 text-white text-xs">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-200">POST /api/admin/approve</span>
                    <Badge className="bg-orange-600 text-white text-xs">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-200">GET /api/admin/analytics</span>
                    <Badge className="bg-orange-600 text-white text-xs">Active</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="black-section border-yellow-600/30">
        <CardHeader>
          <CardTitle className="text-yellow-400">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-600/30">
              <div className="text-2xl font-bold text-green-400">99.9%</div>
              <div className="text-sm text-green-300">Uptime</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-600/30">
              <div className="text-2xl font-bold text-blue-400">&lt;200ms</div>
              <div className="text-sm text-blue-300">API Response</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-600/30">
              <div className="text-2xl font-bold text-purple-400">A+</div>
              <div className="text-sm text-purple-300">Security Grade</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-600/30">
              <div className="text-2xl font-bold text-yellow-400">100%</div>
              <div className="text-sm text-yellow-300">Mobile Ready</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
