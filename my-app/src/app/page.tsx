"use client"

import { Suspense, useState } from "react"
import CourseGrid from "@/components/course-grid"
import CourseFilters from "@/components/course-filters"
import { Skeleton } from "@/components/ui/skeleton"
import { AuthModal } from "@/components/modal/auth"
import { CourseHeader } from "@/components/course-header"

export default function HomePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login")

  const openLoginModal = () => {
    setAuthModalTab("login")
    setIsAuthModalOpen(true)
  }

  const openRegisterModal = () => {
    setAuthModalTab("register")
    setIsAuthModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4 md:p-6">
        <CourseHeader onLoginClick={openLoginModal} onRegisterClick={openRegisterModal} />

        <div className="mb-8 rounded-lg border bg-card p-6 shadow-sm">
          <CourseFilters />
        </div>

        <Suspense fallback={<CourseGridSkeleton />}>
          <CourseGrid onAuthRequired={openLoginModal} />
        </Suspense>

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} defaultTab={authModalTab} />
      </main>
    </div>
  )
}

function CourseGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="rounded-lg border bg-card shadow-sm">
            <div className="p-4">
              <Skeleton className="mb-2 h-6 w-24" />
              <Skeleton className="mb-4 h-4 w-full" />
              <Skeleton className="mb-2 h-4 w-1/2" />
              <div className="mt-4">
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

