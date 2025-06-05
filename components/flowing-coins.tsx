"use client"

import { useEffect, useState } from "react"

interface FlowingCoin {
  id: number
  left: string
  animationDuration: string
  delay: string
  size: string
}

export function FlowingCoins({ count = 20 }) {
  const [coins, setCoins] = useState<FlowingCoin[]>([])

  useEffect(() => {
    const newCoins = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      delay: `${Math.random() * 8}s`,
      size: `${Math.random() * 15 + 20}px`,
    }))
    setCoins(newCoins)
  }, [count])

  return (
    <>
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="flowing-coin"
          style={{
            left: coin.left,
            width: coin.size,
            height: coin.size,
            animationDuration: coin.animationDuration,
            animationDelay: coin.delay,
            bottom: "-50px",
          }}
        />
      ))}
    </>
  )
}
