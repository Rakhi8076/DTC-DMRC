import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
// ✅ Old static image imports
import Buses from "@/assets/3.avif"
import dtcBus from "@/assets/dtc-bus.jpg";
import metroTrain from "@/assets/metro-train.jpg";
import dtcInside from "@/assets/1.jpg";
import metroStation from "@/assets/4.png";
import metroInside from "@/assets/img 2.jpeg";


// Slides data array
const slides = [
  {id: 5, src: Buses, alt: "All buses here"},
  {id: 6, src: metroInside, alt: "Inside the metro"},
  { id: 1, src: dtcBus, alt: "DTC Bus" },
  { id: 2, src: metroTrain, alt: "Delhi Metro" },
  { id: 3, src: dtcInside || dtcBus, alt: "DTC Inside View" },
  { id: 4, src: metroStation , alt: "metro at Station"}
];

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Stats Data for Cards
  const statsData = [
    { value: "5000+", label: "DTC Buses", color: "text-secondary" },
    { value: "2000+", label: "Metro Stations", color: "text-secondary" },
    { value: "60L+", label: "Daily Riders", color: "text-secondary" },
  ];

  // Automatic Slideshow Logic
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 5000); 
    return () => clearInterval(intervalId);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    // 🛑 CHANGE 1: Full-width, high-height section for large image display
    <section className="relative w-full h-[650px] md:h-[750px] overflow-hidden">
      
      {/* 🛑 Slideshow Images Container (Covers entire section) */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover object-center" // Image fills the space
          />
          {/* Overlay for text readability (using black/50) */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* 🛑 CHANGE 2: Center-Aligned Content (Text, Buttons, Stats) */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center text-white px-4">
        
        {/* Main Text Content */}
        <div className="max-w-4xl pt-16 pb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            Welcome to <br />
            <span className="text-secondary/90">Delhi Integrated Transport</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl drop-shadow-md">
            Connecting Delhi through seamless bus and metro services. Your journey, our commitment.
          </p>
        </div>

        
        
        {/* Stats Cards (Now aligned horizontally below the content) */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-3xl absolute bottom-12 left-1/2 transform -translate-x-1/2">
          {statsData.map((stat, index) => (
            <Card key={index} className="bg-black/40 border-white/20 p-4 text-center backdrop-blur-sm text-white">
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Navigation Dots (Bottom Center) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
      </div>

    </section>
  );
};