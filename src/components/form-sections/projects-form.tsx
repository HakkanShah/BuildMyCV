'use client';

import type { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextarea } from '@/components/ui/rich-textarea';
import { PlusCircle, Trash2, ArrowUp, ArrowDown } from 'lucide-react';

type ProjectsFormProps = {
  projects: Project[];
  updateProject: (id: string, field: keyof Project, value: string) => void;
  addProject: () => void;
  removeProject: (id: string) => void;
  reorderProject?: (startIndex: number, endIndex: number) => void;
};

export default function ProjectsForm({
  projects,
  updateProject,
  addProject,
  removeProject,
  reorderProject
}: ProjectsFormProps) {
  const countWords = (str: string | undefined) => {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(Boolean).length;
  };

  const moveUp = (index: number) => {
    if (index > 0 && reorderProject) {
      reorderProject(index, index - 1);
    }
  };

  const moveDown = (index: number) => {
    if (index < projects.length - 1 && reorderProject) {
      reorderProject(index, index + 1);
    }
  };

  return (
    <div className="space-y-6">
      {projects.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <PlusCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-medium mb-1">No projects added</h3>
          <p className="text-muted-foreground mb-4 text-sm max-w-xs mx-auto">Showcase your personal or professional projects to highlight your skills.</p>
          <Button onClick={addProject}>
            Add Project
          </Button>
        </div>
      )}

      {projects.map((proj, index) => (
        <div key={proj.id} className="p-6 border rounded-xl relative space-y-6 bg-card shadow-sm animate-fade-in group hover:shadow-md transition-shadow">
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {reorderProject && (
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
                  disabled={index === projects.length - 1}
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
              onClick={() => removeProject(proj.id)}
              title="Remove"
            >
              <Trash2 size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor={`name-${proj.id}`}>Project Name <span className="text-red-500">*</span></Label>
              <Input
                id={`name-${proj.id}`}
                value={proj.name}
                onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                placeholder="e.g. Portfolio Website"
                className={!proj.name ? "border-amber-200 focus-visible:ring-amber-200" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`date-${proj.id}`}>Date</Label>
              <Input
                id={`date-${proj.id}`}
                value={proj.date}
                onChange={(e) => updateProject(proj.id, 'date', e.target.value)}
                placeholder="e.g. 2023"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`url-${proj.id}`}>URL</Label>
            <Input id={`url-${proj.id}`} value={proj.url} onChange={(e) => updateProject(proj.id, 'url', e.target.value)} placeholder="e.g. https://github.com/..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`description-${proj.id}`}>Description</Label>
            <RichTextarea
              id={`description-${proj.id}`}
              value={proj.description}
              onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
              placeholder="Describe the project and technologies used..."
            />
            <p className="text-xs text-muted-foreground text-right">{countWords(proj.description)} words</p>
          </div>
        </div>
      ))}

      {projects.length > 0 && (
        <Button variant="outline" onClick={addProject} className="w-full py-6 border-dashed hover:bg-muted/50">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Another Project
        </Button>
      )}
    </div>
  );
}
