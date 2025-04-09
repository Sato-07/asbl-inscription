"use client"

import { useState, useEffect } from "react"
import { CourseCard } from "@/components/course-card"
import { useSearchParams } from "next/navigation"
import { CourseDetailModal } from "@/components/modal/course-detail"
import { useAuth } from "@/components/auth-provider"

// Types
export interface Instructor {
  name: string
  role?: string
}

export interface Course {
  id: string
  title: string
  date: string
  time: string
  instructor: string
  spots: number
  category: string
  isRegistered: boolean
  // Champs supplémentaires pour la modal
  description?: string
  location?: string
  prerequisites?: string[]
  content?: string[]
  allInstructors?: Instructor[]
}

interface CourseGridProps {
  onAuthRequired: () => void
}

export default function CourseGrid({ onAuthRequired }: CourseGridProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const searchParams = useSearchParams()
  const { isAuthenticated } = useAuth()

  const dateFilter = searchParams.get("date")
  const categoryFilter = searchParams.get("category")

  useEffect(() => {
    // Simuler un chargement de données
    setIsLoading(true)

    // Simuler une API
    setTimeout(() => {
      const mockCourses: Course[] = [
        {
          id: "1",
          title: "Alphabétisation",
          date: "15 mars 2025",
          time: "14:00 - 16:00",
          instructor: "Marie Dupont",
          spots: 12,
          category: "Développement",
          isRegistered: false,
          description:
            "Ce cours d'alphabétisation est conçu pour les adultes qui souhaitent améliorer leurs compétences en lecture et en écriture. Nous aborderons les bases de la langue française de manière progressive et adaptée à chaque participant.",
          location: "Centre culturel, Salle 103",
          prerequisites: ["Aucun prérequis nécessaire", "Ouvert à tous les niveaux"],
          content: [
            "Introduction aux sons et aux lettres",
            "Lecture de textes simples",
            "Écriture de phrases de base",
            "Vocabulaire du quotidien",
          ],
          allInstructors: [
            { name: "Marie Dupont", role: "Formatrice principale" },
            { name: "Jean Lefebvre", role: "Assistant pédagogique" },
            { name: "Sophie Martin", role: "Spécialiste en difficultés d'apprentissage" },
            { name: "Ahmed Benali", role: "Médiateur interculturel" },
            { name: "Lucie Moreau", role: "Assistante" },
            { name: "Thomas Petit", role: "Bénévole" },
          ],
        },
        {
          id: "2",
          title: "Math-Français",
          date: "18 mars 2025",
          time: "10:00 - 12:00",
          instructor: "Jean Martin",
          spots: 8,
          category: "Design",
          isRegistered: true,
          description:
            "Ce cours combine les mathématiques de base et le français pour les adultes en réinsertion professionnelle. Nous travaillerons sur les compétences essentielles nécessaires dans le monde du travail.",
          location: "Bibliothèque municipale, Espace formation",
          prerequisites: ["Niveau élémentaire en lecture", "Connaissances basiques en calcul"],
          content: [
            "Calculs de base et résolution de problèmes",
            "Rédaction de courriers professionnels",
            "Compréhension de documents administratifs",
            "Préparation aux entretiens d'embauche",
          ],
          allInstructors: [
            { name: "Jean Martin", role: "Professeur de mathématiques" },
            { name: "Claire Dubois", role: "Professeure de français" },
            { name: "Michel Blanc", role: "Conseiller en insertion professionnelle" },
            { name: "Nadia Touré", role: "Assistante" },
          ],
        },
        {
          id: "3",
          title: "Job étudiants",
          date: "20 mars 2025",
          time: "15:30 - 17:30",
          instructor: "Sophie Leclerc",
          spots: 15,
          category: "Marketing",
          isRegistered: false,
          description:
            "Atelier destiné aux étudiants à la recherche d'un emploi à temps partiel. Nous vous aiderons à trouver et à postuler pour des jobs compatibles avec vos études.",
          location: "Maison de la jeunesse, Salle polyvalente",
          prerequisites: ["Être étudiant", "Avoir un CV à jour (ou prêt à en créer un)"],
          content: [
            "Techniques de recherche d'emploi étudiant",
            "Rédaction de CV et lettre de motivation",
            "Préparation aux entretiens",
            "Droits et obligations des étudiants travailleurs",
          ],
          allInstructors: [
            { name: "Sophie Leclerc", role: "Conseillère d'orientation" },
            { name: "Marc Dupuis", role: "Ancien RH en entreprise" },
            { name: "Julie Renard", role: "Spécialiste en droit du travail" },
          ],
        },
        {
          id: "4",
          title: "Espace public numérique",
          date: "22 mars 2025",
          time: "09:00 - 12:00",
          instructor: "Thomas Bernard",
          spots: 10,
          category: "Technologie",
          isRegistered: false,
          description:
            "Initiation aux outils numériques pour tous. Apprenez à utiliser un ordinateur, naviguer sur internet et utiliser les services en ligne essentiels dans un environnement bienveillant.",
          location: "Médiathèque, Espace multimédia",
          prerequisites: ["Aucune connaissance préalable requise"],
          content: [
            "Bases de l'utilisation d'un ordinateur",
            "Navigation internet et recherche d'informations",
            "Création et gestion d'une boîte email",
            "Démarches administratives en ligne",
            "Sécurité sur internet",
          ],
          allInstructors: [
            { name: "Thomas Bernard", role: "Médiateur numérique" },
            { name: "Émilie Rousseau", role: "Formatrice en informatique" },
            { name: "Karim Hadad", role: "Assistant" },
            { name: "Françoise Mercier", role: "Spécialiste des seniors" },
            { name: "Paul Durand", role: "Technicien" },
          ],
        },
        {
          id: "5",
          title: "Life box",
          date: "25 mars 2025",
          time: "14:00 - 16:00",
          instructor: "Claire Dubois",
          spots: 20,
          category: "Management",
          isRegistered: false,
          description:
            "Atelier de développement personnel pour apprendre à mieux gérer son quotidien. Nous aborderons des techniques de gestion du temps, d'organisation et de bien-être.",
          location: "Centre social, Salle Zen",
          prerequisites: ["Ouvert à tous"],
          content: [
            "Techniques de gestion du temps",
            "Organisation de l'espace de vie",
            "Gestion du stress et méditation",
            "Équilibre vie professionnelle/vie personnelle",
            "Habitudes saines au quotidien",
          ],
          allInstructors: [
            { name: "Claire Dubois", role: "Coach de vie" },
            { name: "Antoine Moreau", role: "Psychologue" },
            { name: "Yasmine Benali", role: "Professeure de yoga" },
            { name: "Laurent Girard", role: "Spécialiste en organisation" },
          ],
        },
        {
          id: "6",
          title: "Permanence d'emploi",
          date: "27 mars 2025",
          time: "16:00 - 18:00",
          instructor: "Lucas Petit",
          spots: 15,
          category: "Créativité",
          isRegistered: false,
          description:
            "Service d'accompagnement personnalisé pour votre recherche d'emploi. Nos conseillers vous aideront dans toutes les étapes de votre parcours professionnel.",
          location: "Maison de l'emploi, Bureaux d'entretien",
          prerequisites: ["Apporter CV et lettres de motivation si disponibles"],
          content: [
            "Entretiens individuels avec un conseiller",
            "Aide à la recherche d'offres adaptées",
            "Révision de CV et lettres de motivation",
            "Simulation d'entretiens d'embauche",
            "Suivi personnalisé",
          ],
          allInstructors: [
            { name: "Lucas Petit", role: "Conseiller en insertion professionnelle" },
            { name: "Aurélie Morel", role: "Ancienne recruteuse" },
            { name: "Stéphane Leroy", role: "Spécialiste des métiers en tension" },
            { name: "Fatima El Amrani", role: "Conseillère Pôle Emploi" },
            { name: "Benoît Duval", role: "Coach professionnel" },
          ],
        },
        {
          id: "7",
          title: "Eco énergie",
          date: "30 mars 2025",
          time: "10:00 - 13:00",
          instructor: "Emma Roux",
          spots: 12,
          category: "Développement",
          isRegistered: false,
          description:
            "Atelier pratique pour apprendre à réduire sa consommation d'énergie et adopter des comportements plus écologiques au quotidien.",
          location: "Maison de l'environnement, Salle verte",
          prerequisites: ["Intérêt pour les questions environnementales"],
          content: [
            "Comprendre sa facture d'énergie",
            "Gestes simples pour économiser l'électricité",
            "Isolation et chauffage économique",
            "Aides financières pour la rénovation énergétique",
            "Alternatives écologiques au quotidien",
          ],
          allInstructors: [
            { name: "Emma Roux", role: "Conseillère en énergie" },
            { name: "Pierre Lemoine", role: "Technicien en bâtiment" },
            { name: "Sarah Nguyen", role: "Spécialiste en écologie" },
            { name: "Mathieu Garnier", role: "Animateur environnement" },
          ],
        },
        {
          id: "8",
          title: "Médiation de quartier",
          date: "2 avril 2025",
          time: "14:00 - 16:00",
          instructor: "Nicolas Blanc",
          spots: 18,
          category: "Marketing",
          isRegistered: false,
          description:
            "Formation aux techniques de médiation pour résoudre les conflits de voisinage et améliorer le vivre-ensemble dans votre quartier.",
          location: "Centre communautaire, Grande salle",
          prerequisites: ["Habiter le quartier (de préférence)", "Volonté de s'impliquer dans la vie locale"],
          content: [
            "Bases de la communication non-violente",
            "Techniques d'écoute active",
            "Résolution de conflits",
            "Médiation interculturelle",
            "Projets collectifs de quartier",
          ],
          allInstructors: [
            { name: "Nicolas Blanc", role: "Médiateur professionnel" },
            { name: "Amina Diallo", role: "Travailleuse sociale" },
            { name: "Robert Chen", role: "Psychologue communautaire" },
            { name: "Isabelle Martin", role: "Élue locale" },
            { name: "Omar Farid", role: "Animateur socioculturel" },
            { name: "Jeanne Dubois", role: "Bénévole" },
          ],
        },
        {
          id: "9",
          title: "Repair café",
          date: "5 avril 2025",
          time: "09:00 - 12:00",
          instructor: "Aurélie Moreau",
          spots: 15,
          category: "Technologie",
          isRegistered: false,
          description:
            "Atelier collaboratif où vous apprendrez à réparer vos objets du quotidien plutôt que de les jeter. Apportez vos appareils en panne !",
          location: "Hangar associatif, Espace bricolage",
          prerequisites: ["Apporter un objet à réparer (petit électroménager, vêtement, meuble...)"],
          content: [
            "Diagnostic de pannes courantes",
            "Réparation d'appareils électroniques simples",
            "Couture et raccommodage",
            "Réparation de vélos",
            "Menuiserie de base",
          ],
          allInstructors: [
            { name: "Aurélie Moreau", role: "Coordinatrice" },
            { name: "Jacques Fournier", role: "Électronicien retraité" },
            { name: "Maria Silva", role: "Couturière" },
            { name: "Vincent Legrand", role: "Mécanicien vélo" },
            { name: "Gérard Petit", role: "Menuisier" },
            { name: "Léa Dubois", role: "Bénévole" },
          ],
        },
      ]

      // Filtrer les cours selon les paramètres
      let filteredCourses = [...mockCourses]

      if (dateFilter) {
        filteredCourses = filteredCourses.filter((course) =>
          course.date.toLowerCase().includes(dateFilter.toLowerCase()),
        )
      }

      if (categoryFilter) {
        filteredCourses = filteredCourses.filter(
          (course) => course.category.toLowerCase() === categoryFilter.toLowerCase(),
        )
      }

      setCourses(filteredCourses)
      setIsLoading(false)
    }, 800)
  }, [dateFilter, categoryFilter])

  const handleRegister = (courseId: string) => {
    // Vérifier si l'utilisateur est connecté
    if (!isAuthenticated) {
      // Ouvrir la modal d'authentification
      onAuthRequired()
      return
    }

    // Procéder à l'inscription si l'utilisateur est connecté
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              isRegistered: !course.isRegistered,
              spots: course.isRegistered ? course.spots + 1 : course.spots - 1,
            }
          : course,
      ),
    )

    // Mettre à jour le cours sélectionné si la modal est ouverte
    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse((prev) =>
        prev
          ? {
              ...prev,
              isRegistered: !prev.isRegistered,
              spots: prev.isRegistered ? prev.spots + 1 : prev.spots - 1,
            }
          : null,
      )
    }
  }

  const openCourseDetail = (course: Course) => {
    setSelectedCourse(course)
    setIsDetailModalOpen(true)
  }

  if (isLoading) {
    return <p className="text-center text-muted-foreground">Chargement des cours...</p>
  }

  if (courses.length === 0) {
    return (
      <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
        <h3 className="mb-2 text-lg font-medium">Aucun cours trouvé</h3>
        <p className="text-muted-foreground">Essayez de modifier vos filtres pour voir plus de résultats.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            onRegister={handleRegister}
            onClick={() => openCourseDetail(course)}
            displayedInstructors={2}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>

      <CourseDetailModal
        course={selectedCourse}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onRegister={handleRegister}
        isAuthenticated={isAuthenticated}
      />
    </>
  )
}

