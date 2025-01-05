import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: localStorage.getItem('OPENAI_API_KEY') || '',
  dangerouslyAllowBrowser: true
});

export const generateSmoothieRecipes = async (ingredients: string, numIdeas: number) => {
  console.log('Generating smoothie recipes with:', { ingredients, numIdeas });
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a creative smoothie expert tasked with generating unique and delicious smoothie ideas based on given ingredients or flavors. Your goal is to create appealing smoothie combinations that are both nutritious and flavorful.`
        },
        {
          role: "user",
          content: `
<ingredients>${ingredients}</ingredients>
<num_ideas>${numIdeas}</num_ideas>

Follow these steps to create your smoothie ideas:

1. Analyze the given ingredients or flavors, considering their taste profiles, nutritional benefits, and how they might complement each other.

2. For each smoothie idea:
   a. Choose a combination of ingredients that work well together, including at least one item from the provided list.
   b. Consider adding complementary ingredients that enhance the flavor profile or nutritional value.
   c. Think about the texture and consistency of the smoothie.
   d. If appropriate, suggest a creative name for the smoothie.

3. Keep in mind the following guidelines for balanced and delicious smoothies:
   - Aim for a mix of sweet and tart flavors.
   - Include a creamy element (e.g., banana, avocado, or yogurt) for texture.
   - Consider adding a liquid base (e.g., almond milk, coconut water) if not specified in the ingredients.
   - Incorporate nutritional boosters like leafy greens or superfoods when appropriate.
   - Use spices or herbs to add depth and complexity to the flavor profile.

4. Present your smoothie ideas in a clear, numbered list format.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    console.log('OpenAI response:', response);
    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating recipes:', error);
    throw error;
  }
};