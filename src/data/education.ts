export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  status: string;
  grade?: string;
}

export const education: Education[] = [
  {
    degree: "BE Cyber Security",
    institution: "PMAS Arid Agriculture University",
    period: "Started September 2026",
    location: "Rawalpindi, Pakistan",
    status: "Ongoing",
  },
  {
    degree: "Diploma in Information Technology",
    institution: "National Institute of Computer Sciences (Technical Board Lahore)",
    period: "July 2025 – July 2026",
    location: "Rawalpindi, Pakistan",
    status: "Completed",
    grade: "A+",
  },
  {
    degree: "FSC (Pre-Engineering)",
    institution: "Steps College (Federal Board)",
    period: "Completed June 2025",
    location: "Rawalpindi, Pakistan",
    status: "Completed",
    grade: "A",
  },
];
