'use client';

import { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useCvData } from '@/hooks/use-cv-data';
import CvForm from './cv-form';
import CvPreview from './cv-preview';
import { Button } from './ui/button';
import { Download, Save } from 'lucide-react';
import TemplateSelector from './template-selector';

export default function CvContainer() {
  const previewRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState('modern');

  useEffect(() => {
    const savedTemplate = localStorage.getItem('cv-template');
    if (savedTemplate) {
      setTemplate(savedTemplate);
    }
  }, []);

  const handleTemplateChange = (newTemplate: string) => {
    setTemplate(newTemplate);
    localStorage.setItem('cv-template', newTemplate);
  };

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: 'My-CV',
    removeAfterPrint: true,
  });

  console.log("handlePrint function created"); // Added console log

  const { cvData, isLoaded, saveData, ...cvActions } = useCvData({ onPrint: handlePrint });

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading Your CV...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="lg:sticky lg:top-24">
        <CvForm cvData={cvData} {...cvActions} />
        <div className="flex justify-end gap-2 mt-4">
            <Button onClick={saveData}><Save className="mr-2 h-4 w-4" /> Save (Ctrl+S)</Button>
            <Button onClick={handlePrint} variant="secondary"><Download className="mr-2 h-4 w-4" /> Download (Ctrl+P)</Button>
        </div>
      </div>
      <div>
        <TemplateSelector value={template} onValueChange={handleTemplateChange} />
        {/*
          The ref is now on a simple div that wraps the preview component.
          This is a more stable pattern for react-to-print.
        */}
        <div ref={previewRef}>
          <CvPreview cvData={cvData} template={template} />
        </div>
      </div>
    </div>
  );
}
