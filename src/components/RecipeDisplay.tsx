import { Card } from "./ui/card";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritionalBenefits?: string[];
}

interface RecipeDisplayProps {
  recipes: Recipe[];
}

export const RecipeDisplay = ({ recipes }: RecipeDisplayProps) => {
  if (!recipes?.length) return null;

  return (
    <div className="space-y-6">
      {recipes.map((recipe, index) => (
        <Card key={index} className="p-6">
          <h3 className="text-xl font-semibold mb-4">{recipe.name}</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-lg mb-2">Ingredients:</h4>
              <ul className="list-disc list-inside space-y-1">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-lg mb-2">Instructions:</h4>
              <ol className="list-decimal list-inside space-y-1">
                {recipe.instructions.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ol>
            </div>

            {recipe.nutritionalBenefits && (
              <div>
                <h4 className="font-medium text-lg mb-2">Nutritional Benefits:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {recipe.nutritionalBenefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};