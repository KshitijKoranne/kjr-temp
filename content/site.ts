// All site content lives here. Anything not real carries `placeholder: true`.
// `npm run check` lists every placeholder before launch.

type P = { placeholder?: boolean };

export const brand = {
  name: "KJR Labs",
  mark: "KJR LABS",
  descriptor: "Software and design studio",
  tagline: "We build software that actually ships.",
  taglines: ["Ideas in. Software out.", "Small studio. Serious software.", "Built in a lab. Shipped to the world."],
  url: "https://kjrlabs.in",
  since: { year: 2025 },
};

export const contact = {
  phone: { display: "+91 89800 15699", tel: "+918980015699" },
  whatsapp: { display: "+91 89800 15699", number: "918980015699" },
  email: { value: "kjrlabs9@gmail.com" },
  tz: "Asia/Kolkata",
  hours: [
    { days: "Monday–Friday", time: "10:00 AM – 7:00 PM IST", open: "10:00", close: "19:00", dow: ["Mo", "Tu", "We", "Th", "Fr"] },
    { days: "Saturday", time: "10:00 AM – 2:00 PM IST", open: "10:00", close: "14:00", dow: ["Sa"] },
    { days: "Sunday", time: "Closed" },
  ],
};

export const social = [
  { label: "X", href: "https://x.com/kshitijkoranne" },
  { label: "GitHub", href: "https://github.com/KshitijKoranne" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", placeholder: true },
  { label: "Instagram", href: "https://www.instagram.com/", placeholder: true },
];

export const people = [
  {
    name: "Kshitij Koranne",
    first: "Kshitij",
    role: "Founder & CEO",
    bio: "Kshitij designs and builds web and mobile apps, from the first sketch to the App Store listing. He also happens to be a quality professional with 14+ years in pharmaceutical QA, which is why his projects come with written requirements, real tests and no surprises at launch. He started KJR Labs to build the kind of software he wished existed: simple, fast and correct. An AI-assisted workflow lets a very small team ship like a larger one, without skipping review.",
    facts: ["Designs it, then codes it", "Ships on weekends", "14 years in quality assurance"],
    note: "yes, he actually tests everything",
  },
];

export type Service = { name: string; body: string; color: string; demo: string };
export const services: Service[] = [
  { name: "Web Apps", body: "Fast, focused web applications built with modern frameworks and designed to be easy to use on day one.", color: "#DCE8DF", demo: "web" },
  { name: "iOS & Android Apps", body: "Native Swift apps and cross-platform apps, taken all the way to the App Store and Google Play.", color: "#D9D3EC", demo: "phone" },
  { name: "AI & RAG Tools", body: "Assistants that read your own documents and numbers, then answer questions in plain words.", color: "#F6E7A6", demo: "ai" },
  { name: "Internal Tools & Automation", body: "Swap the spreadsheet that runs your business for a simple app the whole team can use, with the dull steps automated.", color: "#DCE8DF", demo: "sheet" },
  { name: "MVP Sprints", body: "A focused build to get your idea in front of real users fast, without a year-long roadmap.", color: "#FFD9C7", demo: "mvp" },
  { name: "Design & Brand Systems", body: "Interfaces, design systems and product identities that make software feel trustworthy.", color: "#D9D3EC", demo: "design" },
  { name: "Compliance-Ready Software", body: "For healthcare, finance and other regulated work: privacy, access control and audit trails built in, so meeting rules like HIPAA and GDPR is easier.", color: "#C9D0F5", demo: "gxp" },
  { name: "Launch, Hosting & Care", body: "Deployment, self-hosting, monitoring, store submissions and ongoing support after launch.", color: "#F6E7A6", demo: "deploy" },
];

export type Status = "SHIPPED" | "IN REVIEW" | "IN THE PIPELINE";
// Real screenshots live in /public/work/<slug>/. d* = desktop, p* = phone.
// bar: status-bar colour for phone captures taken without one.
export type Shots = { d?: string; p: string[]; bar?: string; dark?: boolean; lock?: boolean };
export type Project = {
  slug: string;
  name: string;
  tagline: string;
  platforms: string[];
  stack: string[];
  status: Status;
  year: number;
  color: string;
  url?: string;
  shots: Shots;
  problem: string;
  approach: string;
  outcome: string;
  metrics: { label: string; value: string }[];
  next: string;
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "tilde", name: "Tilde", tagline: "All the sites you read, in one calm place. A free RSS reader for the web and Mac.",
    platforms: ["WEB", "MAC"], stack: ["TypeScript", "Vite", "Tauri"], status: "SHIPPED", year: 2026, color: "#DCE8DF",
    url: "tilde.kjrlabs.in", shots: { d: "d1", p: ["p1"], bar: "#F2F2F2" },
    problem: "Most feed readers want an account, show ads or keep refilling the list to keep you scrolling.",
    approach: "A reader that shows only what is new from the sites you pick. No account, no algorithm, and everything stays on your own device. The Mac app is a small native wrapper that fetches feeds directly.",
    outcome: "Live on the web and as a free Mac app. The unread count only goes down.",
    metrics: [{ label: "Accounts needed", value: "0" }, { label: "Mac app download", value: "4.4 MB" }, { label: "Trackers", value: "0" }],
    next: "Reading lists you can share as a simple link.",
    liveUrl: "https://tilde.kjrlabs.in",
  },
  {
    slug: "wisp", name: "Wisp", tagline: "Wallpapers made for your screens. Pick a look, download it in the right size.",
    platforms: ["PWA"], stack: ["Canvas", "PWA"], status: "SHIPPED", year: 2026, color: "#D9D3EC",
    url: "wisp.aztools.in", shots: { d: "d1", p: ["p1"], lock: true },
    problem: "Good wallpapers are hard to find in the exact size your screen needs.",
    approach: "Eight generated styles and a set of palettes. Type any word and the same wallpaper comes back every time, sized for 4K desktops, iPhone and Android.",
    outcome: "Live as an installable web app. No account, no clutter.",
    metrics: [{ label: "Styles", value: "8" }, { label: "Sizes", value: "3" }, { label: "Sign-up", value: "None" }],
    next: "A daily wallpaper that changes on its own.",
    liveUrl: "https://wisp.aztools.in",
  },
  {
    slug: "uuidwalls", name: "UUIDWalls", tagline: "Your device has a face. Every device ID becomes its own wallpaper.",
    platforms: ["WEB"], stack: ["Canvas", "Next.js"], status: "SHIPPED", year: 2026, color: "#C9D0F5",
    url: "uuidwalls.vercel.app", shots: { d: "d1", p: ["p1"], bar: "#141A10", dark: true },
    problem: "Every device carries a unique ID that nobody ever sees.",
    approach: "The ID is the seed. The same input always draws the same wallpaper, in six styles from flow fields to mosaics.",
    outcome: "Live on the web, with a paid option for 2K and 4K downloads.",
    metrics: [{ label: "Styles", value: "6" }, { label: "Same ID, same wall", value: "Always" }],
    next: "Matching lock and home screen pairs.",
    liveUrl: "https://uuidwalls.vercel.app",
  },
];

