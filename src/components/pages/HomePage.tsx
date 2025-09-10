'use client';

import { Button, Card, Section } from '@/components/ui';
import { Icon } from '@/components/icons';
import { fetchProjects, fetchAcademics, fetchResearch } from '@/data';
import { Testimonials } from '@/components/Testimonials';
import { useAutoReveal } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Project, Academic, Research } from '@/types';

interface HomePageProps {
  onViewWork: () => void;
}

export function HomePage({ onViewWork }: HomePageProps) {
  useAutoReveal();
  const [projects, setProjects] = useState<Project[]>([]);
  const [academics, setAcademics] = useState<Academic[]>([]);
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loadData = async () => {
      const [projectsData, academicsData, researchData] = await Promise.all([
        fetchProjects(),
        fetchAcademics(),
        fetchResearch()
      ]);
      setProjects(projectsData);
      setAcademics(academicsData);
      setResearch(researchData);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[84vh] items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.07),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(199,168,111,0.12),transparent_40%)]" />
        <div className="container relative z-10 mx-auto max-w-6xl px-6">
          <p className="mb-6 text-xs uppercase tracking-[0.35em] text-gray-400">Branding · 3D Design · AI Research</p>
          <h1 className="text-4xl leading-tight text-white md:text-6xl md:leading-[1.1] font-extralight">
            Crafting <span className="text-[var(--accent)]">Brands</span> with
            <br className="hidden sm:block" /> Identity & Dimension
          </h1>
          <p className="mt-5 max-w-2xl text-gray-400">
            I help companies turn ideas into timeless brand systems and photoreal 3D visuals — minimal, precise, and memorable. 
            Currently researching the intersection of AI and creative workflows.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button onClick={onViewWork} rightIcon={<Icon.ArrowRight className="h-4 w-4" />}>View My Work</Button>
            <Button href="#contact" variant="ghost">Contact</Button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <Section id="featured" subtitle="Selected" title="Top Projects">
        {!isClient || loading ? (
          <p className="text-gray-400">Loading projects...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {projects.slice(0, 4).map((p) => (
                <a key={p.id} href="#portfolio" className="group block">
                  <Card className="overflow-hidden transition hover:ring-white/30">
                    {p.cover && p.cover.trim() !== '' ? (
                      <div className="relative h-64 w-full overflow-hidden">
                        <img
                          src={p.cover}
                          alt={p.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                      </div>
                    ) : (
                      <div className="relative h-64 w-full overflow-hidden bg-gray-800 flex items-center justify-center">
                        <div className="text-gray-500 text-center">
                          <div className="text-4xl mb-2">🖼️</div>
                          <p className="text-sm">No Image</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between p-5">
                      <div>
                        <h3 className="text-lg font-light text-white">{p.title}</h3>
                        <p className="text-xs uppercase tracking-wider text-gray-400">{p.category}</p>
                      </div>
                      <Icon.ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Card>
                </a>
              ))}
            </div>
            {projects.length > 4 && (
              <div className="text-center mt-8">
                <Button onClick={onViewWork} variant="outline">View All Projects</Button>
              </div>
            )}
          </>
        )}
      </Section>

      {/* Research */}
      <Section id="research" subtitle="Ongoing" title="Research Work">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isClient && research.map((r) => (
            <Card key={r.id} className="overflow-hidden transition hover:ring-white/30">
              <div className="relative h-48 w-full overflow-hidden">
                {r.image && r.image.trim() !== '' ? (
                  <img
                    src={r.image}
                    alt={r.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-800 flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <div className="text-4xl mb-2">🔬</div>
                      <p className="text-sm">No Image</p>
                    </div>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    r.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                    r.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                    r.status === 'Planning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {r.status}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-light text-white mb-2">{r.title}</h3>
                <p className="text-xs uppercase tracking-wider text-[var(--accent)] mb-3">{r.field}</p>
                <p className="text-sm text-gray-400 mb-3">{r.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Focus: {r.focus}</p>
                  <Icon.ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Academic Contributions */}
      <Section id="academic-contributions" subtitle="Publications" title="Academic Contributions">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isClient && academics.map((a) => (
            <Card key={a.id} className="overflow-hidden transition hover:ring-white/30">
              <div className="relative h-48 w-full overflow-hidden">
                {a.image && a.image.trim() !== '' ? (
                  <img
                    src={a.image}
                    alt={a.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-800 flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <div className="text-4xl mb-2">📚</div>
                      <p className="text-sm">No Image</p>
                    </div>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    a.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                    a.status === 'In Review' ? 'bg-blue-500/20 text-blue-400' :
                    a.status === 'Submitted' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {a.status}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-light text-white mb-2">{a.title}</h3>
                <p className="text-xs uppercase tracking-wider text-[var(--accent)] mb-3">{a.field}</p>
                {a.publication && (
                  <p className="text-xs text-gray-300 mb-2">{a.publication}</p>
                )}
                {a.date && (
                  <p className="text-xs text-gray-500 mb-3">{a.date}</p>
                )}
                <p className="text-sm text-gray-400 mb-3">{a.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Focus: {a.focus}</p>
                  <Icon.ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" subtitle="What clients say" title="Testimonials">
        <Testimonials />
      </Section>
    </>
  );
}