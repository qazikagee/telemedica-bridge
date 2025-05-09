
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const SignIn = () => {
  const { signIn, user, userRole, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [isLoading, setIsLoading] = useState(false);
  const [redirected, setRedirected] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Effect to redirect if user is already authenticated
  useEffect(() => {
    if (redirected) return; // Prevent multiple redirects
    
    if (!loading && user && userRole) {
      console.log("SignIn: User already authenticated, redirecting to dashboard", { userRole });
      setRedirected(true);
      
      // Use replace to avoid adding to the navigation history
      if (userRole === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else if (userRole === 'doctor') {
        navigate('/doctor-dashboard', { replace: true });
      } else {
        navigate('/client-dashboard', { replace: true });
      }
    }
  }, [user, userRole, loading, navigate, redirected]);

  const getLocalizedPath = (path: string) => {
    return currentLang === 'en' ? path : `/${currentLang}${path}`;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const { user, error } = await signIn(values.email, values.password);
      
      if (error) {
        throw error;
      }
      
      // Note: Redirection is handled by signIn function in AuthContext
      
    } catch (error) {
      console.error("Sign-in error:", error);
      toast({
        title: t('auth.error'),
        description: t('auth.invalidCredentials'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // If still loading auth state, show a loading indicator
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-medical-gray-light">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-medical-blue"></div>
          </div>
          <p className="text-center mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is already authenticated, don't render the form
  if (user && userRole) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-medical-gray-light">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-medical-blue"></div>
          </div>
          <p className="text-center mt-4 text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex items-center justify-center p-4 bg-medical-gray-light">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <LogIn className="h-12 w-12 text-medical-blue mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-gray-900">{t('auth.signin')}</h1>
          <p className="text-gray-600 mt-1">{t('auth.signinSubtitle')}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.email')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('auth.emailPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.password')}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t('auth.passwordPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-medical-blue hover:bg-medical-blue-dark" disabled={isLoading}>
              {isLoading ? t('auth.signingIn') : t('auth.signin')}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t('auth.noAccount')}{" "}
            <Link to={getLocalizedPath("/sign-up")} className="text-medical-blue hover:underline font-medium">
              {t('auth.signup')}
            </Link>
          </p>
          <Link to={getLocalizedPath("/")} className="text-xs text-gray-500 hover:text-medical-blue mt-2 inline-block">
            {t('auth.returnHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
