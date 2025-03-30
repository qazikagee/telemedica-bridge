
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Phone, Video as VideoIcon, VideoOff, MessageSquare, PlusCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const mockAppointmentDetails = {
  id: '1',
  doctorName: 'Dr. Sarah Johnson',
  specialty: 'General Medicine',
  patientName: 'John Smith',
};

const VideoSession = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string; time: string }[]>([]);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }
    
    // In a real app, we would initialize WebRTC here
    // For this demo, we'll just show a mock video stream using the browser's getUserMedia
    
    // Simulate the doctor joining after 3 seconds
    const timer = setTimeout(() => {
      toast({
        title: "Provider has joined",
        description: `${mockAppointmentDetails.doctorName} has joined the session`,
      });
      
      // Add welcome message
      setMessages(prev => [
        ...prev,
        { 
          sender: mockAppointmentDetails.doctorName, 
          text: "Hello! How are you feeling today?", 
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
        }
      ]);
      
    }, 3000);
    
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
  
  const toggleChat = () => {
    setShowChat(!showChat);
  };
  
  const endCall = () => {
    // In a real app, we would close the WebRTC connection
    toast({
      title: "Call Ended",
      description: "Your virtual consultation has ended",
    });
    navigate('/client-appointments');
  };
  
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        sender: "Me",
        text: message,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Simulate doctor response after 1 second
      setTimeout(() => {
        const responses = [
          "I understand. Please tell me more about your symptoms.",
          "When did you first notice this issue?",
          "Have you taken any medication for this?",
          "I'll help you address this concern. Let me ask a few more questions.",
          "Thank you for that information. Based on what you've described..."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        setMessages(prev => [
          ...prev, 
          {
            sender: mockAppointmentDetails.doctorName,
            text: randomResponse,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          }
        ]);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="bg-medical-blue text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-bold text-xl mr-4">TeleMedica</span>
            <span className="text-sm md:text-base">
              Session with {mockAppointmentDetails.doctorName} | {mockAppointmentDetails.specialty}
            </span>
          </div>
          <div className="hidden md:block">
            <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
              Live Session
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col md:flex-row p-4 gap-4">
        <div className={`flex-grow ${showChat ? 'md:w-3/4' : 'w-full'}`}>
          <div className="relative bg-black rounded-lg overflow-hidden h-full min-h-[400px] flex justify-center items-center">
            {/* Remote video (doctor) - main view */}
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
            
            {/* Local video (patient) - small window */}
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
                className="bg-red-500 hover:bg-red-600"
                onClick={endCall}
              >
                <Phone className="h-5 w-5 rotate-135" />
              </Button>
              <Button 
                variant="default" 
                size="icon" 
                className={showChat ? "bg-medical-blue hover:bg-medical-blue-dark" : "bg-gray-700 hover:bg-gray-600"}
                onClick={toggleChat}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Chat section */}
        {showChat && (
          <Card className="md:w-1/4 min-w-[300px] flex flex-col h-full min-h-[400px]">
            <CardContent className="p-4 flex flex-col h-full">
              <div className="text-lg font-semibold mb-3">Session Chat</div>
              <div className="flex-grow overflow-y-auto mb-4 space-y-3">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex flex-col ${msg.sender === "Me" ? "items-end" : "items-start"}`}
                  >
                    <div className="text-xs text-gray-500 mb-1">{msg.sender} • {msg.time}</div>
                    <div 
                      className={`rounded-lg px-3 py-2 max-w-[85%] ${
                        msg.sender === "Me" 
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
        )}
      </div>
    </div>
  );
};

export default VideoSession;
