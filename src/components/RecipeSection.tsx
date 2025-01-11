import { useState } from "react";
import { RecipeForm } from "./RecipeForm";
import { RecipeDisplay } from "./RecipeDisplay";
import { SmoothieLoader } from "./SmoothieLoader";
import { RecipeGalleries } from "./RecipeGalleries";
import { generateSmoothieRecipes } from "@/services/openai";

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
  const [numIdeas, setNumIdeas] = useState(1);
  const [strictMode, setStrictMode] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log("Generating recipes with:", { ingredients, numIdeas, strictMode });
      const generatedRecipes = await generateSmoothieRecipes(
        ingredients,
        numIdeas,
        strictMode
      );
      console.log("Generated recipes:", generatedRecipes);
      setRecipes(generatedRecipes);
    } catch (error) {
      console.error("Error generating recipes:", error);
      if (error instanceof Error) {
        onError(error.message);
      } else {
        onError("An unexpected error occurred while generating recipes");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-[400px,1fr] gap-8 items-start">
      <div className="lg:sticky lg:top-8">
        <RecipeForm 
          ingredients={ingredients}
          setIngredients={setIngredients}
          numIdeas={numIdeas}
          setNumIdeas={setNumIdeas}
          strictMode={strictMode}
          setStrictMode={setStrictMode}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
      
      <div className="space-y-8">
        {loading ? (
          <SmoothieLoader />
        ) : (
          <RecipeGalleries 
            currentRecipes={recipes}
            ingredients={ingredients}
          />
        )}
      </div>
    </div>
  );
};