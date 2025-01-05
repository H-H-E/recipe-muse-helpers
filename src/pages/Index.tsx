import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateSmoothieRecipes } from "@/services/openai";
import { RecipeDisplay } from "@/components/RecipeDisplay";
import { SmoothieLoader } from "@/components/SmoothieLoader";
import { Header } from "@/components/Header";
import { ApiKeyConfig } from "@/components/ApiKeyConfig";
import { RecipeForm } from "@/components/RecipeForm";
import { SavedSmoothies } from "@/components/SavedSmoothies";
import { saveSmoothieRecipes } from "@/utils/smoothieStorage";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
    const fetchApiKey = async () => {
      try {
        const { data, error } = await supabase
          .from('api_keys')
          .select('key_value')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;
        
        if (data) {
          setApiKey(data.key_value);
          setIsKeyConfigured(true);
        }
      } catch (error) {
        console.error('Error fetching API key:', error);
        setIsKeyConfigured(false);
      }
    };

    fetchApiKey();
  }, []);

  const generateSmoothies = async () => {
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

  const handleSaveRecipes = () => {
    if (recipes.length === 0) return;
    
    saveSmoothieRecipes(recipes, ingredients);
    toast({
      title: "Success!",
      description: "Recipes saved successfully!",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8 min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-950 dark:to-purple-950">
      <Header />
      
      {!isKeyConfigured ? (
        <ApiKeyConfig 
          apiKey={apiKey}
          setApiKey={setApiKey}
          setIsKeyConfigured={setIsKeyConfigured}
        />
      ) : (
        <>
          <RecipeForm 
            ingredients={ingredients}
            setIngredients={setIngredients}
            numIdeas={numIdeas}
            setNumIdeas={setNumIdeas}
            strictMode={strictMode}
            setStrictMode={setStrictMode}
            onSubmit={generateSmoothies}
            loading={loading}
          />

          {loading ? (
            <SmoothieLoader />
          ) : recipes.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex justify-end">
                <Button
                  onClick={handleSaveRecipes}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Recipes
                </Button>
              </div>
              <RecipeDisplay recipes={recipes} />
            </div>
          )}

          <SavedSmoothies />
        </>
      )}
    </div>
  );
};

export default Index;