import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

interface RecipeOptionsProps {
  numIdeas: number;
  setNumIdeas: (num: number) => void;
  strictMode: boolean;
  setStrictMode: (strict: boolean) => void;
}

export const RecipeOptions = ({
  numIdeas,
  setNumIdeas,
  strictMode,
  setStrictMode
}: RecipeOptionsProps) => {
  return (
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
  );
};