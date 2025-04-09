"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { BarChart3, BookOpen, Calendar, FileText, Home, LayoutDashboard, Settings, Tag, Users } from "lucide-react"

interface AdminNavProps {
  activeItem: string
  onNavigate: (item: string) => void
}

export function AdminNav({ activeItem, onNavigate }: AdminNavProps) {
  const navItems = [
    {
      id: "overview",
      title: "Vue d'ensemble",
      icon: LayoutDashboard,
      href: "#overview",
    },
    {
      id: "courses",
      title: "Cours",
      icon: BookOpen,
      href: "#courses",
    },
    {
      id: "categories",
      title: "Catégories",
      icon: Tag,
      href: "#categories",
    },
    {
      id: "users",
      title: "Utilisateurs",
      icon: Users,
      href: "#users",
    },
    {
      id: "signups",
      title: "Inscriptions",
      icon: FileText,
      href: "#signups",
    },
    {
      id: "calendar",
      title: "Calendrier",
      icon: Calendar,
      href: "#calendar",
    },
    {
      id: "analytics",
      title: "Analytiques",
      icon: BarChart3,
      href: "#analytics",
    },
    {
      id: "settings",
      title: "Paramètres",
      icon: Settings,
      href: "#settings",
    },
  ]

  return (
    <nav className="hidden border-r bg-background md:block">
      <div className="flex h-full flex-col gap-2 p-4">
        <Link
          href="/"
          className="flex h-10 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Home className="mr-2 h-4 w-4" />
          <span>Retour au site</span>
        </Link>

        <div className="mt-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex w-full items-center justify-start rounded-md px-4 py-2 text-sm font-medium transition-colors",
                activeItem === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}

