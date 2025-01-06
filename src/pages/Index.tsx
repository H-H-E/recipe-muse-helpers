import { Header } from "@/components/Header";
import { ApiKeyConfig } from "@/components/ApiKeyConfig";
import { RecipeSection } from "@/components/RecipeSection";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-gray-950 dark:to-purple-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        
        {!isKeyConfigured ? (
          <div className="max-w-2xl mx-auto">
            <ApiKeyConfig />
          </div>
        ) : (
          <RecipeSection onError={(message) => {
            if (message.includes('API key')) {
              setIsKeyConfigured(false);
            }
          }} />
        )}
      </div>
    </div>
  );
};

export default Index;