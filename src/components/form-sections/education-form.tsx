'use client';
import type { Education } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextarea } from '@/components/ui/rich-textarea';
import { PlusCircle, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

type EducationFormProps = {
  education: Education[];
  updateEducation: (id: string, field: keyof Education, value: string) => void;
  addEducation: () => void;
  removeEducation: (id: string) => void;
  reorderEducation?: (startIndex: number, endIndex: number) => void;
};

export default function EducationForm({
  education,
  updateEducation,
  addEducation,
  removeEducation,
  reorderEducation
}: EducationFormProps) {

  const moveUp = (index: number) => {
    if (index > 0 && reorderEducation) {
      reorderEducation(index, index - 1);
    }
  };

  const moveDown = (index: number) => {
    if (index < education.length - 1 && reorderEducation) {
      reorderEducation(index, index + 1);
    }
  };

  return (
    <div className="space-y-6">
      {education.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <PlusCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-1">No education added</h3>
          <p className="text-muted-foreground mb-4 text-sm max-w-xs mx-auto">Add your educational background to showcase your academic achievements.</p>
          <Button onClick={addEducation}>
            Add Education
          </Button>
        </div>
      )}

      {education.map((edu, index) => (
        <div key={edu.id} className="p-6 border rounded-xl relative space-y-6 bg-card shadow-sm animate-fade-in group hover:shadow-md transition-shadow">
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {reorderEducation && (
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
                  disabled={index === education.length - 1}
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
              onClick={() => removeEducation(edu.id)}
              title="Remove"
            >
              <Trash2 size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor={`institution-${edu.id}`}>Institution <span className="text-red-500">*</span></Label>
              <Input
                id={`institution-${edu.id}`}
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                placeholder="e.g. Harvard University"
                className={!edu.institution ? "border-amber-200 focus-visible:ring-amber-200" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`degree-${edu.id}`}>Degree <span className="text-red-500">*</span></Label>
              <Input
                id={`degree-${edu.id}`}
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                placeholder="e.g. Bachelor of Science"
                className={!edu.degree ? "border-amber-200 focus-visible:ring-amber-200" : ""}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor={`start-date-${edu.id}`}>Start Date</Label>
              <Input
                id={`start-date-${edu.id}`}
                type="month"
                value={edu.startDate}
                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`end-date-${edu.id}`}>End Date</Label>
              <Input
                id={`end-date-${edu.id}`}
                type="month"
                value={edu.endDate}
                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Leave empty if currently studying</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`details-${edu.id}`}>Details</Label>
            <RichTextarea
              id={`details-${edu.id}`}
              value={edu.details}
              onChange={(e) => updateEducation(edu.id, 'details', e.target.value)}
              placeholder="e.g. GPA 3.8, Magna Cum Laude..."
            />
          </div>
        </div>
      ))}

      {education.length > 0 && (
        <Button variant="outline" onClick={addEducation} className="w-full py-6 border-dashed hover:bg-muted/50">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Another Education
        </Button>
      )}
    </div>
  );
}
