import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IngredientShortcuts } from "./IngredientShortcuts";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";

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
  const [checkedIngredients, setCheckedIngredients] = useState<{ [key: string]: boolean }>({});

  // Parse ingredients string into array and update checklist
  useEffect(() => {
    const ingredientList = ingredients
      .split(',')
      .map(i => i.trim())
      .filter(i => i !== '');

    const newCheckedState = { ...checkedIngredients };
    ingredientList.forEach(ingredient => {
      if (!(ingredient in newCheckedState)) {
        newCheckedState[ingredient] = true;
      }
    });

    // Remove ingredients that are no longer in the list
    Object.keys(newCheckedState).forEach(ingredient => {
      if (!ingredientList.includes(ingredient)) {
        delete newCheckedState[ingredient];
      }
    });

    setCheckedIngredients(newCheckedState);
  }, [ingredients]);

  const handleCheckChange = (ingredient: string, checked: boolean) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [ingredient]: checked
    }));
  };

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
      
      {ingredients && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="checklist">
            <AccordionTrigger className="text-sm">
              Ingredient Checklist
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {Object.keys(checkedIngredients).map((ingredient) => (
                  <div key={ingredient} className="flex items-center space-x-2">
                    <Checkbox
                      id={`check-${ingredient}`}
                      checked={checkedIngredients[ingredient]}
                      onCheckedChange={(checked) => handleCheckChange(ingredient, checked as boolean)}
                    />
                    <label
                      htmlFor={`check-${ingredient}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {ingredient}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};