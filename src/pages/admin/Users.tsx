
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboardLayout from '@/components/layouts/AdminDashboardLayout';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Search, 
  User, 
  UserCog, 
  Users as UsersIcon,
  Filter
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'joinDate', direction: 'desc' });
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    // Check if user is authenticated and is an admin
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'admin') {
      navigate('/sign-in');
    }
  }, [navigate]);
  
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
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setUsers(filteredUsers);
  }, [searchQuery, roleFilter, statusFilter, sortConfig]);
  
  const requestSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <AdminDashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage platform users and their permissions</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-medical-blue hover:bg-medical-blue-dark">
            <UserCog className="mr-2 h-4 w-4" /> Add New User
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Role: {roleFilter === 'all' ? 'All' : roleFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setRoleFilter('all')}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter('client')}>Clients</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter('doctor')}>Doctors</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter('admin')}>Administrators</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Status: {statusFilter === 'all' ? 'All' : statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('active')}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <Table>
          <TableCaption>A list of all platform users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => requestSort('name')}>
                <div className="flex items-center">
                  Name {getSortIcon('name')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort('email')}>
                <div className="flex items-center">
                  Email {getSortIcon('email')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort('role')}>
                <div className="flex items-center">
                  Role {getSortIcon('role')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort('status')}>
                <div className="flex items-center">
                  Status {getSortIcon('status')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort('joinDate')}>
                <div className="flex items-center">
                  Join Date {getSortIcon('joinDate')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => requestSort('lastLogin')}>
                <div className="flex items-center">
                  Last Login {getSortIcon('lastLogin')}
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <User className="h-4 w-4 text-gray-500" />
                  </div>
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={
                    user.role === 'admin' 
                      ? 'border-medical-blue-dark text-medical-blue-dark' 
                      : user.role === 'doctor' 
                        ? 'border-medical-green-dark text-medical-green-dark'
                        : 'border-gray-500 text-gray-500'
                  }>
                    {user.role === 'admin' ? 'Administrator' : user.role === 'doctor' ? 'Healthcare Provider' : 'Patient'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className={
                    user.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''
                  }>
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminDashboardLayout>
  );
};

export default UsersPage;
