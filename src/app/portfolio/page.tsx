'use client';

import { PortfolioPage } from '@/components/pages/PortfolioPage';
import { Project } from '@/types';

export default function Portfolio() {
  const handleOpenProject = (project: Project) => {
    // The modal will be handled by the main PortfolioSite component
    console.log('Opening project:', project.title);
  };
  
  return (
    <>
      <PortfolioPage onOpenProject={handleOpenProject} />
    </>
  );
}