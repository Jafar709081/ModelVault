import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/features/HeroSection";
import StatsBar from "@/components/features/StatsBar";
import FeaturedProjects from "@/components/features/FeaturedProjects";
import HowItWorks from "@/components/features/HowItWorks";
import Categories from "@/components/features/Categories";
import Footer from "@/components/layout/Footer";
import StarBackground from "@/components/features/StarBackground";

export default function Home() {
  return (
    <div className="bg-gradient-radial min-h-screen" style={{ backgroundColor: "#0a0a0a" }}>
      <StarBackground />
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <hr className="gradient-divider" />
        <FeaturedProjects />
        <HowItWorks />
        <hr className="gradient-divider" />
        <Categories />
      </main>
      <Footer />
    </div>
  );
}
