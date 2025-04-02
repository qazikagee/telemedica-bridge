
import React from 'react';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Patient',
    image: 'https://randomuser.me/api/portraits/women/79.jpg',
    stars: 5,
    text: 'TeleMedica has been a lifesaver for our family. With three kids and busy schedules, being able to see a doctor from home has saved us countless hours in waiting rooms.',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Patient',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    stars: 5,
    text: 'I was skeptical about telemedicine at first, but my experience with TeleMedica changed my mind. The doctors are thorough, caring, and the platform is so easy to use.',
  },
  {
    id: 3,
    name: 'Emily Chen',
    role: 'Patient',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    stars: 4,
    text: 'As someone with a chronic condition, regular doctor visits are essential. TeleMedica makes it so much easier to manage my health without having to take time off work.',
  },
];

const Testimonials = () => {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{t('testimonials.title')}</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
