import AppLayout from "@/components/AppLayout";
import { CreditCard } from "lucide-react";

const PhysicalCardsPage = () => {
  return (
    <AppLayout>
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <CreditCard className="w-20 h-20 text-muted-foreground mb-6" />
        
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
          PHYSICAL FLASHCARDS — COMING SOON
        </h2>
        
        <p className="text-muted-foreground max-w-md">
          Printed, exam-focused Dravya Guna flashcards for BAMS students.
        </p>
      </section>
    </AppLayout>
  );
};

export default PhysicalCardsPage;
