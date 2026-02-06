import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock, BookOpen, GraduationCap } from "lucide-react";

interface SignupWallProps {
  vyadhiName?: string;
  onClose?: () => void;
}

const SignupWall = ({ vyadhiName, onClose }: SignupWallProps) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-xl shadow-lg max-w-md w-full p-6 animate-fade-in">
        {/* Lock Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Lock className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Header */}
        <h2 className="font-serif text-xl font-bold text-center text-foreground mb-2">
          {vyadhiName ? `Unlock ${vyadhiName}` : "Unlock Full Access"}
        </h2>

        {/* Academic Message */}
        <p className="text-center text-muted-foreground text-sm mb-6">
          This Vyadhi deck is part of Roga Nidhana – Part 2 (NCISM).
          Sign up to access complete Vyadhi-wise flashcards, Samprapti flows,
          exam-oriented answers, and standard textbook references.
        </p>

        {/* Features */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-sm text-foreground">
            <BookOpen className="w-4 h-4 text-primary flex-shrink-0" />
            <span>200+ NCISM-aligned flashcards</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-foreground">
            <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
            <span>20 Vyadhi topics with Samprapti flows</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Link to="/signup" className="block">
            <Button className="w-full" size="lg">
              Sign up with Email
            </Button>
          </Link>
          <Link to="/login" className="block">
            <Button variant="outline" className="w-full" size="lg">
              Already have an account? Log in
            </Button>
          </Link>
        </div>

        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Continue browsing
          </button>
        )}
      </div>
    </div>
  );
};

export default SignupWall;
