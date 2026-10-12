export interface SkillItem {
  name: string;
  level: "EXPLORING" | "LEARNING" | "BUILDING" | "APPLYING";
}

export interface SkillCategory {
  category: "TECHNOLOGY" | "RESEARCH" | "PRODUCT" | "BUSINESS";
  description: string;
  skills: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "TECHNOLOGY",
    description: "Core technical domains and engineering disciplines.",
    skills: [
      { name: "Artificial Intelligence", level: "EXPLORING" },
      { name: "Robotics", level: "BUILDING" },
      { name: "Electronics & Circuits", level: "APPLYING" },
      { name: "IoT & Embedded Systems", level: "BUILDING" },
      { name: "Automation", level: "BUILDING" },
      { name: "Emerging Technologies", level: "EXPLORING" },
    ],
  },
  {
    category: "RESEARCH",
    description: "Systematic inquiry, analytical modeling, and validation.",
    skills: [
      { name: "Research Methodology", level: "APPLYING" },
      { name: "Problem Solving", level: "APPLYING" },
      { name: "Rapid Experimentation", level: "BUILDING" },
      { name: "Technology Exploration", level: "EXPLORING" },
    ],
  },
  {
    category: "PRODUCT",
    description: "Translating engineering concepts into user-centric hardware and software.",
    skills: [
      { name: "Product Design", level: "BUILDING" },
      { name: "Innovation", level: "APPLYING" },
      { name: "Prototyping", level: "BUILDING" },
      { name: "System Design Concepts", level: "LEARNING" },
    ],
  },
  {
    category: "BUSINESS",
    description: "Market discovery, startup operations, and value proposition testing.",
    skills: [
      { name: "Entrepreneurship", level: "EXPLORING" },
      { name: "Business Research", level: "LEARNING" },
      { name: "Startup Sales Operations", level: "APPLYING" },
      { name: "Customer Needs Discovery", level: "APPLYING" },
    ],
  },
];
