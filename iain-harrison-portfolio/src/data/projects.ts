import { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: "dusseldorp",
    title: "Dusseldorp Platform",
    image: "/assets/img/work13.jpg",
    description: "Unity-based platform for visualizing major infrastructure projects in 360° environments",
    technologies: ["Unity", "VR", "Three.js", "CycloMedia API"],
    links: {},
    details: {
      overview: "The Dusseldorp Project is a large-scale Unity-based platform designed to visualize major infrastructure projects — such as new buildings, parking structures, and park renovations — within 360-degree photographic environments.",
      role: "Unity Developer",
      technologies: ["Unity Engine with XR support", "CycloMedia API", "3D Object Placement", "Three.js Export Pipeline", "XR Controls"],
      contributions: [
        "Helped define and implement the app's multi-tab interface and modular tool systems",
        "Enabled full application use in virtual reality, including flythrough navigation, object placement/editing, and scene masking",
        "Anchored 3D model positions to real-world 360° photography, ensuring geographic and visual alignment",
        "Developed a pipeline to export finished scenes to a Three.js-powered website for public access and stakeholder preview"
      ],
      outcomes: [
        "Empowered clients to create immersive 360° mockups of future construction projects",
        "Enabled exploration of mockups in real time using both VR and desktop interfaces",
        "Successfully exported visualizations to Three.js web platform for broader visibility and communication with stakeholders"
      ],
      images: ["/assets/img/dusseldorp1.jpg", "/assets/img/dusseldorp2.jpg"]
    }
  },
  {
    id: "fragile-journey",
    title: "The Fragile Journey",
    image: "/assets/img/work10.jpg", 
    description: "Puzzle game created during Global Game Jam 2025 - Winner of Best Game & Best Mechanic",
    technologies: ["Unity", "WebGL", "Game Design"],
    links: {
      itchio: "https://iainharrison.itch.io/the-fragile-journey"
    },
    details: {
      overview: "\"The Fragile Journey\" is a puzzle game created during the 48-hour Global Game Jam 2025. Players guide the \"Bubble Prince\" home by utilizing the unique abilities of three bubble-themed teammates to solve puzzles.",
      role: "Lead Developer",
      technologies: ["Unity Game Engine", "WebGL/HTML5 Export", "C# Programming"],
      contributions: [
        "Designed the core mechanics and implemented the gameplay systems",
        "Oversaw the overall gameplay flow and puzzle design",
        "Created character-switching mechanic that proved both intuitive and engaging",
        "Coordinated team development under tight 48-hour deadline"
      ],
      outcomes: [
        "Winner of Best Game at the regional Global Game Jam 2025",
        "Winner of Best Mechanic at the regional Global Game Jam 2025", 
        "Perfect 5.0 rating from 3 player reviews",
        "Successfully delivered polished game experience within jam constraints"
      ],
      images: ["/assets/img/BubblePLayTest.png", "/assets/img/BubbleWin.png"],
      teamMembers: [
        { name: "Lena Van", role: "Artist", linkedinUrl: "https://www.linkedin.com/in/lena-van/" },
        { name: "Nigel Macugay", role: "Artist", linkedinUrl: "https://www.linkedin.com/in/nigel-macugay/" }
      ]
    }
  },
  {
    id: "3dx-platform",
    title: "3DX Platform", 
    image: "/assets/img/work12.jpg",
    description: "Powerful desktop and mobile ecosystem for visualizing 3D CAD models in real time",
    technologies: ["Unity", "AR", "Mobile Development", "CAD Integration"],
    links: {},
    details: {
      overview: "The 3DX Platform is a powerful desktop and mobile ecosystem built to visualize and animate 3D CAD models in real time for a variety of business clients. It includes a Unity-based editor for desktop environments and a companion mobile AR app for real-world visualization.",
      role: "Unity Developer",
      technologies: ["Unity Game Engine", "AR and Mixed Reality", "REST APIs", "Git/Bitbucket", "Agile/SCRUM"],
      contributions: [
        "Built highly performant, intuitive UI with Unity's built-in UI tools, focusing on scalable layouts and responsive interactions",
        "Integrated Unity front-end logic with backend systems via REST APIs, in coordination with backend engineers",
        "Worked on AR and mixed reality features to display CAD models in real-world spaces via mobile",
        "Participated in daily standups, sprint planning, and retrospectives using Jira within a SCRUM framework"
      ],
      outcomes: [
        "Contributed meaningfully to a large-scale, production-ready XR application",
        "Gained deep practical experience building flexible, scalable UIs in Unity for real business use cases",
        "Strengthened knowledge of Unity-to-server communication pipelines",
        "Developed expertise in AR and MR applications for aligning 3D content with real-world spaces"
      ],
      images: ["/assets/img/3dxApplication.jpg", "/assets/img/3dxPromo.jpg"]
    }
  },
  {
    id: "puzzle-bugs",
    title: "Puzzle Bugs",
    image: "/assets/img/work11.jpg",
    description: "Puzzle-platformer created during XP Game Jam - Winner of Best Game & Best Mechanic",
    technologies: ["Unity", "WebGL", "Game Design"],
    links: {
      itchio: "https://iainharrison.itch.io/puzzle-bugs"
    },
    details: {
      overview: "\"Puzzle Bugs\" is a puzzle-platformer created during the XP Game Jam (Global Game Jam). Players navigate increasingly complex levels by controlling different bug characters—each with unique movement styles—to reach the goal.",
      role: "Developer",
      technologies: ["Unity Game Engine", "WebGL/HTML5 Export", "Physics Programming"],
      contributions: [
        "Handled the coding, mechanics, movement feel, and level logic",
        "Fine-tuned physics and input responsiveness to enhance immersion",
        "Designed progressive tutorials seamlessly embedded in level layouts",
        "Created satisfying, responsive controls for different bug movement types"
      ],
      outcomes: [
        "Winner of Best Game at the regional XP Game Jam",
        "Winner of Best Mechanic for designing intuitive yet strategic bug-based movement systems",
        "Successfully delivered engaging puzzle-platformer within jam timeframe",
        "Strengthened collaboration skills working with artist under tight time pressures"
      ],
      images: ["/assets/img/BugPlayTest.jpg", "/assets/img/BugWin.png"],
      teamMembers: [
        { name: "Lena Van", role: "Artist", linkedinUrl: "https://www.linkedin.com/in/lena-van/" }
      ]
    }
  },
  {
    id: "graduation",
    title: "Graduation",
    image: "/assets/img/work7.jpg",
    description: "BSc in Creative Media and Game Technologies - Graduated with 8.1/10 (First Class Honours)",
    technologies: ["Unity", "C#", "Game Design", "3D Modeling"],
    links: {},
    details: {
      overview: "On July 12, 2022, I graduated from Saxion University of Applied Sciences with a Bachelor of Science in Creative Media and Game Technologies, achieving a score of 8.1/10 (equivalent to First Class Honours).",
      role: "Student",
      technologies: ["C#, C++, and other programming languages", "Unity and Unreal Engine", "Version control and collaborative development workflows", "Cross-platform development techniques", "Performance optimization"],
      contributions: [
        "Completed comprehensive coursework in Game Programming & Software Architecture",
        "Developed expertise in 3D Modeling & Animation and Interactive Media Development",
        "Participated in various game prototypes exploring different genres and mechanics",
        "Collaborated on industry projects with real-world clients including Met'Em project"
      ],
      outcomes: [
        "Achieved First Class Honours equivalent (8.1/10)",
        "Gained proficiency in multiple programming languages and game engines",
        "Developed strong foundation in game design and player experience",
        "Built portfolio of diverse projects demonstrating technical and creative skills"
      ]
    }
  },
  {
    id: "thales",
    title: "Thales",
    image: "/assets/img/work8.jpg",
    description: "Naval Warfare Game - UX Developer & UI Systems Engineer",
    technologies: ["Unity", "C#", "UI Systems", "Animation"],
    links: {},
    details: {
      overview: "I worked at Thales, a leading navy and aerospace defense company, where I contributed to their Naval Game - a serious game designed to engage students potentially interested in careers at Thales.",
      role: "UX Developer & UI Systems Engineer",
      technologies: ["Unity Game Engine", "C# Programming", "Custom Animation Systems", "UI Framework Development"],
      contributions: [
        "Designed and implemented dynamic animated scene transitions",
        "Created responsive UI feedback systems",
        "Developed reusable tools and frameworks for future developers",
        "Established UX standards and documentation"
      ],
      outcomes: [
        "Improved user engagement metrics",
        "Reduced development time for new scenarios",
        "Consistent UX standards across the application",
        "Better maintainability for future development"
      ],
      videoUrl: "/assets/vid/ProjectSideBySide.mp4"
    }
  },
  {
    id: "metem",
    title: "Met'Em",
    image: "/assets/img/work9.jpg",
    description: "Multiplayer Social Platform - 100-player multiplayer with live video/audio",
    technologies: ["Unreal Engine", "C++", "Agora SDK", "Networking"],
    links: {
      external: "https://youtu.be/3cVLMJ-o0O4"
    },
    details: {
      overview: "Met'Em was an ambitious university project developed in collaboration with Abstraction Games. Our team of seven was tasked with creating a 100-player multiplayer social space featuring live video and audio communication, along with various mini-games for users to enjoy together.",
      role: "Lead Network Engineer & Audio/Video Integration Specialist",
      technologies: ["Unreal Engine 4", "C++ Programming", "Agora SDK (Real-time Communication API)", "Multiplayer Networking Architecture", "Blueprint Visual Scripting"],
      contributions: [
        "Implemented real-time video and audio communication using the Agora C++ API",
        "Designed and optimized network architecture to support 100 concurrent users",
        "Created integration systems between the communication layer and game mechanics",
        "Collaborated with team members to ensure mini-games functioned properly in the multiplayer environment"
      ],
      outcomes: [
        "Successfully delivered a functioning multiplayer platform that supported our target user count",
        "Received positive feedback from Abstraction Games on the technical implementation",
        "Gained valuable experience in large-scale multiplayer development",
        "Developed reusable components for future real-time communication projects"
      ],
      videoUrl: "/assets/vid/MiboVideo.gif"
    }
  },
  {
    id: "mobile-game",
    title: "My Own Mobile Game",
    image: "/assets/img/work2.jpg",
    description: "Cat Collection Mobile Game - Personal passion project developed since 2020",
    technologies: ["Unity", "C#", "Live2D", "Mobile Development"],
    links: {},
    details: {
      overview: "This is a personal passion project I've been developing alongside my university studies since 2020. Inspired by popular games like KleptoCats and Neko Atsume, I created a mobile game about collecting and caring for a variety of unique cats that visit the player's customizable house.",
      role: "Solo Developer (Programming, Art, Design, Marketing)",
      technologies: ["Unity Game Engine", "C# Programming", "Live2D Animation System", "AdMob & Unity Ads Integration", "Localization Systems", "Mobile UI/UX Design"],
      contributions: [
        "Developed complete game from concept to near-release state as solo developer",
        "Implemented collection-based gameplay with dozens of unique cat characters",
        "Created house customization system with unlockable furniture and decorations",
        "Integrated dynamic 2D animations using Live2D technology",
        "Built multi-language support for international release"
      ],
      outcomes: [
        "Gained comprehensive experience in all aspects of mobile game development",
        "Built a YouTube following documenting the development process",
        "Mastered Live2D animation techniques for dynamic character presentation",
        "Developed effective monetization strategies for free-to-play mobile games"
      ],
      videoUrl: "/assets/vid/CatLookAt.gif"
    }
  },
  {
    id: "global-game-jam",
    title: "Global Game Jam",
    image: "/assets/img/work3.jpg",
    description: "Fly By - Game created for Global Game Jam",
    technologies: ["Unity", "Game Design", "Rapid Prototyping"],
    links: {
      itchio: "https://iainharrison.itch.io/fly-by"
    },
    details: {
      overview: "A game created during the Global Game Jam, showcasing rapid prototyping and game development skills under tight time constraints.",
      role: "Game Developer",
      technologies: ["Unity Game Engine", "C# Programming", "Rapid Prototyping"],
      contributions: [
        "Developed complete game concept and implementation within jam timeframe",
        "Focused on core gameplay mechanics and player experience",
        "Collaborated effectively with team members under pressure"
      ],
      outcomes: [
        "Successfully delivered playable game within Global Game Jam constraints",
        "Demonstrated ability to work effectively under tight deadlines",
        "Gained experience in rapid prototyping and iterative development"
      ]
    }
  },
  {
    id: "propel",
    title: "Talespin Propel",
    image: "/assets/img/work4.jpg",
    description: "VR Skills Training - VR-based training platform for technical skills",
    technologies: ["Unity", "VR", "C#", "Physics Simulation"],
    links: {
      external: "https://www.talespin.com/propel"
    },
    details: {
      overview: "While working at Talespin, I had the opportunity to be part of the engineering team for Project Propel, a VR-based training platform focused on teaching practical hard skills. Unlike Talespin's CoPilot project which focused on soft skills training, Propel was designed to teach technical skills such as using specialized tools and equipment.",
      role: "VR Interaction Engineer & Feature Developer",
      technologies: ["Unity Game Engine", "C# Programming", "VR Development (Oculus/Meta SDK)", "3D Interaction Design", "Physics-Based Tool Simulation"],
      contributions: [
        "Designed and implemented a dynamic interactable wristwatch UI that could be physically tapped in VR to pause the experience",
        "Created realistic physics-based interactions for various tools used in training scenarios",
        "Developed and polished the virtual tools used by players during training",
        "Implemented feedback systems to guide users through complex technical procedures"
      ],
      outcomes: [
        "Successfully delivered the first alpha version of the Propel platform",
        "Created reusable interaction frameworks that accelerated development of new training modules",
        "Established best practices for technical skill simulation in VR",
        "Contributed to a platform that effectively teaches practical skills in an immersive environment"
      ]
    }
  },
  {
    id: "game-a-day",
    title: "Game a day challenge",
    image: "/assets/img/work5.jpg",
    description: "Personal challenge to create games rapidly and consistently",
    technologies: ["Unity", "Rapid Prototyping", "Game Design"],
    links: {
      external: "https://www.linkedin.com/feed/update/urn:li:activity:6729112015492788225/?commentUrn=urn%3Ali%3Acomment%3A(activity%3A6728712887650652160%2C6729111797380591616)"
    },
    details: {
      overview: "A personal challenge to create games rapidly and consistently, demonstrating commitment to continuous learning and rapid prototyping skills.",
      role: "Solo Game Developer",
      technologies: ["Unity Game Engine", "Rapid Prototyping", "Game Design Principles"],
      contributions: [
        "Developed multiple game prototypes in short timeframes",
        "Experimented with different game mechanics and genres",
        "Maintained consistent development schedule and documentation",
        "Shared progress and learnings with development community"
      ],
      outcomes: [
        "Improved rapid prototyping and iteration skills",
        "Gained experience across multiple game genres and mechanics",
        "Built discipline and consistency in development practice",
        "Contributed to personal brand and community engagement"
      ]
    }
  },
  {
    id: "ltu",
    title: "Talespin LTU",
    image: "/assets/img/work6.jpg",
    description: "Leading Through Uncertainty - VR training for crisis leadership during COVID-19",
    technologies: ["Unity", "VR", "C#", "Quality Assurance"],
    links: {
      external: "https://www.talespin.com/leading-through-uncertainty"
    },
    details: {
      overview: "'Leading through Uncertainty' was developed at Talespin in response to the COVID-19 pandemic's unprecedented impact on workplace leadership. This VR-based training program was designed to help business leaders navigate crisis situations by developing critical soft skills through immersive simulation experiences.",
      role: "VR Development Intern & Quality Assurance Specialist",
      technologies: ["Unity Game Engine", "C# Programming", "VR Development (Oculus/Meta SDK)", "Version Control Systems", "Bug Tracking & Documentation Tools"],
      contributions: [
        "Identified and resolved critical bugs and performance issues",
        "Optimized VR interactions for intuitive user experience",
        "Collaborated with the QA team on comprehensive testing protocols",
        "Documented best practices for future project maintenance",
        "Supported the final polish phase before client delivery"
      ],
      outcomes: [
        "Gained valuable insights into professional VR development workflows in a corporate environment",
        "Learned effective project finalization and delivery processes",
        "Developed expertise in quality assurance methodologies for immersive experiences",
        "Contributed to a platform that helped numerous business leaders develop crucial crisis management skills"
      ]
    }
  }
];
