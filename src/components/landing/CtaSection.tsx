
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-16 bg-medical-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Experience Healthcare Reimagined?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Join thousands of patients who have discovered the convenience and quality of telemedicine with TeleMedica.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/sign-up">
            <Button size="lg" className="bg-white text-medical-blue hover:bg-blue-50 w-full sm:w-auto">
              Create Free Account
            </Button>
          </Link>
          <Link to="/specialties">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-medical-blue-dark w-full sm:w-auto">
              Explore Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
