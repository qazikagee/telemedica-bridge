
import React from 'react';
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
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, User } from "lucide-react";

// Define user type to make the component more type-safe
export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  lastLogin: string;
}

interface UserTableProps {
  users: UserData[];
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc';
  };
  requestSort: (key: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, sortConfig, requestSort }) => {
  
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
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
  );
};

export default UserTable;
