
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { specialties } from '@/components/landing/SpecialtiesSection';
import { Check, ArrowLeft, Calendar } from 'lucide-react';

const SpecialtyDetails = () => {
  const { specialtyId } = useParams();
  const navigate = useNavigate();
  
  const specialty = specialties.find((s) => s.id === specialtyId);
  
  if (!specialty) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Specialty Not Found</h1>
            <p className="text-gray-600 mb-6">The specialty you are looking for does not exist.</p>
            <Button onClick={() => navigate('/specialties')} className="bg-medical-blue hover:bg-medical-blue-dark">
              Back to All Specialties
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <Link to="/specialties" className="inline-flex items-center text-gray-600 hover:text-medical-blue">
              <ArrowLeft size={18} className="mr-2" />
              Back to All Specialties
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-medical-blue text-white p-8">
              <div className="flex items-center">
                <div className="bg-white/20 p-4 rounded-full mr-4">
                  <specialty.icon size={32} />
                </div>
                <h1 className="text-3xl font-bold">{specialty.name}</h1>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
                  <p className="text-gray-700 text-lg mb-8">{specialty.fullDescription}</p>
                  
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Conditions We Treat</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {specialty.conditions.map((condition) => (
                      <div key={condition} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <Check size={18} className="text-medical-blue" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-lg font-medium text-gray-900">{condition}</h3>
                          <p className="text-gray-600">Our specialists provide diagnosis, treatment, and management for this condition.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose TeleMedica?</h2>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <Check size={20} className="text-medical-blue mt-1 mr-2 flex-shrink-0" />
                      <span>Board-certified specialists available for virtual consultations</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-medical-blue mt-1 mr-2 flex-shrink-0" />
                      <span>Convenient appointment scheduling that works with your schedule</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-medical-blue mt-1 mr-2 flex-shrink-0" />
                      <span>Secure and private video consultations from the comfort of your home</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-medical-blue mt-1 mr-2 flex-shrink-0" />
                      <span>Digital prescriptions sent directly to your preferred pharmacy</span>
                    </li>
                    <li className="flex items-start">
                      <Check size={20} className="text-medical-blue mt-1 mr-2 flex-shrink-0" />
                      <span>Comprehensive follow-up care and support</span>
                    </li>
                  </ul>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Get Started?</h3>
                    <p className="text-gray-700 mb-6">
                      Book a virtual consultation with one of our {specialty.name.toLowerCase()} specialists today and take the first step toward better health.
                    </p>
                    <Link to="/sign-in">
                      <Button className="w-full bg-medical-blue hover:bg-medical-blue-dark flex items-center justify-center mb-4">
                        <Calendar className="mr-2" size={18} />
                        Book Appointment
                      </Button>
                    </Link>
                    <p className="text-sm text-gray-600 text-center">
                      New patients welcome! Most insurance plans accepted.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6 mt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">FAQ</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900">How do virtual consultations work?</h4>
                        <p className="text-gray-600 text-sm mt-1">
                          Our secure video platform allows you to meet with your doctor from any device with internet access. You'll receive instructions when you book your appointment.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Is my insurance accepted?</h4>
                        <p className="text-gray-600 text-sm mt-1">
                          We accept most major insurance plans. You can verify coverage during the booking process.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">What if I need in-person care?</h4>
                        <p className="text-gray-600 text-sm mt-1">
                          Our doctors can refer you to in-person care if needed, and we'll help coordinate your care plan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SpecialtyDetails;
