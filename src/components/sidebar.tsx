"use client";

import { cn } from "@/lib/utils";
import {
    User,
    GraduationCap,
    Briefcase,
    Lightbulb,
    Wrench,
    Palette,
    LayoutTemplate
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { CVData } from "@/lib/types";

export type Section = "personal" | "education" | "experience" | "projects" | "skills" | "design" | "templates";

interface SidebarProps {
    activeSection: Section;
    onSelect: (section: Section) => void;
    data: CVData;
}

export function Sidebar({ activeSection, onSelect, data }: SidebarProps) {
    const items = [
        { id: "personal", label: "Personal", icon: User },
        { id: "education", label: "Education", icon: GraduationCap },
        { id: "experience", label: "Experience", icon: Briefcase },
        { id: "projects", label: "Projects", icon: Lightbulb },
        { id: "skills", label: "Skills", icon: Wrench },
        { id: "templates", label: "Templates", icon: LayoutTemplate },
        { id: "design", label: "Design", icon: Palette },
    ] as const;

    // Calculate profile strength
    const calculateStrength = () => {
        let score = 0;
        if (data.personal.name && data.personal.email) score += 20;
        if (data.education.length > 0) score += 20;
        if (data.experience.length > 0) score += 20;
        if (data.projects.length > 0) score += 20;
        if (data.skills.length > 0) score += 20;
        return score;
    };

    const strength = calculateStrength();

    return (
        <div className="flex flex-col gap-4 h-full">
            <nav className="flex flex-row lg:flex-col gap-2 p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-border/50 overflow-x-auto lg:overflow-visible scrollbar-hide">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item.id as Section)}
                        className={cn(
                            "flex flex-col lg:flex-row items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-lg transition-all duration-200 min-w-[70px] lg:w-full group shrink-0",
                            activeSection === item.id
                                ? "bg-primary text-primary-foreground shadow-md"
                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <item.icon size={20} className={cn(activeSection === item.id ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                        <span className="text-[10px] lg:text-sm font-medium whitespace-nowrap">{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Profile Strength Indicator */}
            <div className="hidden lg:block p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-border/50">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-muted-foreground">Profile Strength</span>
                    <span className={cn("text-xs font-bold", strength === 100 ? "text-green-500" : "text-primary")}>{strength}%</span>
                </div>
                <Progress value={strength} className="h-2" />
                <p className="text-[10px] text-muted-foreground mt-2">
                    {strength < 100 ? "Complete all sections to reach 100%" : "Great job! Your profile is complete."}
                </p>
            </div>
        </div>
    );
}
