import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Lock, Unlock } from "lucide-react";

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
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            {strictMode ? (
              <Lock className="w-4 h-4 text-purple-500 animate-fade-in" />
            ) : (
              <Unlock className="w-4 h-4 text-gray-400 animate-fade-in" />
            )}
            Only use the ingredients you've listed
          </p>
        </div>
        <Switch
          id="strict-mode"
          checked={strictMode}
          onCheckedChange={setStrictMode}
          className="transition-transform data-[state=checked]:scale-105"
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