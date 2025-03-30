
import React from 'react';
import AdminDashboardLayout from '@/components/layouts/AdminDashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserPlus } from 'lucide-react';

const providerData = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    patients: 145,
    rating: 4.8,
    status: 'active'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    patients: 98,
    rating: 4.6,
    status: 'active'
  },
  {
    id: 3,
    name: 'Dr. James Wilson',
    specialty: 'Neurology',
    patients: 112,
    rating: 4.7,
    status: 'active'
  },
  {
    id: 4,
    name: 'Dr. Emily Parker',
    specialty: 'Pediatrics',
    patients: 203,
    rating: 4.9,
    status: 'active'
  },
  {
    id: 5,
    name: 'Dr. Robert Garcia',
    specialty: 'Orthopedics',
    patients: 87,
    rating: 4.5,
    status: 'inactive'
  }
];

const AdminProviders = () => {
  return (
    <AdminDashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Healthcare Providers</h1>
          <p className="text-gray-600 mt-1">Manage doctors and specialists on the platform</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-medical-blue hover:bg-medical-blue-dark">
            <UserPlus className="mr-2 h-4 w-4" /> Add Provider
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Providers List</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Filter</Button>
              <Button variant="outline" size="sm">Export</Button>
            </div>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Patients</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providerData.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell className="font-medium">{provider.name}</TableCell>
                <TableCell>{provider.specialty}</TableCell>
                <TableCell>{provider.patients}</TableCell>
                <TableCell>{provider.rating}/5.0</TableCell>
                <TableCell>
                  <Badge 
                    className={provider.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                  >
                    {provider.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminProviders;
