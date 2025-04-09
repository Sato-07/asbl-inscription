"use client"

import { useRef, useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, BookOpen, User, ChevronDown } from "lucide-react"
import type { Course } from "@/components/course-grid"

interface CourseDetailModalProps {
  course: Course | null
  isOpen: boolean
  onClose: () => void
  onRegister: (courseId: string) => void
  isAuthenticated: boolean
}

export function CourseDetailModal({ course, isOpen, onClose, onRegister, isAuthenticated }: CourseDetailModalProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [canScroll, setCanScroll] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  // Réinitialiser les états à chaque ouverture de modal
  useEffect(() => {
    if (isOpen) {
      setHasScrolled(false)
      setCanScroll(false)

      // Attendre que le contenu soit complètement rendu
      const timer = setTimeout(() => {
        if (contentRef.current) {
          const element = contentRef.current
          const scrollHeight = element.scrollHeight
          const clientHeight = element.clientHeight
          const isScrollable = scrollHeight > clientHeight + 30

          setCanScroll(isScrollable)

          // Réinitialiser la position de défilement
          element.scrollTop = 0
        }
      }, 300)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Gérer les événements de défilement
  useEffect(() => {
    if (isOpen && contentRef.current) {
      const element = contentRef.current

      // Fonction pour détecter le défilement
      const handleScroll = () => {
        if (element.scrollTop > 5) {
          setHasScrolled(true)
        }
      }

      // Ajouter les écouteurs d'événements
      element.addEventListener("scroll", handleScroll, { passive: true })

      return () => {
        element.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isOpen])

  if (!course) return null

  const handleRegister = () => {
    onRegister(course.id)
  }

  const scrollDown = () => {
    if (contentRef.current) {
      contentRef.current.scrollBy({ top: 200, behavior: "smooth" })
      // Faire disparaître la flèche immédiatement après le clic
      setHasScrolled(true)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] flex flex-col p-0 overflow-hidden">
        {/* DialogTitle requis pour l'accessibilité, mais visuellement caché */}
        <DialogTitle className="sr-only">{course.title}</DialogTitle>

        {/* Contenu défilable incluant le titre visuel */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto pr-2 pb-16"
          style={{ maxHeight: "calc(85vh - 80px)" }}
          onScroll={() => {
            if (contentRef.current && contentRef.current.scrollTop > 5) {
              setHasScrolled(true)
            }
          }}
        >
          <div className="p-6">
            {/* En-tête visuel (défilable) */}
            <div className="mb-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">{course.title}</h2>
                <Badge className="mr-auto" variant={getCategoryVariant(course.category)}>{course.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Détails du cours et informations d'inscription</p>
            </div>

            {/* Description du cours */}
            <div className="mb-6">
              <h3 className="mb-2 font-medium">Description</h3>
              <p className="text-sm text-muted-foreground">
                {course.description || "Aucune description disponible pour ce cours."}
              </p>
            </div>

            {/* Informations principales */}
            <div className="grid gap-3 sm:grid-cols-2 mb-6">
              <div className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Date</h4>
                  <p className="text-sm text-muted-foreground">{course.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Horaire</h4>
                  <p className="text-sm text-muted-foreground">{course.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Lieu</h4>
                  <p className="text-sm text-muted-foreground">{course.location || "À déterminer"}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Users className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div>
                  <h4 className="text-sm font-medium">Places disponibles</h4>
                  <p className={`text-sm ${course.spots <= 3 ? "text-destructive" : "text-muted-foreground"}`}>
                    {course.spots} {course.spots > 1 ? "places" : "place"}
                  </p>
                </div>
              </div>
            </div>

            {/* Prérequis */}
            {course.prerequisites && (
              <div className="mb-6">
                <h3 className="mb-2 font-medium">Prérequis</h3>
                <ul className="ml-5 list-disc text-sm text-muted-foreground">
                  {course.prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Professeurs */}
            <div className="mb-6">
              <h3 className="mb-2 font-medium">Professeurs</h3>
              <div className="grid gap-2 sm:grid-cols-2">
                {course.allInstructors ? (
                  course.allInstructors.map((instructor, index) => (
                    <div key={index} className="flex items-center gap-2 rounded-md border p-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{instructor.name}</p>
                        <p className="text-xs text-muted-foreground">{instructor.role || "Formateur"}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 rounded-md border p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{course.instructor}</p>
                      <p className="text-xs text-muted-foreground">Formateur principal</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contenu du cours */}
            {course.content && (
              <div>
                <h3 className="mb-2 font-medium">Contenu du cours</h3>
                <div className="space-y-2">
                  {course.content.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <BookOpen className="mt-0.5 h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contenu supplémentaire pour garantir le défilement */}
            <div className="h-20"></div>
          </div>
        </div>

        {/* Pied de page fixe avec l'indicateur de défilement */}
        <div className="flex items-center justify-between p-4 border-t bg-background sticky bottom-0">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>

          {/* Indicateur de défilement intégré dans le pied de page */}
          {canScroll && !hasScrolled && (
            <div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce cursor-pointer z-50"
              onClick={scrollDown}
            >
              <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-md">
                <ChevronDown className="h-5 w-5" />
              </div>
            </div>
          )}

          <Button onClick={handleRegister} variant={course.isRegistered ? "outline" : "default"}>
            {isAuthenticated
              ? course.isRegistered
                ? "Annuler l'inscription"
                : "S'inscrire"
              : "Se connecter pour s'inscrire"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
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

