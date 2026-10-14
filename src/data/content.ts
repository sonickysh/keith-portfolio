// Edit this file to change what shows up in the sections.

export type Project = {
  id: string;
  title: string;
  blurb: string;
  stack: string[];
  href?: string; // add a link when you have one
};

export type Role = {
  id: string;
  role: string;
  org: string;
  blurb: string;
};

export type ContactLink = {
  label: string;
  value: string;
  href: string;
};

export const projects: Project[] = [
  {
    id: "qol-thesis",
    title:
      "Explainable CatBoost–TreeSHAP Framework for Predicting and Interpreting Barangay-Level Quality of Life Inequality in San Pablo City",
    blurb:
      "Undergraduate thesis using a CatBoost-SHAP framework to explain quality-of-life differences within a city, with prescriptive insights on what to do about them.",
    stack: ["CatBoost", "SHAP", "Python"],
  },
  {
    id: "fsdb",
    title: "Faculty Status Display Board",
    blurb:
      "A display board for NU Laguna SHS that shows whether faculty members are in, using MERN stack and Azure services to provide a real-time, low-maintenance solution.",
    stack: ["MERN", "Azure", "CI/CD"],
  },
  {
    id: "msc-web",
    title: "MSC NU Laguna Website",
    blurb: "The official website of the Microsoft Student Community at NU Laguna.",
    stack: ["MERN", "Azure", "CI/CD"],
  },
  {
    id: "nasan",
    title: "NASAN: NU Laguna Scholarship Assistance Navigator",
    blurb: "A scholarship discovery assistant for NU Laguna.",
    stack: ["Python", "Flask", "React", "Tailwind CSS"],
  },
];

export const roles: Role[] = [
  {
    id: "msc-vp-tech",
    role: "Former VP for Technology",
    org: "Microsoft Student Community, NU Laguna",
    blurb:
      "Shipped the official full-stack membership platform and automated tools, increasing digital engagement while mentoring 200+ members across 6 technology tracks.",
  },
  {
    id: "col-ops-growth",
    role: "Former Operations – Growth",
    org: "Council of Leaders, NU Laguna",
    blurb:
      "Spearheaded internal coordination and process optimizations to elevate operational efficiency and boost student engagement across the Council.",
  },
  {
    id: "paskonalian-2024",
    role: "Operations Head – Paskonalian 2024",
    org: "Council of Leaders, NU Laguna",
    blurb:
      "Directed end-to-end event logistics, scheduling, procurement, and scholar team management for the university’s flagship Christmas celebration.",
  },
  {
    id: "nstp-cyber",
    role: "Project Leader – “404: Hacker not FOUND!” Cybersecurity Program",
    org: "National Service Training Program (NSTP)",
    blurb:
      "Designed and executed an interactive cybersecurity curriculum educating Grade 8 students on data privacy, phishing defense, and password security.",
  },
];

export const contact: ContactLink[] = [
  { label: "email", value: "keithyvesrobles@gmail.com", href: "mailto:keithyvesrobles@gmail.com" },
  { label: "github", value: "github.com/sonickysh", href: "https://github.com/sonickysh" },
  { label: "linkedin", value: "linkedin.com/in/keithrobles/", href: "https://www.linkedin.com/in/keithrobles" },
];
