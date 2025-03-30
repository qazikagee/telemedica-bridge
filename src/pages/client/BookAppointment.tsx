
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import ClientDashboardLayout from '@/components/layouts/ClientDashboardLayout';

const specialties = [
  { value: "general-medicine", label: "General Medicine" },
  { value: "dermatology", label: "Dermatology" },
  { value: "mental-health", label: "Mental Health" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "cardiology", label: "Cardiology" },
];

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", 
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", 
  "04:00 PM", "04:30 PM"
];

const doctors = {
  "general-medicine": [
    { id: "dr-johnson", name: "Dr. Sarah Johnson" },
    { id: "dr-patel", name: "Dr. Raj Patel" },
  ],
  "dermatology": [
    { id: "dr-chen", name: "Dr. Michael Chen" },
    { id: "dr-garcia", name: "Dr. Elena Garcia" },
  ],
  "mental-health": [
    { id: "dr-williams", name: "Dr. James Williams" },
    { id: "dr-thompson", name: "Dr. Lisa Thompson" },
  ],
  "pediatrics": [
    { id: "dr-rodriguez", name: "Dr. Maria Rodriguez" },
    { id: "dr-kim", name: "Dr. David Kim" },
  ],
  "cardiology": [
    { id: "dr-singh", name: "Dr. Priya Singh" },
    { id: "dr-jackson", name: "Dr. Robert Jackson" },
  ],
};

const formSchema = z.object({
  specialty: z.string({ required_error: "Please select a specialty" }),
  doctor: z.string({ required_error: "Please select a doctor" }),
  date: z.date({ required_error: "Please select a date" }),
  timeSlot: z.string({ required_error: "Please select a time slot" }),
  reason: z.string().min(5, { message: "Please provide a brief reason for visit" }).max(200),
});

const BookAppointment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [availableDoctors, setAvailableDoctors] = useState<{ id: string; name: string }[]>([]);
  
  useEffect(() => {
    // Check if user is authenticated and is a client
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'client') {
      navigate('/sign-in');
    }
  }, [navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
    },
  });
  
  const watchSpecialty = form.watch("specialty");
  
  useEffect(() => {
    if (watchSpecialty) {
      // Update available doctors based on selected specialty
      setAvailableDoctors(doctors[watchSpecialty as keyof typeof doctors] || []);
      // Reset doctor selection when specialty changes
      form.setValue("doctor", "");
    }
  }, [watchSpecialty, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Booking appointment:", values);
    
    // In a real app, this would send the appointment data to a server
    // For now, just simulate a successful booking
    
    toast({
      title: "Appointment Booked Successfully",
      description: `Your appointment is scheduled for ${format(values.date, "MMMM do, yyyy")} at ${values.timeSlot}`,
    });
    
    // Redirect to appointments page
    navigate('/client-appointments');
  };

  return (
    <ClientDashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Book an Appointment</h1>
        <p className="text-gray-600 mt-1">Schedule a virtual consultation with a healthcare provider</p>
      </div>

      <div className="max-w-xl bg-white rounded-lg shadow-sm p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Specialty</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a specialty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty.value} value={specialty.value}>
                          {specialty.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the type of medical care you need
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="doctor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Healthcare Provider</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={!watchSpecialty}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a provider" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableDoctors.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select your preferred healthcare provider
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Appointment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => 
                          date < new Date(new Date().setHours(0, 0, 0, 0)) || // No past dates
                          date.getDay() === 0 || // No Sundays
                          date.getDay() === 6    // No Saturdays
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Select a weekday for your appointment (Mon-Fri)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="timeSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Time</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose your preferred appointment time
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Visit</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Briefly describe your symptoms or reason for consultation"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Please provide a brief description of your symptoms or concerns
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/client-dashboard')}>
                Cancel
              </Button>
              <Button type="submit" className="bg-medical-blue hover:bg-medical-blue-dark">
                Book Appointment
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ClientDashboardLayout>
  );
};

export default BookAppointment;
