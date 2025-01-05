import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { generateSmoothieRecipes } from "@/services/openai";

const Index = () => {
  const [ingredients, setIngredients] = useState("");
  const [numIdeas, setNumIdeas] = useState(3);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<string>("");
  const { toast } = useToast();

  const generateSmoothies = async () => {
    if (!ingredients.trim()) {
      toast({
        title: "Error",
        description: "Please enter some ingredients",
        variant: "destructive",
      });
      return;
    }

    const apiKey = localStorage.getItem('OPENAI_API_KEY');
    if (!apiKey) {
      toast({
        title: "Error",
        description: "Please set your OpenAI API key first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await generateSmoothieRecipes(ingredients, numIdeas);
      setRecipes(response);
      
      toast({
        title: "Success!",
        description: "Your smoothie recipes are ready!",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate smoothie recipes. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Smoothie Recipe Generator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Ingredients</label>
            <Textarea
              placeholder="Enter ingredients (e.g., mango, berries, spinach)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Ideas</label>
            <Input
              type="number"
              min={1}
              max={10}
              value={numIdeas}
              onChange={(e) => setNumIdeas(Number(e.target.value))}
            />
          </div>

          <Button 
            onClick={generateSmoothies} 
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Recipes...
              </>
            ) : (
              "Generate Smoothie Recipes"
            )}
          </Button>

          {recipes && (
            <div className="mt-6 space-y-4">
              <h3 className="text-xl font-semibold">Your Smoothie Recipes</h3>
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap bg-secondary p-4 rounded-lg">
                  {recipes}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;