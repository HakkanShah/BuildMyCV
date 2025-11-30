"use client";

import { CVData, PersonalDetails, Education, Experience, Project } from "@/lib/types";
import PersonalDetailsForm from "./form-sections/personal-details-form";
import EducationForm from "./form-sections/education-form";
import ExperienceForm from "./form-sections/experience-form";
import ProjectsForm from "./form-sections/projects-form";
import SkillsForm from "./form-sections/skills-form";
import { Section } from "./sidebar";

interface CVFormProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
  activeSection: Section;
}

export function CVForm({ data, onUpdate, activeSection }: CVFormProps) {
  const updatePersonal = (field: keyof PersonalDetails, value: string) => {
    onUpdate({ ...data, personal: { ...data.personal, [field]: value } });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onUpdate({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const addEducation = () => {
    onUpdate({
      ...data,
      education: [
        ...data.education,
        {
          id: Date.now().toString(),
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
          details: "",
        },
      ],
    });
  };

  const removeEducation = (id: string) => {
    onUpdate({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const reorderEducation = (startIndex: number, endIndex: number) => {
    const result = Array.from(data.education);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    onUpdate({ ...data, education: result });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    onUpdate({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const addExperience = () => {
    onUpdate({
      ...data,
      experience: [
        ...data.experience,
        {
          id: Date.now().toString(),
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const removeExperience = (id: string) => {
    onUpdate({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  const reorderExperience = (startIndex: number, endIndex: number) => {
    const result = Array.from(data.experience);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    onUpdate({ ...data, experience: result });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onUpdate({
      ...data,
      projects: data.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    });
  };

  const addProject = () => {
    onUpdate({
      ...data,
      projects: [
        ...data.projects,
        {
          id: Date.now().toString(),
          name: "",
          date: "",
          description: "",
          url: "",
        },
      ],
    });
  };

  const removeProject = (id: string) => {
    onUpdate({
      ...data,
      projects: data.projects.filter((proj) => proj.id !== id),
    });
  };

  const reorderProject = (startIndex: number, endIndex: number) => {
    const result = Array.from(data.projects);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    onUpdate({ ...data, projects: result });
  };

  const updateSkills = (skills: string[]) => {
    onUpdate({ ...data, skills });
  };

  return (
    <div className="animate-fade-in">
      {activeSection === "personal" && (
        <PersonalDetailsForm
          personal={data.personal}
          updatePersonal={updatePersonal}
        />
      )}
      {activeSection === "education" && (
        <EducationForm
          education={data.education}
          updateEducation={updateEducation}
          addEducation={addEducation}
          removeEducation={removeEducation}
          reorderEducation={reorderEducation}
        />
      )}
      {activeSection === "experience" && (
        <ExperienceForm
          experience={data.experience}
          updateExperience={updateExperience}
          addExperience={addExperience}
          removeExperience={removeExperience}
          reorderExperience={reorderExperience}
        />
      )}
      {activeSection === "projects" && (
        <ProjectsForm
          projects={data.projects}
          updateProject={updateProject}
          addProject={addProject}
          removeProject={removeProject}
          reorderProject={reorderProject}
        />
      )}
      {activeSection === "skills" && (
        <SkillsForm skills={data.skills} updateSkills={updateSkills} />
      )}
    </div>
  );
}
