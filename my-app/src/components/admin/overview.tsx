"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Données simulées pour le graphique
const data = [
  { name: "1 Mar", total: 4 },
  { name: "2 Mar", total: 3 },
  { name: "3 Mar", total: 2 },
  { name: "4 Mar", total: 6 },
  { name: "5 Mar", total: 4 },
  { name: "6 Mar", total: 3 },
  { name: "7 Mar", total: 5 },
  { name: "8 Mar", total: 7 },
  { name: "9 Mar", total: 4 },
  { name: "10 Mar", total: 6 },
  { name: "11 Mar", total: 8 },
  { name: "12 Mar", total: 9 },
  { name: "13 Mar", total: 7 },
  { name: "14 Mar", total: 5 },
  { name: "15 Mar", total: 4 },
  { name: "16 Mar", total: 6 },
  { name: "17 Mar", total: 7 },
  { name: "18 Mar", total: 8 },
  { name: "19 Mar", total: 10 },
  { name: "20 Mar", total: 9 },
  { name: "21 Mar", total: 8 },
  { name: "22 Mar", total: 7 },
  { name: "23 Mar", total: 6 },
  { name: "24 Mar", total: 8 },
  { name: "25 Mar", total: 9 },
  { name: "26 Mar", total: 11 },
  { name: "27 Mar", total: 12 },
  { name: "28 Mar", total: 10 },
  { name: "29 Mar", total: 9 },
  { name: "30 Mar", total: 8 },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.split(" ")[0]}
        />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          formatter={(value: number) => [`${value} inscriptions`, "Total"]}
          labelFormatter={(label) => `${label}`}
          contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
        />
        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

