"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function RichTextarea({ value, onChange, className, ...props }: RichTextareaProps) {
    const addBulletPoint = () => {
        const lines = value.split("\n");
        const lastLine = lines[lines.length - 1];

        let newValue = value;
        if (value === "" || lastLine.trim() === "") {
            newValue += "• ";
        } else {
            newValue += "\n• ";
        }

        // Create a synthetic event to trigger onChange
        const event = {
            target: {
                value: newValue,
            },
        } as React.ChangeEvent<HTMLTextAreaElement>;

        onChange(event);
    };

    return (
        <div className="relative">
            <div className="absolute top-2 right-2 z-10">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground bg-background/50 backdrop-blur-sm border border-border/50 shadow-sm"
                    onClick={addBulletPoint}
                    title="Add bullet point"
                >
                    <List size={12} className="mr-1" /> Bullet
                </Button>
            </div>
            <Textarea
                value={value}
                onChange={onChange}
                className={cn("min-h-[100px] pr-20 resize-y", className)}
                {...props}
            />
        </div>
    );
}
