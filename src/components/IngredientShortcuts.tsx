import { Button } from "@/components/ui/button";
import { 
  Banana, Cherry, Apple, Carrot, IceCream, 
  Grape, Lemon, Orange, Milk, Leaf,
  Wheat, Coffee, ArrowLeft, ArrowRight
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useRef, useState } from "react";

interface IngredientShortcutsProps {
  onIngredientClick: (ingredient: string) => void;
}

export const IngredientShortcuts = ({ onIngredientClick }: IngredientShortcutsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const ingredients = [
    { icon: Banana, name: "banana", label: "Banana" },
    { icon: Cherry, name: "berries", label: "Berries" },
    { icon: Apple, name: "apple", label: "Apple" },
    { icon: Orange, name: "orange", label: "Orange" },
    { icon: Grape, name: "grapes", label: "Grapes" },
    { icon: Lemon, name: "lemon", label: "Lemon" },
    { icon: Carrot, name: "carrot", label: "Carrot" },
    { icon: Leaf, name: "spinach", label: "Spinach" },
    { icon: Milk, name: "yogurt", label: "Yogurt" },
    { icon: Coffee, name: "coffee", label: "Coffee" },
    { icon: Wheat, name: "oats", label: "Oats" },
    { icon: IceCream, name: "frozen", label: "Frozen (modifies last ingredient)" },
  ];

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });

    // Update arrow visibility after scroll
    setTimeout(() => {
      if (!container) return;
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }, 300);
  };

  return (
    <div className="relative">
      {showLeftArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-950 rounded-full"
          onClick={() => scroll('left')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      )}
      
      <div 
        ref={scrollContainerRef}
        className="flex gap-2 overflow-x-hidden py-2 px-8 scroll-smooth"
      >
        {ingredients.map(({ icon: Icon, name, label }) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onIngredientClick(name)}
                className="h-9 w-9 rounded-full flex-shrink-0"
              >
                <Icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {showRightArrow && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-950 rounded-full"
          onClick={() => scroll('right')}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};