import { useState } from "react";
import { Star, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const featureOptions = [
  { id: "quiz", label: "Quiz mode for Dravya Guna" },
  { id: "physical", label: "Physical flashcards" },
  { id: "rasa-shastra", label: "Rasa Shastra flashcards" },
  { id: "agad-tantra", label: "Agad Tantra" },
  { id: "kriya-sharira", label: "Kriya Sharira" },
];

const FeedbackForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [otherFeature, setOtherFeature] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Require authentication to submit feedback (prevents spam)
  if (!user) {
    return (
      <section className="mt-12 pt-8 border-t border-border">
        <div className="max-w-xl mx-auto text-center py-8">
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-2">
            Help us improve DravyaDeck
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base mb-4">
            Sign in to share your feedback and help us build better exam-focused tools.
          </p>
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Sign In to Give Feedback
          </a>
        </div>
      </section>
    );
  }

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Combine selected features and other feature into a single string
      const allFeatures = [...selectedFeatures];
      if (otherFeature.trim()) {
        allFeatures.push(`other: ${otherFeature.trim()}`);
      }

      const { error } = await supabase.from("user_feedback").insert({
        user_id: user.id,
        rating,
        review_text: feedback.trim() || null,
        requested_feature: allFeatures.length > 0 ? allFeatures.join(", ") : null,
        feedback_type: "general",
      });

      if (error) throw error;

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="mt-12 pt-8 border-t border-border">
        <div className="max-w-xl mx-auto text-center py-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
            Thank you for helping improve DravyaDeck.
          </h3>
          <p className="text-muted-foreground">
            Your input helps us create better exam tools for BAMS students.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-6">
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-2">
            Help us improve DravyaDeck
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Your feedback helps us build better exam-focused tools for BAMS students.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">How would you rate DravyaDeck?</Label>
            <div className="flex gap-1 justify-center sm:justify-start">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                >
                  <Star
                    className={cn(
                      "w-8 h-8 transition-colors",
                      (hoveredRating || rating) >= star
                        ? "fill-primary text-primary"
                        : "text-muted-foreground/40"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text */}
          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-sm font-medium">
              Share your thoughts (optional)
            </Label>
            <Textarea
              id="feedback"
              placeholder="What do you like? What could be better?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px] resize-none"
              maxLength={500}
            />
          </div>

          {/* Feature Requests */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              What would you like us to add next?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {featureOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                >
                  <Checkbox
                    id={option.id}
                    checked={selectedFeatures.includes(option.id)}
                    onCheckedChange={() => handleFeatureToggle(option.id)}
                  />
                  <Label
                    htmlFor={option.id}
                    className="text-sm cursor-pointer flex-1"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <Label htmlFor="other" className="text-sm font-medium mb-2 block">
                Something else?
              </Label>
              <Textarea
                id="other"
                placeholder="Tell us what you'd like to see..."
                value={otherFeature}
                onChange={(e) => setOtherFeature(e.target.value)}
                className="min-h-[60px] resize-none"
                maxLength={200}
              />
            </div>
          </div>

          {/* Privacy Note */}
          <p className="text-xs text-muted-foreground">
            Your feedback may be displayed anonymously to help other students.
          </p>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isSubmitting || rating === 0}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Feedback
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default FeedbackForm;
