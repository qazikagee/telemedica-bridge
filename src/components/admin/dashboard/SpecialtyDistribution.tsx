
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Mock data
const specialtyDistribution = [
  { name: "General Medicine", value: 45 },
  { name: "Dermatology", value: 25 },
  { name: "Mental Health", value: 20 },
  { name: "Pediatrics", value: 10 },
  { name: "Other", value: 15 },
];

const pieColors = ["#1A75BC", "#4CAF50", "#FF9800", "#9C27B0", "#607D8B"];

const SpecialtyDistribution = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Specialty Distribution</CardTitle>
        <CardDescription>Consultation distribution by specialty</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={{
              specialty: {
                label: "Specialty",
                color: "#1A75BC",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={specialtyDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {specialtyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          className="border-none"
                          payload={payload}
                          formatter={(value, name) => [`${value} consultations`, name]}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecialtyDistribution;
