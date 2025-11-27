export interface Skill {
  name: string;
  icon: string;
  category?: 'core' | 'additional' | 'tools';
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}
