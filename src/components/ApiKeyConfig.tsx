import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExternalLink, Key, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ApiKeyConfigProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  setIsKeyConfigured: (configured: boolean) => void;
}

export const ApiKeyConfig = ({ apiKey, setApiKey, setIsKeyConfigured }: ApiKeyConfigProps) => {
  const { toast } = useToast();

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter an API key",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('manage-openai-key', {
        method: 'POST',
        body: { apiKey }
      });

      if (error) throw error;

      setIsKeyConfigured(true);
      toast({
        title: "Success",
        description: "API key saved successfully!",
      });
    } catch (error) {
      console.error('Error saving API key:', error);
      toast({
        title: "Error",
        description: "Failed to save API key",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border-2 border-purple-100 dark:border-purple-900">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Configure Your AI Assistant</CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          To unlock the magic of AI-powered recipe generation, please provide your OpenAI API key
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
          <Button onClick={handleSaveApiKey} className="flex gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
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
  );
};