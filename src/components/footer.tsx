export function AppFooter() {
  return (
    <footer className="sticky bottom-0 z-50 w-full border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col sm:flex-row h-16 items-center justify-between px-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          Made with ❤️ by{" "}
          <a
            href="https://github.com/HakkanShah"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-primary"
          >
            @HakkanShah
          </a>{" "}
          <be>© 2025 BuildMyCV
        </p>
        <div className="mt-2 sm:mt-0 flex gap-4">
          <a
            href="https://github.com/HakkanShah"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
              className="w-5 h-5"
            />
          </a>
          <a
            href="https://linkedin.com/in/Hakkan"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-70 hover:opacity-100 transition"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
              alt="LinkedIn"
              className="w-5 h-5"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}