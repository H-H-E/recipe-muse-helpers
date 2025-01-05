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
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a creative smoothie expert. Generate unique and delicious smoothie recipes in JSON format. Each recipe should include a creative name, list of ingredients, step-by-step instructions, and nutritional benefits.`
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