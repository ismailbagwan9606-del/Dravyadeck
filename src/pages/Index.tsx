import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, Brain, Calendar, Bookmark, GitCompare, MessageSquare, Stethoscope } from "lucide-react";
import { flashcards } from "@/data/flashcards";
import { rogaNidanaFlashcards } from "@/data/rogaNidanaData";
import { useAuth } from "@/contexts/AuthContext";
import TestimonialsSection from "@/components/TestimonialsSection";
import FeedbackForm from "@/components/FeedbackForm";
import RogaNidanaHomePreview from "@/components/roga-nidana/RogaNidanaHomePreview";
const features = [{
  title: "Dravya Guna Flashcards",
  description: `${flashcards.length} exam-focused dravya cards with flip interaction`,
  icon: Layers,
  href: "/flashcards",
  primary: true
}, {
  title: "Roga Nidana Flashcards",
  description: `${rogaNidanaFlashcards.length}+ NCISM-aligned Vyadhi Vigyan cards`,
  icon: Stethoscope,
  href: "/roga-nidana",
  primary: true
}, {
  title: "Quiz Mode",
  description: "Test your knowledge with MCQs and instant feedback",
  icon: Brain,
  href: "/quiz",
  primary: true
}, {
  title: "Daily Revision",
  description: "5 dravyas daily for consistent study habits",
  icon: Calendar,
  href: "/daily-revision",
  primary: false
}, {
  title: "Bookmarks",
  description: "Save dravyas for focused revision",
  icon: Bookmark,
  href: "/bookmarks"
}, {
  title: "Compare Dravyas",
  description: "Side-by-side property comparison",
  icon: GitCompare,
  href: "/compare"
}, {
  title: "Viva Mode",
  description: "Oral exam practice with think-first reveal",
  icon: MessageSquare,
  href: "/viva"
}];
const Index = () => {
  const {
    user
  } = useAuth();
  return <AppLayout>
      {/* Hero Section */}
      <section className="text-center mb-10">
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-foreground mb-3">
          Exam-focused Dravya Guna flashcards for 2nd BAMS students
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base mb-6">
          Rasa, Guna, Virya, Vipaka, Dosha Karma — simplified for fast recall and revision. 
          Master all {flashcards.length} dravyas with structured learning tools.
        </p>
        
        {!user && <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/flashcards">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <Layers className="w-5 h-5" />
                Start Learning
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Create Free Account
              </Button>
            </Link>
          </div>}
        
        {user && <Link to="/flashcards">
            <Button size="lg" className="gap-2">
              <Layers className="w-5 h-5" />
              Continue Learning
            </Button>
          </Link>}
      </section>

      {/* Features Grid */}
      <section className="mb-12">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-4 text-center">
          Everything you need for Dravya Guna Vigyan
        </h3>
        
        {/* Primary Features */}
        <div className="grid gap-4 sm:grid-cols-3 mb-4">
          {features.filter(f => f.primary).map(feature => {
          const Icon = feature.icon;
          return <Link key={feature.href} to={feature.href}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-primary rounded-lg">
                        <Icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <h4 className="font-serif font-semibold text-foreground">
                        {feature.title}
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>;
        })}
        </div>

        {/* Secondary Features */}
        <div className="grid gap-4 sm:grid-cols-3">
          {features.filter(f => !f.primary).map(feature => {
          const Icon = feature.icon;
          return <Link key={feature.href} to={feature.href}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-secondary rounded-lg">
                        <Icon className="w-5 h-5 text-foreground" />
                      </div>
                      <h4 className="font-serif font-semibold text-foreground">
                        {feature.title}
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>;
        })}
        </div>
      </section>

      {/* Roga Nidana Preview (for guests) */}
      {!user && <RogaNidanaHomePreview />}

      {/* Stats Section */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 text-center">
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-2xl sm:text-3xl font-bold text-primary">{flashcards.length}</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Dravyas</p>
        </div>
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-2xl sm:text-3xl font-bold text-primary">{rogaNidanaFlashcards.length}+</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Vyadhi Cards</p>
        </div>
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-2xl sm:text-3xl font-bold text-primary">20</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Vyadhi Topics</p>
        </div>
        <div className="p-4 bg-card rounded-lg border border-border">
          <p className="text-2xl sm:text-3xl font-bold text-primary">7</p>
          <p className="text-xs sm:text-sm text-muted-foreground">Study Modes</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Feedback Form */}
      <FeedbackForm />

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">Made with 🌿 for BAMS students</p>
        <p className="text-xs text-muted-foreground mt-1">Data sourced from classical Ayurvedic texts
as per NCISM</p>
      </footer>
    </AppLayout>;
};
export default Index;
