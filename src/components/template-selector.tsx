"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: "modern" | "classic" | "minimalist";
  onSelect: (template: "modern" | "classic" | "minimalist") => void;
}

export function TemplateSelector({
  selectedTemplate,
  onSelect,
}: TemplateSelectorProps) {
  const templates = [
    {
      id: "modern",
      name: "Modern",
      color: "bg-blue-500",
    },
    {
      id: "classic",
      name: "Classic",
      color: "bg-slate-700",
    },
    {
      id: "minimalist",
      name: "Minimalist",
      color: "bg-emerald-500",
    },
  ] as const;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Choose Template
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={cn(
              "relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 hover:bg-accent/50",
              selectedTemplate === template.id
                ? "border-primary bg-primary/5"
                : "border-transparent bg-card hover:border-border"
            )}
          >
            <div className={cn("w-full aspect-[3/4] rounded-md shadow-sm opacity-80", template.color)} />
            <span className="text-xs font-medium">{template.name}</span>
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-0.5 shadow-sm">
                <Check size={12} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
