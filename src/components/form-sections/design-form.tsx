"use client";

import { Settings } from "@/lib/types";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface DesignFormProps {
    settings: Settings;
    updateSettings: (field: keyof Settings, value: string) => void;
}

export function DesignForm({ settings, updateSettings }: DesignFormProps) {
    const colors = [
        { name: "Blue", value: "#3b82f6", class: "bg-blue-500" },
        { name: "Emerald", value: "#10b981", class: "bg-emerald-500" },
        { name: "Violet", value: "#8b5cf6", class: "bg-violet-500" },
        { name: "Rose", value: "#f43f5e", class: "bg-rose-500" },
        { name: "Amber", value: "#f59e0b", class: "bg-amber-500" },
        { name: "Slate", value: "#64748b", class: "bg-slate-500" },
    ];

    const fonts = [
        { name: "Sans Serif", value: "sans", class: "font-sans" },
        { name: "Serif", value: "serif", class: "font-serif" },
        { name: "Monospace", value: "mono", class: "font-mono" },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Accent Color</h3>
                <div className="flex flex-wrap gap-4">
                    {colors.map((color) => (
                        <button
                            key={color.value}
                            onClick={() => updateSettings("themeColor", color.value)}
                            title={color.name}
                            className={cn(
                                "w-10 h-10 rounded-full transition-all duration-200 ring-2 ring-offset-2",
                                color.class,
                                settings.themeColor === color.value
                                    ? "ring-primary scale-110"
                                    : "ring-transparent hover:scale-105"
                            )}
                            aria-label={`Select ${color.name} color`}
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-medium">Typography</h3>
                <RadioGroup
                    value={settings.fontFamily}
                    onValueChange={(val) => updateSettings("fontFamily", val)}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    {fonts.map((font) => (
                        <div key={font.value}>
                            <RadioGroupItem
                                value={font.value}
                                id={`font-${font.value}`}
                                className="peer sr-only"
                            />
                            <Label
                                htmlFor={`font-${font.value}`}
                                className={cn(
                                    "flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-full transition-all",
                                    font.class
                                )}
                            >
                                <span className="text-3xl mb-2">Aa</span>
                                <span className="text-sm font-medium">{font.name}</span>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    );
}
