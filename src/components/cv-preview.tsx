import * as React from 'react';
import type { CVData } from '@/lib/types';
import ModernTemplate from './templates/modern-template';
import ClassicTemplate from './templates/classic-template';
import { Card, CardContent } from './ui/card';

interface CvPreviewProps {
  cvData: CVData;
  template: string;
}

const CvPreview = React.forwardRef<HTMLDivElement, CvPreviewProps>(({ cvData, template }, ref) => {
  return (
    <Card className="w-full">
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
