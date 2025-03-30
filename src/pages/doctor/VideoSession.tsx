
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mic, MicOff, Phone, Video as VideoIcon, VideoOff, MessageSquare, PlusCircle, FileText, ClipboardList } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const mockPatientDetails = {
  id: '1',
  name: 'John Smith',
  age: 42,
  gender: 'Male',
  lastVisit: '2025-04-10',
  medicalHistory: [
    'Hypertension - Diagnosed 2020',
    'Type 2 Diabetes - Diagnosed 2019',
    'Allergies: Penicillin'
  ],
  medications: [
    'Lisinopril 10mg - Once daily',
    'Metformin 500mg - Twice daily',
    'Atorvastatin 20mg - Once daily at bedtime'
  ],
  vitalSigns: {
    'Blood Pressure': '128/82 mmHg',
    'Heart Rate': '72 bpm',
    'Temperature': '98.6°F',
    'Respiratory Rate': '14 breaths/min',
    'Oxygen Saturation': '98%'
  }
};

const DoctorVideoSession = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string; time: string }[]>([]);
  const [notes, setNotes] = useState('');
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Check if user is authenticated and is a doctor
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'doctor') {
      navigate('/sign-in');
      return;
    }
    
    // In a real app, we would initialize WebRTC here
    // For this demo, we'll just show a mock video stream using the browser's getUserMedia
    
    // Simulate the patient joining after 2 seconds
    const timer = setTimeout(() => {
      toast({
        title: "Patient has joined",
        description: `${mockPatientDetails.name} has joined the session`,
      });
      
      // Add initial message
      setMessages(prev => [
        ...prev,
        { 
          sender: mockPatientDetails.name, 
          text: "Hello doctor, I've been experiencing a persistent cough for the past week.", 
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
        }
      ]);
      
    }, 2000);
    
    // Set up local video
    const setupLocalVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
        toast({
          title: "Camera access error",
          description: "Could not access your camera and microphone. Please check permissions.",
          variant: "destructive",
        });
      }
    };
    
    setupLocalVideo();
    
    return () => {
      clearTimeout(timer);
      // Clean up video streams
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [navigate, toast]);
  
  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    // In a real app, we would toggle the audio track of the media stream
  };
  
  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    // In a real app, we would toggle the video track of the media stream
  };
  
  const endCall = () => {
    // In a real app, we would close the WebRTC connection
    toast({
      title: "Consultation Ended",
      description: "Your notes and session details have been saved",
    });
    navigate('/doctor-appointments');
  };
  
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        sender: "Me (Doctor)",
        text: message,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Simulate patient response after 2 seconds
      setTimeout(() => {
        const responses = [
          "Yes, doctor. I've also had a mild fever in the evenings.",
          "I've been taking over-the-counter cough syrup but it hasn't helped much.",
          "The cough gets worse at night and is making it difficult to sleep.",
          "No, I haven't been in contact with anyone who has similar symptoms.",
          "I understand. Should I come in for testing?"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        setMessages(prev => [
          ...prev, 
          {
            sender: mockPatientDetails.name,
            text: randomResponse,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          }
        ]);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-medical-blue text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-bold text-xl mr-4">TeleMedica</span>
            <span className="text-sm md:text-base">
              Consultation with {mockPatientDetails.name} | {mockPatientDetails.age} y/o {mockPatientDetails.gender}
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
              Live Session
            </span>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-medical-blue" onClick={endCall}>
              End Session
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 p-4">
        <div className="relative bg-black rounded-lg overflow-hidden h-[300px] lg:h-full min-h-[300px] flex justify-center items-center">
          {/* Remote video (patient) - main view */}
          <video
            ref={remoteVideoRef}
            className={`absolute inset-0 w-full h-full object-cover ${!isVideoEnabled ? 'opacity-50' : ''}`}
            autoPlay
            playsInline
            poster="/placeholder.svg"
          ></video>
          
          {!isVideoEnabled && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gray-800 p-4 rounded-full">
                <VideoOff size={48} className="text-white" />
              </div>
            </div>
          )}
          
          {/* Local video (doctor) - small window */}
          <div className="absolute bottom-4 right-4 w-1/4 max-w-[160px] aspect-video rounded-lg overflow-hidden border-2 border-white shadow-lg">
            <video
              ref={localVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            ></video>
          </div>
          
          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-4">
            <Button 
              variant="default" 
              size="icon" 
              className={isAudioEnabled ? "bg-gray-700 hover:bg-gray-600" : "bg-red-500 hover:bg-red-600"}
              onClick={toggleAudio}
            >
              {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            <Button 
              variant="default" 
              size="icon" 
              className={isVideoEnabled ? "bg-gray-700 hover:bg-gray-600" : "bg-red-500 hover:bg-red-600"}
              onClick={toggleVideo}
            >
              {isVideoEnabled ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
            <Button 
              variant="default" 
              size="icon" 
              className="bg-red-500 hover:bg-red-600 md:hidden"
              onClick={endCall}
            >
              <Phone className="h-5 w-5 rotate-135" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chat">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="notes">
                <FileText className="h-4 w-4 mr-2" />
                Notes
              </TabsTrigger>
              <TabsTrigger value="patient">
                <ClipboardList className="h-4 w-4 mr-2" />
                Patient
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat">
              <Card className="h-[calc(100vh-440px)] md:h-[calc(100vh-280px)] flex flex-col">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex-grow overflow-y-auto mb-4 space-y-3">
                    {messages.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`flex flex-col ${msg.sender === "Me (Doctor)" ? "items-end" : "items-start"}`}
                      >
                        <div className="text-xs text-gray-500 mb-1">{msg.sender} • {msg.time}</div>
                        <div 
                          className={`rounded-lg px-3 py-2 max-w-[85%] ${
                            msg.sender === "Me (Doctor)" 
                              ? "bg-medical-blue text-white" 
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="resize-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                    <Button className="bg-medical-blue hover:bg-medical-blue-dark" onClick={sendMessage}>
                      <PlusCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes">
              <Card className="h-[calc(100vh-440px)] md:h-[calc(100vh-280px)] flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">Clinical Notes</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <Textarea 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter clinical notes, observations, and treatment plan..."
                    className="h-full resize-none"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="patient">
              <Card className="h-[calc(100vh-440px)] md:h-[calc(100vh-280px)] overflow-y-auto">
                <CardHeader>
                  <CardTitle className="text-lg">Patient Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Patient Details</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm"><span className="font-medium">Name:</span> {mockPatientDetails.name}</p>
                      <p className="text-sm"><span className="font-medium">Age:</span> {mockPatientDetails.age}</p>
                      <p className="text-sm"><span className="font-medium">Gender:</span> {mockPatientDetails.gender}</p>
                      <p className="text-sm"><span className="font-medium">Last Visit:</span> {mockPatientDetails.lastVisit}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Vital Signs</h3>
                    <div className="mt-2 space-y-1">
                      {Object.entries(mockPatientDetails.vitalSigns).map(([key, value]) => (
                        <p key={key} className="text-sm"><span className="font-medium">{key}:</span> {value}</p>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Medical History</h3>
                    <ul className="mt-2 space-y-1 list-disc list-inside">
                      {mockPatientDetails.medicalHistory.map((item, index) => (
                        <li key={index} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Current Medications</h3>
                    <ul className="mt-2 space-y-1 list-disc list-inside">
                      {mockPatientDetails.medications.map((med, index) => (
                        <li key={index} className="text-sm">{med}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DoctorVideoSession;
