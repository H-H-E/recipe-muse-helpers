import { LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
  galleryType: "grid" | "carousel";
  onViewChange: (type: "grid" | "carousel") => void;
}

export const ViewToggle = ({ galleryType, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onViewChange("grid")}
        className={`p-2 rounded-md transition-colors ${
          galleryType === "grid" ? "bg-purple-100 dark:bg-purple-900" : ""
        }`}
        title="Grid View"
      >
        <LayoutGrid className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange("carousel")}
        className={`p-2 rounded-md transition-colors ${
          galleryType === "carousel" ? "bg-purple-100 dark:bg-purple-900" : ""
        }`}
        title="List View"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
};