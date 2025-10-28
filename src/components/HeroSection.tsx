import { Bus, Train, Navigation, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import dtcBus from "@/assets/dtc-bus.jpg";
import metroTrain from "@/assets/metro-train.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Welcome to<br />
              <span className="text-secondary">Delhi Integrated Transport</span>
            </h1>
            <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
              Connecting Delhi through seamless bus and metro services. Your journey, our commitment.
            </p>
            
            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" variant="secondary" className="font-semibold">
                <Navigation className="mr-2 h-5 w-5" />
                Plan Your Journey
              </Button>
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20">
                <Clock className="mr-2 h-5 w-5" />
                Live Tracking
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-secondary">5000+</div>
                <div className="text-sm text-primary-foreground/80">DTC Buses</div>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-secondary">250+</div>
                <div className="text-sm text-primary-foreground/80">Metro Stations</div>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 p-4 text-center backdrop-blur-sm">
                <div className="text-2xl font-bold text-secondary">60L+</div>
                <div className="text-sm text-primary-foreground/80">Daily Riders</div>
              </Card>
            </div>
          </div>

          {/* Right Images */}
          <div className="relative h-[500px] animate-slide-up hidden md:block">
            <div className="absolute top-0 right-0 w-[85%] h-[45%] rounded-lg overflow-hidden shadow-2xl border-4 border-primary-foreground/20">
              <img src={dtcBus} alt="DTC Bus" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 left-0 w-[85%] h-[45%] rounded-lg overflow-hidden shadow-2xl border-4 border-primary-foreground/20">
              <img src={metroTrain} alt="Delhi Metro" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
