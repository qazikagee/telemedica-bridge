
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const DashboardHeader = () => {
  return (
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
  );
};

export default DashboardHeader;
