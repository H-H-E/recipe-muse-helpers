import { Button } from "@/components/ui/button";

interface GenerateButtonProps {
  onClick: () => void;
  loading: boolean;
}

export const GenerateButton = ({ onClick, loading }: GenerateButtonProps) => {
  return (
    <Button 
      onClick={onClick} 
      className="w-full py-4 sm:py-6 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
      disabled={loading}
    >
      Generate Smoothie Recipes
    </Button>
  );
};