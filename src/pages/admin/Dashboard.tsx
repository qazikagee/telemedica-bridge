import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '@/components/layouts/AdminDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, RefreshCw, Users, Activity, DollarSign } from "lucide-react";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

const monthlyConsultations = [
  { name: "Jan", count: 120 },
  { name: "Feb", count: 138 },
  { name: "Mar", count: 145 },
  { name: "Apr", count: 162 },
  { name: "May", count: 180 },
];

const specialtyDistribution = [
  { name: "General Medicine", value: 45 },
  { name: "Dermatology", value: 25 },
  { name: "Mental Health", value: 20 },
  { name: "Pediatrics", value: 10 },
  { name: "Other", value: 15 },
];

const doctorPerformance = [
  { name: "Dr. Johnson", consultations: 48, satisfaction: 4.8 },
  { name: "Dr. Patel", consultations: 42, satisfaction: 4.7 },
  { name: "Dr. Chen", consultations: 38, satisfaction: 4.9 },
  { name: "Dr. Garcia", consultations: 35, satisfaction: 4.6 },
  { name: "Dr. Williams", consultations: 32, satisfaction: 4.5 },
];

const pieColors = ["#1A75BC", "#4CAF50", "#FF9800", "#9C27B0", "#607D8B"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'admin') {
      navigate('/sign-in');
    }
  }, [navigate]);

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform analytics and operations overview</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2 items-center">
          <span className="text-sm text-gray-500">Last updated: May 5, 2025, 9:32 AM</span>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Users</CardTitle>
            <CardDescription>Platform members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-medical-blue flex items-center">
              <Users className="mr-2 h-6 w-6 text-medical-blue-dark" />
              1,248
            </div>
            <p className="text-sm text-green-600 mt-1">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Providers</CardTitle>
            <CardDescription>Active healthcare providers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-medical-green-dark flex items-center">
              <Activity className="mr-2 h-6 w-6 text-medical-green" />
              32
            </div>
            <p className="text-sm text-green-600 mt-1">+2 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Consultations</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-medical-blue-dark flex items-center">
              <Calendar className="mr-2 h-6 w-6 text-medical-blue-light" />
              180
            </div>
            <p className="text-sm text-green-600 mt-1">+11.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Revenue</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-medical-green flex items-center">
              <DollarSign className="mr-2 h-6 w-6 text-medical-green-dark" />
              $12,650
            </div>
            <p className="text-sm text-green-600 mt-1">+9.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
        </TabsContent>
        
        <TabsContent value="providers" className="mt-6">
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
        </TabsContent>
        
        <TabsContent value="consultations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Details</CardTitle>
              <CardDescription>
                Detailed analytics will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-16 bg-gray-50 rounded-md">
                <div className="text-center">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Consultation Analytics</h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    Detailed analytics and insights for consultations will be displayed here.
                    Track factors like duration, outcomes, and patient satisfaction.
                  </p>
                  <Button className="mt-4 bg-medical-blue hover:bg-medical-blue-dark">
                    Generate Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
