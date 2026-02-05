import { useState } from "react";
import { Menu, Leaf } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/UserMenu";
import AppSidebar from "@/components/AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background leaf-pattern">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="shrink-0"
              >
                <Menu className="w-5 h-5" />
                <span className="sr-only">Open menu</span>
              </Button>
              
              <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                  <Leaf className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="font-serif text-xl sm:text-2xl font-bold text-foreground leading-none">
                    Dravya Guna Vigyan
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    BAMS 2nd Year Flashcards
                  </p>
                </div>
              </Link>
            </div>
            
            <UserMenu />
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AppSidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      {/* Main Content */}
      <main className="container py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
