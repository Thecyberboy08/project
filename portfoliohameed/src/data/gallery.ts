export interface GalleryItem {
  id: string;
  title: string;
  category: "PROJECTS" | "COLLEGE" | "EVENTS" | "ROBOTICS" | "WORKSHOPS" | "TEAM" | "EXPERIMENTS";
  caption: string;
  imagePath: string;
  date?: string;
}

export const galleryCategories = [
  "ALL",
  "PROJECTS",
  "COLLEGE",
  "EVENTS",
  "ROBOTICS",
  "WORKSHOPS",
  "TEAM",
  "EXPERIMENTS",
] as const;

export const galleryData: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Astra Sense Rover Testing",
    category: "ROBOTICS",
    caption: "Field testing perimeter monitoring and intrusion detection algorithms on rover chassis.",
    imagePath: "/gallery/rover-testing.jpg",
  },
  {
    id: "gal-2",
    title: "AITM Bhatkal Engineering Campus",
    category: "COLLEGE",
    caption: "Electronics & Communication Engineering department hub and innovation environment.",
    imagePath: "/gallery/aitm-campus.jpg",
  },
  {
    id: "gal-3",
    title: "Accident Alert System Prototype",
    category: "PROJECTS",
    caption: "Hardware sensor breadboard integration and accelerometer telemetry calibration.",
    imagePath: "/gallery/accident-alert-proto.jpg",
  },
  {
    id: "gal-4",
    title: "Innovation Karnataka Presentation",
    category: "EVENTS",
    caption: "Showcasing smart road safety and emergency notification system to evaluation panels.",
    imagePath: "/gallery/innovation-karnataka.jpg",
  },
  {
    id: "gal-5",
    title: "Embedded Systems & Circuit Design Lab",
    category: "EXPERIMENTS",
    caption: "Oscilloscope frequency response testing and microcontroller programming sessions.",
    imagePath: "/gallery/circuit-lab.jpg",
  },
  {
    id: "gal-6",
    title: "Robotics Workshop & Hardware Design",
    category: "WORKSHOPS",
    caption: "Collaborative hardware prototyping session focused on autonomous motor drivers.",
    imagePath: "/gallery/robotics-workshop.jpg",
  },
];
