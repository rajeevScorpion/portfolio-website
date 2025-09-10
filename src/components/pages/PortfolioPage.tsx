'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, Section, Tag } from '@/components/ui';
import { Icon } from '@/components/icons';
import { fetchProjects } from '@/data';
import { Project } from '@/types';
import { useAutoReveal } from '@/lib/utils';

interface PortfolioPageProps {
  onOpenProject: (project: Project) => void;
}

export function PortfolioPage({ onOpenProject }: PortfolioPageProps) {
  useAutoReveal();
  const [filter, setFilter] = useState<string>('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const data = await fetchProjects();
    setProjects(data);
    setLoading(false);
  };
  
  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects]
  );

  return (
    <>
      <Section id="portfolio" subtitle="Works" title="Selected Projects">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {[
            { k: 'all', label: 'All' },
            { k: 'branding', label: 'Branding' },
            { k: '3d', label: '3D' },
          ].map((t) => (
            <Tag key={t.k} active={filter === t.k} onClick={() => setFilter(t.k)}>
              {t.label}
            </Tag>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-400">Loading projects...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400">No projects to show yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {filtered.map((p) => (
              <button key={p.id} className="group text-left" onClick={() => onOpenProject(p)} aria-label={`Open ${p.title}`}>
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
              </button>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}