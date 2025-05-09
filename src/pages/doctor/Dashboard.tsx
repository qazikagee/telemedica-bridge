
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorDashboardLayout from '@/components/layouts/DoctorDashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock, Users, VideoIcon, Calendar } from 'lucide-react';

// Mock upcoming appointments for today
const todayAppointments = [
  { 
    id: "1", 
    time: "10:30 AM", 
    patientName: "John Smith", 
    status: "Confirmed", 
    type: "Video",
    reason: "Follow-up on blood pressure medication"
  },
  { 
    id: "2", 
    time: "11:15 AM", 
    patientName: "Maria Garcia", 
    status: "Checked In", 
    type: "Video",
    reason: "Skin rash evaluation"
  },
  { 
    id: "3", 
    time: "1:45 PM", 
    patientName: "David Johnson", 
    status: "Confirmed", 
    type: "Chat",
    reason: "Medication refill request"
  },
  { 
    id: "4", 
    time: "3:00 PM", 
    patientName: "Emily Wilson", 
    status: "Confirmed", 
    type: "Video",
    reason: "Chronic headache consultation"
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated and is a doctor
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'doctor') {
      navigate('/sign-in');
    }
  }, [navigate]);

  const handleStartSession = (appointmentId: string) => {
    navigate(`/doctor-video-session/${appointmentId}`);
  };

  return (
    <DoctorDashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Dr. Johnson</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Today's Schedule</CardTitle>
            <CardDescription>Appointments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-medical-blue flex items-center">
              <Calendar className="mr-2 h-6 w-6 text-medical-blue-dark" />
              4
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Waiting Room</CardTitle>
            <CardDescription>Patients ready for consultation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-medical-green-dark flex items-center">
              <Users className="mr-2 h-6 w-6 text-medical-green" />
              1
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Upcoming</CardTitle>
            <CardDescription>For this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-medical-blue-dark flex items-center">
              <Clock className="mr-2 h-6 w-6 text-medical-blue-light" />
              18
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Completed</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-medical-green flex items-center">
              <VideoIcon className="mr-2 h-6 w-6 text-medical-green-dark" />
              42
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="today">Today's Schedule</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Week</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="mt-6">
          <Alert className="mb-4 bg-medical-blue text-white border-none">
            <AlertTitle className="text-white">Next Appointment</AlertTitle>
            <AlertDescription className="text-blue-100">
              Maria Garcia at 11:15 AM (Checked In) - Skin rash evaluation
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
              <CardDescription>May 10, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-start p-4 border rounded-lg bg-gray-50">
                    <div className="w-20 text-center">
                      <div className="text-sm font-medium text-gray-900">{appointment.time}</div>
                      <div className="text-xs text-gray-500">30 min</div>
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                          <p className="text-sm text-gray-600 mt-1">{appointment.reason}</p>
                        </div>
                        <div className="flex items-center mt-2 sm:mt-0">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === "Checked In" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-blue-100 text-blue-800"
                          }`}>
                            {appointment.status}
                          </span>
                          <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {appointment.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="ml-4 bg-medical-blue hover:bg-medical-blue-dark"
                      onClick={() => handleStartSession(appointment.id)}
                      disabled={appointment.status !== "Checked In"}
                    >
                      Start
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p>Your upcoming appointments for the week will appear here.</p>
                <p className="mt-2 text-sm">You have 18 scheduled appointments this week.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => navigate('/doctor-appointments')}
                >
                  View Full Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DoctorDashboardLayout>
  );
};

export default Dashboard;
