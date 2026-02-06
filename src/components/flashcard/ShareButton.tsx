import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2, MessageCircle, Send, Twitter, Link, Loader2 } from "lucide-react";
import { useShareFlashcard } from "@/hooks/useShareFlashcard";
import { Flashcard } from "@/data/flashcards";

interface ShareButtonProps {
  card: Flashcard;
  variant?: "icon" | "full";
}

const ShareButton = ({ card, variant = "icon" }: ShareButtonProps) => {
  const { loading, shareToWhatsApp, shareToTelegram, shareToTwitter, copyShareLink } =
    useShareFlashcard();
  const [open, setOpen] = useState(false);

  const drugName = card.front.sanskritName.replace(/[^\w\s]/gi, "").trim();

  const handleShare = (platform: "whatsapp" | "telegram" | "twitter" | "link") => {
    setOpen(false);
    switch (platform) {
      case "whatsapp":
        shareToWhatsApp(card.id, drugName);
        break;
      case "telegram":
        shareToTelegram(card.id, drugName);
        break;
      case "twitter":
        shareToTwitter(card.id, drugName);
        break;
      case "link":
        copyShareLink(card.id, drugName);
        break;
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={variant === "icon" ? "icon" : "sm"}
          className={variant === "icon" ? "h-8 w-8" : "gap-2"}
          onClick={(e) => e.stopPropagation()}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Share2 className="h-4 w-4" />
              {variant === "full" && "Share"}
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
          <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("telegram")}>
          <Send className="h-4 w-4 mr-2 text-blue-500" />
          Telegram
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("twitter")}>
          <Twitter className="h-4 w-4 mr-2 text-sky-500" />
          X (Twitter)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("link")}>
          <Link className="h-4 w-4 mr-2" />
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButton;
