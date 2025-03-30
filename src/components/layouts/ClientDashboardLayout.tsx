
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
  Home
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ClientDashboardLayoutProps {
  children: React.ReactNode;
}

const ClientDashboardLayout: React.FC<ClientDashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const userName = localStorage.getItem('userName') || 'Client User';
  
  const menuItems = [
    { path: '/client-dashboard', label: 'Dashboard', icon: Home },
    { path: '/client-appointments', label: 'My Appointments', icon: Calendar },
    { path: '/client-book-appointment', label: 'Book Appointment', icon: Calendar },
    { path: '/client-messages', label: 'Messages', icon: MessageSquare },
    { path: '/client-records', label: 'Medical Records', icon: FileText },
    { path: '/client-profile', label: 'My Profile', icon: User },
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
          <Link to="/client-dashboard" className="text-medical-blue font-bold text-xl">
            TeleMedica
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/client-profile">
            <div className="h-8 w-8 rounded-full bg-medical-blue text-white flex items-center justify-center">
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
              <Link to="/client-dashboard" className="text-medical-blue font-bold text-xl">
                TeleMedica
              </Link>
            </div>
            <div className="p-4 border-b">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-medical-blue text-white flex items-center justify-center mr-3">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-medium">{userName}</div>
                  <div className="text-sm text-gray-500">Patient</div>
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
                          ? 'bg-medical-blue text-white'
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
            <Link to="/client-dashboard" className="text-medical-blue font-bold text-xl">
              TeleMedica
            </Link>
          </div>
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-medical-blue text-white flex items-center justify-center mr-3">
                <User className="h-6 w-6" />
              </div>
              <div>
                <div className="font-medium">{userName}</div>
                <div className="text-sm text-gray-500">Patient</div>
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
                        ? 'bg-medical-blue text-white'
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
                    <Link to="/client-dashboard" className="text-gray-500 hover:text-gray-700">
                      Patient Portal
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
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/client-book-appointment')}
                  className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white"
                >
                  Book Appointment
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

export default ClientDashboardLayout;
