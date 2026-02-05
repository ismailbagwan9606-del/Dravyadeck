import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Layers,
  Stethoscope,
  Brain,
  TrendingUp,
  Bookmark,
  GitCompare,
  MessageSquare,
  Calendar,
  CreditCard,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface AppSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Dravya Guna", url: "/flashcards", icon: Layers },
  { title: "Roga Nidana", url: "/roga-nidana", icon: Stethoscope },
  { title: "Quiz Mode", url: "/quiz", icon: Brain },
  { title: "Roga Nidana Quiz", url: "/roga-nidana-quiz", icon: Stethoscope },
  { title: "Progress", url: "/progress", icon: TrendingUp },
  { title: "Bookmarks", url: "/bookmarks", icon: Bookmark },
  { title: "Compare Dravyas", url: "/compare", icon: GitCompare },
  { title: "Viva Mode", url: "/viva", icon: MessageSquare },
  { title: "Daily Revision", url: "/daily-revision", icon: Calendar },
  { title: "Physical Cards", url: "/physical-cards", icon: CreditCard },
  { title: "Profile Settings", url: "/profile", icon: Settings },
];

const AppSidebar = ({ open, onOpenChange }: AppSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (url: string) => {
    navigate(url);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] p-0 bg-card border-r border-border">
        <SheetHeader className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-serif text-lg text-foreground">
              DravyaDeck
            </SheetTitle>
          </div>
        </SheetHeader>
        
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.url;
            const Icon = item.icon;
            
            return (
              <button
                key={item.url}
                onClick={() => handleNavigate(item.url)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left w-full",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <p className="text-xs text-muted-foreground text-center">
            Made with 🌿 for BAMS students
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AppSidebar;
