
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Effect to redirect if user is already authenticated
  useEffect(() => {
    if (loading) return; // Don't redirect while still loading auth state
    
    if (user && userRole) {
      console.log("User authenticated, redirecting based on role:", userRole);
      
      // Redirect based on role
      if (userRole === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else if (userRole === 'doctor') {
        navigate('/doctor-dashboard', { replace: true });
      } else {
        navigate('/client-dashboard', { replace: true });
      }
    }
  }, [user, userRole, loading, navigate]);

  const getLocalizedPath = (path: string) => {
    return currentLang === 'en' ? path : `/${currentLang}${path}`;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const { user, error } = await signIn(values.email, values.password);
      
      if (error) {
        throw error;
      }
      
      // The redirection will happen in the useEffect based on updated auth state
    } catch (error) {
      console.error("Sign-in error:", error);
      toast({
        title: t('auth.error'),
        description: t('auth.invalidCredentials'),
        variant: "destructive",
      });
      setIsSubmitting(false);
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
          <p className="text-center mt-4 text-gray-600">Checking authentication status...</p>
        </div>
      </div>
    );
  }

  // Only show the sign-in form if user is not authenticated
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
            <Button 
              type="submit" 
              className="w-full bg-medical-blue hover:bg-medical-blue-dark" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                  {t('auth.signingIn')}
                </>
              ) : t('auth.signin')}
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
