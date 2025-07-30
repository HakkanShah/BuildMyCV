"use client";

import { CVData } from "@/lib/types";
import { Button } from "./ui/button";
import { ModernTemplate } from "./templates/modern-template";
import { ClassicTemplate } from "./templates/classic-template";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export function CVPreview({
  data,
  template,
}: {
  data: CVData;
  template: "modern" | "classic";
}) {
  const cvContainerRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    const input = cvContainerRef.current;
    if (!input) {
      console.error("CV container for PDF generation not found.");
      return;
    }

    // Use html2canvas to capture the CV container as a canvas
    // We increase the scale to get a higher resolution image for better PDF quality
    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Get canvas dimensions
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Setup PDF using A4 paper size in millimeters
      const pdf = new jsPDF({
        orientation: "p", // portrait
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate the image dimensions to fit the PDF width while maintaining aspect ratio
      const imgWidth = pdfWidth;
      const imgHeight = (canvasHeight * imgWidth) / canvasWidth;

      let heightLeft = imgHeight;
      let position = 0;

      // Add the first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // If the CV is longer than one page, add new pages
      while (heightLeft > 0) {
        position = heightLeft - imgHeight; // This will be a negative value
        pdf.addPage();
        // The negative position shifts the image up, showing the next part of it on the new page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("cv.pdf");
    });
  };

  return (
    <div className="col-span-2 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Preview</h2>
        <Button onClick={handleDownloadPDF}>Download PDF</Button>
      </div>
      <div
        ref={cvContainerRef}
        className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
      >
        {template === "modern" ? (
          <ModernTemplate data={data} />
        ) : (
          <ClassicTemplate data={data} />
        )}
      </div>
    </div>
  );
}
