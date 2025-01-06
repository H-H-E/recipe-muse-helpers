import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";
import { RecipeDisplay } from "./RecipeDisplay";
import { useToast } from "@/hooks/use-toast";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritionalBenefits?: string[];
}

interface RecipePreviewCardProps {
  recipe: Recipe;
  onSave?: () => void;
  onDelete?: () => void;
  isSaved?: boolean;
}

export const RecipePreviewCard = ({ recipe, onSave, onDelete, isSaved }: RecipePreviewCardProps) => {
  const { toast } = useToast();

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSave) {
      onSave();
      // Create flying paper animation
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const paper = document.createElement('div');
      paper.className = 'fixed w-4 h-4 bg-purple-500 rounded-sm z-50 animate-fly-to-save';
      paper.style.top = `${rect.top}px`;
      paper.style.left = `${rect.left}px`;
      document.body.appendChild(paper);
      
      setTimeout(() => paper.remove(), 1000);

      toast({
        title: "Success",
        description: "Recipe saved successfully!",
      });
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
      toast({
        title: "Success",
        description: "Recipe deleted successfully!",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 animate-fade-in">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
                {recipe.name}
              </h3>
              <div className="flex gap-2">
                {!isSaved && onSave && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSave}
                    className="h-8 w-8 transition-transform active:scale-90"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDelete}
                    className="h-8 w-8 text-red-500 hover:text-red-600 transition-transform active:scale-90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {recipe.ingredients.length} ingredients
              </p>
              <div className="flex flex-wrap gap-2">
                {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                  <Badge 
                    key={idx}
                    variant="secondary" 
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 transition-all hover:scale-105"
                  >
                    {ingredient.split(',')[0]}
                  </Badge>
                ))}
                {recipe.ingredients.length > 3 && (
                  <Badge variant="outline" className="transition-all hover:scale-105">
                    +{recipe.ingredients.length - 3} more
                  </Badge>
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