"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface LoginRequiredProps {
  children: React.ReactNode
  fallback: React.ReactNode
}

export default function LoginRequired({ children, fallback }: LoginRequiredProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Simuler une vérification d'authentification
  useEffect(() => {
    const checkAuth = () => {
      // Dans une application réelle, vous vérifieriez ici le statut d'authentification
      // Par exemple, en vérifiant un token dans localStorage ou en faisant une requête API

      // Pour cette démo, nous utilisons un délai pour simuler une vérification
      setTimeout(() => {
        // Pour la démo, nous définissons isLoggedIn à true
        // Dans une application réelle, cela serait basé sur l'état d'authentification réel
        setIsLoggedIn(true)
        setIsLoading(false)
      }, 500)
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    )
  }

  return isLoggedIn ? children : fallback
}

