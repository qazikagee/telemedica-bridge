
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
  
  useEffect(() => {
    if (!loading && (!user || userRole !== 'admin')) {
      console.log("Unauthorized access to admin dashboard", { user, userRole });
      navigate('/sign-in');
    }
  }, [user, userRole, loading, navigate]);

  // Show nothing while checking authentication
  if (loading || !user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
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
