export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-foreground mb-3">
              AI Travel Planner
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Discover the world with intelligent travel planning. Create personalized itineraries that match your dreams and budget.
            </p>
          </div>
          
          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-muted-foreground hover:text-primary transition-colors">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#help" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 AI Travel Planner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}