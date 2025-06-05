"use client"

import { useEffect, useState } from "react"

interface Coin {
  id: number
  left: string
  animationDuration: string
  delay: string
  size: string
}

export function GoldCoins({ count = 10 }) {
  const [coins, setCoins] = useState<Coin[]>([])

  useEffect(() => {
    const newCoins = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 10 + 5}s`,
      delay: `${Math.random() * 5}s`,
      size: `${Math.random() * 20 + 15}px`,
    }))
    setCoins(newCoins)
  }, [count])

  return (
    <>
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="coin"
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