export const stats = [
  { value: 3, suffix: "", label: "products shipped" }, // ponytail: bump as apps ship
  { value: 4, suffix: " weeks", label: "typical time to a first usable version", placeholder: true },
  { value: 100, suffix: "%", label: "code ownership handed to clients" },
  { value: 14, suffix: "+", label: "years in quality assurance, so we test everything" },
];

export const principles = [
  { word: "CLEAR", body: "Plain-language scope, fixed milestones and weekly demos. You always know what is done and what is next.", color: "#DCE8DF", visual: "check" },
  { word: "LEAN", body: "No bloat. Native features before libraries. Less code means fewer bugs, faster pages and cheaper hosting.", color: "#F6E7A6", visual: "shrink" },
  { word: "YOURS", body: "You own the code, the accounts and the domain. No lock-in, no hostage hosting.", color: "#D9D3EC", visual: "key" },
  { word: "CORRECT", body: "Tested before you see it: requirements written down, changes reviewed, every release checked. A habit from 14 years in quality assurance.", color: "#FFD9C7", visual: "tests" },
];

export const process = [
  { title: "Say Hi", body: "Send a message, WhatsApp us or book a call. Tell us the problem and we will find the solution.", color: "#C9D0F5" },
  { title: "Scope Call", body: "A 30-minute call. You get a plain-language scope, a timeline in weeks and honest trade-offs.", color: "#DCE8DF" },
  { title: "Prototype", body: "A clickable first version within days, so you can react to something real.", color: "#D9D3EC" },
  { title: "Build in Sprints", body: "Short cycles with a live demo link every week. No black box.", color: "#F6E7A6" },
  { title: "Ship & Hand Over", body: "Launch, store submissions, documentation and full handover. Then we stay on call if you want us.", color: "#FFD9C7" },
];

