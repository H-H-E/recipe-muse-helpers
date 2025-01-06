import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IngredientShortcuts } from "./IngredientShortcuts";

interface IngredientInputProps {
  ingredients: string;
  setIngredients: (ingredients: string) => void;
  onIngredientClick: (ingredient: string) => void;
}

export const IngredientInput = ({
  ingredients,
  setIngredients,
  onIngredientClick
}: IngredientInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="ingredients" className="text-lg font-semibold">Your Ingredients</Label>
      <IngredientShortcuts onIngredientClick={onIngredientClick} />
      <Textarea
        id="ingredients"
        placeholder="Enter ingredients (e.g., mango, berries, spinach)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="min-h-[100px] resize-none bg-white/50 dark:bg-gray-950/50"
      />
    </div>
  );
};