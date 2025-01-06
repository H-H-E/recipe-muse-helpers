import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ApiKeyConfig } from "@/components/ApiKeyConfig";
import { SavedSmoothies } from "@/components/SavedSmoothies";
import { RecipeSection } from "@/components/RecipeSection";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [isKeyConfigured, setIsKeyConfigured] = useState(false);

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const { data: apiKeyData, error: apiKeyError } = await supabase
          .from('api_keys')
          .select('key_value')
          .maybeSingle();

        if (apiKeyError) {
          console.error('Error fetching API key:', apiKeyError);
          setIsKeyConfigured(false);
          return;
        }
        
        // Also check if the key exists in Supabase Edge Function secrets
        const { data: { key }, error: secretError } = await supabase.functions.invoke('manage-openai-key', {
          method: 'GET'
        });

        if (secretError || !key) {
          console.error('Error fetching secret key:', secretError);
          setIsKeyConfigured(false);
          return;
        }

        setIsKeyConfigured(true);
      } catch (error) {
        console.error('Error in API key verification:', error);
        setIsKeyConfigured(false);
      }
    };

    fetchApiKey();
  }, []);

  const handleApiError = (message: string) => {
    if (message.includes('API key')) {
      setIsKeyConfigured(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8 min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-950 dark:to-purple-950">
      <Header />
      
      {!isKeyConfigured ? (
        <ApiKeyConfig />
      ) : (
        <>
          <RecipeSection onError={handleApiError} />
          <SavedSmoothies />
        </>
      )}
    </div>
  );
};

export default Index;