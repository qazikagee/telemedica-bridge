
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  User,
  Calendar,
  MessageSquare,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Home,
  Users,
  Settings,
  Clock,
  Activity
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface DoctorDashboardLayoutProps {
  children: React.ReactNode;
}

const DoctorDashboardLayout: React.FC<DoctorDashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const doctorName = localStorage.getItem('userName') || 'Dr. Johnson';
  
  const menuItems = [
    { path: '/doctor-dashboard', label: 'Dashboard', icon: Home },
    { path: '/doctor-appointments', label: 'My Schedule', icon: Calendar },
    { path: '/doctor-patients', label: 'Patients', icon: Users },
    { path: '/doctor-messages', label: 'Messages', icon: MessageSquare },
    { path: '/doctor-records', label: 'Medical Records', icon: FileText },
    { path: '/doctor-profile', label: 'My Profile', icon: User },
    { path: '/doctor-settings', label: 'Settings', icon: Settings },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    
    // Redirect to home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Navbar */}
      <div className="md:hidden bg-white shadow-sm py-4 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 text-gray-500 hover:text-medical-blue"
          >
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Link to="/doctor-dashboard" className="text-medical-blue font-bold text-xl">
            TeleMedica
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/doctor-profile">
            <div className="h-8 w-8 rounded-full bg-medical-green text-white flex items-center justify-center">
              <User className="h-5 w-5" />
            </div>
          </Link>
        </div>
      </div>
      
      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)}>
          <div
            className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b">
              <Link to="/doctor-dashboard" className="text-medical-blue font-bold text-xl">
                TeleMedica
              </Link>
            </div>
            <div className="p-4 border-b">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-medical-green text-white flex items-center justify-center mr-3">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-medium">{doctorName}</div>
                  <div className="text-sm text-gray-500">Healthcare Provider</div>
                </div>
              </div>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-2 rounded-md ${
                        isActive(item.path)
                          ? 'bg-medical-green text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
      
      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm z-10">
          <div className="p-4 border-b">
            <Link to="/doctor-dashboard" className="text-medical-blue font-bold text-xl">
              TeleMedica
            </Link>
          </div>
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-medical-green text-white flex items-center justify-center mr-3">
                <User className="h-6 w-6" />
              </div>
              <div>
                <div className="font-medium">{doctorName}</div>
                <div className="text-sm text-gray-500">Healthcare Provider</div>
              </div>
            </div>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      isActive(item.path)
                        ? 'bg-medical-green text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4 mt-4 border-t">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm py-4 px-6">
            <div className="flex items-center justify-between">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li>
                    <Link to="/doctor-dashboard" className="text-gray-500 hover:text-gray-700">
                      Provider Portal
                    </Link>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                    <span className="ml-2 text-gray-900">
                      {menuItems.find(item => isActive(item.path))?.label || 'Dashboard'}
                    </span>
                  </li>
                </ol>
              </nav>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/doctor-appointments')}
                  className="flex items-center border-medical-green text-medical-green hover:bg-medical-green hover:text-white"
                >
                  <Clock className="mr-1 h-4 w-4" /> Today's Schedule
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
                >
                  <Activity className="mr-1 h-4 w-4" /> Waiting Room (1)
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
      
      {/* Mobile Content */}
      <div className="md:hidden">
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboardLayout;
