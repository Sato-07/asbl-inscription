"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Type pour les cours
interface Course {
  id: string
  title: string
  date: string
  time: string
  location: string
  category: string
  instructor: string
  description?: string
  isUpcoming: boolean
}

// Type pour le profil utilisateur étendu
interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  joinDate: string
  avatar?: string
  courses: Course[]
  pastCourses: Course[]
}

// Type pour l'utilisateur de base (pour la compatibilité)
interface User {
  id: string
  name: string
  email: string
  profile: UserProfile
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>
  enrollCourse: (courseId: string) => Promise<void>
  unenrollCourse: (courseId: string) => Promise<void>
  getUserProfile: () => UserProfile | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Données simulées pour les cours
const availableCourses: Course[] = [
  {
    id: "1",
    title: "Alphabétisation",
    date: "15 mars 2025",
    time: "14:00 - 16:00",
    location: "Centre culturel, Salle 103",
    category: "Développement",
    instructor: "Marie Dupont",
    description:
      "Ce cours d'alphabétisation est conçu pour les adultes qui souhaitent améliorer leurs compétences en lecture et en écriture.",
    isUpcoming: true,
  },
  {
    id: "2",
    title: "Math-Français",
    date: "18 mars 2025",
    time: "10:00 - 12:00",
    location: "Bibliothèque municipale, Espace formation",
    category: "Design",
    instructor: "Jean Martin",
    description:
      "Ce cours combine les mathématiques de base et le français pour les adultes en réinsertion professionnelle.",
    isUpcoming: true,
  },
  {
    id: "3",
    title: "Job étudiants",
    date: "20 mars 2025",
    time: "15:30 - 17:30",
    location: "Maison de la jeunesse, Salle polyvalente",
    category: "Marketing",
    instructor: "Sophie Leclerc",
    description: "Atelier destiné aux étudiants à la recherche d'un emploi à temps partiel.",
    isUpcoming: true,
  },
  {
    id: "4",
    title: "Espace public numérique",
    date: "22 mars 2025",
    time: "09:00 - 12:00",
    location: "Médiathèque, Espace multimédia",
    category: "Technologie",
    instructor: "Thomas Bernard",
    description: "Initiation aux outils numériques pour tous.",
    isUpcoming: true,
  },
  {
    id: "5",
    title: "Life box",
    date: "25 mars 2025",
    time: "14:00 - 16:00",
    location: "Centre social, Salle Zen",
    category: "Management",
    instructor: "Claire Dubois",
    description: "Atelier de développement personnel pour apprendre à mieux gérer son quotidien.",
    isUpcoming: true,
  },
  {
    id: "6",
    title: "Permanence d'emploi",
    date: "27 mars 2025",
    time: "16:00 - 18:00",
    location: "Maison de l'emploi, Bureaux d'entretien",
    category: "Créativité",
    instructor: "Lucas Petit",
    description: "Service d'accompagnement personnalisé pour votre recherche d'emploi.",
    isUpcoming: true,
  },
  {
    id: "7",
    title: "Eco énergie",
    date: "30 janvier 2025",
    time: "10:00 - 13:00",
    location: "Maison de l'environnement, Salle verte",
    category: "Développement",
    instructor: "Emma Roux",
    description: "Atelier pratique pour apprendre à réduire sa consommation d'énergie.",
    isUpcoming: false,
  },
  {
    id: "8",
    title: "Médiation de quartier",
    date: "2 février 2025",
    time: "14:00 - 16:00",
    location: "Centre communautaire, Grande salle",
    category: "Marketing",
    instructor: "Nicolas Blanc",
    description: "Formation aux techniques de médiation pour résoudre les conflits de voisinage.",
    isUpcoming: false,
  },
  {
    id: "9",
    title: "Repair café",
    date: "5 février 2025",
    time: "09:00 - 12:00",
    location: "Hangar associatif, Espace bricolage",
    category: "Technologie",
    instructor: "Aurélie Moreau",
    description: "Atelier collaboratif où vous apprendrez à réparer vos objets du quotidien.",
    isUpcoming: false,
  },
]

// Créer un profil utilisateur par défaut
const createDefaultProfile = (userId: string, name: string, email: string): UserProfile => {
  const nameParts = name.split(" ")
  const firstName = nameParts[0] || ""
  const lastName = nameParts.slice(1).join(" ") || ""

  // Simuler des inscriptions à des cours
  const enrolledCourseIds = ["1", "4", "5"] // IDs des cours auxquels l'utilisateur est inscrit
  const pastCourseIds = ["7", "9"] // IDs des cours passés auxquels l'utilisateur a participé

  return {
    id: userId,
    firstName,
    lastName,
    email,
    phone: "06 12 34 56 78",
    address: "123 Rue de Paris, 75001 Paris",
    joinDate: "15 janvier 2025",
    courses: availableCourses.filter((course) => enrolledCourseIds.includes(course.id) && course.isUpcoming),
    pastCourses: availableCourses.filter((course) => pastCourseIds.includes(course.id) && !course.isUpcoming),
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simuler la vérification de l'authentification
    const checkAuth = () => {
      setIsLoading(true)

      // Vérifier si l'utilisateur est déjà connecté (localStorage)
      const savedUser = localStorage.getItem("user")

      setTimeout(() => {
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
        setIsLoading(false)
      }, 500)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simuler une API de connexion
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Utilisateur fictif pour la démo
        const mockUser = {
          id: "1",
          name: "Jean Dupont",
          email,
          profile: createDefaultProfile("1", "Jean Dupont", email),
        }

        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        setIsLoading(false)
        resolve()
      }, 800)
    })
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simuler une API d'inscription
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Utilisateur fictif pour la démo
        const mockUser = {
          id: "1",
          name,
          email,
          profile: createDefaultProfile("1", name, email),
        }

        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        setIsLoading(false)
        resolve()
      }, 800)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (user) {
          const updatedProfile = { ...user.profile, ...profileData }
          const updatedUser = { ...user, profile: updatedProfile }

          // Mettre à jour le nom si le prénom ou le nom a changé
          if (profileData.firstName || profileData.lastName) {
            const newFirstName = profileData.firstName || user.profile.firstName
            const newLastName = profileData.lastName || user.profile.lastName
            updatedUser.name = `${newFirstName} ${newLastName}`.trim()
          }

          setUser(updatedUser)
          localStorage.setItem("user", JSON.stringify(updatedUser))
        }
        resolve()
      }, 600)
    })
  }

  const enrollCourse = async (courseId: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (user) {
          const course = availableCourses.find((c) => c.id === courseId)
          if (course && !user.profile.courses.some((c) => c.id === courseId)) {
            const updatedCourses = [...user.profile.courses, course]
            const updatedProfile = { ...user.profile, courses: updatedCourses }
            const updatedUser = { ...user, profile: updatedProfile }

            setUser(updatedUser)
            localStorage.setItem("user", JSON.stringify(updatedUser))
          }
        }
        resolve()
      }, 600)
    })
  }

  const unenrollCourse = async (courseId: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (user) {
          const updatedCourses = user.profile.courses.filter((c) => c.id !== courseId)
          const updatedProfile = { ...user.profile, courses: updatedCourses }
          const updatedUser = { ...user, profile: updatedProfile }

          setUser(updatedUser)
          localStorage.setItem("user", JSON.stringify(updatedUser))
        }
        resolve()
      }, 600)
    })
  }

  const getUserProfile = (): UserProfile | null => {
    return user?.profile || null
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        enrollCourse,
        unenrollCourse,
        getUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

