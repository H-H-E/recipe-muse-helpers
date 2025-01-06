import { TabsContent } from "@/components/ui/tabs";
import { RecipeList } from "./RecipeList";
import { getSavedSmoothies } from "@/utils/smoothieStorage";

interface SavedRecipesProps {
  galleryType: "grid" | "carousel";
  onDelete: (smoothieId: string) => void;
}

export const SavedRecipes = ({ galleryType, onDelete }: SavedRecipesProps) => {
  const savedSmoothies = getSavedSmoothies();

  return (
    <TabsContent value="saved">
      {savedSmoothies.length === 0 ? (
        <p className="text-center text-muted-foreground">No saved recipes yet.</p>
      ) : (
        <div className={galleryType === "carousel" ? "space-y-6" : ""}>
          {savedSmoothies.map((smoothie) => (
            <RecipeList
              key={smoothie.id}
              recipes={smoothie.recipes}
              galleryType={galleryType}
              onDelete={onDelete}
              isSaved
              smoothieId={smoothie.id}
            />
          ))}
        </div>
      )}
    </TabsContent>
  );
};