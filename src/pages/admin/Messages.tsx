
import React from 'react';
import AdminDashboardLayout from '@/components/layouts/AdminDashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MessageSquare } from 'lucide-react';

const messageData = [
  {
    id: 1,
    sender: 'Dr. Sarah Johnson',
    subject: 'Platform Update Feedback',
    preview: 'I wanted to share some feedback about the latest update to the telehealth platform...',
    date: '2 hours ago',
    unread: true
  },
  {
    id: 2,
    sender: 'John Smith',
    subject: 'Account Access Issue',
    preview: 'I\'ve been having trouble accessing my account since yesterday. Can you please help...',
    date: '5 hours ago',
    unread: true
  },
  {
    id: 3,
    sender: 'Support Team',
    subject: 'Weekly Support Report',
    preview: 'Attached is the weekly support ticket summary and resolution metrics as requested...',
    date: 'Yesterday',
    unread: false
  },
  {
    id: 4,
    sender: 'Dr. Michael Chen',
    subject: 'Video Session Quality',
    preview: 'I\'ve noticed some inconsistencies in the video quality during consultations...',
    date: '2 days ago',
    unread: false
  },
  {
    id: 5,
    sender: 'Emily Parker',
    subject: 'Billing Question',
    preview: 'I had a question about a charge on my account from last month\'s consultations...',
    date: '3 days ago',
    unread: false
  }
];

const AdminMessages = () => {
  return (
    <AdminDashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Manage communications with users and providers</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-medical-blue hover:bg-medical-blue-dark">
            <MessageSquare className="mr-2 h-4 w-4" /> Compose
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search messages..." className="pl-9" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </div>
        
        <Tabs defaultValue="inbox" className="w-full">
          <div className="border-b">
            <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger 
                value="inbox"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-medical-blue data-[state=active]:shadow-none rounded-none h-12 px-4"
              >
                Inbox
              </TabsTrigger>
              <TabsTrigger 
                value="sent"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-medical-blue data-[state=active]:shadow-none rounded-none h-12 px-4"
              >
                Sent
              </TabsTrigger>
              <TabsTrigger 
                value="archived"
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-medical-blue data-[state=active]:shadow-none rounded-none h-12 px-4"
              >
                Archived
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="inbox" className="p-0">
            <div className="divide-y">
              {messageData.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${message.unread ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-medium ${message.unread ? 'font-semibold' : ''}`}>{message.sender}</h3>
                      <p className="text-sm font-medium">{message.subject}</p>
                      <p className="text-sm text-gray-600 mt-1">{message.preview}</p>
                    </div>
                    <div className="text-xs text-gray-500">{message.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="sent" className="p-4">
            <p className="text-sm text-gray-600">Your sent messages will appear here.</p>
          </TabsContent>
          
          <TabsContent value="archived" className="p-4">
            <p className="text-sm text-gray-600">Your archived messages will appear here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminMessages;
