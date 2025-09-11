'use client';

import { PortfolioPage } from '@/components/pages/PortfolioPage';
import { Project } from '@/types';

export default function Portfolio() {
  const handleOpenProject = (project: Project) => {
    // The modal will be handled by the main PortfolioSite component
  };
  
  return (
    <>
      <PortfolioPage onOpenProject={handleOpenProject} />
    </>
  );
}