import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const TranslatedNavbar = () => {
  const { t, i18n } = useTranslation();
  const isMobile = useIsMobile();
  const location = useLocation();
  const currentLang = i18n.language;

  const navigationItems = [
    { title: t('nav.home'), href: '/' },
    { title: t('nav.specialties'), href: '/specialties' },
    { title: t('nav.about'), href: '/about' },
    { title: t('nav.contact'), href: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const getLocalizedPath = (path: string) => {
    if (path === '/') return path;
    return currentLang === 'en' ? path : `/${currentLang}${path}`;
  };

  const NavLinks = () => (
    <>
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          to={getLocalizedPath(item.href)}
          className={`${
            isActive(item.href)
              ? 'text-medical-blue font-semibold'
              : 'text-gray-700 hover:text-medical-blue'
          } px-3 py-2 text-sm font-medium transition-colors`}
        >
          {item.title}
        </Link>
      ))}
    </>
  );

  const AuthButtons = () => (
    <div className="flex items-center gap-4">
      <Link to={getLocalizedPath("/sign-in")}>
        <Button variant="ghost" className="text-gray-700 hover:text-medical-blue">
          {t('nav.signin')}
        </Button>
      </Link>
      <Link to={getLocalizedPath("/sign-up")}>
        <Button className="bg-medical-blue hover:bg-medical-blue-dark text-white">
          {t('nav.signup')}
        </Button>
      </Link>
      <LanguageSwitcher />
    </div>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link to={getLocalizedPath("/")} className="flex items-center">
            <span className="text-xl font-bold text-medical-blue">TeleMedica</span>
          </Link>
        </div>

        {isMobile ? (
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-6 mt-6">
                  <div className="flex flex-col space-y-3">
                    <NavLinks />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Link to={getLocalizedPath("/sign-in")}>
                      <Button variant="ghost" className="w-full justify-start">
                        {t('nav.signin')}
                      </Button>
                    </Link>
                    <Link to={getLocalizedPath("/sign-up")}>
                      <Button className="w-full bg-medical-blue hover:bg-medical-blue-dark">
                        {t('nav.signup')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <>
            <nav className="hidden md:flex items-center space-x-1">
              <NavLinks />
            </nav>
            <div className="hidden md:block">
              <AuthButtons />
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default TranslatedNavbar;
