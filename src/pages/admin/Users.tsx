
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '@/components/layouts/AdminDashboardLayout';
import UserHeader from '@/components/admin/users/UserHeader';
import UserFilters from '@/components/admin/users/UserFilters';
import UserTable from '@/components/admin/users/UserTable';
import { useUserManagement } from '@/hooks/admin/useUserManagement';

const UsersPage = () => {
  const navigate = useNavigate();
  const {
    users,
    searchQuery,
    setSearchQuery,
    sortConfig,
    requestSort,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter
  } = useUserManagement();
  
  useEffect(() => {
    // Check if user is authenticated and is an admin
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'admin') {
      navigate('/sign-in');
    }
  }, [navigate]);

  return (
    <AdminDashboardLayout>
      <UserHeader />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <UserFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        
        <UserTable 
          users={users}
          sortConfig={sortConfig}
          requestSort={requestSort}
        />
      </div>
    </AdminDashboardLayout>
  );
};

export default UsersPage;
