
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays, startOfWeek, isToday } from 'date-fns';
import DoctorDashboardLayout from '@/components/layouts/DoctorDashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Clock, Video } from 'lucide-react';

// Generate mock appointments for a week
const generateMockAppointments = () => {
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });
  
  const patients = [
    "John Smith", "Maria Garcia", "David Johnson", "Emily Wilson",
    "James Brown", "Sarah Miller", "Michael Davis", "Jessica Taylor",
    "Robert Anderson", "Jennifer Thomas", "William Jackson", "Lisa Martinez",
    "Richard White", "Mary Harris", "Charles Lee", "Karen Robinson"
  ];
  
  const reasons = [
    "Annual check-up", "Follow-up consultation", "Medication review",
    "Skin condition evaluation", "Chronic pain management", "Anxiety consultation",
    "Blood pressure monitoring", "Diabetes management", "Allergies assessment",
    "Sleep disorder discussion", "Respiratory issues", "Digestive problems"
  ];
  
  const times = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM"
  ];
  
  const appointments = [];
  let id = 1;
  
  for (let i = 0; i < 7; i++) {
    const day = addDays(startOfCurrentWeek, i);
    // Skip weekends
    if (day.getDay() === 0 || day.getDay() === 6) continue;
    
    // 4-8 appointments per day
    const appointmentsPerDay = 4 + Math.floor(Math.random() * 5);
    const dayTimes = [...times].sort(() => 0.5 - Math.random()).slice(0, appointmentsPerDay);
    
    for (let j = 0; j < appointmentsPerDay; j++) {
      appointments.push({
        id: `${id++}`,
        patientName: patients[Math.floor(Math.random() * patients.length)],
        reason: reasons[Math.floor(Math.random() * reasons.length)],
        date: day,
        time: dayTimes[j],
        type: Math.random() > 0.3 ? "Video" : "Chat",
        status: isToday(day) && Math.random() > 0.7 ? "Checked In" : "Confirmed"
      });
    }
  }
  
  return appointments.sort((a, b) => {
    // Sort by date first
    const dateComparison = a.date.getTime() - b.date.getTime();
    if (dateComparison !== 0) return dateComparison;
    
    // Then by time
    return a.time.localeCompare(b.time);
  });
};

const mockAppointments = generateMockAppointments();

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filteredAppointments, setFilteredAppointments] = useState(mockAppointments);
  
  useEffect(() => {
    // Check if user is authenticated and is a doctor
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'doctor') {
      navigate('/sign-in');
    }
  }, [navigate]);
  
  useEffect(() => {
    if (selectedDate) {
      // Filter appointments for the selected date
      const appointments = mockAppointments.filter(
        app => format(app.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
      );
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments([]);
    }
  }, [selectedDate]);
  
  const handleStartSession = (appointmentId: string) => {
    navigate(`/doctor-video-session/${appointmentId}`);
  };

  // Get dates with appointments to highlight in calendar
  const appointmentDates = mockAppointments.map(app => format(app.date, 'yyyy-MM-dd'));
  const uniqueDates = [...new Set(appointmentDates)];
  const highlightedDates = uniqueDates.map(dateStr => new Date(dateStr));

  return (
    <DoctorDashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Schedule</h1>
        <p className="text-gray-600 mt-1">Manage your patient appointments</p>
      </div>

      <Tabs defaultValue="calendar" onValueChange={setView} className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
            <Card>
              <CardContent className="pt-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border rounded-md p-3"
                  modifiers={{
                    booked: highlightedDates,
                  }}
                  modifiersStyles={{
                    booked: {
                      fontWeight: 'bold',
                      backgroundColor: '#e6f0ff',
                      color: '#1A75BC',
                    }
                  }}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  Appointments for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Selected Date'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {filteredAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-start p-4 border rounded-lg bg-gray-50">
                        <div className="w-20 text-center">
                          <div className="text-sm font-medium text-gray-900">{appointment.time}</div>
                          <div className="text-xs text-gray-500">30 min</div>
                        </div>
                        <div className="ml-4 flex-grow">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                            <div>
                              <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                              <p className="text-sm text-gray-600 mt-1">{appointment.reason}</p>
                            </div>
                            <div className="flex items-center mt-2 sm:mt-0">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                appointment.status === "Checked In" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-blue-100 text-blue-800"
                              }`}>
                                {appointment.status}
                              </span>
                              <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {appointment.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          className="ml-4 bg-medical-blue hover:bg-medical-blue-dark"
                          onClick={() => handleStartSession(appointment.id)}
                          disabled={appointment.status !== "Checked In"}
                        >
                          {isToday(appointment.date) ? "Start" : "Details"}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                    <p>No appointments scheduled for this date.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="list" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {Array.from(new Set(mockAppointments.map(a => format(a.date, 'yyyy-MM-dd')))).sort().map(dateStr => {
                  const date = new Date(dateStr);
                  const appointmentsForDate = mockAppointments.filter(
                    a => format(a.date, 'yyyy-MM-dd') === dateStr
                  );
                  
                  return (
                    <div key={dateStr}>
                      <h3 className="text-lg font-medium mb-4 flex items-center">
                        <CalendarIcon className="mr-2 h-5 w-5 text-medical-blue" />
                        {format(date, 'EEEE, MMMM d, yyyy')}
                        {isToday(date) && (
                          <Badge className="ml-2 bg-medical-blue">Today</Badge>
                        )}
                      </h3>
                      <div className="space-y-3">
                        {appointmentsForDate.map(appointment => (
                          <div key={appointment.id} className="flex items-center p-3 border rounded-lg bg-gray-50">
                            <div className="w-16 text-center">
                              <Clock className="mx-auto h-4 w-4 text-gray-500 mb-1" />
                              <div className="text-sm font-medium">{appointment.time}</div>
                            </div>
                            <div className="ml-4 flex-grow">
                              <div className="flex justify-between items-center">
                                <div>
                                  <span className="font-medium">{appointment.patientName}</span>
                                  <p className="text-sm text-gray-600">{appointment.reason}</p>
                                </div>
                                <div className="flex items-center">
                                  <span className="mr-2 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 flex items-center">
                                    {appointment.type === "Video" ? (
                                      <>
                                        <Video className="mr-1 h-3 w-3" />
                                        Video
                                      </>
                                    ) : (
                                      <>
                                        <CalendarIcon className="mr-1 h-3 w-3" />
                                        Chat
                                      </>
                                    )}
                                  </span>
                                  {isToday(date) && appointment.status === "Checked In" && (
                                    <Button 
                                      size="sm" 
                                      className="bg-medical-blue hover:bg-medical-blue-dark"
                                      onClick={() => handleStartSession(appointment.id)}
                                    >
                                      Start
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DoctorDashboardLayout>
  );
};

export default DoctorAppointments;
