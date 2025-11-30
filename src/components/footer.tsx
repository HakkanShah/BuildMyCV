"use client";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-8 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} BuildMyCV. Built with Next.js and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
