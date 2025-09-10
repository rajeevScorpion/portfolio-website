'use client';

import { useRef } from 'react';
import { Button, Card, Section } from '@/components/ui';
import { Icon } from '@/components/icons';
import { useAutoReveal } from '@/lib/utils';
import { ContactForm } from '@/types';

interface ContactPageProps {
  onSubmit: (data: ContactForm) => void;
}

export function ContactPage({ onSubmit }: ContactPageProps) {
  useAutoReveal();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
      alert('Please fill all required fields.');
      return;
    }
    
    onSubmit({ name, email, message });
    formRef.current?.reset();
  }

  return (
    <Section id="contact" subtitle="Collaborate" title="Let's Work Together">
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="p-6 md:col-span-2">
          <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm text-gray-300">Name*</label>
              <input name="name" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-gray-300">Email*</label>
              <input type="email" name="email" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-gray-300">Message*</label>
              <textarea name="message" rows={5} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]" />
            </div>
            <div className="pt-2">
              <Button variant="solid" rightIcon={<Icon.ArrowRight className="h-4 w-4" />}>Send Message</Button>
            </div>
          </form>
        </Card>
        <div className="space-y-6">
          <Card className="p-6">
            <h4 className="mb-2 text-lg font-light text-white">Direct</h4>
            <p className="text-gray-400">Email: <a href="mailto:hello@yourstudio.com" className="text-[var(--accent)] hover:underline">hello@yourstudio.com</a></p>
            <p className="text-gray-400">Location: Ahmedabad, IN</p>
          </Card>
          <Card className="p-6">
            <h4 className="mb-2 text-lg font-light text-white">Social</h4>
            <div className="flex gap-3">
              <a aria-label="LinkedIn" href="#" className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10 transition hover:bg-white/10">
                <Icon.Linkedin className="h-5 w-5" />
              </a>
              <a aria-label="Behance" href="#" className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10 transition hover:bg-white/10">
                <Icon.Behance className="h-5 w-5" />
              </a>
              <a aria-label="Instagram" href="#" className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10 transition hover:bg-white/10">
                <Icon.Instagram className="h-5 w-5" />
              </a>
              <a aria-label="Dribbble" href="#" className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10 transition hover:bg-white/10">
                <Icon.Dribbble className="h-5 w-5" />
              </a>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}