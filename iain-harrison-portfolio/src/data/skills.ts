import { Skill, SkillCategory } from '../types/skill';

export const coreSkills: Skill[] = [
  { 
    name: "Unity Development", 
    icon: "unity-logo.svg", 
    category: "core",
    description: "Expert-level Unity development experience creating applications & games, Unity input, particles and animator systems, Unity Editor tooling/scripts."  
  },
  { 
    name: "C# Programming", 
    icon: "bx-code-alt", 
    category: "core",
    description: "Advanced C# programming with focus on clean architecture, design patterns, and performance optimization for game development and enterprise applications."
  },
  { 
    name: "Tooling & Systems", 
    icon: "bx-cog", 
    category: "core",
    description: "Custom editor tools, build systems, and development workflows that streamline team productivity and maintain code quality standards, Tools for artists, designers and other developers"
  },
  { 
    name: "Procedural Generation", 
    icon: "bx-cube", 
    category: "core",
    description: "Algorithmic content generation for worlds, levels, and game assets using noise functions, cellular automata, and custom algorithms."
  },
  { 
    name: "Algorithms", 
    icon: "bx-chip", 
    category: "core",
    description: "Implementation of complex algorithms for pathfinding, optimization, data structures, and computational geometry in interactive applications."
  },
  { 
    name: "Game Design", 
    icon: "bx-palette", 
    category: "additional",
    description: "Core game design principles, balancing mechanics, progression systems, and creating compelling player experiences."
  },
  { 
    name: "Game Feel & Feedback", 
    icon: "bx-joystick", 
    category: "core",
    description: "Crafting responsive, satisfying player interactions through animation, audio, haptics, and visual effects that enhance user engagement."
  },
  { 
    name: "React", 
    icon: "bxl-react", 
    category: "core",
    description: "Modern React development with hooks, context, component architecture, and state management for building interactive web applications."
  },
];

export const additionalSkills: Skill[] = [
  { 
    name: "Unreal Engine", 
    icon: "unreal-logo.svg", 
    category: "additional",
    description: "Blueprint scripting and C++ development in Unreal Engine for high-fidelity games and architectural visualizations."
  },
  { 
    name: "Physics Programming", 
    icon: "bx-atom", 
    category: "additional",
    description: "Custom physics simulations, collision detection, and realistic movement systems for enhanced gameplay mechanics."
  },
  { 
    name: "Player Behaviorism", 
    icon: "bx-user-voice", 
    category: "additional",
    description: "Understanding player psychology and behavior patterns to design engaging and intuitive user experiences."
  },
  { 
    name: "Live2D", 
    icon: "bx-face", 
    category: "additional",
    description: "2D character animation and rigging using Live2D for interactive characters and dynamic visual storytelling."
  },
  { 
    name: "Linear Algebra", 
    icon: "bx-calculator", 
    category: "additional",
    description: "Mathematical foundations for 3D graphics, transformations, and computational geometry in game development."
  },
  { 
    name: "Software Architecture", 
    icon: "bx-layer", 
    category: "additional",
    description: "Scalable system design, modular architecture patterns, and maintainable code structures for large projects."
  },
  { 
    name: "HTML & CSS", 
    icon: "bxl-html5", 
    category: "additional",
    description: "Modern web development with responsive design, CSS animations, and interactive user interfaces."
  },
  { 
    name: "Networking", 
    icon: "bx-network-chart", 
    category: "additional",
    description: "Multiplayer game development, real-time synchronization, client-server architecture, and network optimization for seamless online experiences."
  },
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
