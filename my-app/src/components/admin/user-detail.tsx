"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Mail, Phone, X } from "lucide-react"

interface Course {
  id: string
  title: string
  date: string
  category: string
}

interface UserDetailProps {
  user: {
    id: string
    firstName: string
    lastName: string
    name: string
    email: string
    phone: string
    avatar: string
    registrations: number
    lastActive: string
    status: string
    courses: Course[]
  }
  onClose: () => void
}

export function UserDetail({ user, onClose }: UserDetailProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // Ici, vous implémenteriez la logique pour sauvegarder les modifications
    setIsEditing(false)
    // Simuler une mise à jour réussie
    alert("Utilisateur mis à jour avec succès")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Détails de l'utilisateur</CardTitle>
            <CardDescription>Informations complètes et cours auxquels l'utilisateur est inscrit</CardDescription>
          </div>
          <Badge variant={user.status === "Actif" ? "default" : "outline"}>{user.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {isEditing ? (
              <div className="grid gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" name="firstName" value={userData.firstName} onChange={handleInputChange} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" name="lastName" value={userData.lastName} onChange={handleInputChange} />
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">ID: {user.id}</p>
              </div>
            )}
          </div>

          <div className="ml-auto space-y-2">
            {isEditing ? (
              <>
                <div className="grid gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" value={userData.email} onChange={handleInputChange} />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" name="phone" value={userData.phone} onChange={handleInputChange} />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Dernière activité: {user.lastActive}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <Tabs defaultValue="courses">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courses">Cours inscrits ({user.courses.length})</TabsTrigger>
            <TabsTrigger value="activity">Activité récente</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-4 pt-4">
            {user.courses.length === 0 ? (
              <div className="rounded-md border p-4 text-center text-muted-foreground">
                Cet utilisateur n'est inscrit à aucun cours.
              </div>
            ) : (
              <div className="space-y-3">
                {user.courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-muted-foreground">{course.date}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{course.category}</Badge>
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Désinscrire</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                Ajouter une inscription
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="pt-4">
            <div className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Détails</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {user.courses.map((course, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                        <TableCell>Inscription</TableCell>
                        <TableCell>S'est inscrit au cours "{course.title}"</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
                      <TableCell>Connexion</TableCell>
                      <TableCell>Dernière connexion à la plateforme</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>{new Date(Date.now() - 86400000).toLocaleDateString()}</TableCell>
                      <TableCell>Mise à jour</TableCell>
                      <TableCell>A mis à jour ses informations personnelles</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave}>Enregistrer</Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button onClick={() => setIsEditing(true)}>Modifier l'utilisateur</Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

