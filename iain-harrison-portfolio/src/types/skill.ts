export interface Skill {
  name: string;
  icon: string;
  category?: 'core' | 'additional' | 'tools';
  description?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}
