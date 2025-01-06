import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RecipePreviewCard } from "./RecipePreviewCard";
import { LayoutGrid, List } from "lucide-react";
import { saveSmoothieRecipes, getSavedSmoothies } from "@/utils/smoothieStorage";
import { useToast } from "@/hooks/use-toast";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritionalBenefits?: string[];
}

interface RecipeGalleriesProps {
  currentRecipes: Recipe[];
  ingredients: string;
}

export const RecipeGalleries = ({ currentRecipes, ingredients }: RecipeGalleriesProps) => {
  const [galleryType, setGalleryType] = useState<"grid" | "carousel">("grid");
  const { toast } = useToast();
  const savedSmoothies = getSavedSmoothies();

  const getGalleryClasses = () => {
    switch (galleryType) {
      case "carousel":
        return "flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    }
  };

  const handleSaveRecipe = (recipe: Recipe) => {
    saveSmoothieRecipes([recipe], ingredients);
    toast({
      title: "Success",
      description: "Recipe saved successfully!",
    });
  };

  const handleDeleteRecipe = (smoothieId: string) => {
    const updatedSmoothies = savedSmoothies.filter(smoothie => smoothie.id !== smoothieId);
    localStorage.setItem('savedSmoothies', JSON.stringify(updatedSmoothies));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="current" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="current" className="text-base">Current Session</TabsTrigger>
            <TabsTrigger value="saved" className="text-base">Saved Recipes</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <button
              onClick={() => setGalleryType("grid")}
              className={`p-2 rounded-md transition-colors ${
                galleryType === "grid" ? "bg-purple-100 dark:bg-purple-900" : ""
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setGalleryType("carousel")}
              className={`p-2 rounded-md transition-colors ${
                galleryType === "carousel" ? "bg-purple-100 dark:bg-purple-900" : ""
              }`}
              title="List View"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <ScrollArea className="h-[600px]">
          <TabsContent value="current">
            {currentRecipes.length === 0 ? (
              <p className="text-center text-muted-foreground">No recipes generated in this session yet.</p>
            ) : (
              <div className={getGalleryClasses()}>
                {currentRecipes.map((recipe, index) => (
                  <div key={index} className={galleryType === "carousel" ? "snap-center min-w-[350px]" : ""}>
                    <RecipePreviewCard 
                      recipe={recipe} 
                      onSave={() => handleSaveRecipe(recipe)}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved">
            {savedSmoothies.length === 0 ? (
              <p className="text-center text-muted-foreground">No saved recipes yet.</p>
            ) : (
              <div className={getGalleryClasses()}>
                {savedSmoothies.map((smoothie) => (
                  smoothie.recipes.map((recipe, recipeIndex) => (
                    <div 
                      key={`${smoothie.id}-${recipeIndex}`} 
                      className={galleryType === "carousel" ? "snap-center min-w-[350px]" : ""}
                    >
                      <RecipePreviewCard 
                        recipe={recipe}
                        onDelete={() => handleDeleteRecipe(smoothie.id)}
                        isSaved
                      />
                    </div>
                  ))
                ))}
              </div>
            )}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};