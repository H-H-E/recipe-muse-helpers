import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateSmoothieRecipes } from "@/services/openai";
import { RecipeDisplay } from "@/components/RecipeDisplay";
import { SmoothieLoader } from "@/components/SmoothieLoader";
import { Header } from "@/components/Header";
import { ApiKeyConfig } from "@/components/ApiKeyConfig";
import { RecipeForm } from "@/components/RecipeForm";

const Index = () => {
  const [ingredients, setIngredients] = useState("");
  const [numIdeas, setNumIdeas] = useState(1);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [apiKey, setApiKey] = useState("");
  const [isKeyConfigured, setIsKeyConfigured] = useState(false);
  const [strictMode, setStrictMode] = useState(false);

  useEffect(() => {
    const savedKey = localStorage.getItem('OPENAI_API_KEY');
    if (savedKey) {
      setApiKey(savedKey);
      setIsKeyConfigured(true);
    }
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
            <div className="mt-6">
              <RecipeDisplay recipes={recipes} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Index;