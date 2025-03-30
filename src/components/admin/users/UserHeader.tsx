
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserCog } from "lucide-react";

const UserHeader: React.FC = () => {
  return (
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
  );
};

export default UserHeader;
