'use client';

import type { Project } from '@/lib/types';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, PlusCircle, Trash2 } from 'lucide-react';

type ProjectsFormProps = {
  projects: Project[];
  updateProject: (id: string, field: keyof Project, value: string) => void;
  addProject: () => void;
  removeProject: (id: string) => void;
};

export default function ProjectsForm({ projects, updateProject, addProject, removeProject }: ProjectsFormProps) {
  const countWords = (str: string | undefined) => {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(Boolean).length;
  };
  
  return (
    <AccordionItem value="item-3">
      <AccordionTrigger className="font-semibold"><Lightbulb className="mr-2" /> Projects</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          {projects.map((proj) => (
            <div key={proj.id} className="p-4 border rounded-md relative space-y-4">
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeProject(proj.id)}><Trash2 size={16} /></Button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`name-${proj.id}`}>Project Name</Label>
                  <Input id={`name-${proj.id}`} value={proj.name} onChange={(e) => updateProject(proj.id, 'name', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor={`date-${proj.id}`}>Date</Label>
                  <Input id={`date-${proj.id}`} value={proj.date} onChange={(e) => updateProject(proj.id, 'date', e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor={`url-${proj.id}`}>URL</Label>
                <Input id={`url-${proj.id}`} value={proj.url} onChange={(e) => updateProject(proj.id, 'url', e.target.value)} />
              </div>
              <div>
                <Label htmlFor={`description-${proj.id}`}>Description</Label>
                <Textarea id={`description-${proj.id}`} value={proj.description} onChange={(e) => updateProject(proj.id, 'description', e.target.value)} />
                 <p className="text-xs text-muted-foreground text-right mt-1">{countWords(proj.description)} words</p>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={addProject} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Project
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
