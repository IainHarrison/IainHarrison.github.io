import { Skill, SkillCategory } from '../types/skill';

export const coreSkills: Skill[] = [
  { name: "Unity Development", icon: "unity-logo.svg", category: "core" },
  { name: "C# Programming", icon: "bx-code-alt", category: "core" },
  { name: "Tooling & Systems", icon: "bx-cog", category: "core" },
  { name: "Procedural Generation", icon: "bx-cube", category: "core" },
  { name: "Algorithms", icon: "bx-chip", category: "core" },
  { name: "Game Feel & Feedback", icon: "bx-joystick", category: "core" },
  { name: "Networking", icon: "bx-network-chart", category: "core" },
];

export const additionalSkills: Skill[] = [
  { name: "Unreal Engine", icon: "unreal-logo.svg", category: "additional" },
  { name: "Physics Programming", icon: "bx-atom", category: "additional" },
  { name: "Player Behaviorism", icon: "bx-user-voice", category: "additional" },
  { name: "Game Design", icon: "bx-palette", category: "additional" },
  { name: "Live2D", icon: "bx-face", category: "additional" },
  { name: "Linear Algebra", icon: "bx-calculator", category: "additional" },
  { name: "Software Architecture", icon: "bx-layer", category: "additional" },
  { name: "HTML & CSS", icon: "bxl-html5", category: "additional" },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Core Competencies",
    skills: coreSkills
  },
  {
    title: "Additional Skills", 
    skills: additionalSkills
  }
];
