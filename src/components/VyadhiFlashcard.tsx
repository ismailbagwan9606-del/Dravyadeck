import { useState } from "react";
import { VyadhiFlashcard as VyadhiFlashcardType } from "@/data/vyadhiVigyan";
import { RotateCw, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface VyadhiFlashcardProps {
  card: VyadhiFlashcardType;
}

const VyadhiFlashcard = ({ card }: VyadhiFlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setExpandedSections([]);
  };

  const toggleSection = (section: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const isSectionExpanded = (section: string) =>
    expandedSections.includes(section);

  return (
    <div
      className="flashcard-container w-full h-[520px] cursor-pointer group"
      onClick={handleFlip}
    >
      <div
        className={`flashcard relative w-full h-full ${isFlipped ? "flipped" : ""}`}
      >
        {/* Front Side */}
        <div className="flashcard-face absolute inset-0 bg-card rounded-lg shadow-card border border-border overflow-hidden transition-shadow duration-300 group-hover:shadow-card-hover">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-4 pt-4 flex items-center justify-between">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                {card.category}
              </span>
            </div>

            {/* Vyadhi Name */}
            <div className="px-4 pt-4 pb-2">
              <h2 className="sanskrit-text text-2xl sm:text-3xl text-primary leading-tight">
                {card.vyadhiName}
              </h2>
            </div>

            {/* Paribhasha */}
            <div className="px-4 pb-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                Paribhasha (Definition)
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {card.paribhasha}
              </p>
            </div>

            {/* Nidana Preview */}
            <div className="flex-1 px-4 pb-3 space-y-2 overflow-y-auto">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Key Nidana (Causes)
                </p>
                <div className="flex flex-wrap gap-1">
                  {card.nidana.ahara.slice(0, 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 bg-secondary rounded"
                    >
                      {item}
                    </span>
                  ))}
                  {card.nidana.ahara.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{card.nidana.ahara.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Exam Memory Key */}
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-medium text-primary mb-1">
                  📝 Exam Memory Key
                </p>
                <p className="text-xs text-foreground italic">
                  {card.examMemoryKey}
                </p>
              </div>
            </div>

            {/* Flip Hint */}
            <div className="px-4 pb-4 flex items-center justify-center gap-2 text-muted-foreground text-sm">
              <RotateCw className="w-4 h-4" />
              <span>Tap for complete Nidana Panchaka</span>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="flashcard-face flashcard-back absolute inset-0 bg-primary rounded-lg shadow-card overflow-hidden">
          <div className="h-full flex flex-col text-primary-foreground overflow-y-auto">
            {/* Header */}
            <div className="px-4 pt-4 pb-2 border-b border-primary-foreground/20 sticky top-0 bg-primary z-10">
              <h3 className="font-serif text-lg font-semibold">
                {card.vyadhiName}
              </h3>
              <p className="text-xs text-primary-foreground/70">
                Nidana Panchaka & Classifications
              </p>
            </div>

            {/* Scrollable Content */}
            <div
              className="flex-1 px-4 py-3 space-y-3 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Nidana Section */}
              <CollapsibleSection
                title="Nidana (Etiological Factors)"
                isExpanded={isSectionExpanded("nidana")}
                onToggle={(e) => toggleSection("nidana", e)}
              >
                <div className="space-y-2">
                  <div>
                    <p className="text-xs font-semibold text-primary-foreground/80">
                      Ahara:
                    </p>
                    <ul className="text-xs list-disc list-inside">
                      {card.nidana.ahara.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary-foreground/80">
                      Vihara:
                    </p>
                    <ul className="text-xs list-disc list-inside">
                      {card.nidana.vihara.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  {card.nidana.manasika && card.nidana.manasika.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-primary-foreground/80">
                        Manasika:
                      </p>
                      <ul className="text-xs list-disc list-inside">
                        {card.nidana.manasika.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CollapsibleSection>

              {/* Poorva Rupa */}
              <CollapsibleSection
                title="Poorva Rupa (Prodromal Symptoms)"
                isExpanded={isSectionExpanded("poorvarupa")}
                onToggle={(e) => toggleSection("poorvarupa", e)}
              >
                <ul className="text-xs list-disc list-inside">
                  {card.poorvaRupa.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </CollapsibleSection>

              {/* Rupa */}
              <CollapsibleSection
                title="Rupa (Cardinal Features)"
                isExpanded={isSectionExpanded("rupa")}
                onToggle={(e) => toggleSection("rupa", e)}
              >
                <ul className="text-xs list-disc list-inside">
                  {card.rupa.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </CollapsibleSection>

              {/* Samprapti */}
              <CollapsibleSection
                title="Samprapti (Pathogenesis)"
                isExpanded={isSectionExpanded("samprapti")}
                onToggle={(e) => toggleSection("samprapti", e)}
              >
                <div className="grid grid-cols-1 gap-1 text-xs">
                  <SampraptiItem
                    label="Dosha Pradhanyata"
                    value={card.samprapti.doshaPradhanyata}
                  />
                  <SampraptiItem label="Dushya" value={card.samprapti.dushya} />
                  <SampraptiItem
                    label="Agni Status"
                    value={card.samprapti.agniStatus}
                  />
                  <SampraptiItem
                    label="Srotas"
                    value={card.samprapti.srotasInvolvement}
                  />
                  <SampraptiItem
                    label="Srotodushti"
                    value={card.samprapti.srotodushtiPrakara}
                  />
                  <SampraptiItem
                    label="Udbhava Sthana"
                    value={card.samprapti.udbhavaSthana}
                  />
                  <SampraptiItem
                    label="Sanchara"
                    value={card.samprapti.sanchara}
                  />
                  <SampraptiItem
                    label="Vyakti Sthana"
                    value={card.samprapti.vyaktiSthana}
                  />
                  {card.samprapti.bhedaSthana && (
                    <SampraptiItem
                      label="Bheda Sthana"
                      value={card.samprapti.bhedaSthana}
                    />
                  )}
                </div>
              </CollapsibleSection>

              {/* Bheda */}
              <CollapsibleSection
                title="Bheda (Classification)"
                isExpanded={isSectionExpanded("bheda")}
                onToggle={(e) => toggleSection("bheda", e)}
              >
                <ul className="text-xs list-disc list-inside">
                  {card.bheda.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </CollapsibleSection>

              {/* Upadrava */}
              <CollapsibleSection
                title="Upadrava (Complications)"
                isExpanded={isSectionExpanded("upadrava")}
                onToggle={(e) => toggleSection("upadrava", e)}
              >
                <div className="flex flex-wrap gap-1">
                  {card.upadrava.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 bg-primary-foreground/10 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CollapsibleSection>

              {/* Sadhya-Asadhyata */}
              <div className="pt-2 border-t border-primary-foreground/20">
                <p className="text-xs font-semibold text-primary-foreground/80 mb-1">
                  Sadhya-Asadhyata (Prognosis)
                </p>
                <p className="text-xs">{card.sadhyaAsadhyata}</p>
              </div>
            </div>

            {/* Flip Hint */}
            <div className="px-4 pb-3 flex items-center justify-center gap-2 text-primary-foreground/60 text-sm sticky bottom-0 bg-primary">
              <RotateCw className="w-4 h-4" />
              <span>Tap to flip back</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CollapsibleSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

const CollapsibleSection = ({
  title,
  isExpanded,
  onToggle,
  children,
}: CollapsibleSectionProps) => (
  <div className="border-b border-primary-foreground/20 pb-2">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left"
    >
      <span className="text-xs font-semibold text-primary-foreground/90">
        {title}
      </span>
      {isExpanded ? (
        <ChevronUp className="w-4 h-4 text-primary-foreground/70" />
      ) : (
        <ChevronDown className="w-4 h-4 text-primary-foreground/70" />
      )}
    </button>
    <div
      className={cn(
        "overflow-hidden transition-all duration-200",
        isExpanded ? "mt-2 max-h-[500px]" : "max-h-0"
      )}
    >
      {children}
    </div>
  </div>
);

const SampraptiItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <span className="font-medium text-primary-foreground/70 min-w-[100px]">
      {label}:
    </span>
    <span className="flex-1">{value}</span>
  </div>
);

export default VyadhiFlashcard;
