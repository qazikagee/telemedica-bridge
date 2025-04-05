
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const getLocalizedPath = (path: string) => {
    return currentLang === 'en' ? path : `/${currentLang}${path}`;
  };
  
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-medical-blue font-bold text-xl">TeleMedica</h3>
            <p className="text-gray-600">
              {t('footer.companyInfo')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-medical-blue">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-medical-blue">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-medical-blue">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-medical-blue">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link to={getLocalizedPath("/specialties")} className="text-gray-600 hover:text-medical-blue">
                  {t('footer.specialties')}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath("/how-it-works")} className="text-gray-600 hover:text-medical-blue">
                  {t('footer.howItWorks')}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath("/doctors")} className="text-gray-600 hover:text-medical-blue">
                  {t('footer.findDoctor')}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath("/insurance")} className="text-gray-600 hover:text-medical-blue">
                  {t('footer.insurance')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2">
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
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="text-medical-blue mr-2 mt-0.5" />
                <span className="text-gray-600">{t('footer.phone')}</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="text-medical-blue mr-2 mt-0.5" />
                <span className="text-gray-600">{t('footer.email')}</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-medical-blue mr-2 mt-0.5" />
                <span className="text-gray-600">
                  {t('footer.address')}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TeleMedica. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
