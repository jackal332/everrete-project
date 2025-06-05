"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { FlowingCoins } from "@/components/flowing-coins"
import { HeroVideo } from "@/components/hero-video"
import { EverettIcon } from "@/components/everett-icon"
import { Users, Shield, TrendingUp, Award, HelpCircle, CheckCircle } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [registeredUsers, setRegisteredUsers] = useState(15847)
  const [testimonials, setTestimonials] = useState([
    {
      name: "John K.",
      message: "I've earned over 50,000 KES with Everett!",
      jobTier: 5,
    },
    {
      name: "Mary W.",
      message: "The daily tasks are so easy and the payments are always on time.",
      jobTier: 3,
    },
    {
      name: "David M.",
      message: "I started with Job 1 and now I'm at Job 7. Life-changing platform!",
      jobTier: 7,
    },
  ])

  const [faqs, setFaqs] = useState([
    {
      question: "How do I start earning with Everett?",
      answer:
        "Simply register for free, activate your account with a security deposit, and start completing daily tasks to earn money.",
    },
    {
      question: "What is the minimum withdrawal amount?",
      answer:
        "The minimum withdrawal amount is 500 KES. You can withdraw from either your task balance or invite balance, but not both in a single transaction.",
    },
    {
      question: "How does the referral program work?",
      answer:
        "Earn 8% commission on direct referrals plus multi-level bonuses. Share your referral code and get paid when people join using your code.",
    },
    {
      question: "Are my earnings guaranteed?",
      answer:
        "Yes! Complete your daily tasks according to your job tier and your earnings are guaranteed. All payments are processed within 24 hours.",
    },
    {
      question: "Can I upgrade my job tier?",
      answer:
        "You can upgrade to any higher tier by paying the difference. Higher tiers offer more tasks and higher daily earnings.",
    },
  ])

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }

    // Simulate real-time user registration updates
    const interval = setInterval(() => {
      setRegisteredUsers((prev) => prev + Math.floor(Math.random() * 3))
    }, 30000)

    return () => clearInterval(interval)
  }, [user, router])

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <FlowingCoins count={25} />

      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-orange-700 relative z-10">
        <div className="flex items-center gap-3">
          <EverettIcon size={48} />
          <h1 className="text-2xl font-bold everett-text">Everett</h1>
        </div>
        <div className="flex gap-2">
          <Link href="/login">
            <Button variant="outline" className="border-orange-600 text-orange-300 hover:bg-orange-950">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="everett-gradient text-white font-bold hover:opacity-90">Register Free</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 everett-text">
              JOIN US IN <span className="text-6xl">2025</span>
            </h2>
            <p className="text-xl mb-6 text-orange-200">
              Complete simple tasks, build your team, and earn real money daily
            </p>
            <div className="bg-orange-600/20 p-4 rounded-lg mb-6 border border-orange-600">
              <h3 className="font-bold text-orange-300 mb-2">Why Choose Everett?</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-orange-400">✓</span> Daily income from simple tasks
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-400">✓</span> Earn up to 196,000 KES daily
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-400">✓</span> 8% commission on referrals
                </li>
              </ul>
            </div>
            <Link href="/register">
              <Button size="lg" className="everett-gradient text-white font-bold hover:opacity-90">
                Start Earning Today
              </Button>
            </Link>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-2xl border border-orange-700">
            <HeroVideo />
          </div>
        </div>
      </section>

      {/* Registered Users Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-orange-900/50 to-orange-800/50 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 everett-text">Join Our Growing Community</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-orange-950/30 border-orange-800">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                <p className="text-3xl font-bold text-orange-300">{registeredUsers.toLocaleString()}</p>
                <p className="text-orange-500">Registered Users</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-950/30 border-orange-800">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                <p className="text-3xl font-bold text-orange-300">2.5M+</p>
                <p className="text-orange-500">KES Paid Out Daily</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-950/30 border-orange-800">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                <p className="text-3xl font-bold text-orange-300">98.5%</p>
                <p className="text-orange-500">User Satisfaction</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Join Everett Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center everett-text">Why Join Everett?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-orange-950/20 border-orange-900/50 hover:border-orange-600 transition-colors">
              <CardContent className="p-6 text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                <h3 className="font-bold mb-2">Secure Platform</h3>
                <p className="text-sm text-orange-300">
                  Advanced security measures protect your earnings and personal data
                </p>
              </CardContent>
            </Card>
            <Card className="bg-orange-950/20 border-orange-900/50 hover:border-orange-600 transition-colors">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                <h3 className="font-bold mb-2">Guaranteed Earnings</h3>
                <p className="text-sm text-orange-300">Complete tasks and get paid - it's that simple and reliable</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-950/20 border-orange-900/50 hover:border-orange-600 transition-colors">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                <h3 className="font-bold mb-2">Team Building</h3>
                <p className="text-sm text-orange-300">
                  Earn commissions by building and growing your referral network
                </p>
              </CardContent>
            </Card>
            <Card className="bg-orange-950/20 border-orange-900/50 hover:border-orange-600 transition-colors">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 mx-auto mb-4 text-orange-400" />
                <h3 className="font-bold mb-2">Multiple Income Streams</h3>
                <p className="text-sm text-orange-300">Tasks, referrals, and bonuses - multiple ways to earn money</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-orange-900/30 to-orange-800/30 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center everett-text">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-orange-950/30 border-orange-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-orange-300">Daily Task System</h3>
                <ul className="space-y-2 text-orange-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    Watch videos and earn money
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    Complete surveys and ads
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    Automatic task generation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    Daily reset at midnight
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-orange-950/30 border-orange-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-orange-300">Referral Program</h3>
                <ul className="space-y-2 text-orange-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    8% direct referral commission
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    Multi-level bonus structure
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    Real-time tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    Instant commission payments
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-orange-950/30 border-orange-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-orange-300">Wealth Management</h3>
                <ul className="space-y-2 text-orange-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    Smart earning insights
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    Withdrawal optimization
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    Performance analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-orange-400" />
                    Financial planning tools
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-orange-900/30 to-orange-800/30 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center everett-text">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-orange-950/30 border-orange-800">
                <CardContent className="p-6">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer">
                      <h3 className="font-semibold text-orange-300">{faq.question}</h3>
                      <HelpCircle className="w-5 h-5 text-orange-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-4 text-orange-200">{faq.answer}</p>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center everett-text">Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-orange-950/20 border-orange-900/50 hover:border-orange-500 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full everett-gradient flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-orange-400 text-sm">Job Tier {testimonial.jobTier}</p>
                    </div>
                  </div>
                  <p className="italic text-orange-200">"{testimonial.message}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-t from-orange-900/30 to-orange-800/20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 everett-text">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 text-orange-200">Join thousands of users already making money with Everett</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="everett-gradient text-white font-bold hover:opacity-90 w-full sm:w-auto">
                Register Now - It's Free
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-orange-600 text-orange-400 hover:bg-orange-950 w-full sm:w-auto"
              >
                Login to Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-orange-900/30 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <EverettIcon size={32} />
              <h1 className="text-xl font-bold everett-text">Everett</h1>
            </div>
            <div className="flex gap-6">
              <Link href="/about" className="text-orange-400 hover:text-orange-300">
                About Us
              </Link>
              <Link href="/support" className="text-orange-400 hover:text-orange-300">
                Support
              </Link>
              <Link href="/terms" className="text-orange-400 hover:text-orange-300">
                Terms
              </Link>
              <Link href="/privacy" className="text-orange-400 hover:text-orange-300">
                Privacy
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-orange-600">
            &copy; {new Date().getFullYear()} Everett. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
