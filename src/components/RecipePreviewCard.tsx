import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { RecipeDisplay } from "./RecipeDisplay";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritionalBenefits?: string[];
}

interface RecipePreviewCardProps {
  recipe: Recipe;
}

export const RecipePreviewCard = ({ recipe }: RecipePreviewCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:scale-105 transition-transform duration-200 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <CardContent className="p-4 space-y-4">
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
              {recipe.name}
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {recipe.ingredients.length} ingredients
              </p>
              <div className="flex flex-wrap gap-2">
                {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                  <Badge 
                    key={idx}
                    variant="secondary" 
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100"
                  >
                    {ingredient.split(',')[0]}
                  </Badge>
                ))}
                {recipe.ingredients.length > 3 && (
                  <Badge variant="outline">+{recipe.ingredients.length - 3} more</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <RecipeDisplay recipes={[recipe]} />
      </DialogContent>
    </Dialog>
  );
};