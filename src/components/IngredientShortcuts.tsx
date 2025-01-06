import { Button } from "@/components/ui/button";
import { 
  Banana, Cherry, Apple, Carrot, IceCream, 
  Grape, Citrus, Milk, Leaf,
  Wheat, Coffee, Salad, Cookie, 
  Sandwich, Beef, Fish, Egg
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
    { icon: Salad, name: "greens", label: "Greens" },
    { icon: Cookie, name: "protein", label: "Protein" },
    { icon: Sandwich, name: "pb", label: "Peanut Butter" },
    { icon: Beef, name: "protein_powder", label: "Protein Powder" },
    { icon: Fish, name: "omega3", label: "Omega 3" },
    { icon: Egg, name: "egg_white", label: "Egg White" },
    { icon: IceCream, name: "frozen", label: "Frozen" },
  ];

  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto py-2 px-4 no-scrollbar">
        {ingredients.map(({ icon: Icon, name, label }) => (
          <div key={name} className="flex flex-col items-center gap-1">
            <Tooltip>
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
            <span className="text-[10px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};