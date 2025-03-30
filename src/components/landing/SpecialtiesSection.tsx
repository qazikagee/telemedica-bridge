
import React from 'react';
import { Activity, Brain, Stethoscope, Heart, Eye, Bone, UserCheck, Baby, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const specialties = [
  {
    id: 'general-medicine',
    name: 'General Medicine',
    icon: Stethoscope,
    description: 'Primary care for common conditions, preventative care, and minor illnesses.',
    conditions: ['Cold & Flu', 'Allergies', 'UTI', 'Sinus Infection'],
    fullDescription: 'Our general medicine specialists provide comprehensive primary care services including diagnosis and treatment of acute and chronic illnesses, preventive care, health-risk assessments, and personalized health advice for patients of all ages.'
  },
  {
    id: 'mental-health',
    name: 'Mental Health',
    icon: Brain,
    description: 'Support for anxiety, depression, stress, and other mental health concerns.',
    conditions: ['Anxiety', 'Depression', 'Insomnia', 'Stress'],
    fullDescription: 'Our mental health professionals offer compassionate care for a range of psychological concerns. They provide therapy, counseling, and when appropriate, medication management to help you navigate life\'s challenges and improve your overall wellbeing.'
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    icon: Activity,
    description: 'Treatment for skin conditions, rashes, acne, and other dermatological issues.',
    conditions: ['Acne', 'Rashes', 'Eczema', 'Psoriasis'],
    fullDescription: 'Our dermatologists diagnose and treat a wide range of skin conditions, from common concerns like acne and rashes to more complex issues such as psoriasis, eczema, and skin cancer screenings, helping you maintain healthy skin throughout your life.'
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    icon: Heart,
    description: 'Care for heart conditions, blood pressure management, and more.',
    conditions: ['Hypertension', 'Heart Disease', 'Cholesterol', 'Arrhythmia'],
    fullDescription: 'Our cardiology team specializes in the diagnosis and treatment of heart and vascular conditions. From managing high blood pressure and cholesterol to treating complex cardiac issues, our specialists are dedicated to improving your heart health.'
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    icon: Eye,
    description: 'Eye care, vision problems, and eye infection treatment.',
    conditions: ['Pink Eye', 'Vision Problems', 'Cataracts', 'Glaucoma'],
    fullDescription: 'Our ophthalmologists provide comprehensive eye care including routine vision checks, treatment for eye infections, and management of conditions like glaucoma and cataracts, helping you preserve your vision and eye health.'
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    icon: Bone,
    description: 'Treatment for joint pain, injuries, and musculoskeletal conditions.',
    conditions: ['Back Pain', 'Joint Pain', 'Sprains', 'Arthritis'],
    fullDescription: 'Our orthopedic specialists focus on the prevention, diagnosis, and treatment of disorders of the bones, joints, ligaments, tendons, and muscles. They address issues ranging from sports injuries to chronic conditions like arthritis.'
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    icon: Baby,
    description: 'Healthcare for children, from infants to adolescents.',
    conditions: ['Child Illnesses', 'Growth Issues', 'Behavior', 'Development'],
    fullDescription: 'Our pediatricians are dedicated to the health and wellbeing of children from birth through adolescence. They provide well-child visits, vaccinations, developmental assessments, and treatment for childhood illnesses and conditions.'
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    icon: UserCheck,
    description: 'Dietary guidance, weight management, and nutritional counseling.',
    conditions: ['Weight Management', 'Diet Planning', 'Allergies', 'Diabetes Management'],
    fullDescription: 'Our nutrition experts provide personalized dietary guidance to help you achieve your health goals. Whether you\'re managing a chronic condition, seeking weight loss support, or simply want to improve your eating habits, our team offers evidence-based nutrition advice.'
  }
];

const SpecialtiesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Medical Specialties</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with specialists across a wide range of medical fields to address your specific health concerns.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((specialty) => (
            <Link 
              to={`/specialties/${specialty.id}`} 
              key={specialty.id} 
              className="group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="bg-medical-blue/10 p-4 rounded-full mb-4 group-hover:bg-medical-blue group-hover:text-white transition-colors">
                  <specialty.icon size={32} className="text-medical-blue group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{specialty.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{specialty.description}</p>
                <div className="mt-auto pt-4 border-t border-gray-100 w-full">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {specialty.conditions.slice(0, 2).map((condition) => (
                      <span key={condition} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {condition}
                      </span>
                    ))}
                    {specialty.conditions.length > 2 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700">
                        +{specialty.conditions.length - 2} more
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <span className="inline-flex items-center text-sm font-medium text-medical-blue group-hover:text-medical-blue-dark">
                      Learn More <ChevronRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/specialties" 
            className="inline-flex items-center px-4 py-2 rounded-md bg-medical-blue text-white hover:bg-medical-blue-dark transition-colors"
          >
            View All Specialties
            <ChevronRight className="h-5 w-5 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
