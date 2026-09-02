export interface Project {
  slug: string;
  name: string;
  category: string;
  summary: string;
  role: string;
  timeline?: string;
  tech: string[];
  highlights: string[];
  overview: string[];
  challenge: string[];
  built: string[];
  features: string[];
  process: string[];
  status: string;
  image?: string;
  imageAlt?: string;
  links?: { label: string; href: string }[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "retail-erp-systems",
    name: "Retail ERP Systems",
    category: "ERP · Django",
    summary:
      "Django-based ERP systems for retail businesses — marts, electronics stores, and automobile showrooms — covering inventory, sales, and accounting.",
    role: "Sole developer",
    tech: ["Python", "Django", "MySQL", "REST APIs"],
    image: "/images/projects/retail-erp-systems.jpg",
    imageAlt: "Dashboard of a retail ERP system showing revenue, orders, inventory levels, and a sales performance chart",
    highlights: [
      "Inventory, sales, and accounting in one system",
      "REST APIs connecting frontend, backend, and database",
      "Tailored per industry, from marts to showrooms",
    ],
    overview: [
      "Independent ERP builds for retail businesses in different industries — a mart, an electronics store, and an automobile showroom among them. Each business runs on its own deployment, built around how that specific operation works, but they share the same foundation: a Django backend, a MySQL database, and a REST API layer connecting the frontend, backend, and data.",
      "The systems cover the daily reality of running a shop: stock that stays accurate, sales that are recorded properly, reports the owner can actually read, and accounting workflows set up inside the ERP for day-to-day financial operations.",
    ],
    challenge: [
      "Retail businesses often start with their records split across registers, notebooks, and spreadsheets. Stock counts drift from what is actually on the shelves, month-end numbers take days to piece together, and nothing lives in one place.",
      "The workflow is not generic either. A mart moves fast-moving consumer goods, an electronics store deals in serialised stock, and an automobile showroom works on a completely different sales cycle. A one-size-fits-all system tends to fit nobody — each build had to model the client's real workflow while staying simple enough for staff to use every day.",
    ],
    built: [
      "I built each ERP independently, from the database schema up: Django backends following MTV architecture, REST APIs connecting the frontend, backend, and database layers, and interfaces for the daily work of stock management, sales processing, and reporting. Accounting workflows were set up inside the systems, so the financial numbers an owner actually needs live in the same place as sales and stock.",
      "After deployment I stayed on — maintaining the systems, troubleshooting issues, and adjusting things as each business's needs became clearer in real use.",
    ],
    features: [
      "Inventory and stock management tailored to each industry",
      "Sales processing for counter and retail operations",
      "Accounting workflows for day-to-day financial operations",
      "Reporting on sales, stock, and business performance",
      "REST API layer (MTV architecture) connecting all parts of the system",
      "Independent deployment and ongoing client support",
    ],
    process: [
      "Every build started with the client's workflow, not the software: how stock arrives, how a sale happens, and what the owner wants to see at the end of the day. From there — data model first, then the Django backend and REST APIs, then the frontend staff would actually use.",
      "Deployment came last, followed by ongoing support while each system settled into real, daily use.",
    ],
    status: "Deployed and used for daily operations, with ongoing support",
    featured: true,
  },
  {
    slug: "pos-systems",
    name: "POS Systems",
    category: "POS · Django",
    summary:
      "Point-of-sale systems for retail clients with real-time stock syncing and reporting that keeps inventory honest.",
    role: "Developer",
    tech: ["Python", "Django", "MySQL"],
    image: "/images/projects/pos-systems.jpg",
    imageAlt: "Point-of-sale interface with a product grid, checkout cart, and payment panel",
    highlights: [
      "Real-time stock syncing across POS systems",
      "Sales reporting for business owners",
      "Inventory trend visibility",
    ],
    overview: [
      "Point-of-sale systems built with Django and MySQL for retail clients. The core problem they solve is keeping inventory truthful: stock that updates in real time as sales happen, across the POS systems a business runs on.",
    ],
    challenge: [
      "In a busy shop, the till and the stockroom fall out of sync easily. When sales are recorded in one place and stock is updated in another, the numbers diverge — and the business often doesn’t discover it until something is out of stock or a reorder is late. With more than one terminal in play, the problem compounds.",
    ],
    built: [
      "I built real-time stock syncing into the POS systems so inventory stays accurate across them as sales happen — no end-of-day reconciliation needed to keep the numbers straight.",
      "On top of that, I built reporting modules that give business owners a clear view of sales and inventory trends, so decisions like reordering come from data instead of guesswork.",
    ],
    features: [
      "Real-time stock syncing across POS systems",
      "Accurate inventory without manual reconciliation",
      "Sales reporting for business owners",
      "Inventory trend visibility",
    ],
    process: [
      "Built on Django with a MySQL backbone: sales events update stock immediately, and the reporting modules read from the same data — so the counter and the owner are always looking at the same truth.",
    ],
    status: "In use by retail clients",
    featured: true,
  },
  {
    slug: "on-demand-services-app",
    name: "On-Demand Services App",
    category: "Mobile · Flutter",
    summary:
      "A client's on-demand services platform — CodeIgniter backend, Flutter app, Stripe subscriptions — delivered end-to-end and published on both app stores.",
    role: "Lead developer",
    timeline: "Delivered within a 1–2 month timeline",
    tech: ["Flutter", "CodeIgniter", "Stripe", "Google Play Console", "App Store Connect"],
    image: "/images/projects/on-demand-services-app.jpg",
    imageAlt: "Two smartphone screens of an on-demand services app showing service categories and a booking flow",
    highlights: [
      "Flutter app with a CodeIgniter backend",
      "Stripe recurring payments for subscriptions",
      "Released on the Play Store and App Store",
    ],
    overview: [
      "An on-demand services platform built for a client: a CodeIgniter web backend paired with a Flutter mobile app. The project was delivered end-to-end — development through deployment — within a 1–2 month timeline, and published on both the Google Play Store and the Apple App Store.",
    ],
    challenge: [
      "The client needed a working platform in weeks, not months: an app that real customers could install and pay through. That meant building the Flutter app against an existing CodeIgniter backend, adding subscription billing inside the app, and getting through both app stores' review and release processes — without a large team.",
    ],
    built: [
      "I developed and customised the platform across the stack — the CodeIgniter backend and the Flutter mobile app. I integrated Stripe to add recurring payment functionality for subscription-based transactions.",
      "One collaborator supported QA testing and design assets. Everything else — development, payments, and the full deployment to both app stores — I handled myself.",
    ],
    features: [
      "Flutter mobile app for Android and iOS",
      "CodeIgniter backend powering the services platform",
      "Stripe recurring payments for subscription-based transactions",
      "End-to-end delivery on a 1–2 month timeline",
      "Full release on Google Play and the App Store",
    ],
    process: [
      "Scoped directly with the client, then built across backend and app in parallel. Payments were integrated and tested against real subscription flows, QA and design feedback came from a collaborator, and the final releases were handled through Google Play Console and App Store Connect.",
    ],
    status: "Delivered and published on Google Play and the App Store",
    featured: true,
  },
  {
    slug: "food-delivery-app",
    name: "Food Delivery App",
    category: "Mobile · Flutter",
    summary:
      "A full-stack food delivery application on Laravel and Flutter, with maps-based order tracking and real-time push updates.",
    role: "Lead developer",
    tech: ["Flutter", "Laravel", "Maps API", "Push Notifications"],
    image: "/images/projects/food-delivery-app.jpg",
    imageAlt: "Two smartphone screens of a food delivery app showing a restaurant list and live order tracking map",
    highlights: [
      "Laravel backend with a Flutter app",
      "Order tracking with maps integration",
      "Push notifications for real-time updates",
    ],
    overview: [
      "A full-stack food delivery application: a Flutter mobile app backed by a Laravel backend, covering the ordering flow from menu to delivery — with order tracking and real-time updates built in.",
    ],
    challenge: [
      "The project didn't start from a blank slate — it started from a template-based codebase. The template covered the obvious basics, but a real delivery business needs more: its own workflows, live order tracking, and notifications that actually reach the customer. Stability issues in the starting point had to be fixed, not worked around.",
    ],
    built: [
      "I built the application into a complete delivery product: customising the Laravel backend and the Flutter app to match the business's requirements, and integrating maps and push notification APIs so customers can follow their order and receive real-time updates.",
      "One collaborator assisted with testing while I carried the development. Where the system was unstable, I resolved the issues rather than patching over them, to keep the app reliable in use.",
    ],
    features: [
      "Flutter app covering the full ordering flow",
      "Laravel backend customised to the business",
      "Maps integration for order tracking",
      "Push notifications for real-time updates",
      "Stability fixes across the system",
    ],
    process: [
      "I started by identifying where the template fell short of the business's needs, then reworked the system piece by piece — workflows first, then tracking and notifications, then a final pass to resolve issues and keep the app stable.",
    ],
    status: "Completed and stabilised for business use",
    featured: true,
  },
  {
    slug: "face-recognition-attendance",
    name: "Face Recognition Attendance System",
    category: "IoT · Computer Vision",
    summary:
      "A face recognition-based attendance system with IP camera capture and a custom ESP32 attendance device with voice feedback.",
    role: "Assistant developer",
    tech: ["ESP32", "IP Cameras", "Face Recognition"],
    image: "/images/projects/face-recognition-attendance.jpg",
    imageAlt: "Attendance dashboard with a live camera feed, face detection box, and an attendance log table",
    highlights: [
      "IP camera input with automated capture",
      "Custom ESP32 attendance device",
      "Name display and voice-based feedback",
    ],
    overview: [
      "A face recognition-based attendance tracking system, built as a collaborative project. Instead of registers or cards, attendance is recorded by identifying people through camera input — with a custom hardware device at the point of attendance.",
    ],
    challenge: [
      "Attendance systems fail for human reasons: cards get shared and registers get signed for someone else. A recognition-based approach removes those workarounds — but it only works as a complete chain: cameras capturing images automatically, recognition processing them, and a physical device responding quickly enough to feel natural.",
    ],
    built: [
      "I worked as an assistant developer on the system. I integrated IP camera input for automated image capture and processing, and I developed the ESP32-based attendance device — the physical endpoint that communicates with the server, displays the recognised name, and gives voice-based identification feedback.",
    ],
    features: [
      "Face recognition-based attendance tracking",
      "IP camera input with automated image capture and processing",
      "Custom ESP32-based attendance device",
      "Name display on the device",
      "Voice-based identification feedback",
      "Server communication from the device",
    ],
    process: [
      "The system was built collaboratively across recognition software, camera integration, and hardware. My focus was the capture pipeline and the device experience — making sure the physical interaction of look, recognise, and confirm by voice worked smoothly.",
    ],
    status: "Completed as a collaborative development project",
  },
];

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function projectIndex(slug: string): number {
  return projects.findIndex((p) => p.slug === slug);
}
