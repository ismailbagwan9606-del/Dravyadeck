import React from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuestLimitBannerProps {
  totalCards: number;
  visibleCards: number;
}

const GuestLimitBanner: React.FC<GuestLimitBannerProps> = ({
  totalCards,
  visibleCards,
}) => {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-xl p-6 text-center mb-6">
      <div className="flex justify-center mb-3">
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
          <Lock className="w-6 h-6 text-primary" />
        </div>
      </div>
      <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
        Unlock complete Dravya Guna revision for exams
      </h3>
      <p className="text-muted-foreground mb-3 max-w-md mx-auto">
        Access all {totalCards} NCISM-aligned drugs with exam-ready properties, karma, and uses — designed specifically for 2nd BAMS students.
      </p>
      <div className="flex gap-3 justify-center mb-3">
        <Button asChild>
          <Link to="/signup">Start Free Revision</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/login">Sign In</Link>
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Trusted by 60+ BAMS students
      </p>
    </div>
  );
};

export default GuestLimitBanner;
