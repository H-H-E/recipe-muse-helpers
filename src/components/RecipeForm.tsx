import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface RecipeFormProps {
  ingredients: string;
  setIngredients: (ingredients: string) => void;
  numIdeas: number;
  setNumIdeas: (num: number) => void;
  strictMode: boolean;
  setStrictMode: (strict: boolean) => void;
  onSubmit: () => void;
  loading: boolean;
}

export const RecipeForm = ({
  ingredients,
  setIngredients,
  numIdeas,
  setNumIdeas,
  strictMode,
  setStrictMode,
  onSubmit,
  loading
}: RecipeFormProps) => {
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!ingredients.trim()) {
      toast({
        title: "Error",
        description: "Please enter some ingredients",
        variant: "destructive",
      });
      return;
    }
    onSubmit();
  };

  return (
    <Card className="max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border-2 border-purple-100 dark:border-purple-900">
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label htmlFor="ingredients" className="text-lg font-semibold">Your Ingredients</Label>
          <Textarea
            id="ingredients"
            placeholder="Enter ingredients (e.g., mango, berries, spinach)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="min-h-[100px] resize-none bg-white/50 dark:bg-gray-950/50"
          />
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="strict-mode" className="text-lg font-semibold">Strict Mode</Label>
              <p className="text-sm text-muted-foreground">
                Only use the ingredients you've listed
              </p>
            </div>
            <Switch
              id="strict-mode"
              checked={strictMode}
              onCheckedChange={setStrictMode}
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-lg font-semibold">Number of Recipes: {numIdeas}</Label>
              <Slider
                value={[numIdeas]}
                onValueChange={(value) => setNumIdeas(value[0])}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={handleSubmit} 
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          disabled={loading}
        >
          Generate Smoothie Recipes
        </Button>
      </CardContent>
    </Card>
  );
};