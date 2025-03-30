
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, Video } from 'lucide-react';
import ClientDashboardLayout from '@/components/layouts/ClientDashboardLayout';

// Mock appointment data
const mockAppointments = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'General Medicine',
    date: new Date(2025, 4, 10, 10, 30),
    status: 'upcoming',
    type: 'video',
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    specialty: 'Dermatology',
    date: new Date(2025, 4, 12, 14, 0),
    status: 'upcoming',
    type: 'chat',
  },
  {
    id: '3',
    doctorName: 'Dr. Lisa Thompson',
    specialty: 'Mental Health',
    date: new Date(2025, 3, 28, 15, 30),
    status: 'completed',
    type: 'video',
  },
  {
    id: '4',
    doctorName: 'Dr. Raj Patel',
    specialty: 'General Medicine',
    date: new Date(2025, 3, 15, 9, 0),
    status: 'completed',
    type: 'video',
  },
  {
    id: '5',
    doctorName: 'Dr. Elena Garcia',
    specialty: 'Dermatology',
    date: new Date(2025, 2, 20, 13, 30),
    status: 'completed',
    type: 'chat',
  },
];

const Appointments = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [appointments, setAppointments] = useState(mockAppointments);
  
  useEffect(() => {
    // Check if user is authenticated and is a client
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'client') {
      navigate('/sign-in');
    }
  }, [navigate]);
  
  useEffect(() => {
    if (filter === 'all') {
      setAppointments(mockAppointments);
    } else {
      setAppointments(mockAppointments.filter(apt => apt.status === filter));
    }
  }, [filter]);

  const handleJoinSession = (appointmentId: string) => {
    navigate(`/client-video-session/${appointmentId}`);
  };

  return (
    <ClientDashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 mt-1">View and manage your scheduled consultations</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button
            onClick={() => navigate('/client-book-appointment')}
            className="bg-medical-blue hover:bg-medical-blue-dark"
          >
            <Plus className="mr-1 h-4 w-4" /> Book Appointment
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'bg-medical-blue hover:bg-medical-blue-dark' : ''}
            >
              All
            </Button>
            <Button
              variant={filter === 'upcoming' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('upcoming')}
              className={filter === 'upcoming' ? 'bg-medical-blue hover:bg-medical-blue-dark' : ''}
            >
              Upcoming
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('completed')}
              className={filter === 'completed' ? 'bg-medical-blue hover:bg-medical-blue-dark' : ''}
            >
              Past
            </Button>
          </div>
        </div>
        
        <Table>
          <TableCaption>A list of your appointments</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Provider</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.doctorName}</TableCell>
                <TableCell>{appointment.specialty}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4 text-gray-500" />
                      <span>{format(appointment.date, "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="mr-1 h-4 w-4 text-gray-500" />
                      <span>{format(appointment.date, "h:mm a")}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}>
                    {appointment.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="flex items-center w-fit">
                    {appointment.type === 'video' ? (
                      <>
                        <Video className="mr-1 h-3 w-3" />
                        Video
                      </>
                    ) : (
                      <>
                        <Calendar className="mr-1 h-3 w-3" />
                        Chat
                      </>
                    )}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {appointment.status === 'upcoming' ? (
                    <Button 
                      variant="default" 
                      size="sm"
                      className="bg-medical-blue hover:bg-medical-blue-dark"
                      onClick={() => handleJoinSession(appointment.id)}
                    >
                      Join
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ClientDashboardLayout>
  );
};

export default Appointments;
