"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VideoTaskPlayerProps {
  videoData: {
    id: string
    title: string
    description: string
    duration: number
    reward: number
    thumbnailUrl: string
    features: string[]
  }
  onComplete: (reward: number) => void
}

export function VideoTaskPlayer({ videoData, onComplete }: VideoTaskPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [showCountdown, setShowCountdown] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && !isCompleted) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1
          if (newTime >= videoData.duration) {
            setIsPlaying(false)
            setIsCompleted(true)
            setShowCountdown(true)
            setCountdown(10)
            return videoData.duration
          }
          return newTime
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, isCompleted, videoData.duration])

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout

    if (showCountdown && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setShowCountdown(false)
            onComplete(videoData.reward)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(countdownInterval)
  }, [showCountdown, countdown, onComplete, videoData.reward])

  const togglePlay = () => {
    if (!isCompleted) {
      setIsPlaying(!isPlaying)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = (currentTime / videoData.duration) * 100

  return (
    <Card className="bg-orange-950/20 border-orange-900/50 overflow-hidden">
      <CardContent className="p-0">
        <div className="video-container aspect-video relative">
          {/* Video Thumbnail/Player */}
          <div className="w-full h-full bg-gradient-to-br from-orange-800 to-orange-900 flex items-center justify-center relative">
            <img
              src={videoData.thumbnailUrl || "/placeholder.svg?height=300&width=400"}
              alt={videoData.title}
              className="w-full h-full object-cover"
            />

            {/* Play/Pause Overlay */}
            {!isCompleted && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Button
                  onClick={togglePlay}
                  size="lg"
                  className="w-16 h-16 rounded-full everett-gradient text-white hover:opacity-90"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </Button>
              </div>
            )}

            {/* Countdown Overlay */}
            {showCountdown && (
              <div className="countdown-overlay">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full border-4 border-orange-400 flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-white">{countdown}</span>
                  </div>
                  <p className="text-white text-lg">Preparing your reward...</p>
                  <p className="text-orange-300">+{videoData.reward} KES</p>
                </div>
              </div>
            )}

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-white text-sm">{formatTime(currentTime)}</span>
                <Progress value={progressPercentage} className="flex-1 h-2" />
                <span className="text-white text-sm">{formatTime(videoData.duration)}</span>
                <Button
                  onClick={() => setIsMuted(!isMuted)}
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="p-4">
          <h3 className="font-bold text-orange-300 mb-2">{videoData.title}</h3>
          <p className="text-sm text-orange-200 mb-3">{videoData.description}</p>

          {/* Features */}
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-orange-400 mb-2">Video Features:</h4>
            <div className="flex flex-wrap gap-2">
              {videoData.features.map((feature, index) => (
                <span key={index} className="px-2 py-1 bg-orange-800/30 text-orange-300 text-xs rounded">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Reward Info */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-orange-400">Duration: {formatTime(videoData.duration)}</div>
            <div className="text-lg font-bold text-green-400">+{videoData.reward} KES</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
