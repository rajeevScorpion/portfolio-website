'use client';

import { useState, useEffect } from 'react';
import { Shell } from '@/components/ui';
import { Icon } from '@/components/icons';
import { HomePage } from '@/components/pages/HomePage';
import { AboutPage } from '@/components/pages/AboutPage';
import { PortfolioPage } from '@/components/pages/PortfolioPage';
import { ResearchPage } from '@/components/pages/ResearchPage';
import { AcademicsPage } from '@/components/pages/AcademicsPage';
import { ContactPage } from '@/components/pages/ContactPage';
import { ProjectModal } from '@/components/ProjectModal';
import { Toast } from '@/components/ui';
import { Project, Research, Academic, ContactForm } from '@/types';

export function PortfolioSite() {
  const [page, setPage] = useState(() => {
    // Check if we're on the client side and get the initial hash
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'portfolio', 'research', 'academics', 'contact'].includes(hash)) {
        return hash;
      }
    }
    return 'home';
  });
  const [modal, setModal] = useState<Project | Research | Academic | null>(null);
  const [toast, setToast] = useState({ show: false, msg: '' });

  useEffect(() => {
    window.location.hash = page;
  }, [page]);

  function onContactSubmit({ name }: ContactForm) {
    setToast({ show: true, msg: `Thanks, ${name}. I'll get back to you shortly.` });
  }

  return (
    <Shell>
      {/* Top Nav */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#0b0b0f]/70 backdrop-blur">
        <div className="container mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a onClick={() => setPage('home')} className="cursor-pointer select-none text-sm font-semibold tracking-widest text-white">
            RK·Studio
          </a>
          <nav className="flex items-center gap-1">
            {[
              { k: 'home', label: 'Home' },
              { k: 'about', label: 'About' },
              { k: 'portfolio', label: 'Projects' },
              { k: 'research', label: 'Research' },
              { k: 'academics', label: 'Academics' },
              { k: 'contact', label: 'Contact' },
            ].map((item) => (
              <button
                key={item.k}
                onClick={() => setPage(item.k)}
                className={`rounded-xl px-3 py-2 text-sm text-gray-300 hover:text-white ${
                  page === item.k && 'text-white ring-1 ring-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
                      </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="pt-20">
        {page === 'home' && <HomePage onViewWork={() => setPage('portfolio')} />}
        {page === 'about' && <AboutPage />}
        {page === 'portfolio' && <PortfolioPage onOpenProject={setModal} />}
        {page === 'research' && <ResearchPage onOpenResearch={setModal} />}
        {page === 'academics' && <AcademicsPage onOpenAcademic={setModal} />}
        {page === 'contact' && <ContactPage onSubmit={onContactSubmit} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} RK·Studio. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" className="rounded-xl bg-white/5 p-2 ring-1 ring-white/10 hover:bg-white/10" aria-label="Email">
              <Icon.Mail className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-xl bg-white/5 p-2 ring-1 ring-white/10 hover:bg-white/10" aria-label="LinkedIn">
              <Icon.Linkedin className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-xl bg-white/5 p-2 ring-1 ring-white/10 hover:bg-white/10" aria-label="Behance">
              <Icon.Behance className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-xl bg-white/5 p-2 ring-1 ring-white/10 hover:bg-white/10" aria-label="Instagram">
              <Icon.Instagram className="h-4 w-4" />
            </a>
            <a href="#" className="rounded-xl bg-white/5 p-2 ring-1 ring-white/10 hover:bg-white/10" aria-label="Dribbble">
              <Icon.Dribbble className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <ProjectModal project={modal} onClose={() => setModal(null)} />
      <Toast show={toast.show} message={toast.msg} onClose={() => setToast({ show: false, msg: '' })} />
    </Shell>
  );
}