import { Button } from "@/components/ui/button";
import varanasiImage from "@/assets/varanasi-ghats-background.jpg";

interface HeroProps {
  onPlanTrip: () => void;
}

export function Hero({ onPlanTrip }: HeroProps) {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${varanasiImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
      aria-label="Hero section with travel planning call to action"
    >
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-hero leading-tight">
                Your AI Travel Planner
              </h1>
              <p className="text-lg sm:text-xl text-text-hero/90 max-w-lg mx-auto leading-relaxed">
                Create personalized itineraries tailored to your dreams. Stress-free planning powered by intelligent AI.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button 
                variant="hero" 
                size="lg"
                onClick={onPlanTrip}
                className="text-lg px-8 py-4 h-auto"
                aria-label="Start planning your trip"
              >
                Start Planning
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}