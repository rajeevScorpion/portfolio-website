'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, Section, Tag } from '@/components/ui';
import { Icon } from '@/components/icons';
import { fetchResearch } from '@/data';
import { Research } from '@/types';
import { useAutoReveal } from '@/lib/utils';

interface ResearchPageProps {
  onOpenResearch: (research: Research) => void;
}

export function ResearchPage({ onOpenResearch }: ResearchPageProps) {
  useAutoReveal();
  const [filter, setFilter] = useState<string>('all');
  const [research, setResearch] = useState<Research[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      const researchData = await fetchResearch();
      setResearch(researchData);
      setLoading(false);
    };
    loadData();
  }, []);
  
  const filtered = useMemo(
    () => (filter === 'all' ? research : research.filter((r) => r.field === filter)),
    [filter, research]
  );

  return (
    <>
      <Section id="research" subtitle="Research" title="Current Studies">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {[
            { k: 'all', label: 'All' },
            { k: 'Generative AI', label: 'Generative AI' },
            { k: 'AI Coding', label: 'AI Coding' },
            { k: 'AI Integration in Design Curriculum', label: 'Design Education' },
          ].map((t) => (
            <Tag key={t.k} active={filter === t.k} onClick={() => setFilter(t.k)}>
              {t.label}
            </Tag>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-400">Loading research...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400">No research projects to show yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <button key={r.id} className="group text-left" onClick={() => onOpenResearch(r)} aria-label={`Open ${r.title}`}>
                <Card className="overflow-hidden transition hover:ring-white/30">
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                    <div className="absolute top-4 right-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        r.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                        r.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                        r.status === 'Planning' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {r.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <h3 className="text-lg font-light text-white">{r.title}</h3>
                      <p className="text-xs uppercase tracking-wider text-gray-400">{r.field}</p>
                      <p className="mt-2 text-sm text-gray-300 line-clamp-2">{r.description}</p>
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