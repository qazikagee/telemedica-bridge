
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does a virtual doctor visit work?",
    answer: "Virtual doctor visits take place over secure video conferencing. You'll log into your TeleMedica account at your scheduled appointment time, enter a virtual waiting room, and then connect with your doctor for a face-to-face consultation. You can discuss symptoms, ask questions, and receive diagnoses and treatment plans, just like an in-person visit."
  },
  {
    question: "What conditions can be treated through telehealth?",
    answer: "TeleMedica can treat a wide range of conditions including common illnesses (cold, flu, allergies), skin conditions, mental health concerns (anxiety, depression), chronic condition management, and much more. Some conditions may require in-person care, which your doctor will advise during your consultation."
  },
  {
    question: "Can doctors prescribe medication through TeleMedica?",
    answer: "Yes, our licensed physicians can prescribe many medications when appropriate. Prescriptions are sent electronically to your preferred pharmacy for pickup. Note that telehealth providers cannot prescribe controlled substances in most cases."
  },
  {
    question: "Is my personal health information secure?",
    answer: "Absolutely. TeleMedica is fully HIPAA-compliant and uses end-to-end encryption for all video consultations and messaging. Your personal health information is stored securely and is never shared without your explicit consent."
  },
  {
    question: "Does insurance cover telehealth visits?",
    answer: "Many insurance plans now cover telehealth visits. TeleMedica works with most major insurance providers. You can verify your coverage during registration or contact your insurance provider directly to confirm telehealth benefits."
  },
  {
    question: "What if I need lab work or testing?",
    answer: "If your doctor determines you need lab work or other diagnostic testing, they will provide a lab order that you can take to a local testing facility. Once results are available, they'll be added to your TeleMedica medical record and your doctor will discuss them with you."
  }
];

const FaqSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-xl text-gray-600">
            Find answers to common questions about our telehealth services.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium text-gray-900">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Have more questions? <a href="/contact" className="text-medical-blue hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
