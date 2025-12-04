import React from 'react';
import SkillTag from '../ui/SkillTag';
import { Skill } from '../../types/skill';

const SkillsShowcase: React.FC = () => {
  const skillCategories = [
    {
      title: "Unity Development",
      skills: [
        { 
          name: "AR/VR/MR Applications", 
          icon: "bx-cube-alt",
          description: "Immersive experiences using ARCore, ARKit, Oculus SDK, and OpenXR for cutting-edge mixed reality applications."
        },
        { 
          name: "Desktop Applications", 
          icon: "bx-desktop",
          description: "Cross-platform desktop software with native performance, custom UI systems, and seamless OS integration."
        },
        { 
          name: "Mobile Applications", 
          icon: "bx-mobile",
          description: "Optimized mobile games and apps for iOS and Android with touch controls, performance profiling, and platform-specific features."
        },
        { 
          name: "Custom Tools & Systems", 
          icon: "bx-code-block",
          description: "Editor extensions, build automation, asset pipelines, and development tools that enhance team productivity."
        },
        { 
          name: "Procedural Generation", 
          icon: "bx-shape-polygon",
          description: "Dynamic content creation using Perlin noise, cellular automata, and custom algorithms for infinite worlds and assets."
        },
        { 
          name: "Game Feel & Feedback", 
          icon: "bx-game",
          description: "Juice, polish, and responsive interactions through particle effects, screen shake, haptics, and audio design."
        },
        { 
          name: "Cross-Platform Development", 
          icon: "bx-devices",
          description: "Unified codebase deployment across PC, mobile, console, and web platforms with platform-specific optimizations."
        },
      ] as Skill[]
    },
    {
      title: "Project Management",
      skills: [
        { 
          name: "Client Liaison", 
          icon: "bx-user-voice",
          description: "Direct client communication, requirement gathering, expectation management, and stakeholder relationship building."
        },
        { 
          name: "Client Meetings", 
          icon: "bx-conversation",
          description: "Leading technical discussions, progress presentations, demo sessions, and collaborative problem-solving workshops."
        },
        { 
          name: "SCRUM & Agile", 
          icon: "bx-task",
          description: "Sprint planning, daily standups, retrospectives, and iterative development methodologies for efficient delivery."
        },
        { 
          name: "Jira Task Management", 
          icon: "bxl-jira",
          description: "Project tracking, bug reporting, workflow automation, and team coordination using Atlassian tools."
        },
        { 
          name: "Git Version Control", 
          icon: "bx-git-branch",
          description: "Branching strategies, merge conflict resolution, code history management, and collaborative development workflows."
        },
        { 
          name: "Code Reviews", 
          icon: "bx-code-curly",
          description: "Quality assurance through peer review, best practice enforcement, and knowledge sharing across the team."
        },
        { 
          name: "Bug Resolution", 
          icon: "bx-bug",
          description: "Systematic debugging, root cause analysis, performance profiling, and comprehensive testing strategies."
        },
      ] as Skill[]
    },
    {
      title: "Technical Specializations",
      skills: [
        { 
          name: "Multiplayer Networking", 
          icon: "bx-network-chart",
          description: "Real-time synchronization, authoritative servers, lag compensation, and scalable network architecture for online games."
        },
        { 
          name: "VR/AR Development", 
          icon: "bx-glasses",
          description: "Spatial computing, hand tracking, eye tracking, haptic feedback, and immersive user interface design."
        },
        { 
          name: "UI/UX Design", 
          icon: "bx-layout",
          description: "User-centered design, accessibility standards, responsive layouts, and intuitive interaction patterns."
        },
        { 
          name: "Physics Programming", 
          icon: "bx-atom",
          description: "Custom physics engines, collision detection, rigid body dynamics, and realistic simulation systems."
        },
        { 
          name: "Backend Integration", 
          icon: "bx-server",
          description: "REST APIs, database connectivity, cloud services, authentication systems, and real-time data synchronization."
        },
        { 
          name: "Game Design", 
          icon: "bx-palette",
          description: "Mechanics design, player progression, balancing systems, and creating engaging interactive experiences."
        },
        { 
          name: "Performance Optimization", 
          icon: "bx-analyse",
          description: "Profiling, memory management, rendering optimization, and maintaining 60+ FPS across target platforms."
        },
      ] as Skill[]
    }
  ];

  return (
    <section className="skills-showcase section" id="skills-showcase">
      <span className="section-subtitle">Software Development</span>
      <h2 className="section-title">Professional Experience</h2>

      <div className="skills-showcase__container bd-grid">
        {skillCategories.map((category, index) => (
          <div key={index} className="skills-category">
            <h3 className="skills-category__title">{category.title}</h3>
            <div className="skills-category__content">
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="hover-scale">
                    <SkillTag skill={skill} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsShowcase;
