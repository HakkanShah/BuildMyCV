"use client";

import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function WelcomeDialog() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Check if we've already shown the welcome message in this session
        const hasShownWelcome = sessionStorage.getItem("hasShownWelcome");
        if (!hasShownWelcome) {
            setOpen(true);
            sessionStorage.setItem("hasShownWelcome", "true");
        }
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Welcome to BuildMyCV! 🚀</DialogTitle>
                    <DialogDescription className="pt-4 space-y-3 text-base text-foreground/80">
                        <p>
                            Your ultimate <strong>last-minute resume builder</strong>.
                        </p>
                        <p>
                            Created by <strong>Hakkan</strong> for students like you to craft professional resumes effortlessly.
                        </p>
                        <p>
                            Build, customize, and download in just <strong>one click</strong>!
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button onClick={() => setOpen(false)} className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                        Let's Build!
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
