import { Bus, Train, CreditCard, Smartphone, MapPin, Clock, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ServicesSection = () => {
  const dtcServices = [
    {
      icon: Bus,
      title: "Regular Bus Services",
      description: "Extensive network covering all areas of Delhi with comfortable and affordable transport",
    },
    {
      icon: Clock,
      title: "AC Cluster Buses",
      description: "Premium air-conditioned buses for comfortable travel across major routes",
    },
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "Track your bus location in real-time using our mobile app",
    },
    {
      icon: CreditCard,
      title: "Digital Payments",
      description: "Pay using smart cards, UPI, or mobile wallets for hassle-free travel",
    },
  ];

  const metroServices = [
    {
      icon: Train,
      title: "Metro Network",
      description: "Fast and efficient metro services connecting all major areas of Delhi NCR",
    },
    {
      icon: Smartphone,
      title: "Metro App",
      description: "Plan routes, check schedules, and buy tickets on the official DMRC app",
    },
    {
      icon: CreditCard,
      title: "Smart Card",
      description: "Use Metro Smart Card or QR tickets for seamless entry and exit",
    },
    {
      icon: Info,
      title: "Airport Express",
      description: "Direct high-speed connectivity to Indira Gandhi International Airport",
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive public transport solutions for Delhi NCR
          </p>
        </div>

        <Tabs defaultValue="dtc" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="dtc" className="flex items-center gap-2">
              <Bus className="h-4 w-4" />
              DTC Buses
            </TabsTrigger>
            <TabsTrigger value="metro" className="flex items-center gap-2">
              <Train className="h-4 w-4" />
              Delhi Metro
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dtc" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dtcServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="metro" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metroServices.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
