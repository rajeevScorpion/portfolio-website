import { Project, Testimonial, Research, Academic } from '@/types';
import { fetchProjects, fetchResearch, fetchAcademics } from '@/lib/api';

export const ACCENT = "#C7A86F";

// Re-export API functions for backward compatibility
export { fetchProjects, fetchResearch, fetchAcademics };

// Legacy static data (fallback)
export const PROJECTS: Project[] = [];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Impeccable craft. Our rebrand launched to rave reviews and a measurable lift in sales.",
    name: "Aanya Mehta",
    role: "Founder, Astra Coffee",
  },
  {
    quote: "The 3D visuals looked like photographs. They elevated our pitch decks instantly.",
    name: "Rohan Patel",
    role: "Product Lead, Lumio Labs",
  },
  {
    quote: "A strategic partner who understands business and aesthetics in equal measure.",
    name: "Sara Williams",
    role: "CMO, Harbor & Co.",
  },
];

export const RESEARCH: Research[] = [
  {
    id: "r1",
    title: "Generative AI in Creative Workflows",
    field: "Generative AI",
    description: "Exploring how generative AI tools can enhance creative processes while maintaining human artistic direction and originality.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
    status: "In Progress",
    focus: "AI-assisted design ideation and workflow optimization"
  },
  {
    id: "r2",
    title: "AI-Powered Code Generation",
    field: "AI Coding",
    description: "Investigating the impact of AI coding assistants on development workflows, code quality, and team collaboration.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    status: "Active",
    focus: "Developer productivity and code maintainability"
  },
  {
    id: "r3",
    title: "AI Integration in Design Education",
    field: "AI Integration in Design Curriculum",
    description: "Developing frameworks for incorporating AI tools into design education while preserving fundamental design principles.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
    status: "Planning",
    focus: "Curriculum development and pedagogical approaches"
  },
];