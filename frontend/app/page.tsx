'use client'
import { useState, useEffect } from "react"
import SplashScreen from "./splash"
import WelcomeScreen from "./welcome"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />;
  }

  return <WelcomeScreen />
}


