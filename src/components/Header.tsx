import { Leaf, Brain } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "./UserMenu";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();
  const isQuizPage = location.pathname === '/quiz';

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-foreground leading-none">
                Dravya Guna Vigyan
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                BAMS 2nd Year Flashcards
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/quiz">
              <Button 
                variant={isQuizPage ? "default" : "outline"} 
                size="sm"
                className={cn(
                  "gap-1.5",
                  !isQuizPage && "hover:bg-primary/10"
                )}
              >
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">Quiz</span>
              </Button>
            </Link>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
