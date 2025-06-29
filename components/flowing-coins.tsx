"use client"

import { useEffect, useState } from "react"

interface FlowingCoinsProps {
  count?: number
}

export function FlowingCoins({ count = 20 }: FlowingCoinsProps) {
  const [coins, setCoins] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([])

  useEffect(() => {
    const newCoins = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
    }))
    setCoins(newCoins)
  }, [count])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="flowing-coin"
          style={{
            left: `${coin.left}%`,
            animationDelay: `${coin.delay}s`,
            animationDuration: `${coin.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
