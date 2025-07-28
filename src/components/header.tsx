import { FileText } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <FileText className="h-6 w-6 mr-2" />
          <a href="/" className="font-bold text-lg">
            BuildMyCV
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
