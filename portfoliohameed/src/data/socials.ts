export interface SocialLink {
  platform: string;
  label: string;
  url: string;
  iconName: string;
  isAvailable: boolean;
}

export const socialsData: SocialLink[] = [
  {
    platform: "LinkedIn",
    label: "LinkedIn Profile",
    url: "", // To be filled by user
    iconName: "Linkedin",
    isAvailable: false,
  },
  {
    platform: "GitHub",
    label: "GitHub Repositories",
    url: "", // To be filled by user
    iconName: "Github",
    isAvailable: false,
  },
  {
    platform: "Instagram",
    label: "Instagram Profile",
    url: "", // To be filled by user
    iconName: "Instagram",
    isAvailable: false,
  },
  {
    platform: "Email",
    label: "Direct Email",
    url: "mailto:contact@sayedhameed.com", // Placeholder mailto or user email
    iconName: "Mail",
    isAvailable: true,
  },
];
