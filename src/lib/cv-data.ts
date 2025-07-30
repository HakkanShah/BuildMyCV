import { CVData } from "./types";

// The 'export' keyword was likely missing here. 
// By adding it, we make this variable available to other files that import it,
// which should resolve the entire chain of build errors.
export const initialCVData: CVData = {
  personalDetails: {
    name: "Your Name",
    email: "your.email@example.com",
    phone: "123-456-7890",
    address: "City, Country",
  },
  education: [
    {
      institution: "University of Example",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2018",
      endDate: "2022",
      description: "Graduated with honors.",
    },
  ],
  experience: [
    {
      company: "Tech Corp",
      position: "Software Engineer",
      startDate: "2022",
      endDate: "Present",
      description: "Developed and maintained web applications.",
    },
  ],
  projects: [
    {
      name: "CV Builder",
      description: "A web application to build and customize CVs.",
      technologies: "Next.js, TypeScript, Tailwind CSS",
      link: "https://github.com/your-repo/cv-builder",
    },
  ],
  skills: ["JavaScript", "React", "Next.js", "TypeScript", "Node.js"],
};
