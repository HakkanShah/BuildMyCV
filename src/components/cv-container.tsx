"use client";

import { useState, useEffect } from "react";
import { useCVData } from "@/hooks/use-cv-data";
import { CVForm } from "./cv-form";
import { TemplateSelector } from "./template-selector";
import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { Eye, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sidebar, Section } from "./sidebar";
import { DesignForm } from "./form-sections/design-form";
import { Settings } from "@/lib/types";

const CVPreview = dynamic(
  () => import("./cv-preview").then((mod) => mod.CVPreview),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col gap-4 w-full h-full min-h-[600px] animate-pulse">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="w-full h-full rounded-xl border border-border/50 bg-card/50" />
      </div>
    ),
  }
);

import { WelcomeDialog } from "./welcome-dialog";

export default function CVContainer() {
  const { data, setData } = useCVData();
  const [template, setTemplate] = useState<"modern" | "classic" | "minimalist">("modern");
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [activeSection, setActiveSection] = useState<Section>("personal");
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updateSettings = (field: keyof Settings, value: string) => {
    setData({
      ...data,
      settings: {
        ...data.settings,
        [field]: value,
      },
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)]">
      <WelcomeDialog />
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed bottom-8 right-6 z-50">
        <Button
          size="lg"
          className="rounded-full shadow-2xl shadow-primary/40 h-14 w-14 p-0 bg-gradient-to-br from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-primary-foreground transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={() => setActiveTab(activeTab === "edit" ? "preview" : "edit")}
        >
          {activeTab === "edit" ? <Eye size={28} /> : <Edit3 size={24} />}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        {/* Sidebar Navigation */}
        <div className={cn(
          "col-span-1 lg:col-span-2 lg:sticky lg:top-24 h-fit z-40",
          isMobile && activeTab === "preview" ? "hidden" : "block"
        )}>
          <Sidebar activeSection={activeSection} onSelect={setActiveSection} data={data} />
        </div>

        {/* Editor Column */}
        <div
          className={cn(
            "col-span-1 lg:col-span-4 flex flex-col gap-6 transition-opacity duration-300 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-border/50 h-fit pb-24 lg:pb-6",
            isMobile && activeTab === "preview" ? "hidden" : "block"
          )}
        >
          <div className="space-y-1 border-b border-border/50 pb-4 mb-2">
            <h2 className="text-2xl font-bold tracking-tight capitalize">{activeSection}</h2>
            <p className="text-muted-foreground text-sm">
              {activeSection === "templates" && "Choose a template for your resume."}
              {activeSection === "design" && "Customize the look and feel."}
              {activeSection !== "templates" && activeSection !== "design" && `Edit your ${activeSection} details.`}
            </p>
          </div>

          {activeSection === "templates" ? (
            <TemplateSelector selectedTemplate={template} onSelect={setTemplate} />
          ) : activeSection === "design" ? (
            <DesignForm settings={data.settings || { themeColor: "#3b82f6", fontFamily: "sans" }} updateSettings={updateSettings} />
          ) : (
            <CVForm data={data} onUpdate={setData} activeSection={activeSection} />
          )}
        </div>

        {/* Preview Column */}
        <div
          className={cn(
            "col-span-1 lg:col-span-6 transition-opacity duration-300",
            isMobile && activeTab === "edit" ? "hidden" : "block"
          )}
        >
          <div className="lg:sticky lg:top-24 space-y-4 h-[calc(100vh-8rem)]">
            <CVPreview data={data} template={template} />
          </div>
        </div>
      </div>
    </div>
  );
}
