"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
}

export function SmartChatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your GoldEdge assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // FAQ responses
    if (lowerMessage.includes("withdraw") || lowerMessage.includes("cash out")) {
      return "You can withdraw up to 500 KES at a time. Remember, you need to activate your account first and can only withdraw from tasks OR invites in a single transaction, not both combined."
    }

    if (lowerMessage.includes("task") || lowerMessage.includes("job")) {
      return "Tasks are automatically generated based on your preferences and reset daily at midnight. Complete them to earn your daily income according to your job tier level."
    }

    if (lowerMessage.includes("referral") || lowerMessage.includes("invite")) {
      return "Earn 8% commission on every person you refer! Share your referral code and get paid when they activate their account with a security deposit."
    }

    if (lowerMessage.includes("activate") || lowerMessage.includes("deposit")) {
      return "Account activation requires a security deposit based on your chosen job tier. This unlocks daily tasks and earning opportunities. The deposit acts as your security guarantee."
    }

    if (lowerMessage.includes("lucky wheel") || lowerMessage.includes("spin")) {
      return "The Lucky Wheel gives you chances to win bonus rewards! Your odds improve based on your activity level and referral performance."
    }

    if (lowerMessage.includes("payment") || lowerMessage.includes("mobile money")) {
      return "We support various payment methods including Mobile Money (M-Pesa, Airtel Money). All transactions are secure and processed within 24 hours."
    }

    if (lowerMessage.includes("tier") || lowerMessage.includes("upgrade")) {
      return "Job tiers range from Intern (free) to Job 9. Higher tiers offer more tasks and higher daily earnings. You can upgrade anytime by paying the difference."
    }

    // Default responses
    const defaultResponses = [
      "I understand you're asking about that. Let me connect you with more specific information. What exactly would you like to know?",
      "That's a great question! Could you provide more details so I can give you the most helpful answer?",
      "I'm here to help with any GoldEdge questions. Feel free to ask about tasks, withdrawals, referrals, or account activation.",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot thinking time
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: generateBotResponse(inputValue),
          sender: "bot",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-20 right-4 w-80 h-96 z-50">
      <Card className="h-full bg-black border-yellow-800 flex flex-col">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-yellow-500 flex items-center gap-2">
              <Bot className="w-5 h-5" />
              GoldEdge Assistant
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4">
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-yellow-600 text-black"
                      : "bg-yellow-950/30 text-white border border-yellow-900"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === "bot" && <Bot className="w-4 h-4 mt-0.5 text-yellow-500" />}
                    {message.sender === "user" && <User className="w-4 h-4 mt-0.5" />}
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-yellow-950/30 text-white border border-yellow-900 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-yellow-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="bg-yellow-950/20 border-yellow-900 text-white"
            />
            <Button onClick={handleSendMessage} size="icon" className="gold-gradient text-black">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
