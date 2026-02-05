import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  rating: number;
  review_text: string;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from("user_feedback")
          .select("id, rating, review_text")
          .eq("is_approved", true)
          .gte("rating", 4)
          .not("review_text", "is", null)
          .order("created_at", { ascending: false })
          .limit(5);

        if (error) throw error;
        setTestimonials(data || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Don't render if no approved testimonials
  if (isLoading || testimonials.length === 0) {
    return null;
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "w-4 h-4",
              star <= rating
                ? "fill-primary text-primary"
                : "text-muted-foreground/30"
            )}
          />
        ))}
      </div>
    );
  };

  // Truncate review text to 2 lines worth (approximately 120 chars)
  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
  };

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <div className="text-center mb-6">
        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-foreground mb-2">
          What BAMS students say about DravyaDeck
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base">
          Built with real feedback from Ayurveda students.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.slice(0, 3).map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-card border border-border rounded-xl p-5 relative"
          >
            <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
            <div className="space-y-3">
              {renderStars(testimonial.rating)}
              <p className="text-foreground text-sm leading-relaxed">
                "{truncateText(testimonial.review_text!)}"
              </p>
              <p className="text-xs text-muted-foreground">
                — 2nd BAMS Student
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Show additional testimonials in a simpler format if more than 3 */}
      {testimonials.length > 3 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {testimonials.slice(3, 5).map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-secondary/30 rounded-lg p-4 flex items-start gap-3"
            >
              <Quote className="w-5 h-5 text-primary/40 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-foreground text-sm">
                  "{truncateText(testimonial.review_text!, 80)}"
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {renderStars(testimonial.rating)}
                  <span className="text-xs text-muted-foreground">
                    — BAMS Student
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
