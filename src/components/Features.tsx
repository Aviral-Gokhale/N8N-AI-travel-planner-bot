import brainIcon from "@/assets/icon-brain.jpg";
import globeIcon from "@/assets/icon-globe.jpg";
import hourglassIcon from "@/assets/icon-hourglass.jpg";
import microphoneIcon from "@/assets/icon-microphone.jpg";

const features = [
  {
    icon: brainIcon,
    title: "AI-Powered Intelligence",
    description: "Smart algorithms learn your preferences to create perfectly tailored travel experiences."
  },
  {
    icon: globeIcon,
    title: "Global Destinations",
    description: "Explore thousands of destinations worldwide with local insights and hidden gems."
  },
  {
    icon: hourglassIcon,
    title: "Save Time & Stress",
    description: "Let AI handle the research and planning while you focus on the excitement of travel."
  },
];

export function Features() {
  return (
    <section className="py-20 bg-muted" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose Our AI Travel Planner
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of travel planning with intelligent features designed for modern explorers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-surface-elevated rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <img 
                    src={feature.icon}
                    alt={`${feature.title} icon`}
                    className="w-8 h-8 object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}