"use client"

import { useEffect, useState } from "react"

interface ScatteredCoin {
  id: number
  top: string
  left: string
  delay: string
}

export function ScatteredCoins({ count = 50 }) {
  const [coins, setCoins] = useState<ScatteredCoin[]>([])

  useEffect(() => {
    const newCoins = Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
    }))
    setCoins(newCoins)
  }, [count])

  return (
    <>
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="scattered-coin"
          style={{
            top: coin.top,
            left: coin.left,
            animationDelay: coin.delay,
          }}
        />
      ))}
    </>
  )
}
