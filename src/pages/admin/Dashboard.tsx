
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '@/components/layouts/AdminDashboardLayout';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import StatsCards from '@/components/admin/dashboard/StatsCards';
import DashboardTabs from '@/components/admin/dashboard/DashboardTabs';
import { useAuth } from '@/contexts/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, userRole, loading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Only check authorization after auth state is confirmed
    if (!loading) {
      console.log("AdminDashboard - Auth check:", { user: !!user, userRole, loading });
      
      if (!user) {
        console.log("No user found, redirecting to sign-in");
        navigate('/sign-in', { replace: true });
        setIsAuthorized(false);
      } else if (userRole !== 'admin') {
        console.log("Unauthorized access to admin dashboard", { userRole });
        // Redirect to the appropriate dashboard based on role
        if (userRole === 'doctor') {
          navigate('/doctor-dashboard', { replace: true });
        } else {
          navigate('/client-dashboard', { replace: true });
        }
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, userRole, loading, navigate]);

  // Show loading indicator while checking authentication or if not authorized
  if (loading || isAuthorized === null || isAuthorized === false) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-medical-blue"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminDashboardLayout>
      <DashboardHeader />
      <StatsCards />
      <DashboardTabs />
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
