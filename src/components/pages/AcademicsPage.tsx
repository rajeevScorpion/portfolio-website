'use client';

import { useMemo, useState } from 'react';
import { Card, Section, Tag } from '@/components/ui';
import { Icon } from '@/components/icons';
import { fetchAcademics } from '@/data';
import { Academic } from '@/types';
import { useAutoReveal } from '@/lib/utils';
import { useEffect } from 'react';

interface AcademicsPageProps {
  onOpenAcademic: (academic: Academic) => void;
}

export function AcademicsPage({ onOpenAcademic }: AcademicsPageProps) {
  useAutoReveal();
  const [filter, setFilter] = useState<string>('all');
  const [academics, setAcademics] = useState<Academic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAcademics = async () => {
      const data = await fetchAcademics();
      setAcademics(data);
      setLoading(false);
    };
    loadAcademics();
  }, []);

  const filtered = useMemo(
    () => (filter === 'all' ? academics : academics.filter((a) => a.field === filter)),
    [filter, academics]
  );

  return (
    <>
      <Section id="academics" subtitle="Academic" title="Contributions">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {[
            { k: 'all', label: 'All' },
            { k: 'Computer Science', label: 'Computer Science' },
            { k: 'Design', label: 'Design' },
            { k: 'AI Research', label: 'AI Research' },
            { k: 'Education', label: 'Education' },
          ].map((t) => (
            <Tag key={t.k} active={filter === t.k} onClick={() => setFilter(t.k)}>
              {t.label}
            </Tag>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-400">Loading academic contributions...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400">No academic contributions to show yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((a) => (
              <button key={a.id} className="group text-left" onClick={() => onOpenAcademic(a)} aria-label={`Open ${a.title}`}>
                <Card className="overflow-hidden transition hover:ring-white/30">
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60" />
                    <div className="absolute top-4 right-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        a.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                        a.status === 'In Review' ? 'bg-blue-500/20 text-blue-400' :
                        a.status === 'Submitted' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {a.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <h3 className="text-lg font-light text-white">{a.title}</h3>
                      <p className="text-xs uppercase tracking-wider text-gray-400">{a.field}</p>
                      {a.publication && (
                        <p className="text-xs text-gray-500 mt-1">{a.publication}</p>
                      )}
                      {a.date && (
                        <p className="text-xs text-gray-500">{a.date}</p>
                      )}
                      <p className="mt-2 text-sm text-gray-300 line-clamp-2">{a.description}</p>
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