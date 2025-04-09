"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface RecentSignupsProps {
  showAll?: boolean
}

// Données simulées pour les inscriptions récentes
const recentSignups = [
  {
    id: "1",
    user: {
      name: "Sophie Martin",
      email: "sophie.martin@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    course: "Alphabétisation",
    date: "30 Mar 2025",
    status: "Confirmée",
    category: "Développement",
  },
  {
    id: "2",
    user: {
      name: "Thomas Dubois",
      email: "thomas.dubois@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    course: "Math-Français",
    date: "29 Mar 2025",
    status: "En attente",
    category: "Design",
  },
  {
    id: "3",
    user: {
      name: "Emma Petit",
      email: "emma.petit@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    course: "Espace public numérique",
    date: "28 Mar 2025",
    status: "Confirmée",
    category: "Technologie",
  },
  {
    id: "4",
    user: {
      name: "Lucas Bernard",
      email: "lucas.bernard@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    course: "Life box",
    date: "27 Mar 2025",
    status: "Confirmée",
    category: "Management",
  },
  {
    id: "5",
    user: {
      name: "Camille Leroy",
      email: "camille.leroy@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    course: "Repair café",
    date: "26 Mar 2025",
    status: "Annulée",
    category: "Technologie",
  },
  {
    id: "6",
    user: {
      name: "Antoine Moreau",
      email: "antoine.moreau@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    course: "Eco énergie",
    date: "25 Mar 2025",
    status: "Confirmée",
    category: "Développement",
  },
  {
    id: "7",
    user: {
      name: "Julie Fournier",
      email: "julie.fournier@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    course: "Médiation de quartier",
    date: "24 Mar 2025",
    status: "En attente",
    category: "Marketing",
  },
  {
    id: "8",
    user: {
      name: "Nicolas Girard",
      email: "nicolas.girard@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    course: "Job étudiants",
    date: "23 Mar 2025",
    status: "Confirmée",
    category: "Marketing",
  },
  {
    id: "9",
    user: {
      name: "Sarah Dupont",
      email: "sarah.dupont@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    course: "Permanence d'emploi",
    date: "22 Mar 2025",
    status: "Confirmée",
    category: "Créativité",
  },
  {
    id: "10",
    user: {
      name: "Maxime Rousseau",
      email: "maxime.rousseau@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    course: "Alphabétisation",
    date: "21 Mar 2025",
    status: "Annulée",
    category: "Développement",
  },
]

export function RecentSignups({ showAll = false }: RecentSignupsProps) {
  // Limiter le nombre d'inscriptions affichées si showAll est false
  const displayedSignups = showAll ? recentSignups : recentSignups.slice(0, 5)

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Utilisateur</TableHead>
            <TableHead>Cours</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedSignups.map((signup) => (
            <TableRow key={signup.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={signup.user.avatar} alt={signup.user.name} />
                    <AvatarFallback>{signup.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{signup.user.name}</div>
                    <div className="text-xs text-muted-foreground">{signup.user.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{signup.course}</div>
                  <div className="text-xs text-muted-foreground">{signup.category}</div>
                </div>
              </TableCell>
              <TableCell>{signup.date}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    signup.status === "Confirmée"
                      ? "default"
                      : signup.status === "En attente"
                        ? "outline"
                        : "destructive"
                  }
                >
                  {signup.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showAll && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Précédent
          </Button>
          <Button variant="outline" size="sm">
            Suivant
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

