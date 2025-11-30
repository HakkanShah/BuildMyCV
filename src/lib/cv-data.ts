import { CVData } from "./types";

export const initialCVData: CVData = {
  personal: {
    name: "Your Name",
    email: "your.email@example.com",
    phone: "123-456-7890",
    website: "https://yourwebsite.com",
    location: "City, Country",
    summary: "A brief summary about yourself.",
  },
  education: [
    {
      id: "1",
      institution: "University of Example",
      degree: "Bachelor of Science",
      startDate: "2018",
      endDate: "2022",
      details: "Graduated with honors.",
    },
  ],
  experience: [
    {
      id: "1",
      company: "Tech Corp",
      role: "Software Engineer",
      startDate: "2022",
      endDate: "Present",
      description: "Developed and maintained web applications.",
    },
  ],
  projects: [
    {
      id: "1",
      name: "CV Builder",
      date: "2023",
      description: "A web application to build and customize CVs.",
      url: "https://github.com/your-repo/cv-builder",
    },
  ],
  skills: ["JavaScript", "React", "Next.js", "TypeScript", "Node.js"],
  settings: {
    themeColor: "#3b82f6", // Default blue
    fontFamily: "sans",
  },
};
