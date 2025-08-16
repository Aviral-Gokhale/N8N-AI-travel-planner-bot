import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Examples } from "@/components/Examples";
import { Footer } from "@/components/Footer";
import { TripPlanningDialog } from "@/components/TripPlanningDialog";

const Index = () => {
  const [isPlanningDialogOpen, setIsPlanningDialogOpen] = useState(false);

  const openPlanningDialog = () => {
    setIsPlanningDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onPlanTrip={openPlanningDialog} />
      <Features />
      <Examples onPlanTrip={openPlanningDialog} />
      <Footer />
      
      <TripPlanningDialog 
        open={isPlanningDialogOpen}
        onOpenChange={setIsPlanningDialogOpen}
      />
    </div>
  );
};

export default Index;