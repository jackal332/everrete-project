"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface BackButtonProps {
  label?: string
  className?: string
}

export function BackButton({ label = "Back", className = "" }: BackButtonProps) {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      className={`text-yellow-400 hover:text-yellow-300 hover:bg-yellow-900/20 ${className}`}
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      {label}
    </Button>
  )
}
