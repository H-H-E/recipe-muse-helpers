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

const COMMON_INGREDIENTS = [
  // Fruits
  "Banana",
  "Mango",
  "Strawberry",
  "Blueberry",
  "Raspberry",
  "Blackberry",
  "Pineapple",
  "Peach",
  "Apple",
  "Orange",
  "Kiwi",
  "Papaya",
  "Watermelon",
  // Greens & Vegetables
  "Spinach",
  "Kale",
  "Celery",
  "Cucumber",
  "Carrot",
  "Beet",
  "Ginger",
  // Dairy & Alternatives
  "Greek Yogurt",
  "Almond Milk",
  "Oat Milk",
  "Coconut Milk",
  "Soy Milk",
  // Protein & Supplements
  "Protein Powder",
  "Collagen Powder",
  "Hemp Seeds",
  "Chia Seeds",
  "Flax Seeds",
  // Sweeteners & Add-ins
  "Honey",
  "Maple Syrup",
  "Dates",
  "Peanut Butter",
  "Almond Butter",
  "Cocoa Powder",
  "Cinnamon",
  "Turmeric",
  "Matcha Powder",
  "Spirulina"
];

export const IngredientInput = ({
  ingredients,
  setIngredients,
  onIngredientClick
}: IngredientInputProps) => {
  const [checkedIngredients, setCheckedIngredients] = useState<{ [key: string]: boolean }>({});
  const [selectedIngredients, setSelectedIngredients] = useState<{ [key: string]: boolean }>({});

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

  const handleIngredientSelect = (ingredient: string, checked: boolean) => {
    setSelectedIngredients(prev => ({
      ...prev,
      [ingredient]: checked
    }));

    const currentIngredients = ingredients
      .split(',')
      .map(i => i.trim())
      .filter(i => i !== '');

    if (checked && !currentIngredients.includes(ingredient)) {
      const newIngredients = [...currentIngredients, ingredient];
      setIngredients(newIngredients.join(', '));
    } else if (!checked) {
      const newIngredients = currentIngredients.filter(i => i !== ingredient);
      setIngredients(newIngredients.join(', '));
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="ingredients" className="text-lg font-semibold">Your Ingredients</Label>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="ingredients" className="border-b border-gray-200 dark:border-gray-700">
          <AccordionTrigger className="text-sm py-2 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800 px-4 rounded-lg transition-colors">
            Select Common Ingredients
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[400px] overflow-y-auto pr-2">
              {COMMON_INGREDIENTS.map((ingredient) => (
                <div key={ingredient} className="flex items-center space-x-2 py-1">
                  <Checkbox
                    id={`select-${ingredient}`}
                    checked={selectedIngredients[ingredient]}
                    onCheckedChange={(checked) => handleIngredientSelect(ingredient, checked as boolean)}
                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <label
                    htmlFor={`select-${ingredient}`}
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
          <AccordionItem value="checklist" className="border-b border-gray-200 dark:border-gray-700">
            <AccordionTrigger className="text-sm py-2 hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800 px-4 rounded-lg transition-colors">
              Ingredient Checklist
            </AccordionTrigger>
            <AccordionContent className="px-4 py-2">
              <div className="space-y-2">
                {Object.keys(checkedIngredients).map((ingredient) => (
                  <div key={ingredient} className="flex items-center space-x-2 py-1">
                    <Checkbox
                      id={`check-${ingredient}`}
                      checked={checkedIngredients[ingredient]}
                      onCheckedChange={(checked) => handleCheckChange(ingredient, checked as boolean)}
                      className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
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