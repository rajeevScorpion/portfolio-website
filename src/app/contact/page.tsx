'use client';

import { ContactPage } from '@/components/pages/ContactPage';
import { ContactForm } from '@/types';

export default function Contact() {
  const handleContactSubmit = (data: ContactForm) => {
    // The toast will be handled by the main PortfolioSite component
    console.log('Contact form submitted:', data);
  };
  
  return (
    <>
      <ContactPage onSubmit={handleContactSubmit} />
    </>
  );
}