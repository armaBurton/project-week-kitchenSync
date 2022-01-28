import {
    incrementRecipeRating,
    decrementRecipeRating,
    fetchSingleRecipe,
    getUser,
    logout,
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

function makeIncrementHandler(shouldIncrement) {
    async() => {
        const recipe = await fetchSingleRecipe(id);

        if (shouldIncrement) {
            await incrementRecipeRating(recipe.id);
        } else {
            await decrementRecipeRating(recipe.id);  
        }
        counter.textContent = recipe.recipe_rating[0].rating;
        await renderRecipeDetails();

    };
}

upArrow.addEventListener('click', makeIncrementHandler(true));

downArrow.addEventListener('click', makeIncrementHandler());

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

// const voteObj = {
// const vote = await getUserVote();
// console.log(vote);
//     recipe: recipe.id,
//     upVote: false,
//     downVote: false
// };
// let isInArr = false;
// for (let v of vote) {
//     if (v.recipe === id) {
//         isInArr = true;
//         if (v.upVote) {
//             v.upVote = false;
//         } else {
//             v.upVote = true;
//             v.downVote = false;
//         }
//     }
// }
// if (!isInArr) {
//     vote.push(voteObj);
// }
// updateVote(vote);
