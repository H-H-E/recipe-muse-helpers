import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSavedSmoothies } from "@/utils/smoothieStorage";
import { RecipeDisplay } from "./RecipeDisplay";
import { formatDistanceToNow } from "date-fns";

export const SavedSmoothies = () => {
  const [savedSmoothies, setSavedSmoothies] = useState<any[]>([]);

  useEffect(() => {
    const loadSavedSmoothies = () => {
      const smoothies = getSavedSmoothies();
      setSavedSmoothies(smoothies);
      console.log('Loaded saved smoothies:', smoothies);
    };

    loadSavedSmoothies();
    window.addEventListener('storage', loadSavedSmoothies);
    
    return () => {
      window.removeEventListener('storage', loadSavedSmoothies);
    };
  }, []);

  if (!savedSmoothies.length) {
    return (
      <Card className="mt-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No saved smoothies yet!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollArea className="h-[600px] mt-8">
      <div className="space-y-6">
        {savedSmoothies.map((smoothie) => (
          <Card key={smoothie.id} className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>Ingredients: {smoothie.ingredients}</span>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(smoothie.timestamp, { addSuffix: true })}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RecipeDisplay recipes={smoothie.recipes} />
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};