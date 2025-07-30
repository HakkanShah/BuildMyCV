import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import CVLoader from "@/components/cv-loader";

export default function Home() {
  return (
    <main className="container mx-auto">
      <Header />
      {/* We are now rendering the CVLoader component that you just created.
        This component is a "Client Component" and is responsible for 
        dynamically loading the main CVContainer. This architecture resolves 
        the Next.js build error by separating server and client logic.
      */}
      <CVLoader />
      <Footer />
    </main>
  );
}
