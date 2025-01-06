import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateSmoothieRecipes } from "@/services/openai";
import { RecipeDisplay } from "@/components/RecipeDisplay";
import { SmoothieLoader } from "@/components/SmoothieLoader";
import { RecipeForm } from "@/components/RecipeForm";
import { saveSmoothieRecipes } from "@/utils/smoothieStorage";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface RecipeSectionProps {
  onError: (message: string) => void;
}

export const RecipeSection = ({ onError }: RecipeSectionProps) => {
  const [ingredients, setIngredients] = useState("");
  const [numIdeas, setNumIdeas] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [strictMode, setStrictMode] = useState(false);
  const { toast } = useToast();

  const generateSmoothies = async () => {
    setLoading(true);
    try {
      const response = await generateSmoothieRecipes(ingredients, numIdeas, strictMode);
      setRecipes(response);
      
      toast({
        title: "Success!",
        description: `Generated ${numIdeas} smoothie recipe${numIdeas > 1 ? 's' : ''}!`,
      });
    } catch (error) {
      console.error('Error:', error);
      if (error.message?.includes('API key')) {
        onError(error.message);
      }
      toast({
        title: "Error",
        description: "Failed to generate smoothie recipes. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipes = () => {
    if (recipes.length === 0) return;
    
    saveSmoothieRecipes(recipes, ingredients);
    toast({
      title: "Success!",
      description: "Recipes saved successfully!",
    });
  };

  return (
    <>
      <RecipeForm 
        ingredients={ingredients}
        setIngredients={setIngredients}
        numIdeas={numIdeas}
        setNumIdeas={setNumIdeas}
        strictMode={strictMode}
        setStrictMode={setStrictMode}
        onSubmit={generateSmoothies}
        loading={loading}
      />

      {loading ? (
        <SmoothieLoader />
      ) : recipes.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={handleSaveRecipes}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Recipes
            </Button>
          </div>
          <RecipeDisplay recipes={recipes} />
        </div>
      )}
    </>
  );
};