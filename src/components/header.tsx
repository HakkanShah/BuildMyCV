"use client";

import { ThemeToggle } from "./theme-toggle";

// The "export" keyword was likely missing.
export function Header() {
  return (
    <header className="py-4 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">BuildMyCV</h1>
        <p className="text-muted-foreground">
          Create your professional CV with ease.
        </p>
      </div>
      <ThemeToggle />
    </header>
  );
}
