
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-medical-blue font-bold text-xl">TeleMedica</h3>
            <p className="text-gray-600">
              Providing accessible healthcare through innovative telehealth solutions.
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
            <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/specialties" className="text-gray-600 hover:text-medical-blue">
                  Medical Specialties
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-medical-blue">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-gray-600 hover:text-medical-blue">
                  Find a Doctor
                </Link>
              </li>
              <li>
                <Link to="/insurance" className="text-gray-600 hover:text-medical-blue">
                  Insurance Coverage
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-medical-blue">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-medical-blue">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/hipaa" className="text-gray-600 hover:text-medical-blue">
                  HIPAA Compliance
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-gray-600 hover:text-medical-blue">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="text-medical-blue mr-2 mt-0.5" />
                <span className="text-gray-600">(800) 555-TELE</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="text-medical-blue mr-2 mt-0.5" />
                <span className="text-gray-600">support@telemedica.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-medical-blue mr-2 mt-0.5" />
                <span className="text-gray-600">
                  123 Health Avenue<br />
                  San Francisco, CA 94107
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TeleMedica. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
