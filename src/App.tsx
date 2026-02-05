import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Quiz from "./pages/Quiz";
import RogaNidanaQuiz from "./pages/RogaNidanaQuiz";
import Profile from "./pages/Profile";
import Flashcards from "./pages/Flashcards";
import RogaNidana from "./pages/RogaNidana";
import ProgressPage from "./pages/Progress";
import BookmarksPage from "./pages/Bookmarks";
import ComparePage from "./pages/Compare";
import VivaModePage from "./pages/VivaMode";
import DailyRevisionPage from "./pages/DailyRevision";
import PhysicalCardsPage from "./pages/PhysicalCards";
import ShareDravya from "./pages/ShareDravya";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/roga-nidana" element={<RogaNidana />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/roga-nidana-quiz" element={<RogaNidanaQuiz />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/viva" element={<VivaModePage />} />
            <Route path="/daily-revision" element={<DailyRevisionPage />} />
            <Route path="/physical-cards" element={<PhysicalCardsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/share/dravya/:token" element={<ShareDravya />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
