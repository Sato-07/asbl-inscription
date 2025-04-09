"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Phone, Mail, Search, Calendar, X } from "lucide-react"

// Données simulées pour les statistiques d'utilisateurs
const userData = [
  { name: "Jan", nouveaux: 4, actifs: 12 },
  { name: "Fév", nouveaux: 6, actifs: 18 },
  { name: "Mar", nouveaux: 10, actifs: 28 },
  { name: "Avr", nouveaux: 8, actifs: 36 },
  { name: "Mai", nouveaux: 12, actifs: 48 },
  { name: "Juin", nouveaux: 9, actifs: 57 },
  { name: "Juil", nouveaux: 7, actifs: 64 },
  { name: "Août", nouveaux: 5, actifs: 69 },
  { name: "Sep", nouveaux: 8, actifs: 77 },
  { name: "Oct", nouveaux: 11, actifs: 88 },
  { name: "Nov", nouveaux: 13, actifs: 101 },
  { name: "Déc", nouveaux: 7, actifs: 108 },
]

// Données simulées pour les utilisateurs avec informations détaillées
const activeUsers = [
  {
    id: "1",
    firstName: "Sophie",
    lastName: "Martin",
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    phone: "06 12 34 56 78",
    avatar: "/placeholder.svg?height=32&width=32",
    registrations: 4,
    lastActive: "Il y a 2 heures",
    status: "Actif",
    courses: [
      { id: "1", title: "Alphabétisation", date: "15 mars 2025", category: "Développement" },
      { id: "4", title: "Espace public numérique", date: "22 mars 2025", category: "Technologie" },
      { id: "5", title: "Life box", date: "25 mars 2025", category: "Management" },
      { id: "9", title: "Repair café", date: "5 avril 2025", category: "Technologie" },
    ],
  },
  {
    id: "2",
    firstName: "Thomas",
    lastName: "Dubois",
    name: "Thomas Dubois",
    email: "thomas.dubois@example.com",
    phone: "07 23 45 67 89",
    avatar: "/placeholder.svg?height=32&width=32",
    registrations: 3,
    lastActive: "Il y a 1 jour",
    status: "Actif",
    courses: [
      { id: "2", title: "Math-Français", date: "18 mars 2025", category: "Design" },
      { id: "6", title: "Permanence d'emploi", date: "27 mars 2025", category: "Créativité" },
      { id: "7", title: "Eco énergie", date: "30 mars 2025", category: "Développement" },
    ],
  },
  {
    id: "3",
    firstName: "Emma",
    lastName: "Petit",
    name: "Emma Petit",
    email: "emma.petit@example.com",
    phone: "06 34 56 78 90",
    avatar: "/placeholder.svg?height=32&width=32",
    registrations: 3,
    lastActive: "Il y a 3 jours",
    status: "Actif",
    courses: [
      { id: "3", title: "Job étudiants", date: "20 mars 2025", category: "Marketing" },
      { id: "5", title: "Life box", date: "25 mars 2025", category: "Management" },
      { id: "8", title: "Médiation de quartier", date: "2 avril 2025", category: "Marketing" },
    ],
  },
  {
    id: "4",
    firstName: "Lucas",
    lastName: "Bernard",
    name: "Lucas Bernard",
    email: "lucas.bernard@example.com",
    phone: "07 45 67 89 01",
    avatar: "/placeholder.svg?height=32&width=32",
    registrations: 2,
    lastActive: "Il y a 5 jours",
    status: "Inactif",
    courses: [
      { id: "1", title: "Alphabétisation", date: "15 mars 2025", category: "Développement" },
      { id: "9", title: "Repair café", date: "5 avril 2025", category: "Technologie" },
    ],
  },
  {
    id: "5",
    firstName: "Camille",
    lastName: "Leroy",
    name: "Camille Leroy",
    email: "camille.leroy@example.com",
    phone: "06 56 78 90 12",
    avatar: "/placeholder.svg?height=32&width=32",
    registrations: 2,
    lastActive: "Il y a 1 semaine",
    status: "Inactif",
    courses: [
      { id: "4", title: "Espace public numérique", date: "22 mars 2025", category: "Technologie" },
      { id: "7", title: "Eco énergie", date: "30 mars 2025", category: "Développement" },
    ],
  },
  {
    id: "6",
    firstName: "Antoine",
    lastName: "Moreau",
    name: "Antoine Moreau",
    email: "antoine.moreau@example.com",
    phone: "07 67 89 01 23",
    avatar: "/placeholder.svg?height=32&width=32",
    registrations: 2,
    lastActive: "Il y a 2 semaines",
    status: "Inactif",
    courses: [
      { id: "2", title: "Math-Français", date: "18 mars 2025", category: "Design" },
      { id: "6", title: "Permanence d'emploi", date: "27 mars 2025", category: "Créativité" },
    ],
  },
  {
    id: "7",
    firstName: "Julie",
    lastName: "Fournier",
    name: "Julie Fournier",
    email: "julie.fournier@example.com",
    phone: "06 78 90 12 34",
    avatar: "/placeholder.svg?height=32&width=32",
    registrations: 1,
    lastActive: "Il y a 3 semaines",
    status: "Inactif",
    courses: [{ id: "3", title: "Job étudiants", date: "20 mars 2025", category: "Marketing" }],
  },
  {
    id: "8",
    firstName: "Nicolas",
    lastName: "Girard",
    name: "Nicolas Girard",
    email: "nicolas.girard@example.com",
    phone: "07 89 01 23 45",
    avatar: "/placeholder.svg?height=32&width=32",
    registrations: 1,
    lastActive: "Il y a 1 mois",
    status: "Inactif",
    courses: [{ id: "8", title: "Médiation de quartier", date: "2 avril 2025", category: "Marketing" }],
  },
]

