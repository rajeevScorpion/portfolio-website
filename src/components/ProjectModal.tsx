'use client';

import { useEffect } from 'react';
import { Project, Research, Academic } from '@/types';

interface ProjectModalProps {
  project: Project | Research | Academic | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    function onEsc(e: KeyboardEvent) { 
      if (e.key === 'Escape') onClose(); 
    }
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  if (!project) return null;
  
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-6">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-3xl bg-[#0e0e13] ring-1 ring-white/10">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0e0e13]/90 px-6 py-4 backdrop-blur">
          <h3 className="text-lg font-light text-white">{project.title}</h3>
          <button onClick={onClose} className="rounded-xl bg-white/5 px-3 py-1.5 text-sm text-gray-300 ring-1 ring-white/10 hover:bg-white/10">Close</button>
        </div>
        <div className="space-y-6 p-6">
          {'brief' in project ? (
            <>
              <p className="text-gray-400">{project.brief}</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[project.cover, ...project.images].map((src, i) => (
                  <img key={i} src={src} alt="Project visual" className="h-64 w-full rounded-2xl object-cover" loading="lazy" />
                ))}
              </div>
            </>
          ) : 'focus' in project ? (
            <>
              <div className="flex items-center gap-4">
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                  project.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                  project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                  project.status === 'Planning' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {'status' in project ? project.status : ''}
                </span>
                <span className="text-sm text-gray-400">
                  {(() => {
                    const p = project as any; // eslint-disable-line @typescript-eslint/no-explicit-any
                    if ('field' in p) return p.field;
                    if ('category' in p) return p.category;
                    return '';
                  })()}
                </span>
              </div>
              <p className="text-gray-400">{project.description}</p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Focus Area</h4>
                  <p className="text-gray-400">{project.focus}</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <img key={project.image} src={project.image} alt="Research visual" className="h-64 w-full rounded-2xl object-cover" loading="lazy" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                  'status' in project && project.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                  'status' in project && project.status === 'In Review' ? 'bg-blue-500/20 text-blue-400' :
                  'status' in project && project.status === 'Submitted' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {'status' in project ? project.status : ''}
                </span>
                <span className="text-sm text-gray-400">
                  {(() => {
                    const p = project as any; // eslint-disable-line @typescript-eslint/no-explicit-any
                    if ('field' in p) return p.field;
                    if ('category' in p) return p.category;
                    return '';
                  })()}
                </span>
              </div>
              {'publication' in project && project.publication && (
                <p className="text-sm text-gray-300">Publication: {project.publication}</p>
              )}
              {'date' in project && project.date && (
                <p className="text-sm text-gray-300">Date: {project.date}</p>
              )}
              <p className="text-gray-400">{project.description}</p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Focus Area</h4>
                  <p className="text-gray-400">{project.focus}</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <img key={project.image} src={project.image} alt="Academic visual" className="h-64 w-full rounded-2xl object-cover" loading="lazy" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}