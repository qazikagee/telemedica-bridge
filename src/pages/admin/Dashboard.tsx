
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '@/components/layouts/AdminDashboardLayout';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import StatsCards from '@/components/admin/dashboard/StatsCards';
import DashboardTabs from '@/components/admin/dashboard/DashboardTabs';

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
      <DashboardHeader />
      <StatsCards />
      <DashboardTabs />
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
