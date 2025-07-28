'use client';

import type { CVData, Education, Experience, Project } from '@/lib/types';
import { Accordion } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PersonalDetailsForm from './form-sections/personal-details-form';
import ExperienceForm from './form-sections/experience-form';
import EducationForm from './form-sections/education-form';
import ProjectsForm from './form-sections/projects-form';
import SkillsForm from './form-sections/skills-form';

type CvFormProps = {
  cvData: CVData;
  updatePersonal: (field: keyof CVData['personal'], value: string) => void;
  updateCvItem: <T extends Education | Experience | Project>(section: keyof CVData, id: string, field: keyof T, value: string) => void;
  addCvItem: (section: 'education' | 'experience' | 'projects') => void;
  removeCvItem: (section: keyof CVData, id: string) => void;
  updateSkills: (skills: string[]) => void;
};

export default function CvForm({ cvData, ...actions }: CvFormProps) {
  return (
    <Card className="glassmorphism w-full">
      <CardHeader>
        <CardTitle>CV Details</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
          <PersonalDetailsForm personal={cvData.personal} updatePersonal={actions.updatePersonal} />

          <Accordion type="multiple" className="w-full mt-6" defaultValue={['item-1', 'item-2', 'item-3', 'item-4']}>
            <EducationForm
              education={cvData.education}
              updateEducation={(id, field, value) => actions.updateCvItem('education', id, field, value)}
              addEducation={() => actions.addCvItem('education')}
              removeEducation={(id) => actions.removeCvItem('education', id)}
            />
            <ExperienceForm
              experience={cvData.experience}
              updateExperience={(id, field, value) => actions.updateCvItem('experience', id, field, value)}
              addExperience={() => actions.addCvItem('experience')}
              removeExperience={(id) => actions.removeCvItem('experience', id)}
            />
            <ProjectsForm
              projects={cvData.projects}
              updateProject={(id, field, value) => actions.updateCvItem('projects', id, field, value)}
              addProject={() => actions.addCvItem('projects')}
              removeProject={(id) => actions.removeCvItem('projects', id)}
            />
             <SkillsForm
              skills={cvData.skills}
              updateSkills={actions.updateSkills}
            />
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
