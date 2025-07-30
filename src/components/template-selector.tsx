"use client";

import { Button } from "./ui/button";

interface TemplateSelectorProps {
  selectedTemplate: "modern" | "classic";
  onSelect: (template: "modern" | "classic") => void;
}

// The "export" keyword was likely missing.
export function TemplateSelector({
  selectedTemplate,
  onSelect,
}: TemplateSelectorProps) {
  return (
    <div className="flex gap-2">
      <Button
        variant={selectedTemplate === "modern" ? "default" : "outline"}
        onClick={() => onSelect("modern")}
        className="w-full"
      >
        Modern
      </Button>
      <Button
        variant={selectedTemplate === "classic" ? "default" : "outline"}
        onClick={() => onSelect("classic")}
        className="w-full"
      >
        Classic
      </Button>
    </div>
  );
}
