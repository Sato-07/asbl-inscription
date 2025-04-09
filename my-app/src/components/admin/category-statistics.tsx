"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Données simulées pour les statistiques par catégorie
const categoryData = [
  { name: "EPN", value: 17, color: "#4f46e5" },
  { name: "Alphabétisation", value: 7, color: "#8b5cf6" },
  { name: "Senior & Cie", value: 20, color: "#ec4899" },
  { name: "Life box", value: 21, color: "#06b6d4" },
  { name: "Mediation de quartier", value: 12, color: "#10b981" },
  { name: "Repair café", value: 10, color: "#f59e0b" },
]

// Données détaillées par catégorie
const categoryDetails = [
  {
    name: "Développement",
    totalCourses: 2,
    totalRegistrations: 17,
    newRegistrations: 5,
    averageFillRate: 58,
    courses: [
      { name: "Alphabétisation", registrations: 8, newRegistrations: 3 },
      { name: "Eco énergie", registrations: 6, newRegistrations: 2 },
    ],
  },
  {
    name: "Design",
    totalCourses: 1,
    totalRegistrations: 7,
    newRegistrations: 2,
    averageFillRate: 88,
    courses: [{ name: "Math-Français", registrations: 7, newRegistrations: 2 }],
  },
  {
    name: "Marketing",
    totalCourses: 2,
    totalRegistrations: 20,
    newRegistrations: 8,
    averageFillRate: 61,
    courses: [
      { name: "Job étudiants", registrations: 9, newRegistrations: 4 },
      { name: "Médiation de quartier", registrations: 11, newRegistrations: 4 },
    ],
  },
  {
    name: "Technologie",
    totalCourses: 2,
    totalRegistrations: 21,
    newRegistrations: 8,
    averageFillRate: 84,
    courses: [
      { name: "Espace public numérique", registrations: 8, newRegistrations: 2 },
      { name: "Repair café", registrations: 13, newRegistrations: 6 },
    ],
  },
  {
    name: "Management",
    totalCourses: 1,
    totalRegistrations: 12,
    newRegistrations: 5,
    averageFillRate: 60,
    courses: [{ name: "Life box", registrations: 12, newRegistrations: 5 }],
  },
  {
    name: "Créativité",
    totalCourses: 1,
    totalRegistrations: 10,
    newRegistrations: 3,
    averageFillRate: 67,
    courses: [{ name: "Permanence d'emploi", registrations: 10, newRegistrations: 3 }],
  },
]

export function CategoryStatistics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Répartition des inscriptions</CardTitle>
            <CardDescription>Distribution des inscriptions par catégorie de cours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value} inscriptions`, "Total"]}
                    contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistiques par catégorie</CardTitle>
            <CardDescription>Résumé des performances par catégorie</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="registrations">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="registrations">Inscriptions</TabsTrigger>
                <TabsTrigger value="new">Nouveaux</TabsTrigger>
                <TabsTrigger value="fill">Remplissage</TabsTrigger>
              </TabsList>

              <div className="mt-4 space-y-4">
                {categoryDetails.map((category) => (
                  <div key={category.name} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{category.name}</Badge>
                      <span className="text-sm text-muted-foreground">{category.totalCourses} cours</span>
                    </div>

                    <TabsContent value="registrations" className="m-0">
                      <div className="text-right font-medium">{category.totalRegistrations} inscrits</div>
                    </TabsContent>

                    <TabsContent value="new" className="m-0">
                      <div className="text-right font-medium text-green-600">+{category.newRegistrations} nouveaux</div>
                    </TabsContent>

                    <TabsContent value="fill" className="m-0">
                      <div className="text-right font-medium">{category.averageFillRate}% rempli</div>
                    </TabsContent>
                  </div>
                ))}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Détails par catégorie</CardTitle>
          <CardDescription>Répartition des inscriptions pour chaque cours par catégorie</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Développement">
            <TabsList className="mb-4 flex flex-wrap">
              {categoryDetails.map((category) => (
                <TabsTrigger key={category.name} value={category.name}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categoryDetails.map((category) => (
              <TabsContent key={category.name} value={category.name} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.totalRegistrations} inscriptions totales, dont {category.newRegistrations} nouvelles
                    </p>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    Taux de remplissage moyen: {category.averageFillRate}%
                  </Badge>
                </div>

                <div className="space-y-2">
                  {category.courses.map((course) => (
                    <div key={course.name} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="font-medium">{course.name}</div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">{course.registrations} inscrits</div>
                        <div className="text-sm font-medium text-green-600">+{course.newRegistrations} nouveaux</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

