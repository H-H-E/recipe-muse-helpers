import { useState } from "react";
import { RecipeForm } from "./RecipeForm";
import { RecipeDisplay } from "./RecipeDisplay";
import { SmoothieLoader } from "./SmoothieLoader";
import { RecipeGalleries } from "./RecipeGalleries";
import { generateRecipes } from "@/services/openai";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritionalBenefits?: string[];
}

interface RecipeSectionProps {
  onError: (message: string) => void;
}

export const RecipeSection = ({ onError }: RecipeSectionProps) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = async (
    ingredients: string,
    numberOfRecipes: number,
    strictMode: boolean
  ) => {
    setLoading(true);
    setIngredients(ingredients);
    try {
      const generatedRecipes = await generateRecipes(
        ingredients,
        numberOfRecipes,
        strictMode
      );
      setRecipes(generatedRecipes);
    } catch (error) {
      console.error("Error generating recipes:", error);
      if (error instanceof Error) {
        onError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <RecipeForm onSubmit={handleSubmit} />
      
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