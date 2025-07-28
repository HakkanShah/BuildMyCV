'use client';

import { useState, useEffect, useCallback } from 'react';
import type { CVData, PersonalDetails, Education, Experience, Project } from '@/lib/types';
import { defaultCvData } from '@/lib/cv-data';
import { useToast } from './use-toast';

const LOCAL_STORAGE_KEY = 'cv-data';

export function useCvData({ onPrint }: { onPrint: () => void }) {
  const [cvData, setCvData] = useState<CVData>(defaultCvData);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (item) {
        setCvData(JSON.parse(item));
      }
    } catch (error) {
      console.error('Failed to load CV data from local storage', error);
    }
    setIsLoaded(true);
  }, []);

  const saveData = useCallback(() => {
    if (!isLoaded) return;
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cvData));
      toast({
        title: 'CV Saved!',
        description: 'Your data has been saved to your browser.',
      });
    } catch (error) {
      console.error('Failed to save CV data to local storage', error);
      toast({
        title: 'Error',
        description: 'Could not save CV data.',
        variant: 'destructive',
      });
    }
  }, [cvData, toast, isLoaded]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === 's') {
          event.preventDefault();
          saveData();
        }
        if (event.key === 'p') {
          event.preventDefault();
          onPrint();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [saveData, onPrint]);

  const updatePersonal = useCallback((field: keyof PersonalDetails, value: string) => {
    setCvData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  }, []);
  
  const updateCvItem = <T extends Education | Experience | Project>(
    section: keyof CVData,
    id: string,
    field: keyof T,
    value: string
  ) => {
    setCvData((prev) => {
        const list = prev[section] as T[];
        if(!Array.isArray(list)) return prev;

        return {
            ...prev,
            [section]: list.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
            ),
        };
    });
  };

  const addCvItem = (section: 'education' | 'experience' | 'projects') => {
    const newItem = {
        id: crypto.randomUUID(),
        ...(section === 'education' && { institution: '', degree: '', startDate: '', endDate: '', details: '' }),
        ...(section === 'experience' && { company: '', role: '', startDate: '', endDate: '', description: '' }),
        ...(section === 'projects' && { name: '', date: '', description: '', url: '' }),
    };

    setCvData((prev) => ({
        ...prev,
        [section]: [...(prev[section] as any[]), newItem],
    }));
  };

  const removeCvItem = (section: keyof CVData, id: string) => {
     setCvData((prev) => {
        const list = prev[section] as (Education | Experience | Project)[];
        if(!Array.isArray(list)) return prev;
        return {
            ...prev,
            [section]: list.filter((item) => item.id !== id),
        };
    });
  };

  const updateSkills = useCallback((skills: string[]) => {
    setCvData((prev) => ({...prev, skills }));
  },[]);


  return { cvData, isLoaded, updatePersonal, updateCvItem, addCvItem, removeCvItem, updateSkills, saveData, setCvData };
}
