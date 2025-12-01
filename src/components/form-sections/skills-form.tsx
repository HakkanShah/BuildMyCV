'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

type SkillsFormProps = {
  skills: string[];
  updateSkills: (skills: string[]) => void;
};

export default function SkillsForm({ skills, updateSkills }: SkillsFormProps) {
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      updateSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    updateSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill and press Enter"
          className="flex-1"
        />
        <Button onClick={handleAddSkill} disabled={!skillInput.trim()}>Add</Button>
      </div>

      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2 p-4 border rounded-xl bg-card min-h-[100px] content-start">
          {skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1 text-sm bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 transition-colors">
              {skill}
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="ml-2 rounded-full hover:bg-primary/20 p-0.5 transition-colors"
                aria-label={`Remove ${skill}`}
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed rounded-xl bg-muted/30">
          <p className="text-muted-foreground text-sm">No skills added yet. Type above or select from suggestions.</p>
        </div>
      )}

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">Suggestions</h4>
        <div className="flex flex-wrap gap-2">
          {["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "Java", "SQL", "Git", "Docker", "AWS", "Figma", "Tailwind CSS", "HTML/CSS", "Communication", "Leadership"].map((suggestion) => (
            !skills.includes(suggestion) && (
              <button
                key={suggestion}
                onClick={() => updateSkills([...skills, suggestion])}
                className="px-3 py-1 text-xs border rounded-full hover:bg-accent hover:text-accent-foreground transition-colors bg-background"
              >
                + {suggestion}
              </button>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
