import Navbar from "@/components/layout/Navbar"; // Import Navbar
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Navbar /> {/* Pasang Navbar di sini, di atas Main */}
      <main className="relative min-h-screen w-full bg-noise">
        {children}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
