'use client';
import type { Education } from '@/lib/types';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GraduationCap, PlusCircle, Trash2 } from 'lucide-react';

type EducationFormProps = {
  education: Education[];
  updateEducation: (id: string, field: keyof Education, value: string) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
};

export default function EducationForm({ education, updateEducation, addEducation, removeEducation }: EducationFormProps) {
  return (
    <AccordionItem value="item-1">
      <AccordionTrigger className="font-semibold"><GraduationCap className="mr-2" /> Education</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="p-4 border rounded-md relative space-y-4">
               <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeEducation(edu.id)}><Trash2 size={16} /></Button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                  <Input id={`institution-${edu.id}`} value={edu.institution} onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                  <Input id={`degree-${edu.id}`} value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`start-date-${edu.id}`}>Start Date</Label>
                  <Input id={`start-date-${edu.id}`} value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor={`end-date-${edu.id}`}>End Date</Label>
                  <Input id={`end-date-${edu.id}`} value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor={`details-${edu.id}`}>Details</Label>
                <Textarea id={`details-${edu.id}`} value={edu.details} onChange={(e) => updateEducation(edu.id, 'details', e.target.value)} placeholder="e.g., GPA, Honors..." />
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={addEducation} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Education
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
