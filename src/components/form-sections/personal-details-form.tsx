'use client';

import type { PersonalDetails } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RichTextarea } from '@/components/ui/rich-textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Trash2, User } from 'lucide-react';
import React from 'react';

type PersonalDetailsFormProps = {
  personal: PersonalDetails;
  updatePersonal: (field: keyof PersonalDetails, value: string) => void;
};

export default function PersonalDetailsForm({ personal, updatePersonal }: PersonalDetailsFormProps) {
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonal('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const countWords = (str: string | undefined) => {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(Boolean).length;
  };

  const initials = personal.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="photo">Profile Photo</Label>
        <div className="flex items-center gap-4 mt-2">
          <Avatar className="h-20 w-20">
            <AvatarImage src={personal.photo} alt={personal.name} data-ai-hint="profile picture" />
            <AvatarFallback>
              {initials || <User className="h-8 w-8" />}
            </AvatarFallback>
          </Avatar>
          <div className='flex-grow'>
            <Input id="photo" type="file" onChange={handlePhotoChange} accept="image/*" className="file:text-foreground" />
          </div>
          {personal.photo && (
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => updatePersonal('photo', '')}>
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={personal.name} onChange={(e) => updatePersonal('name', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={personal.email}
            onChange={(e) => updatePersonal('email', e.target.value)}
            className={personal.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email) ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {personal.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email) && (
            <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={personal.phone} onChange={(e) => updatePersonal('phone', e.target.value)} />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input id="website" value={personal.website} onChange={(e) => updatePersonal('website', e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={personal.linkedin || ''}
            onChange={(e) => updatePersonal('linkedin', e.target.value)}
            placeholder="linkedin.com/in/username"
          />
        </div>
        <div>
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={personal.github || ''}
            onChange={(e) => updatePersonal('github', e.target.value)}
            placeholder="github.com/username"
          />
        </div>
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" value={personal.location} onChange={(e) => updatePersonal('location', e.target.value)} />
      </div>
      <div>
        <Label htmlFor="summary">Summary</Label>
        <RichTextarea id="summary" value={personal.summary} onChange={(e) => updatePersonal('summary', e.target.value)} placeholder="Tell us about yourself" context="personal" />
        <p className="text-xs text-muted-foreground text-right mt-1">{countWords(personal.summary)} words</p>
      </div>
    </div>
  );
}
