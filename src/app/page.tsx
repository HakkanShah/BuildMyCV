import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

// Dynamically import the main CVContainer with SSR turned off.
// This is the most robust way to ensure that none of the interactive components
// or client-side libraries are executed during the server-side build process.
const CVContainer = dynamic(
  () => import("@/components/cv-container"),
  {
    ssr: false,
    // Display a loading skeleton while the main component is being loaded on the client.
    // This provides a better user experience on initial page load.
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

export default function Home() {
  return (
    <main className="container mx-auto">
      <Header />
      <CVContainer />
      <Footer />
    </main>
  );
}
