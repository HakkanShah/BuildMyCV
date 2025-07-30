"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";

// This component is a "Client Component" because of the "use client" directive.
// It is now safe to use next/dynamic with ssr: false here.
const CVContainer = dynamic(
  () => import("@/components/cv-container"),
  {
    ssr: false,
    // Display a loading skeleton while the main component is being loaded on the client.
    loading: () => (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-8">
        <div className="col-span-1 flex flex-col gap-4">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-[600px]" />
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="w-full h-[800px]" />
        </div>
      </div>
    ),
  }
);

// This loader component simply returns the dynamically loaded CVContainer.
export default function CVLoader() {
  return <CVContainer />;
}
