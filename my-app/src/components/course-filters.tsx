"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, Filter, Tag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useRouter, useSearchParams } from "next/navigation"

const CATEGORIES = ["Tous", "Permanence d'emploi", "Alphabétisation", "Espace public numérique", "Job etudiants", "Senior & Cie", "Life box"]

export default function CourseFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [dateFilter, setDateFilter] = useState(searchParams.get("date") || "")
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "")
  const [mounted, setMounted] = useState(false)

  // Éviter l'hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const updateFilters = (date: string, category: string) => {
    const params = new URLSearchParams()

    if (date) params.set("date", date)
    if (category && category !== "Tous") params.set("category", category)

    router.push(`?${params.toString()}`)
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value
    setDateFilter(newDate)
    updateFilters(newDate, categoryFilter)
  }

  const handleCategorySelect = (category: string) => {
    const newCategory = category === "Tous" ? "" : category
    setCategoryFilter(newCategory)
    updateFilters(dateFilter, newCategory)
  }

  const clearFilters = () => {
    setDateFilter("")
    setCategoryFilter("")
    router.push("/")
  }

  if (!mounted) return null

  const hasFilters = dateFilter || categoryFilter

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Input
            type="text"
            placeholder="Filtrer par date (ex: 12 mars 2025)"
            value={dateFilter}
            onChange={handleDateChange}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>{categoryFilter || "Filtres"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {CATEGORIES.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={categoryFilter === category || (category === "Tous" && !categoryFilter) ? "bg-accent" : ""}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 gap-1">
            <X className="h-4 w-4" />
            Effacer
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {hasFilters && (
          <div className="flex flex-wrap gap-2">
            {dateFilter && (
              <Badge variant="secondary" className="gap-1">
                Date: {dateFilter}
                <button
                  onClick={() => {
                    setDateFilter("")
                    updateFilters("", categoryFilter)
                  }}
                  className="ml-1 rounded-full hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {categoryFilter && (
              <Badge variant="secondary" className="gap-1">
                Catégorie: {categoryFilter}
                <button
                  onClick={() => {
                    setCategoryFilter("")
                    updateFilters(dateFilter, "")
                  }}
                  className="ml-1 rounded-full hover:bg-muted"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

