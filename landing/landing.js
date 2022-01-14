import { createRecipe, fetchSingleRecipe } from "../script/fetch-utils.js";

const recipe = {
    name: 'yummiest dish',
    description: 'This is a super yummy dish',
    ingredients: [
        {
            name: 'tomato',
            quantity: 1, 
            prep: 'sliced'
        }
    ],
    directions: ['do a thing', 'do another thing', 'enjoy'],
    keywords: ['yummyer', 'tomato', 'food']
};

createRecipe(recipe);
fetchSingleRecipe(17);
