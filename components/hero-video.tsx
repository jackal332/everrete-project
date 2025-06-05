"use client"

import { useState, useEffect } from "react"

export function HeroVideo() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Simulate video loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="aspect-video bg-black relative overflow-hidden">
      {!isLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-900/20 to-black">
          <div className="text-center p-6">
            <h3 className="text-2xl font-bold mb-4 gold-text">Success Stories</h3>
            <p className="mb-4">Watch how GoldEdge has transformed lives</p>
            <div className="w-16 h-16 rounded-full bg-yellow-500/80 flex items-center justify-center mx-auto cursor-pointer hover:bg-yellow-500 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black ml-1"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
