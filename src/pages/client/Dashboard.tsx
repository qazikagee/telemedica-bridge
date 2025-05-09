
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientDashboardLayout from '@/components/layouts/ClientDashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, MessageSquare, Video } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();
  
  // Check authorization after auth state is confirmed
  useEffect(() => {
    if (loading) return; // Wait until loading is complete
    
    if (!user) {
      navigate('/sign-in', { replace: true });
    } else if (userRole !== 'client') {
      // Redirect to the appropriate dashboard based on role
      if (userRole === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else if (userRole === 'doctor') {
        navigate('/doctor-dashboard', { replace: true });
      }
    }
  }, [user, userRole, loading, navigate]);

  // Show loading indicator while checking authentication
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-medical-blue"></div>
          <p className="mt-4 text-gray-600">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated but not a client, we show loading while redirecting
  if (userRole !== 'client') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-medical-blue"></div>
          <p className="mt-4 text-gray-600">Redirecting to appropriate dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ClientDashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to your Health Portal</h1>
        <p className="text-gray-600 mt-1">Manage your appointments and healthcare journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Upcoming</CardTitle>
            <CardDescription>Scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-medical-blue">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Past Visits</CardTitle>
            <CardDescription>Completed consultations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-medical-green-dark">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Messages</CardTitle>
            <CardDescription>Provider conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-medical-blue-dark">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Prescriptions</CardTitle>
            <CardDescription>Active medications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-medical-green">1</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Next Appointment</CardTitle>
              <CardDescription>Your upcoming healthcare visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-medical-gray-light p-4 rounded-lg flex items-start gap-4">
                  <div className="bg-medical-blue rounded-full p-2 text-white">
                    <Video className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Virtual Consultation</h3>
                    <p className="text-sm text-gray-600">Dr. Sarah Johnson - General Medicine</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Tomorrow, May 10, 2025</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>10:30 AM - 11:00 AM</span>
                    </div>
                  </div>
                  <Button className="bg-medical-blue hover:bg-medical-blue-dark" onClick={() => navigate('/client-appointments')}>
                    Details
                  </Button>
                </div>
                <div className="bg-medical-gray-light p-4 rounded-lg flex items-start gap-4">
                  <div className="bg-medical-green rounded-full p-2 text-white">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Follow-up Chat</h3>
                    <p className="text-sm text-gray-600">Dr. Michael Chen - Dermatology</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Friday, May 12, 2025</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>2:00 PM - 2:15 PM</span>
                    </div>
                  </div>
                  <Button className="bg-medical-blue hover:bg-medical-blue-dark" onClick={() => navigate('/client-appointments')}>
                    Details
                  </Button>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button onClick={() => navigate('/client-book-appointment')} className="bg-medical-blue hover:bg-medical-blue-dark">
                  Book New Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Health Resources</CardTitle>
              <CardDescription>Helpful information for your care</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="block p-3 bg-medical-gray-light rounded-lg hover:bg-medical-gray text-gray-900 hover:text-medical-blue transition-colors">
                    <h4 className="font-medium">Managing Seasonal Allergies</h4>
                    <p className="text-sm text-gray-600">Tips and treatments for spring allergies</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-3 bg-medical-gray-light rounded-lg hover:bg-medical-gray text-gray-900 hover:text-medical-blue transition-colors">
                    <h4 className="font-medium">COVID-19 Updates</h4>
                    <p className="text-sm text-gray-600">Latest guidelines and information</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-3 bg-medical-gray-light rounded-lg hover:bg-medical-gray text-gray-900 hover:text-medical-blue transition-colors">
                    <h4 className="font-medium">Mental Health Awareness</h4>
                    <p className="text-sm text-gray-600">Resources for managing stress and anxiety</p>
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientDashboardLayout>
  );
};

export default Dashboard;
