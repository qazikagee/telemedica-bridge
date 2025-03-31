
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Specialty pages
import Specialties from "./pages/Specialties";
import SpecialtyDetails from "./pages/SpecialtyDetails";

// Client routes
import ClientDashboard from "./pages/client/Dashboard";
import ClientBookAppointment from "./pages/client/BookAppointment";
import ClientAppointments from "./pages/client/Appointments";
import ClientVideoSession from "./pages/client/VideoSession";

// Doctor routes
import DoctorDashboard from "./pages/doctor/Dashboard";
import DoctorAppointments from "./pages/doctor/Appointments";
import DoctorVideoSession from "./pages/doctor/VideoSession";

// Admin routes
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminAddUser from "./pages/admin/AddUser";
import AdminAppointments from "./pages/admin/Appointments";
import AdminProviders from "./pages/admin/Providers";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminMessages from "./pages/admin/Messages";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes with MainLayout */}
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<MainLayout hideFooter><SignIn /></MainLayout>} />
          <Route path="/sign-up" element={<MainLayout hideFooter><SignUp /></MainLayout>} />
          <Route path="/specialties" element={<MainLayout><Specialties /></MainLayout>} />
          <Route path="/specialties/:specialtyId" element={<MainLayout><SpecialtyDetails /></MainLayout>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Client routes */}
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/client-book-appointment" element={<ClientBookAppointment />} />
          <Route path="/client-appointments" element={<ClientAppointments />} />
          <Route path="/client-video-session/:appointmentId" element={<ClientVideoSession />} />
          
          {/* Doctor routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-video-session/:appointmentId" element={<DoctorVideoSession />} />
          
          {/* Admin routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-users" element={<AdminUsers />} />
          <Route path="/admin-add-user" element={<AdminAddUser />} />
          <Route path="/admin-appointments" element={<AdminAppointments />} />
          <Route path="/admin-providers" element={<AdminProviders />} />
          <Route path="/admin-analytics" element={<AdminAnalytics />} />
          <Route path="/admin-messages" element={<AdminMessages />} />
          <Route path="/admin-reports" element={<AdminReports />} />
          <Route path="/admin-settings" element={<AdminSettings />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
