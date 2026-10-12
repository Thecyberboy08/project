export interface ResearchArea {
  id: string;
  title: string;
  category: string;
  status: "EXPLORING" | "RESEARCHING" | "PROTOTYPING" | "TESTING";
  description: string;
  focusNodes: string[];
}

export const researchLabData: ResearchArea[] = [
  {
    id: "smart-agri-research",
    title: "Smart Agriculture Systems",
    category: "AGRI-TECH • IoT • SENSORS",
    status: "RESEARCHING",
    description: "Investigating low-power sensor mesh topology and soil moisture/nutrient telemetry to enhance precision irrigation for smallholder farmers.",
    focusNodes: ["Soil Telemetry", "Low-power Mesh", "Yield Analytics", "Micro-climate Sensing"],
  },
  {
    id: "ai-reasoning-research",
    title: "Artificial Intelligence & Information Verification",
    category: "AI • MACHINE LEARNING • DATA INTEGRITY",
    status: "PROTOTYPING",
    description: "Exploring context-aware NLP mechanisms and contextual verifiability algorithms for digital information streams.",
    focusNodes: ["Information Analysis", "Context Evaluation", "Verification Logic", "NLP Pipelines"],
  },
  {
    id: "autonomous-robotics",
    title: "Autonomous Robotics & Telemetry",
    category: "ROBOTICS • EMBEDDED SYSTEMS • SURVEILLANCE",
    status: "TESTING",
    description: "Researching micro-rover chassis stability, obstacle avoidance telemetry, and perimeter security automation.",
    focusNodes: ["Rover Control", "Perimeter Monitoring", "Sensor Fusion", "Autonomous Navigation"],
  },
  {
    id: "automation-smart-systems",
    title: "Industrial & Domestic Automation",
    category: "AUTOMATION • EMBEDDED C++ • CONTROL SYSTEMS",
    status: "EXPLORING",
    description: "Designing smart actuation and sensor integration pipelines for automated safety and monitoring systems.",
    focusNodes: ["Actuation Loops", "Safety Protocols", "Emergency Triggering", "Microcontrollers"],
  },
  {
    id: "emerging-tech",
    title: "Emerging Hardware & Assistive Tech",
    category: "ACCESSIBILITY • HAPTICS • HARDWARE",
    status: "PROTOTYPING",
    description: "Exploring haptic feedback sensors and ultrasonic distance translation for non-visual environmental awareness.",
    focusNodes: ["Haptic Arrays", "Ultrasonic Ranging", "Wearable Feedback", "Human Factors"],
  },
  {
    id: "business-innovation-research",
    title: "Business & Startup Product Strategy",
    category: "ENTREPRENEURSHIP • MARKET DISCOVERY",
    status: "EXPLORING",
    description: "Investigating customer discovery frameworks and cost-effective rapid prototyping pipelines for emerging tech startups.",
    focusNodes: ["Problem Mapping", "User Discovery", "Prototyping Economics", "Go-To-Market Mechanics"],
  },
];
