import { Button } from "@/components/ui/button";
import varanasiImage from "@/assets/varanasi-ghats-background.jpg";
import greatWallImage from "@/assets/great-wall-background.jpg";
import templeImage from "@/assets/temple-complex-background.jpg";

const destinations = [
  {
    image: varanasiImage,
    title: "Sacred Varanasi",
    subtitle: "Spiritual Journey"
  },
  {
    image: greatWallImage,
    title: "Great Wall Adventure",
    subtitle: "Historic Wonder"
  },
  {
    image: templeImage,
    title: "Ancient Temples",
    subtitle: "Cultural Discovery"
  }
];

interface ExamplesProps {
  onPlanTrip: () => void;
}

export function Examples({ onPlanTrip }: ExamplesProps) {
  return (
    <section className="py-20 bg-background" aria-labelledby="examples-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="examples-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Discover Amazing Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From ancient wonders to modern marvels, let AI craft your perfect journey to any destination.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div 
              key={index}
              className="relative group overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
              style={{
                backgroundImage: `url(${destination.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onClick={onPlanTrip}
              role="button"
              tabIndex={0}
              aria-label={`Plan a trip to ${destination.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPlanTrip();
                }
              }}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium text-white/80 mb-1">
                    {destination.subtitle}
                  </p>
                  <h3 className="text-2xl font-bold mb-4">
                    {destination.title}
                  </h3>
                  
                  <Button 
                    variant="cta" 
                    size="sm"
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlanTrip();
                    }}
                    aria-label={`Create your perfect trip to ${destination.title}`}
                  >
                    Create Your Perfect Trip
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}