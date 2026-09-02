export interface Service {
  number: string;
  title: string;
  description: string;
  points: string[];
}

export const services: Service[] = [
  {
    number: "01",
    title: "Custom Web Applications",
    description:
      "Business applications built with Django — dashboards, internal tools, and customer-facing platforms designed around how your operation actually works.",
    points: [
      "Django backends following MTV architecture",
      "MySQL database design",
      "Frontend integration over REST APIs",
    ],
  },
  {
    number: "02",
    title: "ERP & POS Development",
    description:
      "Systems that run the day-to-day: inventory, sales, and accounting for retail environments like marts, electronics stores, and showrooms.",
    points: [
      "Real-time stock syncing across systems",
      "Sales and inventory reporting",
      "Accounting workflows inside the ERP",
    ],
  },
  {
    number: "03",
    title: "Flutter Mobile Applications",
    description:
      "Cross-platform apps for Android and iOS from a single codebase — carried through to release on both app stores.",
    points: [
      "Android and iOS from one Flutter codebase",
      "Google Play Store and App Store deployment",
      "Payment flows inside the app",
    ],
  },
  {
    number: "04",
    title: "REST API Development",
    description:
      "Backend APIs that connect your web app, mobile app, and third-party services cleanly — and keep them connected reliably.",
    points: [
      "APIs for web and mobile clients",
      "Third-party integrations: payments, maps, notifications",
      "Debugging and reliability work on existing systems",
    ],
  },
  {
    number: "05",
    title: "Payment Integration",
    description:
      "Payment gateway integration that works in production — including recurring, subscription-based billing with Stripe.",
    points: [
      "Stripe integration with recurring billing",
      "Subscription-based transactions",
      "Tested against real payment flows",
    ],
  },
  {
    number: "06",
    title: "Maintenance & Support",
    description:
      "Ongoing support for live systems — because software that runs a business needs looking after long after launch day.",
    points: [
      "Bug fixing and production troubleshooting",
      "Improvements and new integrations",
      "Deployment and app store releases",
    ],
  },
];
