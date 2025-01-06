import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export const ApiKeyConfig = () => {
  return (
    <Card className="max-w-2xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 border-2 border-purple-100 dark:border-purple-900">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">OpenAI API Key Configuration Required</CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          The OpenAI API key needs to be configured in the Supabase project settings
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p>To configure the API key:</p>
          <ol className="list-decimal list-inside space-y-2 mt-2">
            <li>Get your OpenAI API key from the OpenAI platform</li>
            <li>Add it to the Supabase Edge Function secrets</li>
            <li>Refresh this page</li>
          </ol>
        </div>
        <a
          href="https://platform.openai.com/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <ExternalLink className="w-4 h-4" />
          Get your OpenAI API key
        </a>
      </CardContent>
    </Card>
  );
};