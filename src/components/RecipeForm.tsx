import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { IngredientInput } from "./IngredientInput";
import { RecipeOptions } from "./RecipeOptions";
import { GenerateButton } from "./GenerateButton";

interface RecipeFormProps {
  ingredients: string;
  setIngredients: (ingredients: string) => void;
  numIdeas: number;
  setNumIdeas: (num: number) => void;
  strictMode: boolean;
  setStrictMode: (strict: boolean) => void;
  onSubmit: () => void;
  loading: boolean;
}

export const RecipeForm = ({
  ingredients,
  setIngredients,
  numIdeas,
  setNumIdeas,
  strictMode,
  setStrictMode,
  onSubmit,
  loading
}: RecipeFormProps) => {
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!ingredients.trim()) {
      toast({
        title: "Error",
        description: "Please enter some ingredients",
        variant: "destructive",
      });
      return;
    }
    onSubmit();
  };

  const handleIngredientClick = (ingredient: string) => {
    const currentIngredients = ingredients.trim();
    const separator = currentIngredients ? ", " : "";
    
    if (ingredient === "frozen") {
      const ingredientsList = currentIngredients.split(", ");
      if (ingredientsList.length > 0 && !ingredientsList[ingredientsList.length - 1].includes("frozen")) {
        ingredientsList[ingredientsList.length - 1] = `frozen ${ingredientsList[ingredientsList.length - 1]}`;
        setIngredients(ingredientsList.join(", "));
      }
    } else {
      setIngredients(currentIngredients + separator + ingredient);
    }
    
    console.log("Updated ingredients:", ingredients + separator + ingredient);
  };

  return (
    <Card className="max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border-2 border-purple-100 dark:border-purple-900">
      <CardContent className="space-y-6 pt-6">
        <IngredientInput 
          ingredients={ingredients}
          setIngredients={setIngredients}
          onIngredientClick={handleIngredientClick}
        />
        
        <RecipeOptions
          numIdeas={numIdeas}
          setNumIdeas={setNumIdeas}
          strictMode={strictMode}
          setStrictMode={setStrictMode}
        />

        <GenerateButton 
          onClick={handleSubmit}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
};