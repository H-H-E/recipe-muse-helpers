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
        <Card className="cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg bg-gradient-to-br from-secondary/50 to-primary/10 dark:from-secondary/20 dark:to-primary/5 animate-fade-in border-none shadow-sm">
          <CardContent className="p-4 sm:p-6 space-y-4">
            <div className="flex justify-between items-start gap-2">
              <h3 className="text-base sm:text-xl font-semibold text-primary dark:text-primary line-clamp-2">
                {recipe.name}
              </h3>
              <div className="flex gap-2 flex-shrink-0">
                {!isSaved && onSave && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSave}
                    className="h-8 w-8 transition-transform active:scale-90 hover:text-primary"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDelete}
                    className="h-8 w-8 text-destructive hover:text-destructive/80 transition-transform active:scale-90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs sm:text-sm text-primary/80 dark:text-primary/80 font-medium">
                {recipe.ingredients.length} ingredients
              </p>
              <div className="flex flex-wrap gap-2">
                {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
                  <Badge 
                    key={idx}
                    variant="secondary" 
                    className="bg-secondary/80 text-primary dark:bg-secondary dark:text-primary border-none transition-all hover:scale-105 px-2 py-0.5 text-xs sm:px-3 sm:py-1 sm:text-sm"
                  >
                    {ingredient.split(',')[0]}
                  </Badge>
                ))}
                {recipe.ingredients.length > 3 && (
                  <Badge 
                    variant="outline" 
                    className="transition-all hover:scale-105 border-primary/20 text-primary/80 dark:border-primary/20 dark:text-primary/80 text-xs sm:text-sm"
                  >
                    +{recipe.ingredients.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <RecipeDisplay recipes={[recipe]} />
      </DialogContent>
    </Dialog>
  );
};