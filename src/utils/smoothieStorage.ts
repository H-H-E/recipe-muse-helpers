interface SavedSmoothie {
  id: string;
  recipes: any[];
  ingredients: string;
  timestamp: number;
  isPublic: boolean;
}

export const saveSmoothieRecipes = (recipes: any[], ingredients: string, isPublic: boolean = false) => {
  const savedSmoothies = getSavedSmoothies();
  const newSmoothie: SavedSmoothie = {
    id: crypto.randomUUID(),
    recipes,
    ingredients,
    timestamp: Date.now(),
    isPublic: isPublic
  };
  
  savedSmoothies.unshift(newSmoothie);
  localStorage.setItem('savedSmoothies', JSON.stringify(savedSmoothies));
  console.log('Saved smoothie:', newSmoothie);
  return newSmoothie;
};

export const getSavedSmoothies = (): SavedSmoothie[] => {
  const saved = localStorage.getItem('savedSmoothies');
  return saved ? JSON.parse(saved) : [];
};