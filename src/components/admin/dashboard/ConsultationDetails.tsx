
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const ConsultationDetails = () => {
  return (
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
  );
};

export default ConsultationDetails;