// Estimator: every option adds a week range [min, max]. Tune freely.
export const estimator = {
  kinds: [
    { id: "web", label: "Web app", weeks: [3, 5] },
    { id: "mobile", label: "Mobile app", weeks: [4, 6] },
    { id: "ai", label: "AI tool", weeks: [3, 5] },
    { id: "internal", label: "Internal tool", weeks: [2, 4] },
    { id: "regulated", label: "Regulated / compliant tool", weeks: [6, 10] },
  ],
  features: [
    { id: "login", label: "Login", weeks: [0, 1] },
    { id: "payments", label: "Payments", weeks: [1, 1] },
    { id: "admin", label: "Admin dashboard", weeks: [1, 2] },
    { id: "ai", label: "AI features", weeks: [1, 2] },
    { id: "offline", label: "Offline mode", weeks: [1, 2] },
    { id: "audit", label: "Audit trail", weeks: [1, 2] },
    { id: "integrations", label: "Integrations", weeks: [1, 2] },
    { id: "store", label: "App Store launch", weeks: [1, 1] },
  ],
  design: [
    { id: "have", label: "We have designs", weeks: [0, 0] },
    { id: "need", label: "Need design", weeks: [1, 2] },
  ],
};

export const budgets = [
  "Under $2,000 / ₹1.7L",
  "$2,000–$5,000 / ₹1.7L–₹4.2L",
  "$5,000–$15,000 / ₹4.2L–₹12.5L",
  "$15,000+ / ₹12.5L+",
  "Not sure yet",
];

export const projectTypes = [
  "Web App", "Mobile App", "Website / Landing Page", "AI Tool",
  "Internal Tool / Automation", "MVP Sprint", "Design / Branding", "Regulated / Compliant Software", "Something else",
];

export const testimonials = [
  { quote: "It felt like working with someone inside our team, not an agency.", by: "Priya S.", role: "Clinic owner, Mumbai", placeholder: true },
  { quote: "We went from a spreadsheet nobody trusted to a tool the whole team uses.", by: "Daniel K.", role: "Operations Lead, New Jersey", placeholder: true },
  { quote: "Clear scope, weekly demos, and it shipped on time. That's rare.", by: "Meera J.", role: "Founder, Bengaluru", placeholder: true },
];

