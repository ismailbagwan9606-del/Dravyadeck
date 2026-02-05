import { useState } from "react";
import { Flashcard as FlashcardType } from "@/data/flashcards";
 import { getDrugImageUrl } from "@/data/drugImages";
 import { RotateCw, Leaf } from "lucide-react";
 import { AspectRatio } from "@/components/ui/aspect-ratio";
 import { Skeleton } from "@/components/ui/skeleton";

interface FlashcardProps {
  card: FlashcardType;
}

const Flashcard = ({ card }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
   const [imageLoaded, setImageLoaded] = useState(false);
   const [imageError, setImageError] = useState(false);
 
   // Get image URL from card data or from the drug images mapping
   const imageUrl = card.imageUrl || getDrugImageUrl(card.id);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
       className="flashcard-container w-full h-[480px] sm:h-[460px] cursor-pointer group"
      onClick={handleFlip}
    >
      <div className={`flashcard relative w-full h-full ${isFlipped ? "flipped" : ""}`}>
        {/* Front Side */}
        <div className="flashcard-face absolute inset-0 bg-card rounded-lg shadow-card border border-border overflow-hidden transition-shadow duration-300 group-hover:shadow-card-hover">
          <div className="h-full flex flex-col">
             {/* Drug Image */}
             <div className="relative w-full">
               <AspectRatio ratio={4 / 3} className="bg-muted">
                 {imageUrl && !imageError ? (
                   <>
                     {!imageLoaded && (
                       <Skeleton className="absolute inset-0 w-full h-full" />
                     )}
                     <img
                       src={imageUrl}
                       alt={`${card.front.sanskritName} - ${card.front.usefulPart}`}
                       className={`w-full h-full object-cover transition-opacity duration-300 ${
                         imageLoaded ? "opacity-100" : "opacity-0"
                       }`}
                       loading="lazy"
                       crossOrigin="anonymous"
                       onLoad={() => setImageLoaded(true)}
                       onError={() => setImageError(true)}
                     />
                   </>
                 ) : (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 gap-2">
                     <Leaf className="w-12 h-12 text-primary/30" />
                     <span className="text-xs text-muted-foreground text-center px-4">
                       Authentic drug-part image coming soon
                     </span>
                   </div>
                 )}
                 {/* Category Badge Overlay */}
                 <div className="absolute top-2 left-2">
                   <span className="inline-block px-2 py-0.5 text-xs font-medium bg-background/90 text-foreground rounded-full shadow-sm backdrop-blur-sm">
                     {card.category}
                   </span>
                 </div>
               </AspectRatio>
            </div>

            {/* Sanskrit Name */}
             <div className="px-4 pt-3 pb-1">
              <h2 className="sanskrit-text text-xl sm:text-2xl text-primary leading-tight">
                {card.front.sanskritName}
              </h2>
              <p className="text-xs text-muted-foreground italic mt-0.5">
                {card.front.latinName}
              </p>
            </div>

            {/* Details */}
             <div className="flex-1 px-4 pb-2 space-y-1.5 overflow-hidden">
              <div className="space-y-1">
                <DetailRow label="Family" value={card.front.family} />
                <DetailRow label="Common Name" value={card.front.commonName} />
                <DetailRow label="Useful Part" value={card.front.usefulPart} />
              </div>
            </div>

            {/* Flip Hint */}
            <div className="px-4 pb-3 flex items-center justify-center gap-2 text-muted-foreground text-xs">
              <RotateCw className="w-3 h-3" />
              <span>Tap to revise exam properties</span>
            </div>
          </div>

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-sage/30 rounded-tr-lg" />
          </div>
        </div>

        {/* Back Side */}
        <div className="flashcard-face flashcard-back absolute inset-0 bg-primary rounded-lg shadow-card overflow-hidden">
          <div className="h-full flex flex-col text-primary-foreground">
            {/* Header */}
            <div className="px-4 pt-4 pb-2 border-b border-primary-foreground/20">
              <h3 className="font-serif text-lg font-semibold">
                {card.front.sanskritName}
              </h3>
              <p className="text-xs text-primary-foreground/70">
                Pharmacological Properties
              </p>
            </div>

            {/* Properties Grid */}
            <div className="flex-1 px-4 py-3 overflow-y-auto">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <PropertyItem label="Rasa" value={card.back.rasa} />
                <PropertyItem label="Guna" value={card.back.guna} />
                <PropertyItem label="Virya" value={card.back.virya} />
                <PropertyItem label="Vipaka" value={card.back.vipaka} />
              </div>

              <div className="mt-3 pt-3 border-t border-primary-foreground/20 space-y-2">
                <PropertyRow label="Prabhava" value={card.back.prabhava} />
                <PropertyRow label="Dosha Karma" value={card.back.doshaKarma} />
                <PropertyRow label="Key Karma" value={card.back.importantKarma} />
                <PropertyRow label="Prayoga" value={card.back.prayoga} />
              </div>

              <div className="mt-3 pt-3 border-t border-primary-foreground/20">
                <p className="text-xs font-medium text-primary-foreground/70 mb-1">
                  Classical Formulations
                </p>
                <div className="flex flex-wrap gap-1">
                  {card.back.classicalFormulations.map((formula, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-0.5 bg-primary-foreground/10 rounded text-xs"
                    >
                      {formula}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Flip Hint */}
            <div className="px-4 pb-3 flex items-center justify-center gap-2 text-primary-foreground/60 text-sm">
              <RotateCw className="w-4 h-4" />
              <span>Tap to flip back</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start gap-2">
    <span className="text-xs font-medium text-muted-foreground min-w-[70px]">
      {label}:
    </span>
    <span className="text-xs text-foreground line-clamp-2">{value}</span>
  </div>
);

const PropertyItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs font-medium text-primary-foreground/70">{label}</p>
    <p className="text-xs leading-tight">{value}</p>
  </div>
);

const PropertyRow = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs font-medium text-primary-foreground/70">{label}</p>
    <p className="text-xs leading-tight">{value}</p>
  </div>
);

export default Flashcard;
