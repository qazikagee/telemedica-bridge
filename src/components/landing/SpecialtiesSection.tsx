
import React from 'react';
import { Activity, Brain, Stethoscope, Heart, Eye, Bone, UserCheck, Baby, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const specialties = [
  {
    id: 'general-medicine',
    icon: Stethoscope,
    conditions: ['Cold & Flu', 'Allergies', 'UTI', 'Sinus Infection'],
  },
  {
    id: 'mental-health',
    icon: Brain,
    conditions: ['Anxiety', 'Depression', 'Insomnia', 'Stress'],
  },
  {
    id: 'dermatology',
    icon: Activity,
    conditions: ['Acne', 'Rashes', 'Eczema', 'Psoriasis'],
  },
  {
    id: 'cardiology',
    icon: Heart,
    conditions: ['Hypertension', 'Heart Disease', 'Cholesterol', 'Arrhythmia'],
  },
  {
    id: 'ophthalmology',
    icon: Eye,
    conditions: ['Pink Eye', 'Vision Problems', 'Cataracts', 'Glaucoma'],
  },
  {
    id: 'orthopedics',
    icon: Bone,
    conditions: ['Back Pain', 'Joint Pain', 'Sprains', 'Arthritis'],
  },
  {
    id: 'pediatrics',
    icon: Baby,
    conditions: ['Child Illnesses', 'Growth Issues', 'Behavior', 'Development'],
  },
  {
    id: 'nutrition',
    icon: UserCheck,
    conditions: ['Weight Management', 'Diet Planning', 'Allergies', 'Diabetes Management'],
  }
];

const SpecialtiesSection = () => {
  const { t } = useTranslation();
  
  // Map specialties with translations
  const translatedSpecialties = specialties.map(specialty => ({
    ...specialty,
    name: t(`specialties.${specialty.id}.name`),
    description: t(`specialties.${specialty.id}.description`),
    fullDescription: t(`specialties.${specialty.id}.fullDescription`),
    conditions: specialty.conditions.map((_, index) => 
      t(`specialties.${specialty.id}.conditions.${index}`)
    )
  }));

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{t('specialties.title')}</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            {t('specialties.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {translatedSpecialties.map((specialty) => (
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
                    {specialty.conditions.slice(0, 2).map((condition, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {condition}
                      </span>
                    ))}
                    {specialty.conditions.length > 2 && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700">
                        +{specialty.conditions.length - 2} {t('specialties.more')}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <span className="inline-flex items-center text-sm font-medium text-medical-blue group-hover:text-medical-blue-dark">
                      {t('specialties.learnMore')} <ChevronRight size={16} className="ml-1" />
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
            {t('specialties.viewAll')}
            <ChevronRight className="h-5 w-5 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;
