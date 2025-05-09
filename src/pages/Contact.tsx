
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with a timeout
    setTimeout(() => {
      setIsSubmitting(false);
      // Show success toast instead of alert for better UX
      toast({
        title: t('contact.success.title'),
        description: t('contact.success.description'),
      });
      
      // Clear form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 800);
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900">{t('contact.title')}</h1>
            <p className="mt-4 text-lg text-gray-600">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.firstName')}
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    placeholder={t('contact.form.firstNamePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.lastName')}
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    placeholder={t('contact.form.lastNamePlaceholder')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.email')}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t('contact.form.emailPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.phone')}
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t('contact.form.phonePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.subject')}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  required
                  placeholder={t('contact.form.subjectPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.form.message')}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder={t('contact.form.messagePlaceholder')}
                  className="w-full"
                />
              </div>

              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  className="bg-medical-blue hover:bg-medical-blue-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                </Button>
              </div>
            </form>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-medical-blue/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-medical-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900">{t('contact.support.phone.title')}</h3>
              <p className="mt-2 text-gray-600">{t('contact.support.phone.number')}</p>
              <p className="mt-1 text-sm text-gray-500">{t('contact.support.phone.hours')}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-medical-blue/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-medical-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900">{t('contact.support.email.title')}</h3>
              <p className="mt-2 text-gray-600">{t('contact.support.email.address')}</p>
              <p className="mt-1 text-sm text-gray-500">{t('contact.support.email.response')}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center sm:col-span-2 lg:col-span-1">
              <div className="flex justify-center mb-4">
                <div className="bg-medical-blue/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-medical-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900">{t('contact.support.office.title')}</h3>
              <p className="mt-2 text-gray-600">{t('contact.support.office.line1')}</p>
              <p className="mt-1 text-gray-600">{t('contact.support.office.line2')}</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
