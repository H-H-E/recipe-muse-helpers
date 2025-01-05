import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

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
    <div className="space-y-8">
      {recipes.map((recipe, index) => (
        <Card key={index} className="overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border-2">
          <div className="p-6 space-y-6">
            {/* Recipe Header */}
            <div className="border-b pb-4">
              <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-2">
                {recipe.name}
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Ingredients Section */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full"></span>
                  Ingredients
                </h4>
                <ScrollArea className="h-[200px] pr-4">
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-purple-600 dark:text-purple-400">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>

              {/* Instructions Section */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-700 dark:text-gray-200">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                  Instructions
                </h4>
                <ScrollArea className="h-[200px] pr-4">
                  <ol className="space-y-2">
                    {recipe.instructions.map((instruction, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 font-medium min-w-[20px]">
                          {idx + 1}.
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </ScrollArea>
              </div>
            </div>

            {/* Nutritional Benefits Section */}
            {recipe.nutritionalBenefits && (
              <div className="pt-4 border-t">
                <h4 className="text-lg font-semibold flex items-center gap-2 mb-3 text-gray-700 dark:text-gray-200">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  Nutritional Benefits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recipe.nutritionalBenefits.map((benefit, idx) => (
                    <Badge 
                      key={idx} 
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    >
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};