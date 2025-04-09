"use client"

import type React from "react"

import { Calendar, Clock, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Course } from "@/components/course-grid"

interface CourseCardProps {
  course: Course
  onRegister: (courseId: string) => void
  onClick: () => void
  displayedInstructors?: number
  isAuthenticated: boolean
}

export function CourseCard({
  course,
  onRegister,
  onClick,
  displayedInstructors = 1,
  isAuthenticated,
}: CourseCardProps) {
  const handleRegisterClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Empêcher l'ouverture de la modal
    onRegister(course.id)
  }

  // Déterminer les instructeurs à afficher
  const instructorsToShow = course.allInstructors
    ? course.allInstructors.slice(0, displayedInstructors)
    : [{ name: course.instructor }]

  const hasMoreInstructors = course.allInstructors && course.allInstructors.length > displayedInstructors

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{course.title}</CardTitle>
          <Badge variant={getCategoryVariant(course.category)}>{course.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{course.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{course.time}</span>
          </div>

          {/* Instructeurs avec "..." si nécessaire */}
          <div className="space-y-1">
            {instructorsToShow.map((instructor, index) => (
              <div key={index} className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{instructor.name}</span>
                {instructor.role && <span className="text-xs">({instructor.role})</span>}
              </div>
            ))}

            {hasMoreInstructors && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-xs italic">
                  +{course.allInstructors!.length - displayedInstructors} autres formateurs...
                </span>
              </div>
            )}
          </div>

          <div className="mt-2">
            <p className={`text-sm font-medium ${course.spots <= 3 ? "text-destructive" : ""}`}>
              {course.spots} {course.spots > 1 ? "places disponibles" : "place disponible"}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleRegisterClick} variant={course.isRegistered ? "outline" : "default"} className="w-full">
          {isAuthenticated
            ? course.isRegistered
              ? "Annuler l'inscription"
              : "S'inscrire"
            : "Se connecter pour s'inscrire"}
        </Button>
      </CardFooter>
    </Card>
  )
}

function getCategoryVariant(category: string): "default" | "outline" | "secondary" | "destructive" {
  switch (category.toLowerCase()) {
    case "développement":
      return "default"
    case "design":
      return "secondary"
    case "marketing":
      return "outline"
    case "technologie":
      return "default"
    case "management":
      return "secondary"
    case "créativité":
      return "outline"
    default:
      return "default"
  }
}

