"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { List, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface RichTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    context?: 'personal' | 'experience' | 'project';
}

export function RichTextarea({ value, onChange, context, className, ...props }: RichTextareaProps) {
    const [isImproving, setIsImproving] = useState(false);
    const { toast } = useToast();

    const addBulletPoint = () => {
        const lines = value.split("\n");
        const lastLine = lines[lines.length - 1];

        let newValue = value;
        if (value === "" || lastLine.trim() === "") {
            newValue += "• ";
        } else {
            newValue += "\n• ";
        }

        const event = {
            target: {
                value: newValue,
            },
        } as React.ChangeEvent<HTMLTextAreaElement>;

        onChange(event);
    };

    const handleAIImprove = async () => {
        if (!value.trim()) {
            toast({
                title: "Empty text",
                description: "Please enter some text to improve.",
                variant: "destructive",
            });
            return;
        }

        setIsImproving(true);
        try {
            const response = await fetch("/api/improve-text", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: value, context }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to improve text");
            }

            const event = {
                target: {
                    value: data.improvedText,
                },
            } as React.ChangeEvent<HTMLTextAreaElement>;

            onChange(event);
            toast({
                title: "Text Improved",
                description: "Your text has been refined by AI.",
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "AI Error",
                description: error instanceof Error ? error.message : "Failed to connect to AI service",
                variant: "destructive",
            });
        } finally {
            setIsImproving(false);
        }
    };

    return (
        <div className="relative group">
            <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground bg-background/80 backdrop-blur-sm border border-border/50 shadow-sm"
                    onClick={addBulletPoint}
                    title="Add bullet point"
                >
                    <List size={12} className="mr-1" /> Bullet
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs text-indigo-500 hover:text-indigo-600 bg-background/80 backdrop-blur-sm border border-indigo-200 shadow-sm"
                    onClick={handleAIImprove}
                    disabled={isImproving}
                    title="Improve with AI"
                >
                    {isImproving ? (
                        <Loader2 size={12} className="mr-1 animate-spin" />
                    ) : (
                        <Sparkles size={12} className="mr-1" />
                    )}
                    {isImproving ? "Improving..." : "AI Improve"}
                </Button>
            </div>
            <Textarea
                value={value}
                onChange={onChange}
                className={cn("min-h-[100px] pr-20 resize-y transition-colors", isImproving && "opacity-50", className)}
                disabled={isImproving}
                {...props}
            />
        </div>
    );
}
