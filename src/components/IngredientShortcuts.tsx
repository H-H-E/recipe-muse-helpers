import { Button } from "@/components/ui/button";
import { 
  Banana, Cherry, Apple, Carrot, IceCream, 
  Grape, Citrus, Milk, Leaf,
  Wheat, Coffee
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface IngredientShortcutsProps {
  onIngredientClick: (ingredient: string) => void;
}

export const IngredientShortcuts = ({ onIngredientClick }: IngredientShortcutsProps) => {
  const ingredients = [
    { icon: Banana, name: "banana", label: "Banana" },
    { icon: Cherry, name: "berries", label: "Berries" },
    { icon: Apple, name: "apple", label: "Apple" },
    { icon: Citrus, name: "orange", label: "Orange" },
    { icon: Grape, name: "grapes", label: "Grapes" },
    { icon: Citrus, name: "lemon", label: "Lemon" },
    { icon: Carrot, name: "carrot", label: "Carrot" },
    { icon: Leaf, name: "spinach", label: "Spinach" },
    { icon: Milk, name: "yogurt", label: "Yogurt" },
    { icon: Coffee, name: "coffee", label: "Coffee" },
    { icon: Wheat, name: "oats", label: "Oats" },
    { icon: IceCream, name: "frozen", label: "Frozen (modifies last ingredient)" },
  ];

  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto py-2 px-4 scrollbar-none">
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
    </div>
  );
};