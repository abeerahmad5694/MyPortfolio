export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  tech: string[];
}

export const experience: Experience[] = [
  {
    company: "Digital Ocean Technologies",
    role: "Software Engineer",
    period: "June 2025 – August 2026",
    location: "Rawalpindi, Pakistan",
    bullets: [
      "Built and maintained multiple ERP and POS systems for retail and business clients, providing ongoing technical support to keep production systems running smoothly.",
      "Integrated REST APIs and debugged backend issues across client systems to maintain reliability and uptime.",
      "Set up accounting workflows inside ERP systems used for day-to-day business operations.",
    ],
    tech: ["Django", "MySQL", "REST APIs", "ERP & POS"],
  },
];
