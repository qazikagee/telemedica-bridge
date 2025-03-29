
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, User } from "lucide-react";
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-medical-blue font-bold text-xl">TeleMedica</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/specialties" className="text-gray-600 hover:text-medical-blue px-3 py-2 rounded-md font-medium">
              Specialties
            </Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-medical-blue px-3 py-2 rounded-md font-medium">
              How It Works
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-medical-blue px-3 py-2 rounded-md font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-medical-blue px-3 py-2 rounded-md font-medium">
              Contact
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" className="border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white">
              Sign In
            </Button>
            <Button className="bg-medical-blue hover:bg-medical-blue-dark">
              Sign Up
            </Button>
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-medical-blue focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pt-2 pb-4 px-4 space-y-1 shadow-lg">
          <Link to="/specialties" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-medical-blue">
            Specialties
          </Link>
          <Link to="/how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-medical-blue">
            How It Works
          </Link>
          <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-medical-blue">
            About Us
          </Link>
          <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-medical-blue">
            Contact
          </Link>
          <div className="pt-4 pb-2 border-t border-gray-200 flex flex-col space-y-2">
            <Button variant="outline" className="w-full border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white">
              Sign In
            </Button>
            <Button className="w-full bg-medical-blue hover:bg-medical-blue-dark">
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
