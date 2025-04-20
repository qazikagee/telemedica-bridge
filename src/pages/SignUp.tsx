
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { UserPlus } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  userType: z.enum(["client", "doctor"]),
});

const SignUp = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "client",
    },
  });

  const getLocalizedPath = (path: string) => {
    return currentLang === 'en' ? path : `/${currentLang}${path}`;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signUp(values.email, values.password, {
        full_name: `${values.firstName} ${values.lastName}`,
      });
      
      toast({
        title: "Account created successfully",
        description: "Welcome to TeleMedica!",
      });
      
      // Redirect based on user type
      if (values.userType === "doctor") {
        navigate('/doctor-dashboard');
      } else {
        navigate('/client-dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during sign up. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex-grow flex items-center justify-center p-4 bg-medical-gray-light">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <UserPlus className="h-12 w-12 text-medical-blue mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-gray-900">{t('auth.createAccount')}</h1>
          <p className="text-gray-600 mt-1">{t('auth.createAccountSubtitle')}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth.firstName')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('auth.firstNamePlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('auth.lastName')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('auth.lastNamePlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.email')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('auth.emailPlaceholder')} type="email" {...field} />
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
            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('auth.userType')}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t('auth.selectUserType')} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="client">{t('auth.patient')}</SelectItem>
                      <SelectItem value="doctor">{t('auth.provider')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-medical-blue hover:bg-medical-blue-dark">
              {t('auth.createAccount')}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {t('auth.haveAccount')}{" "}
            <Link to={getLocalizedPath("/sign-in")} className="text-medical-blue hover:underline font-medium">
              {t('auth.signin')}
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

export default SignUp;
