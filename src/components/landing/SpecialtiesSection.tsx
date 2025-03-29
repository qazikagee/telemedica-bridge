
import React from 'react';
import { Activity, Brain, Stethoscope, Heart, Eye, Bone, UserCheck, Baby } from 'lucide-react';
import { Link } from 'react-router-dom';

const specialties = [
  {
    id: 'general-medicine',
    name: 'General Medicine',
    icon: Stethoscope,
    description: 'Primary care for common conditions, preventative care, and minor illnesses.',
    conditions: ['Cold & Flu', 'Allergies', 'UTI', 'Sinus Infection']
  },
  {
    id: 'mental-health',
    name: 'Mental Health',
    icon: Brain,
    description: 'Support for anxiety, depression, stress, and other mental health concerns.',
    conditions: ['Anxiety', 'Depression', 'Insomnia', 'Stress']
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    icon: Activity,
    description: 'Treatment for skin conditions, rashes, acne, and other dermatological issues.',
    conditions: ['Acne', 'Rashes', 'Eczema', 'Psoriasis']
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    icon: Heart,
    description: 'Care for heart conditions, blood pressure management, and more.',
    conditions: ['Hypertension', 'Heart Disease', 'Cholesterol', 'Arrhythmia']
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    icon: Eye,
    description: 'Eye care, vision problems, and eye infection treatment.',
    conditions: ['Pink Eye', 'Vision Problems', 'Cataracts', 'Glaucoma']
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    icon: Bone,
    description: 'Treatment for joint pain, injuries, and musculoskeletal conditions.',
    conditions: ['Back Pain', 'Joint Pain', 'Sprains', 'Arthritis']
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    icon: Baby,
    description: 'Healthcare for children, from infants to adolescents.',
    conditions: ['Child Illnesses', 'Growth Issues', 'Behavior', 'Development']
  },
  {
    id: 'nutrition',
    name: 'Nutrition',
    icon: UserCheck,
    description: 'Dietary guidance, weight management, and nutritional counseling.',
    conditions: ['Weight Management', 'Diet Planning', 'Allergies', 'Diabetes Management']
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
            <Link to={`/specialties/${specialty.id}`} key={specialty.id} className="specialty-card group">
              <div className="bg-medical-blue/10 p-4 rounded-full mb-4 group-hover:bg-medical-blue group-hover:text-white transition-colors">
                <specialty.icon size={32} className="text-medical-blue group-hover:text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{specialty.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{specialty.description}</p>
              <div className="mt-auto pt-4 border-t border-gray-100 w-full">
                <div className="flex flex-wrap gap-2 justify-center">
                  {specialty.conditions.slice(0, 2).map((condition) => (
                    <span key={condition} className="condition-badge">
                      {condition}
                    </span>
                  ))}
                  {specialty.conditions.length > 2 && (
                    <span className="condition-badge">
                      +{specialty.conditions.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/specialties" 
            className="inline-flex items-center text-medical-blue hover:text-medical-blue-dark font-medium"
          >
            View All Specialties
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
