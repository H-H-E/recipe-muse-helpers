import { Button } from "@/components/ui/button";
import { Banana, Cherry, Apple, Carrot, IceCream } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent } from "@/components/ui/tooltip";
import { TooltipTrigger } from "@/components/ui/tooltip";

interface IngredientShortcutsProps {
  onIngredientClick: (ingredient: string) => void;
}

export const IngredientShortcuts = ({ onIngredientClick }: IngredientShortcutsProps) => {
  const ingredients = [
    { icon: Banana, name: "banana", label: "Banana" },
    { icon: Cherry, name: "berries", label: "Berries" },
    { icon: Apple, name: "apple", label: "Apple" },
    { icon: Carrot, name: "carrot", label: "Carrot" },
    { icon: IceCream, name: "frozen", label: "Frozen" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {ingredients.map(({ icon: Icon, name, label }) => (
        <Tooltip key={name}>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onIngredientClick(name)}
              className="h-9 w-9 rounded-full"
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
  );
};