export interface PersonalDetails {
  name: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  summary: string;
  photo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  details: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  date: string;
  description: string;
  url: string;
}

export type CVData = {
  personal: PersonalDetails;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: string[];
};

