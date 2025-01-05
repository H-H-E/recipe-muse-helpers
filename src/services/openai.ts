import OpenAI from 'openai';
import { supabase } from "@/integrations/supabase/client";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritionalBenefits?: string[];
}

export const generateSmoothieRecipes = async (
  ingredients: string,
  numIdeas: number,
  strictMode: boolean
): Promise<Recipe[]> => {
  console.log('Generating smoothie recipes with:', { ingredients, numIdeas, strictMode });
  
  // Fetch the API key from Supabase
  const { data, error } = await supabase
    .from('api_keys')
    .select('key_value')
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    throw new Error('OpenAI API key not found. Please set your API key first.');
  }

  const openai = new OpenAI({
    apiKey: data.key_value,
    dangerouslyAllowBrowser: true
  });
  
  try {
    const systemPrompt = `You are a creative smoothie expert tasked with generating unique and delicious smoothie ideas based on given ingredients or flavors. Your goal is to create appealing smoothie combinations that are both nutritious and flavorful.

Follow these steps to create your smoothie ideas:
1. Analyze the given ingredients, considering their taste profiles, nutritional benefits, and how they might complement each other.
2. For each smoothie:
   - ${strictMode ? 'ONLY use ingredients from the provided list' : 'Use some or all of the provided ingredients, plus complementary ingredients'}
   - Consider texture and consistency
   - Create a creative name
3. Guidelines for balanced smoothies:
   - Mix sweet and tart flavors
   - Include creamy elements
   - Add appropriate liquid bases
   - Consider nutritional boosters
   - Use spices/herbs for complexity

Always return your response in valid JSON format with the exact structure shown in the example.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Generate ${numIdeas} smoothie recipes using ${strictMode ? 'only' : 'some or all of'} these ingredients: ${ingredients}. 
          Return the response in this exact JSON format:
          {
            "recipes": [
              {
                "name": "string",
                "ingredients": ["string"],
                "instructions": ["string"],
                "nutritionalBenefits": ["string"]
              }
            ]
          }`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    console.log('OpenAI response:', response);
    const parsedResponse = JSON.parse(response.choices[0].message.content);
    return parsedResponse.recipes;
  } catch (error) {
    console.error('Error generating recipes:', error);
    throw error;
  }
};