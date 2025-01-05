import OpenAI from 'openai';

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritionalBenefits?: string[];
}

export const generateSmoothieRecipes = async (ingredients: string, numIdeas: number): Promise<Recipe[]> => {
  console.log('Generating smoothie recipes with:', { ingredients, numIdeas });
  
  const apiKey = localStorage.getItem('OPENAI_API_KEY');
  if (!apiKey) {
    throw new Error('OpenAI API key not found. Please set your API key first.');
  }

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });
  
  try {
    const systemPrompt = `You are a creative smoothie expert tasked with generating unique and delicious smoothie ideas based on given ingredients or flavors. Your goal is to create appealing smoothie combinations that are both nutritious and flavorful.

Follow these steps to create your smoothie ideas:
1. Analyze the given ingredients, considering their taste profiles, nutritional benefits, and how they might complement each other.
2. For each smoothie:
   - Choose ingredients that work well together
   - Add complementary ingredients that enhance flavor or nutrition
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
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Generate ${numIdeas} smoothie recipes using some or all of these ingredients: ${ingredients}. 
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