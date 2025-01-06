import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateSmoothieRecipes } from "@/services/openai";
import { SmoothieLoader } from "@/components/SmoothieLoader";
import { RecipeForm } from "@/components/RecipeForm";
import { RecipeGalleries } from "@/components/RecipeGalleries";

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

  return (
    <div className="space-y-8">
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
      ) : (
        <div className="mt-8">
          <RecipeGalleries 
            currentRecipes={recipes}
            ingredients={ingredients}
          />
        </div>
      )}
    </div>
  );
};