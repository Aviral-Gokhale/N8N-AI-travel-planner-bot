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
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-hero leading-tight">
                Your AI Travel Planner
              </h1>
              <p className="text-lg sm:text-xl text-text-hero/90 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Create personalized itineraries tailored to your dreams. Stress-free planning powered by intelligent AI.
              </p>
            </div>
            
            <div className="flex justify-center lg:justify-start">
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
          
          {/* Right Column - Phone Mockup */}
          <div className="flex justify-center lg:justify-end order-first lg:order-last">
            <div className="relative">
              <img 
                src="/lovable-uploads/161bfe35-e03f-4594-bfcf-080b108d4bfc.png"
                alt="Travel planning on laptop in beautiful natural setting"
                className="w-64 sm:w-80 lg:w-96 h-auto object-contain drop-shadow-2xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}