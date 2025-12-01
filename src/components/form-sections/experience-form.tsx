'use client';

import type { Experience } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextarea } from '@/components/ui/rich-textarea';
import { PlusCircle, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type ExperienceFormProps = {
  experience: Experience[];
  updateExperience: (id: string, field: keyof Experience, value: string) => void;
  addExperience: () => void;
  removeExperience: (id: string) => void;
  reorderExperience?: (startIndex: number, endIndex: number) => void;
};

export default function ExperienceForm({
  experience,
  updateExperience,
  addExperience,
  removeExperience,
  reorderExperience
}: ExperienceFormProps) {
  const countWords = (str: string | undefined) => {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(Boolean).length;
  };

  const moveUp = (index: number) => {
    if (index > 0 && reorderExperience) {
      reorderExperience(index, index - 1);
    }
  };

  const moveDown = (index: number) => {
    if (index < experience.length - 1 && reorderExperience) {
      reorderExperience(index, index + 1);
    }
  };

  return (
    <div className="space-y-6">
      {experience.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <PlusCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-1">No experience added</h3>
          <p className="text-muted-foreground mb-4 text-sm max-w-xs mx-auto">Add your professional experience to demonstrate your career history.</p>
          <Button onClick={addExperience}>
            Add Experience
          </Button>
        </div>
      )}

      {experience.map((exp, index) => (
        <div key={exp.id} className="p-6 border rounded-xl relative space-y-6 bg-card shadow-sm animate-fade-in group hover:shadow-md transition-shadow">
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {reorderExperience && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  title="Move Up"
                >
                  <ArrowUp size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => moveDown(index)}
                  disabled={index === experience.length - 1}
                  title="Move Down"
                >
                  <ArrowDown size={16} />
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => removeExperience(exp.id)}
              title="Remove"
            >
              <Trash2 size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor={`company-${exp.id}`}>Company <span className="text-red-500">*</span></Label>
              <Input
                id={`company-${exp.id}`}
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                placeholder="e.g. Google"
                className={!exp.company ? "border-amber-200 focus-visible:ring-amber-200" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`role-${exp.id}`}>Role <span className="text-red-500">*</span></Label>
              <Input
                id={`role-${exp.id}`}
                value={exp.role}
                onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                placeholder="e.g. Senior Developer"
                className={!exp.role ? "border-amber-200 focus-visible:ring-amber-200" : ""}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor={`start-date-exp-${exp.id}`}>Start Date</Label>
              <Input
                id={`start-date-exp-${exp.id}`}
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`end-date-exp-${exp.id}`}>End Date</Label>
              <Input
                id={`end-date-exp-${exp.id}`}
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Leave empty if currently working here</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`description-exp-${exp.id}`}>Description</Label>
            <RichTextarea
              id={`description-exp-${exp.id}`}
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              context="experience"
            />
            <p className="text-xs text-muted-foreground text-right">{countWords(exp.description)} words</p>
          </div>
        </div>
      ))}

      {experience.length > 0 && (
        <Button variant="outline" onClick={addExperience} className="w-full py-6 border-dashed hover:bg-muted/50">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Another Position
        </Button>
      )}
    </div>
  );
}
