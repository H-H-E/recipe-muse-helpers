import { Recipe } from "@/types/recipe";
import { RecipePreviewCard } from "../RecipePreviewCard";

interface RecipeListProps {
  recipes: Recipe[];
  galleryType: "grid" | "carousel";
  onSave?: (recipe: Recipe) => void;
  onDelete?: (id: string) => void;
  isSaved?: boolean;
  smoothieId?: string;
}

export const RecipeList = ({ 
  recipes, 
  galleryType, 
  onSave, 
  onDelete,
  isSaved,
  smoothieId 
}: RecipeListProps) => {
  const getGalleryClasses = () => {
    switch (galleryType) {
      case "carousel":
        return "flex flex-col gap-6 pb-4";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
    }
  };

  return (
    <div className={getGalleryClasses()}>
      {recipes.map((recipe, index) => (
        <div 
          key={smoothieId ? `${smoothieId}-${index}` : index} 
          className={galleryType === "carousel" ? "w-full" : ""}
        >
          <RecipePreviewCard 
            recipe={recipe}
            onSave={onSave ? () => onSave(recipe) : undefined}
            onDelete={onDelete && smoothieId ? () => onDelete(smoothieId) : undefined}
            isSaved={isSaved}
          />
        </div>
      ))}
    </div>
  );
};