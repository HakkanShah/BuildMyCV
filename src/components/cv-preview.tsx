import * as React from 'react';
import type { CVData } from '@/lib/types';
import ModernTemplate from './templates/modern-template';
import ClassicTemplate from './templates/classic-template';
import { Card, CardContent } from './ui/card';

interface CvPreviewProps {
  cvData: CVData;
  template: string;
}

// This is now a regular functional component, no longer using forwardRef.
export default function CvPreview({ cvData, template }: CvPreviewProps) {
  return (
    <Card className="w-full print-container">
      <CardContent className="p-0">
        <div className="bg-white text-black">
          {template === 'modern' && <ModernTemplate cvData={cvData} />}
          {template === 'classic' && <ClassicTemplate cvData={cvData} />}
        </div>
      </CardContent>
    </Card>
  );
};
