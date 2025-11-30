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
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill and press Enter"
        />
        <Button onClick={handleAddSkill}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="pl-3 pr-1 py-1 text-sm">
            {skill}
            <button
              onClick={() => handleRemoveSkill(skill)}
              className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5"
              aria-label={`Remove ${skill}`}
            >
              <X size={14} />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
