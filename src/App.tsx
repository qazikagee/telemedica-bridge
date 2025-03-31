
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import { Skeleton } from "@/components/ui/skeleton";

// Eagerly load critical paths
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load other routes
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Specialties = lazy(() => import("./pages/Specialties"));
const SpecialtyDetails = lazy(() => import("./pages/SpecialtyDetails"));

// Client routes
const ClientDashboard = lazy(() => import("./pages/client/Dashboard"));
const ClientBookAppointment = lazy(() => import("./pages/client/BookAppointment"));
const ClientAppointments = lazy(() => import("./pages/client/Appointments"));
const ClientVideoSession = lazy(() => import("./pages/client/VideoSession"));

// Doctor routes
const DoctorDashboard = lazy(() => import("./pages/doctor/Dashboard"));
const DoctorAppointments = lazy(() => import("./pages/doctor/Appointments"));
const DoctorVideoSession = lazy(() => import("./pages/doctor/VideoSession"));

// Admin routes
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const AdminAddUser = lazy(() => import("./pages/admin/AddUser"));
const AdminAppointments = lazy(() => import("./pages/admin/Appointments"));
const AdminProviders = lazy(() => import("./pages/admin/Providers"));
const AdminAnalytics = lazy(() => import("./pages/admin/Analytics"));
const AdminMessages = lazy(() => import("./pages/admin/Messages"));
const AdminReports = lazy(() => import("./pages/admin/Reports"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="space-y-4 w-full max-w-md mx-auto p-8">
      <Skeleton className="h-8 w-3/4 mx-auto" />
      <Skeleton className="h-72 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
