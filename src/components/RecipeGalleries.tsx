import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { saveSmoothieRecipes, getSavedSmoothies } from "@/utils/smoothieStorage";
import { useToast } from "@/hooks/use-toast";
import { ViewToggle } from "./recipe-gallery/ViewToggle";
import { CurrentRecipes } from "./recipe-gallery/CurrentRecipes";
import { SavedRecipes } from "./recipe-gallery/SavedRecipes";
import { Recipe } from "@/types/recipe";
import { useIsMobile } from "@/hooks/use-mobile";

interface RecipeGalleriesProps {
  currentRecipes: Recipe[];
  ingredients: string;
}

export const RecipeGalleries = ({ currentRecipes, ingredients }: RecipeGalleriesProps) => {
  const [galleryType, setGalleryType] = useState<"grid" | "carousel">("grid");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleSaveRecipe = (recipe: Recipe) => {
    saveSmoothieRecipes([recipe], ingredients);
    toast({
      title: "Success",
      description: "Recipe saved successfully!",
    });
  };

  const handleDeleteRecipe = (smoothieId: string) => {
    const savedSmoothies = getSavedSmoothies();
    const updatedSmoothies = savedSmoothies.filter(smoothie => smoothie.id !== smoothieId);
    localStorage.setItem('savedSmoothies', JSON.stringify(updatedSmoothies));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="space-y-8">
      <Tabs defaultValue="current" className="w-full">
        <div className="flex flex-col gap-4 mb-4">
          <TabsList className="w-full h-auto p-1">
            <TabsTrigger value="current" className="text-base py-3 flex-1">Current Session</TabsTrigger>
            <TabsTrigger value="saved" className="text-base py-3 flex-1">Saved Recipes</TabsTrigger>
          </TabsList>

          <div className="flex justify-end">
            <ViewToggle galleryType={galleryType} onViewChange={setGalleryType} />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)] px-2 sm:px-4">
          <div className="py-4">
            <CurrentRecipes
              recipes={currentRecipes}
              galleryType={galleryType}
              onSave={handleSaveRecipe}
            />
            <SavedRecipes
              galleryType={galleryType}
              onDelete={handleDeleteRecipe}
            />
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
};