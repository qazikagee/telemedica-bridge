
import { useState, useEffect } from 'react';
import { UserData } from '@/components/admin/users/UserTable';

// Mock user data
const mockUsers = [
  { 
    id: "1", 
    name: "John Smith", 
    email: "john.smith@example.com", 
    role: "client", 
    status: "active", 
    joinDate: "2025-03-10", 
    lastLogin: "2025-05-05" 
  },
  { 
    id: "2", 
    name: "Dr. Sarah Johnson", 
    email: "sarah.johnson@example.com", 
    role: "doctor", 
    status: "active", 
    joinDate: "2025-01-15", 
    lastLogin: "2025-05-05" 
  },
  { 
    id: "3", 
    name: "Maria Garcia", 
    email: "maria.garcia@example.com", 
    role: "client", 
    status: "active", 
    joinDate: "2025-02-20", 
    lastLogin: "2025-05-03" 
  },
  { 
    id: "4", 
    name: "Dr. Raj Patel", 
    email: "raj.patel@example.com", 
    role: "doctor", 
    status: "active", 
    joinDate: "2025-01-10", 
    lastLogin: "2025-05-04" 
  },
  { 
    id: "5", 
    name: "Emily Wilson", 
    email: "emily.wilson@example.com", 
    role: "client", 
    status: "inactive", 
    joinDate: "2025-04-05", 
    lastLogin: "2025-04-20" 
  },
  { 
    id: "6", 
    name: "Dr. Michael Chen", 
    email: "michael.chen@example.com", 
    role: "doctor", 
    status: "active", 
    joinDate: "2025-02-15", 
    lastLogin: "2025-05-05" 
  },
  { 
    id: "7", 
    name: "David Johnson", 
    email: "david.johnson@example.com", 
    role: "client", 
    status: "active", 
    joinDate: "2025-03-25", 
    lastLogin: "2025-05-02" 
  },
  { 
    id: "8", 
    name: "Dr. Elena Garcia", 
    email: "elena.garcia@example.com", 
    role: "doctor", 
    status: "active", 
    joinDate: "2025-01-20", 
    lastLogin: "2025-05-04" 
  },
  { 
    id: "9", 
    name: "James Brown", 
    email: "james.brown@example.com", 
    role: "client", 
    status: "inactive", 
    joinDate: "2025-02-10", 
    lastLogin: "2025-04-15" 
  },
  { 
    id: "10", 
    name: "Admin User", 
    email: "admin@telemedica.com", 
    role: "admin", 
    status: "active", 
    joinDate: "2025-01-01", 
    lastLogin: "2025-05-05" 
  },
];

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'joinDate', direction: 'desc' as 'asc' | 'desc' });
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter users based on search query and filters
  useEffect(() => {
    let filteredUsers = [...mockUsers];
    
    // Apply role filter
    if (roleFilter !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.role === roleFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.status === statusFilter);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredUsers = filteredUsers.filter(
        user => 
          user.name.toLowerCase().includes(query) || 
          user.email.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    filteredUsers.sort((a, b) => {
      if (a[sortConfig.key as keyof UserData] < b[sortConfig.key as keyof UserData]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key as keyof UserData] > b[sortConfig.key as keyof UserData]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setUsers(filteredUsers);
  }, [searchQuery, roleFilter, statusFilter, sortConfig]);
  
  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return {
    users,
    searchQuery,
    setSearchQuery,
    sortConfig,
    requestSort,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter
  };
};
