export interface Project {
  id: string;
  title: string;
  category: 'branding' | '3d';
  cover: string;
  brief: string;
  images: string[];
  image: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface Research {
  id: string;
  title: string;
  field: 'Generative AI' | 'AI Coding' | 'AI Integration in Design Curriculum';
  description: string;
  image: string;
  status: 'In Progress' | 'Active' | 'Planning' | 'Completed';
  focus: string;
}

export interface Academic {
  id: string;
  title: string;
  field: 'Computer Science' | 'Design' | 'AI Research' | 'Education';
  description: string;
  image: string;
  status: 'Published' | 'In Review' | 'Draft' | 'Submitted';
  focus: string;
  publication?: string;
  date?: string;
}