
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import Hero from '@/components/landing/Hero';
import SpecialtiesSection from '@/components/landing/SpecialtiesSection';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonials from '@/components/landing/Testimonials';
import CtaSection from '@/components/landing/CtaSection';
import FaqSection from '@/components/landing/FaqSection';

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    // If there's a hash in the URL, scroll to that element
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Scroll to top when the page loads without a hash
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <MainLayout>
      <Hero />
      <SpecialtiesSection />
      <HowItWorks />
      <Testimonials />
      <FaqSection />
      <CtaSection />
    </MainLayout>
  );
};

export default Index;
