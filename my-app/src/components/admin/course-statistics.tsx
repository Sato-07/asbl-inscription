"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Données simulées pour les statistiques des cours
const courseStats = [
  {
    id: "1",
    title: "Alphabétisation",
    category: "Développement",
    totalSpots: 12,
    registeredUsers: 8,
    newRegistrations: 3,
    fillRate: 67,
  },
  {
    id: "2",
    title: "Math-Français",
    category: "Design",
    totalSpots: 8,
    registeredUsers: 7,
    newRegistrations: 2,
    fillRate: 88,
  },
  {
    id: "3",
    title: "Job étudiants",
    category: "Marketing",
    totalSpots: 15,
    registeredUsers: 9,
    newRegistrations: 4,
    fillRate: 60,
  },
  {
    id: "4",
    title: "Espace public numérique",
    category: "Technologie",
    totalSpots: 10,
    registeredUsers: 8,
    newRegistrations: 2,
    fillRate: 80,
  },
  {
    id: "5",
    title: "Life box",
    category: "Management",
    totalSpots: 20,
    registeredUsers: 12,
    newRegistrations: 5,
    fillRate: 60,
  },
  {
    id: "6",
    title: "Permanence d'emploi",
    category: "Créativité",
    totalSpots: 15,
    registeredUsers: 10,
    newRegistrations: 3,
    fillRate: 67,
  },
  {
    id: "7",
    title: "Eco énergie",
    category: "Développement",
    totalSpots: 12,
    registeredUsers: 6,
    newRegistrations: 2,
    fillRate: 50,
  },
  {
    id: "8",
    title: "Médiation de quartier",
    category: "Marketing",
    totalSpots: 18,
    registeredUsers: 11,
    newRegistrations: 4,
    fillRate: 61,
  },
  {
    id: "9",
    title: "Repair café",
    category: "Technologie",
    totalSpots: 15,
    registeredUsers: 13,
    newRegistrations: 6,
    fillRate: 87,
  },
]

export function CourseStatistics() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrer les cours en fonction du terme de recherche
  const filteredCourses = courseStats.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un cours..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Filtrer</Button>
        <Button>Exporter</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cours</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead className="text-right">Places totales</TableHead>
              <TableHead className="text-right">Inscrits</TableHead>
              <TableHead className="text-right">Nouveaux</TableHead>
              <TableHead className="text-right">Taux de remplissage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{course.category}</Badge>
                </TableCell>
                <TableCell className="text-right">{course.totalSpots}</TableCell>
                <TableCell className="text-right">{course.registeredUsers}</TableCell>
                <TableCell className="text-right">
                  <span className="font-medium text-green-600">+{course.newRegistrations}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Progress value={course.fillRate} className="h-2 w-16" />
                    <span className="w-10 text-right text-sm">{course.fillRate}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

