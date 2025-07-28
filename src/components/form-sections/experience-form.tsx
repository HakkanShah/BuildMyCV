'use client';

import type { Experience } from '@/lib/types';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, PlusCircle, Trash2 } from 'lucide-react';

type ExperienceFormProps = {
  experience: Experience[];
  updateExperience: (id: string, field: keyof Experience, value: string) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
};

export default function ExperienceForm({ experience, updateExperience, addExperience, removeExperience }: ExperienceFormProps) {
  const countWords = (str: string | undefined) => {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(Boolean).length;
  };

  return (
    <AccordionItem value="item-2">
      <AccordionTrigger className="font-semibold"><Briefcase className="mr-2" /> Experience</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id} className="p-4 border rounded-md relative space-y-4">
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeExperience(exp.id)}><Trash2 size={16} /></Button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`company-${exp.id}`}>Company</Label>
                  <Input id={`company-${exp.id}`} value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor={`role-${exp.id}`}>Role</Label>
                  <Input id={`role-${exp.id}`} value={exp.role} onChange={(e) => updateExperience(exp.id, 'role', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`start-date-exp-${exp.id}`}>Start Date</Label>
                  <Input id={`start-date-exp-${exp.id}`} value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor={`end-date-exp-${exp.id}`}>End Date</Label>
                  <Input id={`end-date-exp-${exp.id}`} value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor={`description-exp-${exp.id}`}>Description</Label>
                <Textarea id={`description-exp-${exp.id}`} value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} placeholder="Describe your responsibilities and achievements..." />
                <p className="text-xs text-muted-foreground text-right mt-1">{countWords(exp.description)} words</p>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={addExperience} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
