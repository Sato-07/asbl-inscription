"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"

export function MainNav() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  const navItems = [
    {
      title: "Accueil",
      href: "/",
      active: pathname === "/",
    },
    {
      title: "Cours",
      href: "/",
      active: pathname === "/courses",
    },
    {
      title: "À propos",
      href: "/",
      active: pathname === "/about",
    },
    {
      title: "Contact",
      href: "/",
      active: pathname === "/contact",
    },
  ]

  // Ajouter le lien vers le profil si l'utilisateur est connecté
  if (isAuthenticated) {
    navItems.push({
      title: "Mon profil",
      href: "/profil",
      active: pathname === "/profil",
    })
  }

  return (
    <nav className="hidden md:flex md:gap-6">
      {navItems.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            item.active ? "text-primary" : "text-muted-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

