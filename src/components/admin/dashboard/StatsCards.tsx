
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users, Activity, Calendar, DollarSign } from "lucide-react";

const StatsCards = () => {
  return (
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
  );
};

export default StatsCards;
