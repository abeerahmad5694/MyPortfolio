export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: ["Python", "PHP", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    title: "Frameworks",
    items: ["Django", "Flutter"],
  },
  {
    title: "Databases",
    items: ["MySQL", "Database design"],
  },
  {
    title: "APIs & Integrations",
    items: ["REST APIs", "Stripe (payment gateway)", "Maps & push notifications"],
  },
  {
    title: "Platforms & Tools",
    items: ["Git", "GitHub", "Google Play Console", "App Store Connect", "Firebase Console"],
  },
  {
    title: "Domain & Hardware",
    items: ["ERP systems", "POS systems", "Accounting logic", "Real-time data syncing", "ESP32"],
  },
];

export const skillsNote =
  "Laravel and CodeIgniter don’t appear in my core stack, but I’ve used both in client projects and I’m comfortable working with existing PHP codebases.";