export const faqs = [
  { q: "Do you work with clients outside India?", a: "Yes. We work with clients in India, the US, the UK, the EU and the Middle East. We plan calls inside the working hours we share." },
  { q: "How much does a project cost?", a: "Every project is scoped individually. After the scope call you get a clear fixed quote. We discuss budgets in USD or INR." },
  { q: "I'm not technical. Can I still work with you?", a: "Yes. Most of our clients are not. We explain everything in plain words, show you working screens every week and never ask you to read code." },
  { q: "Who owns the code?", a: "You do. The code, the repositories, the hosting accounts and the domain are yours from day one." },
  { q: "Can you work with our existing designs or codebase?", a: "Yes. We start with a short review and tell you honestly what to keep and what to change." },
  { q: "How do you use AI in your development process?", a: "AI helps us write and review code faster. A person reviews every change, and nothing ships without tests and a human sign-off." },
  { q: "What happens after launch?", a: "We hand over everything with documentation. If you want, we stay on a simple monthly care plan for fixes and updates." },
  { q: "Can you publish apps to the App Store and Google Play for us?", a: "Yes. We prepare the listings, screenshots and review notes and submit under your developer accounts." },
  { q: "Do you build software for regulated industries?", a: "Yes. Privacy, access control and audit trails are built in from day one, along with the documents your auditors will ask for." },
  { q: "How fast can you start?", a: "Usually within one to two weeks of the scope call.", placeholder: true },
];

export const ticker = {
  lastShipped: { text: "Tilde v1.2 for web and Mac" },
};

export const clientCities = [
  { name: "New York", tz: "America/New_York", lat: 40.7, lon: -74 },
  { name: "London", tz: "Europe/London", lat: 51.5, lon: -0.1 },
  { name: "Berlin", tz: "Europe/Berlin", lat: 52.5, lon: 13.4 },
  { name: "Dubai", tz: "Asia/Dubai", lat: 25.2, lon: 55.3 },
  { name: "Singapore", tz: "Asia/Singapore", lat: 1.35, lon: 103.8 },
];
export const home = { name: "Vadodara", lat: 22.3, lon: 73.2 };
export const clientRegions = { text: "India, United States, United Kingdom, European Union, Middle East", placeholder: true };

// Toolbox tiles. `logo` keys into content/logos.ts; "ai" draws its own mark.
export const stack = [
  { sym: "Nx", logo: "nextjs", name: "Next.js", group: "Web", use: "Fast web apps and websites." },
  { sym: "Re", logo: "react", name: "React", group: "Web", use: "Interfaces that stay quick as they grow." },
  { sym: "Ts", logo: "typescript", name: "TypeScript", group: "Web", use: "Strict types, so bugs fail at build time." },
  { sym: "Tw", logo: "tailwind", name: "Tailwind CSS", group: "Web", use: "Consistent styling without a CSS maze." },
  { sym: "Sw", logo: "swift", name: "Swift", group: "Apps", use: "Native iOS apps that feel at home." },
  { sym: "Ex", logo: "expo", name: "Expo", group: "Apps", use: "One codebase for iOS and Android." },
  { sym: "Ta", logo: "tauri", name: "Tauri", group: "Apps", use: "Small, native desktop apps for Mac and Windows." },
  { sym: "Pg", logo: "postgresql", name: "PostgreSQL", group: "Data", use: "The database we trust with your records." },
  { sym: "Sq", logo: "sqlite", name: "SQLite", group: "Data", use: "Fast local data that works offline." },
  { sym: "Ai", logo: "ai", name: "AI", group: "AI", use: "Assistants, search and automation on your own data." },
  { sym: "Lk", logo: "livekit", name: "LiveKit", group: "Infra", use: "Real-time audio and video calls." },
  { sym: "Vc", logo: "vercel", name: "Vercel", group: "Infra", use: "Zero-fuss hosting for web front ends." },
  { sym: "Cf", logo: "coolify", name: "Coolify", group: "Infra", use: "Self-hosting on a server you own." },
  { sym: "Gh", logo: "github", name: "GitHub", group: "Infra", use: "Code, reviews and releases, in your account." },
];

export const labNotes = [
  { date: "2026-09-18", title: "Deleted 40% of a component library", body: "We replaced a modal library with the native dialog element. The bundle dropped and the focus trap got better.", placeholder: true },
];

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Lab", href: "/lab/" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
];
