import { Header } from "@/components/Header";
import { NewsTicker } from "@/components/NewsTicker";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NewsTicker />
      <HeroSection />
      <ServicesSection />
      <Footer />
    </div>
  );
};

export default Index;
