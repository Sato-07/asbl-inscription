"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, Edit, Eye, Loader2, LogOut, Mail, MapPin, Phone, Save, X } from "lucide-react"

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout, updateProfile, unenrollCourse, getUserProfile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  })

  // Charger les données du profil utilisateur
  useEffect(() => {
    if (isAuthenticated) {
      const profile = getUserProfile()
      if (profile) {
        setProfileData({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
        })
      }
    }
  }, [isAuthenticated, getUserProfile])

  // Rediriger vers la page d'accueil si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/")
    }
  }, [isLoading, isAuthenticated, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async () => {
    setIsSaving(true)

    try {
      await updateProfile(profileData)

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès.",
      })

      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancelCourse = async (courseId: string) => {
    try {
      await unenrollCourse(courseId)

      toast({
        title: "Inscription annulée",
        description: "Votre inscription au cours a été annulée.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'annulation de l'inscription.",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Chargement de votre profil...</span>
      </div>
    )
  }

  const profile = getUserProfile()
  if (!profile) return null

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mon profil</h1>
        <p className="text-muted-foreground">Gérez vos informations personnelles et vos inscriptions aux cours</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Sidebar avec informations utilisateur */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Photo de profil" />
                  <AvatarFallback className="text-2xl">
                    {profileData.firstName.charAt(0)}
                    {profileData.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4 text-center text-xl">
                  {profileData.firstName} {profileData.lastName}
                </CardTitle>
                <CardDescription className="text-center">Membre depuis {profile.joinDate}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{profileData.address}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier mon profil
              </Button>
              <Button variant="ghost" className="w-full text-destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Se déconnecter
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Cours à venir</span>
                  <span className="font-medium">{profile.courses.length}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Cours terminés</span>
                  <span className="font-medium">{profile.pastCourses.length}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total des inscriptions</span>
                  <span className="font-medium">{profile.courses.length + profile.pastCourses.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal */}
        <div className="md:col-span-2">
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>Modifier mon profil</CardTitle>
                <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" name="lastName" value={profileData.lastName} onChange={handleInputChange} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" name="phone" value={profileData.phone} onChange={handleInputChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse</Label>
                    <Input id="address" name="address" value={profileData.address} onChange={handleInputChange} />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upcoming">Cours à venir ({profile.courses.length})</TabsTrigger>
                <TabsTrigger value="past">Cours terminés ({profile.pastCourses.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="mt-4 space-y-4">
                {profile.courses.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Aucun cours à venir</h3>
                      <p className="mt-2 text-center text-muted-foreground">
                        Vous n'êtes inscrit à aucun cours pour le moment.
                      </p>
                      <Button className="mt-4" onClick={() => router.push("/")}>
                        Parcourir les cours
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  profile.courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onCancel={() => handleCancelCourse(course.id)}
                      showCancelButton
                    />
                  ))
                )}
              </TabsContent>

              <TabsContent value="past" className="mt-4 space-y-4">
                {profile.pastCourses.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Aucun cours terminé</h3>
                      <p className="mt-2 text-center text-muted-foreground">
                        Vous n'avez pas encore participé à des cours.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  profile.pastCourses.map((course) => (
                    <CourseCard key={course.id} course={course} showCancelButton={false} />
                  ))
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  )
}

interface CourseCardProps {
  course: {
    id: string
    title: string
    date: string
    time: string
    location: string
    category: string
    instructor: string
    description?: string
  }
  onCancel?: () => void
  showCancelButton: boolean
}

function CourseCard({ course, onCancel, showCancelButton }: CourseCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.instructor}</CardDescription>
          </div>
          <Badge className="bg-[#E7A150] text-white">{course.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{course.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{course.time}</span>
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{course.location}</span>
          </div>
          {course.description && (
            <div className="mt-2 sm:col-span-2">
              <p className="text-sm text-muted-foreground">{course.description}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Eye className="mr-2 h-4 w-4" />
          Détails
        </Button>
        {showCancelButton && onCancel && (
          <Button variant="ghost" size="sm" className="text-destructive" onClick={onCancel}>
            <X className="mr-2 h-4 w-4" />
            Annuler l'inscription
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

