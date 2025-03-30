
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
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
} from "recharts";

// Mock data
const doctorPerformance = [
  { name: "Dr. Johnson", consultations: 48, satisfaction: 4.8 },
  { name: "Dr. Patel", consultations: 42, satisfaction: 4.7 },
  { name: "Dr. Chen", consultations: 38, satisfaction: 4.9 },
  { name: "Dr. Garcia", consultations: 35, satisfaction: 4.6 },
  { name: "Dr. Williams", consultations: 32, satisfaction: 4.5 },
];

const ProviderPerformance = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Provider Performance</CardTitle>
        <CardDescription>Consultations and satisfaction ratings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ChartContainer
            config={{
              consultations: {
                label: "Consultations",
                color: "#1A75BC",
              },
              satisfaction: {
                label: "Satisfaction",
                color: "#4CAF50",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={doctorPerformance}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#1A75BC" />
                <YAxis yAxisId="right" orientation="right" stroke="#4CAF50" domain={[0, 5]} />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          className="border-none"
                          payload={payload}
                          formatter={(value, name) => {
                            if (name === "satisfaction") {
                              return [`${value}/5`, "Satisfaction Rating"];
                            }
                            return [`${value}`, "Consultations"];
                          }}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar yAxisId="left" dataKey="consultations" fill="#1A75BC" barSize={20} />
                <Bar yAxisId="right" dataKey="satisfaction" fill="#4CAF50" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderPerformance;
