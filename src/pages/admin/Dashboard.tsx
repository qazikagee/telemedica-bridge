
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '@/components/layouts/AdminDashboardLayout';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import StatsCards from '@/components/admin/dashboard/StatsCards';
import DashboardTabs from '@/components/admin/dashboard/DashboardTabs';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();
  
  // Check authorization after auth state is confirmed
  useEffect(() => {
    if (loading) return; // Wait until loading is complete
    
    console.log("AdminDashboard - Auth check:", { user: !!user, userRole, loading });
    
    if (!user) {
      console.log("No user found, redirecting to sign-in");
      navigate('/sign-in', { replace: true });
    } else if (userRole !== 'admin') {
      console.log("Unauthorized access to admin dashboard", { userRole });
      // Redirect to the appropriate dashboard based on role
      if (userRole === 'doctor') {
        navigate('/doctor-dashboard', { replace: true });
      } else {
        navigate('/client-dashboard', { replace: true });
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

  // If user is authenticated but not an admin, we show loading while redirecting
  if (userRole !== 'admin') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-medical-blue"></div>
          <p className="mt-4 text-gray-600">Redirecting to appropriate dashboard...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated and is an admin, render the dashboard
  return (
    <AdminDashboardLayout>
      <DashboardHeader />
      <StatsCards />
      <DashboardTabs />
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
