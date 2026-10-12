export interface Achievement {
  id: string;
  title: string;
  organization: string;
  category: string;
  description: string;
  highlight?: string;
  badge?: string;
}

export const achievementsData: Achievement[] = [
  {
    id: "innovation-karnataka",
    title: "Accident Alert System",
    organization: "Innovation Karnataka",
    category: "STATE RECOGNITION • IoT & SAFETY",
    description: "Selected by Innovation Karnataka for developing an innovative IoT accident alert system concept designed for emergency response and road safety.",
    highlight: "Official Selection",
    badge: "STATE RECOGNIZED",
  },
];
