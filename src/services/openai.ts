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
  
  // Fetch the API key from the Edge Function
  const { data: { key }, error: keyError } = await supabase.functions.invoke('manage-openai-key', {
    method: 'GET'
  });

  if (keyError || !key) {
    throw new Error('OpenAI API key not found. Please set your API key first.');
  }

  const openai = new OpenAI({
    apiKey: key,
    dangerouslyAllowBrowser: true
  });
  
  try {
    const systemPrompt = `You are a creative smoothie expert tasked with generating unique and delicious smoothie ideas based on given ingredients or flavors. Your goal is to create appealing smoothie combinations that are both nutritious and flavorful.

Follow these steps to create your smoothie ideas:
1. Analyze the given ingredients, considering their taste profiles, nutritional benefits, and how they might complement each other.
2. For each smoothie:
   - ${strictMode ? 'You MUST ONLY use ingredients from the provided list. Do not suggest or include ANY additional ingredients.' : 'Use some or all of the provided ingredients, plus complementary ingredients that would enhance the smoothie'}
   - Consider texture and consistency
   - Create a creative name
3. Guidelines for balanced smoothies:
   - Mix sweet and tart flavors when possible
   - Include creamy elements if available
   - Add appropriate liquid bases ${strictMode ? 'only if provided in the ingredients list' : ''}
   - Consider nutritional boosters if available
   - Use spices/herbs for complexity ${strictMode ? 'only if listed in the ingredients' : 'as appropriate'}

${strictMode ? 'IMPORTANT: You must ONLY use ingredients that were explicitly provided. Do not add any additional ingredients, even common ones like ice or water unless they were specified in the input.' : ''}

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
          content: `Generate ${numIdeas} smoothie recipe${numIdeas > 1 ? 's' : ''} using ${strictMode ? 'ONLY' : 'some or all of'} these ingredients: ${ingredients}. 
          ${strictMode ? 'DO NOT include any ingredients that are not in this list.' : 'You may suggest complementary ingredients.'}
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
      temperature: strictMode ? 0.3 : 0.7,
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