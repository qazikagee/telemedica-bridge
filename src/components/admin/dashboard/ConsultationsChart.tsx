
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  ResponsiveContainer,
} from "recharts";

// Mock data
const monthlyConsultations = [
  { name: "Jan", count: 120 },
  { name: "Feb", count: 138 },
  { name: "Mar", count: 145 },
  { name: "Apr", count: 162 },
  { name: "May", count: 180 },
];

const ConsultationsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Consultations</CardTitle>
        <CardDescription>Number of consultations over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer
            config={{
              consultations: {
                label: "Consultations",
                color: "#1A75BC",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyConsultations}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          className="border-none"
                          label={`${payload[0].payload.name}`}
                          labelKey="name"
                          payload={payload}
                          nameKey="dataKey"
                          labelFormatter={(label) => label}
                          formatter={(value) => [`${value}`, "Consultations"]}
                        />
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="var(--color-consultations)"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsultationsChart;
