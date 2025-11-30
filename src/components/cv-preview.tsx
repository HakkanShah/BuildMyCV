"use client";

import { CVData } from "@/lib/types";
import { Button } from "./ui/button";
import { ModernTemplate } from "./templates/modern-template";
import { ClassicTemplate } from "./templates/classic-template";
import { MinimalistTemplate } from "@/components/templates/minimalist-template";
import { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Download, Loader2, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function CVPreview({
  data,
  template,
}: {
  data: CVData;
  template: "modern" | "classic" | "minimalist";
}) {
  const { toast } = useToast();
  const cvContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [zoom, setZoom] = useState(0.8); // Default zoom

  // Responsive scaling
  useEffect(() => {
    const handleResize = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const a4WidthPx = 794; // Approx width of 210mm at 96dpi
        // 32px padding on desktop (p-8), 16px on mobile (p-4)
        const padding = window.innerWidth < 768 ? 32 : 64;

        if (containerWidth < a4WidthPx + padding) {
          // Scale down if container is smaller than A4 + padding
          const newScale = (containerWidth - padding) / a4WidthPx;
          setZoom(Math.max(newScale, 0.3));
        } else {
          // Default zoom for larger screens
          setZoom(0.8);
        }
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDownloadPDF = async () => {
    const input = cvContainerRef.current;
    if (!input) {
      console.error("CV container for PDF generation not found.");
      return;
    }

    setIsGenerating(true);

    try {
      // Create a clone of the element
      const clone = input.cloneNode(true) as HTMLElement;

      // Create a container for the clone to ensure consistent rendering
      const container = document.createElement("div");
      container.style.position = "fixed";
      container.style.top = "-10000px";
      container.style.left = "-10000px";
      container.style.zIndex = "-1000";
      container.style.width = "210mm"; // Force A4 width
      container.style.minHeight = "297mm"; // Force A4 height
      container.style.backgroundColor = "#ffffff";

      // Append clone to container and container to body
      container.appendChild(clone);
      document.body.appendChild(container);

      const canvas = await html2canvas(clone, {
        scale: 2, // High resolution
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: 1024, // Simulate desktop width
      });

      // Cleanup
      document.body.removeChild(container);

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasRatio = canvas.width / canvas.height;

      let imgWidth = pdfWidth;
      let imgHeight = imgWidth / canvasRatio;

      // Check if content exceeds page height and scale down if necessary
      if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = imgHeight * canvasRatio;
      }

      // Center horizontally
      const x = (pdfWidth - imgWidth) / 2;
      const y = 0; // Start from top

      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

      pdf.save(`cv-${data.personal.name.replace(/\s+/g, '-').toLowerCase() || 'resume'}.pdf`);

      toast({
        title: "Download Successful! 🎉",
        description: "Your CV has been saved to your device.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download Failed 😔",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.4));
  const fitScreen = () => setZoom(0.6);

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Toolbar */}
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm border border-border/50">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={zoomOut} title="Zoom Out">
            <ZoomOut size={18} />
          </Button>
          <span className="text-sm font-medium w-12 text-center">{Math.round(zoom * 100)}%</span>
          <Button variant="ghost" size="icon" onClick={zoomIn} title="Zoom In">
            <ZoomIn size={18} />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button variant="ghost" size="icon" onClick={fitScreen} title="Fit to Screen">
            <Maximize size={18} />
          </Button>
        </div>

        <Button onClick={handleDownloadPDF} disabled={isGenerating} size="sm" className="bg-primary hover:bg-primary/90">
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin md:mr-2" />
              <span className="hidden md:inline">Generating...</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Download PDF</span>
            </>
          )}
        </Button>
      </div>

      {/* Preview Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-auto bg-slate-100 dark:bg-slate-950/50 rounded-xl border border-border/50 p-4 md:p-8 flex justify-center items-start custom-scrollbar"
      >
        <div
          style={{
            width: `${210 * zoom}mm`,
            height: `${297 * zoom}mm`,
            position: "relative",
            transition: "width 0.2s ease-in-out, height 0.2s ease-in-out",
          }}
          className="shadow-2xl"
        >
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            <div
              ref={cvContainerRef}
              className="bg-white text-black min-h-[297mm] w-[210mm]"
            >
              {template === "modern" && <ModernTemplate data={data} />}
              {template === "classic" && <ClassicTemplate data={data} />}
              {template === "minimalist" && <MinimalistTemplate data={data} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
