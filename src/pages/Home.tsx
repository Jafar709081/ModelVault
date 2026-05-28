import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/features/HeroSection";
import StatsBar from "@/components/features/StatsBar";
import FeaturedProjects from "@/components/features/FeaturedProjects";
import HowItWorks from "@/components/features/HowItWorks";
import Categories from "@/components/features/Categories";
import Footer from "@/components/layout/Footer";
import VaultBackground from "@/components/features/VaultBackground";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="page-root min-h-screen">
      {/* 3D Vault animated canvas background */}
      <VaultBackground />
      <Navbar />
      <main>
        <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <StatsBar />
        <hr className="gradient-divider" />
        <FeaturedProjects searchQuery={searchQuery} />
        <HowItWorks />
        <hr className="gradient-divider" />
        <Categories />
      </main>
      <Footer />
    </div>
  );
}
