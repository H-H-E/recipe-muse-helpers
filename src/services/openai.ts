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
   - Use spices/herbs for complexity ${strictMode ? 'only if listed in the ingredients' : ''}

${strictMode ? 'IMPORTANT: You must ONLY use ingredients that were explicitly provided. Do not add any additional ingredients, even common ones like ice or water unless they were specified in the input.' : ''}

Return your response in this format for each smoothie:
{
  "recipes": [
    {
      "name": "Creative Smoothie Name",
      "ingredients": ["ingredient 1", "ingredient 2", ...],
      "instructions": ["step 1", "step 2", ...],
      "nutritionalBenefits": ["benefit 1", "benefit 2", ...]
    }
  ]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Generate ${numIdeas} smoothie recipe${numIdeas > 1 ? 's' : ''} using ${strictMode ? 'ONLY' : 'some or all of'} these ingredients: ${ingredients}. 
          ${strictMode ? 'DO NOT include any ingredients that are not in this list.' : 'You may suggest complementary ingredients.'}`
        }
      ],
      temperature: strictMode ? 0.3 : 0.7,
      max_tokens: 1000,
    });

    console.log('OpenAI response:', response);
    
    try {
      const content = response.choices[0].message.content;
      const parsedResponse = JSON.parse(content);
      if (!parsedResponse.recipes || !Array.isArray(parsedResponse.recipes)) {
        throw new Error('Invalid response format from OpenAI');
      }
      return parsedResponse.recipes;
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError);
      throw new Error('Failed to parse the recipe response. Please try again.');
    }
  } catch (error) {
    console.error('Error generating recipes:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An unexpected error occurred while generating recipes');
    }
  }
};