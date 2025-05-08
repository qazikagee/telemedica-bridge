
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const getLocalizedPath = (path: string) => {
    if (path === '/') {
      return currentLang === 'en' ? '/' : `/${currentLang}`;
    }
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return currentLang === 'en' ? cleanPath : `/${currentLang}${cleanPath}`;
  };
  
  return (
    <footer className="bg-gray-50 pt-8 sm:pt-12 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-medical-blue font-bold text-xl">TeleMedica</h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {t('footer.companyInfo')}
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-medical-blue">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-medical-blue">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-medical-blue">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-medical-blue">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link to={getLocalizedPath("/specialties")} className="text-gray-600 hover:text-medical-blue">
                  {t('footer.specialties')}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath("/about")} className="text-gray-600 hover:text-medical-blue">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath("/contact")} className="text-gray-600 hover:text-medical-blue">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath("/sign-in")} className="text-gray-600 hover:text-medical-blue">
                  {t('footer.signin')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link to={getLocalizedPath("/terms")} className="text-gray-600 hover:text-medical-blue">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath("/privacy")} className="text-gray-600 hover:text-medical-blue">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath("/hipaa")} className="text-gray-600 hover:text-medical-blue">
                  {t('footer.hipaa')}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath("/accessibility")} className="text-gray-600 hover:text-medical-blue">
                  {t('footer.accessibility')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">{t('footer.contactUs')}</h4>
            <ul className="space-y-3 text-sm sm:text-base">
              <li className="flex items-start">
                <Phone size={18} className="text-medical-blue mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">+1 (800) 123-4567</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="text-medical-blue mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">support@telemedica.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-medical-blue mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600 break-words">
                  123 Medical Plaza, Suite 200, San Francisco, CA 94103
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-12 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} TeleMedica. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
