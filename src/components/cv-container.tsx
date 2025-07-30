"use client";

import { useState } from "react";
import { useCVData } from "@/hooks/use-cv-data";
import { CVForm } from "./cv-form";
import { TemplateSelector } from "./template-selector";
import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";

// Dynamically import the CVPreview component with SSR turned off.
// This ensures that the component, along with its client-side dependencies (jspdf, html2canvas),
// is only loaded and rendered in the browser, not on the server.
const CVPreview = dynamic(
  () => import("./cv-preview").then((mod) => mod.CVPreview),
  {
    ssr: false,
    // Provide a loading component to show while the CVPreview is being loaded on the client.
    loading: () => (
      <div className="col-span-2 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="w-full h-[800px] rounded-lg" />
      </div>
    ),
  }
);

export function CVContainer() {
  const { data, setData } = useCVData();
  const [template, setTemplate] = useState<"modern" | "classic">("modern");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-8">
      <div className="col-span-1 flex flex-col gap-4">
        <TemplateSelector selectedTemplate={template} onSelect={setTemplate} />
        <CVForm data={data} onUpdate={setData} />
      </div>
      <CVPreview data={data} template={template} />
    </div>
  );
}
