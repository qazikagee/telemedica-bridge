
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConsultationsChart from './ConsultationsChart';
import SpecialtyDistribution from './SpecialtyDistribution';
import ProviderPerformance from './ProviderPerformance';
import ConsultationDetails from './ConsultationDetails';

const DashboardTabs = () => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full md:w-[400px] grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="providers">Providers</TabsTrigger>
        <TabsTrigger value="consultations">Consultations</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConsultationsChart />
          <SpecialtyDistribution />
        </div>
      </TabsContent>
      
      <TabsContent value="providers" className="mt-6">
        <ProviderPerformance />
      </TabsContent>
      
      <TabsContent value="consultations" className="mt-6">
        <ConsultationDetails />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
