"use client";

import { CVData } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { PersonalDetailsForm } from "./form-sections/personal-details-form";
import { EducationForm } from "./form-sections/education-form";
import { ExperienceForm } from "./form-sections/experience-form";
import { ProjectsForm } from "./form-sections/projects-form";
import { SkillsForm } from "./form-sections/skills-form";

interface CVFormProps {
  data: CVData;
  onUpdate: (data: CVData) => void;
}

// The "export" keyword was likely missing.
export function CVForm({ data, onUpdate }: CVFormProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="personal-details">
        <AccordionTrigger>Personal Details</AccordionTrigger>
        <AccordionContent>
          <PersonalDetailsForm data={data} onUpdate={onUpdate} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="education">
        <AccordionTrigger>Education</AccordionTrigger>
        <AccordionContent>
          <EducationForm data={data} onUpdate={onUpdate} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="experience">
        <AccordionTrigger>Experience</AccordionTrigger>
        <AccordionContent>
          <ExperienceForm data={data} onUpdate={onUpdate} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="projects">
        <AccordionTrigger>Projects</AccordionTrigger>
        <AccordionContent>
          <ProjectsForm data={data} onUpdate={onUpdate} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="skills">
        <AccordionTrigger>Skills</AccordionTrigger>
        <AccordionContent>
          <SkillsForm data={data} onUpdate={onUpdate} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
