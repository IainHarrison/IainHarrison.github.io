import React from 'react';

const SkillsShowcase: React.FC = () => {
  const skillCategories = [
    {
      title: "Unity Development",
      skills: [
        { name: "AR/VR/MR Applications", icon: "bx-cube-alt" },
        { name: "Desktop Applications", icon: "bx-desktop" },
        { name: "Mobile Applications", icon: "bx-mobile" },
        { name: "Custom Tools & Systems", icon: "bx-code-block" },
        { name: "Procedural Generation", icon: "bx-shape-polygon" },
        { name: "Game Feel & Feedback", icon: "bx-game" },
        { name: "Cross-Platform Development", icon: "bx-devices" },
      ]
    },
    {
      title: "Project Management",
      skills: [
        { name: "Client Liaison", icon: "bx-user-voice" },
        { name: "Client Meetings", icon: "bx-conversation" },
        { name: "SCRUM & Agile", icon: "bx-task" },
        { name: "Jira Task Management", icon: "bxl-jira" },
        { name: "Git Version Control", icon: "bx-git-branch" },
        { name: "Code Reviews", icon: "bx-code-curly" },
        { name: "Bug Resolution", icon: "bx-bug" },
      ]
    },
    {
      title: "Technical Specializations",
      skills: [
        { name: "Multiplayer Networking", icon: "bx-network-chart" },
        { name: "VR/AR Development", icon: "bx-glasses" },
        { name: "UI/UX Design", icon: "bx-layout" },
        { name: "Physics Programming", icon: "bx-atom" },
        { name: "Backend Integration", icon: "bx-server" },
        { name: "Game Design", icon: "bx-palette" },
        { name: "Performance Optimization", icon: "bx-analyse" },
      ]
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
                  <div key={skillIndex} className="skill-tag">
                    <i className={`bx ${skill.icon}`}></i> {skill.name}
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
