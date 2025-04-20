
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layouts/MainLayout';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const getLocalizedPath = (path: string) => {
    return currentLang === 'en' ? path : `/${currentLang}${path}`;
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center bg-medical-gray-light py-16">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="text-medical-blue text-9xl font-bold mb-4">404</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('notFound.title') || 'Page Not Found'}</h1>
          <p className="text-gray-600 mb-8">
            {t('notFound.message') || "The page you are looking for doesn't exist or has been moved."}
          </p>
          <Link to={getLocalizedPath("/")}>
            <Button className="bg-medical-blue hover:bg-medical-blue-dark">
              {t('notFound.returnHome') || 'Return to Home'}
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
