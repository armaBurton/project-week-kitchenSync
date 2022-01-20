import {
    incrementRecipeRating,
    decrementRecipeRating,
    fetchSingleRecipe,
} from '../script/fetch-utils.js';
import {
    renderRecipeDetails
} from '../script/render-utils.js';

renderRecipeDetails();
const upArrow = document.getElementById('up');
const downArrow = document.getElementById('down');
const counter = document.querySelector('.counter');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

upArrow.addEventListener('click', async() => {
    const recipe = await fetchSingleRecipe(id);
    await incrementRecipeRating(recipe.id);
    counter.textContent = recipe.recipe_rating[0].rating;
    await renderRecipeDetails();
    console.log(recipe.recipe_rating[0].rating);
});

downArrow.addEventListener('click', async() => {
    const recipe = await fetchSingleRecipe(id);
    await decrementRecipeRating(recipe.id);
    counter.textContent = recipe.recipe_rating[0].rating;
    await renderRecipeDetails();
});

