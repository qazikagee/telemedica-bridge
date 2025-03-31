
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would connect to an auth service
    console.log("Sign in attempt:", values);
    
    // Mock authentication - In a real app, this would verify credentials
    if (values.email === "admin@telemedica.com") {
      localStorage.setItem('userRole', 'admin');
      navigate('/admin-dashboard');
    } else if (values.email.includes("doctor")) {
      localStorage.setItem('userRole', 'doctor');
      navigate('/doctor-dashboard');
    } else {
      localStorage.setItem('userRole', 'client');
      navigate('/client-dashboard');
    }
    
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', values.email);
    
    toast({
      title: "Sign In Successful",
      description: "Welcome back to TeleMedica!",
    });
  }

  return (
    <div className="flex-grow flex items-center justify-center p-4 bg-medical-gray-light">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <LogIn className="h-12 w-12 text-medical-blue mx-auto mb-2" />
          <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
          <p className="text-gray-600 mt-1">Access your TeleMedica account</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-medical-blue hover:bg-medical-blue-dark">
              Sign In
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-medical-blue hover:underline font-medium">
              Sign Up
            </Link>
          </p>
          <Link to="/" className="text-xs text-gray-500 hover:text-medical-blue mt-2 inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
