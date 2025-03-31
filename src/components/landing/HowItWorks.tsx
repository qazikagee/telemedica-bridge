
import React from 'react';
import { Clipboard, Calendar, Video, FileText } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Create Your Profile',
    description: 'Complete your medical history and upload insurance information securely.',
    icon: Clipboard,
    color: 'bg-medical-blue',
  },
  {
    id: 2,
    title: 'Schedule a Visit',
    description: 'Choose a doctor and select an appointment time that works for you.',
    icon: Calendar,
    color: 'bg-medical-green',
  },
  {
    id: 3,
    title: 'Virtual Consultation',
    description: 'Connect with your doctor via secure video for diagnosis and treatment.',
    icon: Video,
    color: 'bg-medical-blue',
  },
  {
    id: 4,
    title: 'Get Treatment',
    description: 'Receive prescriptions, treatment plans, and follow-up care as needed.',
    icon: FileText,
    color: 'bg-medical-green',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-medical-gray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How TeleMedica Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Get the care you need in four simple steps, all from the comfort of your home.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => (
              <div key={step.id} className="bg-white rounded-xl shadow-sm p-6 relative">
                <div className={`${step.color} text-white w-12 h-12 flex items-center justify-center rounded-full mb-6 mx-auto`}>
                  <step.icon size={24} />
                </div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-medical-blue text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {step.id}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
