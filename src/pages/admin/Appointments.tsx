
import React from 'react';
import AdminDashboardLayout from '@/components/layouts/AdminDashboardLayout';
import { Calendar, Clock, User } from 'lucide-react';

const AdminAppointments = () => {
  return (
    <AdminDashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Manage and oversee all platform appointments</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium">Today's Appointments</p>
              <h3 className="text-3xl font-bold mt-1">24</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-medical-blue" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium">Completed Today</p>
              <h3 className="text-3xl font-bold mt-1">18</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 font-medium">Active Providers</p>
              <h3 className="text-3xl font-bold mt-1">36</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <User className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Appointment Schedule</h2>
        <p className="text-gray-600">The full appointment management interface would be implemented here, including a calendar view, filters, and appointment details.</p>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminAppointments;
