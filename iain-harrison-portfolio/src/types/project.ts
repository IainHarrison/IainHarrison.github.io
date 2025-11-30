export interface Project {
  id: string;
  title: string;
  image: string;
  description: string;
  technologies: string[];
  categories: ('games' | 'vr' | 'mobile' | 'web' | 'professional' | 'education')[];
  links: {
    demo?: string;
    github?: string;
    external?: string;
    itchio?: string;
  };
  details: {
    overview: string;
    role: string;
    technologies: string[];
    contributions: string[];
    challenges?: string;
    outcomes: string[];
    videoUrl?: string;
    images?: string[];
    teamMembers?: Array<{
      name: string;
      role: string;
      linkedinUrl?: string;
    }>;
  };
}
