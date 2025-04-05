
import React from 'react';
import { Link } from 'react-router-dom';
import { specialties } from '@/components/landing/SpecialtiesSection';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/layouts/MainLayout';

const Specialties = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const getLocalizedPath = (path: string) => {
    return currentLang === 'en' ? path : `/${currentLang}${path}`;
  };
  
  // Map specialties with translations
  const translatedSpecialties = specialties.map(specialty => ({
    ...specialty,
    name: t(`specialties.${specialty.id}.name`),
    description: t(`specialties.${specialty.id}.description`),
    conditions: specialty.conditions.map((_, index) => 
      t(`specialties.${specialty.id}.conditions.${index}`)
    )
  }));
  
  return (
    <MainLayout>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">{t('specialties.title')}</h1>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {t('specialties.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {translatedSpecialties.map((specialty) => (
              <Link
                to={getLocalizedPath(`/specialties/${specialty.id}`)}
                key={specialty.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-medical-blue/10 p-3 rounded-full mr-4">
                    <specialty.icon size={24} className="text-medical-blue" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{specialty.name}</h2>
                </div>
                
                <p className="text-gray-600 mb-6 flex-grow">{specialty.description}</p>
                
                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {specialty.conditions.map((condition, index) => (
                      <span 
                        key={`${specialty.id}-${index}`} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <span className="inline-flex items-center text-sm font-medium text-medical-blue hover:text-medical-blue-dark">
                      {t('specialties.learnMore')} <ChevronRight size={16} className="ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Specialties;
