import * as React from 'react';
import type { CVData } from '@/lib/types';
import ModernTemplate from './templates/modern-template';
import ClassicTemplate from './templates/classic-template';
import { Card, CardContent } from './ui/card';

// Define the props interface before using it
interface CvPreviewProps {
  cvData: CVData;
  template: string;
}

// Declare the component once
const CvPreview = React.forwardRef<HTMLDivElement, CvPreviewProps>(({ cvData, template }, ref) => {
  return (
    <Card className="w-full print-container">
      <CardContent className="p-0">
        <div ref={ref} className="bg-white text-black">
          {template === 'modern' && <ModernTemplate cvData={cvData} />}
          {template === 'classic' && <ClassicTemplate cvData={cvData} />}
        </div>
      </CardContent>
    </Card>
  );
});

CvPreview.displayName = 'CvPreview';

export default CvPreview;
