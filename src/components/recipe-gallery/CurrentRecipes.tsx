import { Recipe } from "@/types/recipe";
import { TabsContent } from "@/components/ui/tabs";
import { RecipeList } from "./RecipeList";

interface CurrentRecipesProps {
  recipes: Recipe[];
  galleryType: "grid" | "carousel";
  onSave: (recipe: Recipe) => void;
}

export const CurrentRecipes = ({ recipes, galleryType, onSave }: CurrentRecipesProps) => {
  return (
    <TabsContent value="current">
      {recipes.length === 0 ? (
        <p className="text-center text-muted-foreground">No recipes generated in this session yet.</p>
      ) : (
        <RecipeList
          recipes={recipes}
          galleryType={galleryType}
          onSave={onSave}
        />
      )}
    </TabsContent>
  );
};