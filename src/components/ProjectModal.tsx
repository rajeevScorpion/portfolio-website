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

  // Type guard functions
  const isProject = (item: Project | Research | Academic): item is Project => {
    return 'brief' in item && 'category' in item;
  };

  const isResearch = (item: Project | Research | Academic): item is Research => {
    return 'focus' in item && 'field' in item && item.field.includes('AI');
  };

  const isAcademic = (item: Project | Research | Academic): item is Academic => {
    return 'focus' in item && 'field' in item && !item.field.includes('AI');
  };

  const getFieldOrCategory = (item: Project | Research | Academic): string => {
    if ('field' in item) return item.field;
    if ('category' in item) return item.category;
    return '';
  };

  const getStatus = (item: Project | Research | Academic): string => {
    if ('status' in item) return item.status;
    return '';
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-6">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-3xl bg-[#0e0e13] ring-1 ring-white/10">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0e0e13]/90 px-6 py-4 backdrop-blur">
          <h3 className="text-lg font-light text-white">{project.title}</h3>
          <button onClick={onClose} className="rounded-xl bg-white/5 px-3 py-1.5 text-sm text-gray-300 ring-1 ring-white/10 hover:bg-white/10">Close</button>
        </div>
        <div className="space-y-6 p-6">
          {isProject(project) ? (
            <>
              <p className="text-gray-400">{project.brief}</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[project.cover, ...project.images].map((src, i) => (
                  <img key={i} src={src} alt="Project visual" className="h-64 w-full rounded-2xl object-cover" loading="lazy" />
                ))}
              </div>
            </>
          ) : isResearch(project) ? (
            <>
              <div className="flex items-center gap-4">
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                  getStatus(project) === 'Active' ? 'bg-green-500/20 text-green-400' :
                  getStatus(project) === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                  getStatus(project) === 'Planning' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {getStatus(project)}
                </span>
                <span className="text-sm text-gray-400">
                  {getFieldOrCategory(project)}
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
                  getStatus(project) === 'Published' ? 'bg-green-500/20 text-green-400' :
                  getStatus(project) === 'In Review' ? 'bg-blue-500/20 text-blue-400' :
                  getStatus(project) === 'Submitted' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {getStatus(project)}
                </span>
                <span className="text-sm text-gray-400">
                  {getFieldOrCategory(project)}
                </span>
              </div>
              {project.publication && (
                <p className="text-sm text-gray-300">Publication: {project.publication}</p>
              )}
              {project.date && (
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