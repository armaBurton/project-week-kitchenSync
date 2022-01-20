import { 
    incrementRecipeRating, 
    decrementRecipeRating, 
    fetchSingleRecipe,
    getUser,
    logout
} from '../script/fetch-utils.js';
import { 
    renderRecipeDetails,
    renderHeader
} from '../script/render-utils.js';


renderHeader();
renderRecipeDetails();

const loggedOutButtons = document.querySelector('.login-div');

const loggedInButton = document.querySelector('.logged-in-div');

const logoutButton = document.querySelector('#logout-button');

const createRecipeButton = document.getElementById('create-recipe');
const signInDisplay = document.getElementById('login');

const upArrow = document.getElementById('up');
const downArrow = document.getElementById('down');
const counter = document.querySelector('.counter');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

upArrow.addEventListener('click', async() => {
    const recipe = await fetchSingleRecipe(id);
    await incrementRecipeRating(recipe.id);
    counter.textContent = recipe.rating;
    await renderRecipeDetails();
});

downArrow.addEventListener('click', async() => {
    const recipe = await fetchSingleRecipe(id);
    await decrementRecipeRating(recipe.id);
    counter.textContent = recipe.rating;
    await renderRecipeDetails();
});

createRecipeButton.addEventListener('click', async() => {
    const user = await getUser();
    if (user) {
        location.replace('../create-recipe');
    } else {
        signInDisplay.classList.remove('visibility');
        renderHeader();
    }

});

logoutButton.addEventListener('click', async() => {
    await logout();
    loggedInButton.classList.remove('visibility');
    loggedOutButtons.classList.add('visibility');
});

