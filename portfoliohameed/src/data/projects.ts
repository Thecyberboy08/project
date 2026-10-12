export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  fullDescription: string;
  status: "BUILDING" | "PROJECT" | "RESEARCH IN PROGRESS" | "CONCEPT" | "COMPLETED";
  achievement?: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  demoUrl?: string;
  docUrl?: string;
  youtubeUrl?: string;
  featured: boolean;
}

export const projectsData: Project[] = [
  {
    id: "truth-lens",
    title: "Truth Lens",
    category: "AI • RESEARCH • TECHNOLOGY",
    tagline: "Evaluating and analyzing information integrity using modern AI concepts.",
    description: "A technology-focused project exploring ways to help users evaluate and understand information more effectively.",
    fullDescription: "Truth Lens is an exploratory AI and research initiative designed to critically evaluate information integrity, verify sources, and provide contextual reasoning for complex data streams in real time. Details on architecture and algorithms will be shared as development progresses.",
    status: "BUILDING",
    technologies: ["Artificial Intelligence", "NLP", "Machine Learning", "Research"],
    image: "/projects/truth-lens.jpg",
    featured: true,
  },
  {
    id: "astra-sense",
    title: "Astra Sense",
    category: "ROBOTICS • SURVEILLANCE • SECURITY",
    tagline: "Rover-based autonomous surveillance and intrusion detection system.",
    description: "A rover-based robotics project focused on surveillance, monitoring and intrusion-detection concepts.",
    fullDescription: "Astra Sense is a mobile robotic rover equipped with multi-sensor telemetry, environment mapping, and automated perimeter monitoring capabilities. Built to navigate rugged environments while detecting anomalies and security breaches.",
    status: "PROJECT",
    technologies: ["Robotics", "Sensors", "Microcontrollers", "Surveillance", "Embedded C++"],
    image: "/projects/astra-sense.jpg",
    featured: true,
  },
  {
    id: "accident-alert-system",
    title: "Accident Alert System",
    category: "SAFETY • IoT • ENGINEERING",
    tagline: "Real-time emergency detection and automated response dispatch concept.",
    description: "A project focused on improving emergency response and road safety through an accident alert concept.",
    fullDescription: "An IoT safety system designed to detect vehicular collisions instantly using accelerometer and impact telemetry, transmitting automated location data to emergency services and emergency contacts to drastically minimize response times.",
    status: "COMPLETED",
    achievement: "Selected by Innovation Karnataka",
    technologies: ["IoT", "GPS/GSM", "Embedded Systems", "Sensors", "Emergency Telemetry"],
    image: "/projects/accident-alert.jpg",
    featured: true,
  },
  {
    id: "smart-harvests",
    title: "Smart Harvests for Farmers",
    category: "SMART AGRICULTURE • RESEARCH",
    tagline: "Technology-driven agricultural optimization for yield and soil intelligence.",
    description: "An ongoing research direction exploring technology-driven solutions for farmers and smarter agricultural practices.",
    fullDescription: "Exploring low-cost sensor nodes, micro-climate predictive models, and precision irrigation triggers tailored for agricultural workers to improve yield predictability and resource efficiency.",
    status: "RESEARCH IN PROGRESS",
    technologies: ["Smart Agriculture", "IoT", "Sensors", "Data Analytics", "Research"],
    image: "/projects/smart-harvests.jpg",
    featured: true,
  },
  {
    id: "sports-engine",
    title: "Sports Engine",
    category: "SOFTWARE • SPORTS • TECHNOLOGY",
    tagline: "Experimental sports analytics and performance telemetry framework.",
    description: "An experimental ongoing software project dedicated to sports technology and analytics.",
    fullDescription: "An experimental platform analyzing performance metrics, player statistics, and match telemetry to uncover tactical insights and athlete bio-data trends.",
    status: "BUILDING",
    technologies: ["Software Engineering", "Analytics", "Data Visualization", "Sports Tech"],
    image: "/projects/sports-engine.jpg",
    featured: false,
  },
  {
    id: "assistive-technology",
    title: "Assistive Technology",
    category: "ACCESSIBILITY • ENGINEERING • INNOVATION",
    tagline: "Navigational and sensory augmentation for visually impaired individuals.",
    description: "Technology exploring hardware and sensory feedback solutions for visually impaired users.",
    fullDescription: "Research and hardware prototyping focused on ultrasonic distance mapping, haptic vibration alerts, and auditory environmental cues to empower visually impaired individuals with independent navigation.",
    status: "BUILDING",
    technologies: ["Assistive Hardware", "Sensors", "Haptic Feedback", "Embedded Systems", "Accessibility"],
    image: "/projects/assistive-tech.jpg",
    featured: false,
  },
];