export function UserStatistics() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<(typeof activeUsers)[0] | null>(null)
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false)

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = activeUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.courses.some((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const openUserDetail = (user: (typeof activeUsers)[0]) => {
    setSelectedUser(user)
    setIsUserDetailOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total des utilisateurs</CardTitle>
            <CardDescription>Nombre d'utilisateurs inscrits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">108</div>
            <p className="text-xs text-muted-foreground">+43 nouveaux utilisateurs ce trimestre</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Utilisateurs actifs</CardTitle>
            <CardDescription>Utilisateurs avec au moins une inscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">80.5% des utilisateurs inscrits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Inscriptions moyennes</CardTitle>
            <CardDescription>Nombre moyen d'inscriptions par utilisateur</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1.5</div>
            <p className="text-xs text-muted-foreground">+0.3 par rapport au trimestre précédent</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Évolution des utilisateurs</CardTitle>
          <CardDescription>Nouveaux utilisateurs et utilisateurs actifs par mois</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                />
                <Bar dataKey="nouveaux" name="Nouveaux utilisateurs" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actifs" name="Utilisateurs actifs" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des utilisateurs</CardTitle>
          <CardDescription>Informations détaillées sur les utilisateurs inscrits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 pb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un utilisateur..."
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
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Inscriptions</TableHead>
                  <TableHead>Dernière activité</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.firstName.charAt(0)}
                            {user.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-xs text-muted-foreground">ID: {user.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-2 h-3 w-3 text-muted-foreground" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="mr-2 h-3 w-3 text-muted-foreground" />
                          {user.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-medium">{user.registrations}</span>
                        {user.registrations > 0 && (
                          <div className="mt-1 flex flex-wrap justify-end gap-1">
                            {user.courses.slice(0, 2).map((course) => (
                              <Badge key={course.id} variant="outline" className="text-xs">
                                {course.title}
                              </Badge>
                            ))}
                            {user.courses.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{user.courses.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{user.lastActive}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Actif" ? "default" : "outline"}>{user.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openUserDetail(user)}>
                        <span className="sr-only">Voir détails</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de détail utilisateur */}
      <Dialog open={isUserDetailOpen} onOpenChange={setIsUserDetailOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Détails de l'utilisateur</DialogTitle>
            <DialogDescription>Informations complètes et cours auxquels l'utilisateur est inscrit</DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                    <AvatarFallback className="text-lg">
                      {selectedUser.firstName.charAt(0)}
                      {selectedUser.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">ID: {selectedUser.id}</p>
                    <Badge className="mt-2" variant={selectedUser.status === "Actif" ? "default" : "outline"}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                </div>

                <div className="ml-auto space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedUser.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Dernière activité: {selectedUser.lastActive}</span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="courses">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="courses">Cours inscrits ({selectedUser.courses.length})</TabsTrigger>
                  <TabsTrigger value="activity">Activité récente</TabsTrigger>
                </TabsList>

                <TabsContent value="courses" className="space-y-4 pt-4">
                  {selectedUser.courses.length === 0 ? (
                    <div className="rounded-md border p-4 text-center text-muted-foreground">
                      Cet utilisateur n'est inscrit à aucun cours.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {selectedUser.courses.map((course) => (
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
                          {selectedUser.courses.map((course, index) => (
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

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsUserDetailOpen(false)}>
                  Fermer
                </Button>
                <Button>Modifier l'utilisateur</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

