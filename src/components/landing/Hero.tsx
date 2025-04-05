
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarDays, VideoIcon, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const getLocalizedPath = (path: string) => {
    return currentLang === 'en' ? path : `/${currentLang}${path}`;
  };
  
  return (
    <div className="bg-gradient-to-br from-medical-blue-light/10 via-white to-medical-green-light/10 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                {t('hero.title')}
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                {t('hero.subtitle')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={getLocalizedPath("/sign-up")}>
                <Button size="lg" className="bg-medical-blue hover:bg-medical-blue-dark text-white w-full sm:w-auto">
                  {t('hero.getStarted')}
                </Button>
              </Link>
              <Link to={getLocalizedPath("/#how-it-works")}>
                <Button size="lg" variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue/10 w-full sm:w-auto">
                  {t('hero.howItWorks')}
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center">
                <VideoIcon className="h-5 w-5 text-medical-blue mr-2" />
                <span className="text-sm font-medium">{t('hero.features.video')}</span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="h-5 w-5 text-medical-blue mr-2" />
                <span className="text-sm font-medium">{t('hero.features.availability')}</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck className="h-5 w-5 text-medical-blue mr-2" />
                <span className="text-sm font-medium">{t('hero.features.hipaa')}</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
                alt="Doctor with tablet consulting with patient"
                className="object-cover w-full h-full"
              />
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block">
              <div className="flex items-center mb-3">
                <div className="h-3 w-3 bg-medical-green rounded-full animate-pulse-slow mr-2"></div>
                <span className="text-sm font-medium text-medical-green">{t('hero.doctors')}</span>
              </div>
              <p className="text-sm text-gray-600">
                {t('hero.doctorsCount')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
