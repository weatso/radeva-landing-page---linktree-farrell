import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import Portfolio from "@/components/home/Portfolio";
import SocialProof from "@/components/layout/SocialProof";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <SocialProof />
    </div>
  );
}