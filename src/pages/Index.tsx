import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Key, Lock, ExternalLink } from "lucide-react";
import { generateSmoothieRecipes } from "@/services/openai";
import { RecipeDisplay } from "@/components/RecipeDisplay";
import { SmoothieLoader } from "@/components/SmoothieLoader";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const Index = () => {
  const [ingredients, setIngredients] = useState("");
  const [numIdeas, setNumIdeas] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [apiKey, setApiKey] = useState("");
  const [isKeyConfigured, setIsKeyConfigured] = useState(false);
  const [strictMode, setStrictMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedKey = localStorage.getItem('OPENAI_API_KEY');
    if (savedKey) {
      setApiKey(savedKey);
      setIsKeyConfigured(true);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem('OPENAI_API_KEY', apiKey);
    setIsKeyConfigured(true);
    toast({
      title: "Success",
      description: "API key saved successfully!",
    });
  };

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
      setIsKeyConfigured(false);
      toast({
        title: "Error",
        description: "Please set your OpenAI API key first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await generateSmoothieRecipes(ingredients, numIdeas, strictMode);
      setRecipes(response);
      
      toast({
        title: "Success!",
        description: `Generated ${numIdeas} smoothie recipe${numIdeas > 1 ? 's' : ''}!`,
      });
    } catch (error) {
      console.error('Error:', error);
      if (error.message?.includes('API key')) {
        setIsKeyConfigured(false);
      }
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
    <div className="container mx-auto py-8 px-4 space-y-8">
      {!isKeyConfigured && (
        <Card className="max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">OpenAI API Configuration</CardTitle>
            <p className="text-sm text-muted-foreground text-center">
              To use the Smoothie Recipe Generator, you'll need an OpenAI API key
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="password"
                  placeholder="Enter your OpenAI API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="pr-10"
                />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <Button onClick={handleSaveApiKey} className="flex gap-2">
                <Key className="w-4 h-4" />
                Save Key
              </Button>
            </div>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <ExternalLink className="w-4 h-4" />
              Get your OpenAI API key here
            </a>
          </CardContent>
        </Card>
      )}

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Smoothie Recipe Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ingredients">Ingredients</Label>
            <Textarea
              id="ingredients"
              placeholder="Enter ingredients (e.g., mango, berries, spinach)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="strict-mode">Strict Mode</Label>
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
                <Label>Number of Recipes: {numIdeas}</Label>
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
            onClick={generateSmoothies} 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            disabled={loading}
          >
            Generate Smoothie Recipes
          </Button>

          {loading ? (
            <SmoothieLoader />
          ) : recipes.length > 0 && (
            <div className="mt-6">
              <RecipeDisplay recipes={recipes} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;