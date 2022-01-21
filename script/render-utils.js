
import { fetchAllRecipes, fetchMyRecipes, getUser, fetchSingleRecipe, decrementRecipeRating, incrementRecipeRating, getUserProfile } from './fetch-utils.js';

const loggedOutButtons = document.querySelector('.login-div');
const loggedInButton = document.querySelector('.logged-in-div');

export const renderHeader = async() => {
    const user = await getUser();
    if (user) {
        loggedInButton.classList.remove('visibility');
        loggedOutButtons.classList.add('visibility');
    } else {
        loggedInButton.classList.add('visibility');
        loggedOutButtons.classList.remove('visibility');
    }
    const userProfile = await getUserProfile(user.id);
    const userName = document.querySelector('.user-name');
    userName.textContent = userProfile.username;
};

export async function renderRecipes() {
    const recipes = await fetchAllRecipes();
    console.log(recipes);
    const postCardsContainer = document.querySelector('.post-cards-container');
    postCardsContainer.textContent = '';

    for (let recipe of recipes) {
        const postCardSection = document.createElement('section');
        postCardSection.classList.add('post-card');
        const sidebarDiv = document.createElement('div');
        sidebarDiv.classList.add('side-bar');
        const arrowUpButton = document.createElement('p');
        arrowUpButton.classList.add('arrow', 'up');
        const arrowDownButton = document.createElement('p');
        arrowDownButton.classList.add('arrow', 'down');
        const counterP = document.createElement('p');
        counterP.classList.add('counter');

        arrowDownButton.textContent = '▼';
        arrowUpButton.textContent = '▲';


        arrowDownButton.addEventListener('click', async() => {
            await decrementRecipeRating(recipe.id);
            counterP.textContent = recipe.recipe_rating[0].rating;
            await renderRecipes();
            // await updateBool(recipe.id, true);
        });


        arrowUpButton.addEventListener('click', async() => {
            await incrementRecipeRating(recipe.id);
            counterP.textContent = recipe.recipe_rating[0].rating;
            await renderRecipes();
        });

        counterP.textContent = recipe.recipe_rating[0].rating;

        sidebarDiv.append(arrowUpButton, counterP, arrowDownButton);

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        cardInner.addEventListener('click', async()=> {
            location.replace(`./details/index.html?id=${recipe.id}`);
            await renderRecipeDetails();
        });


        const userDiv = document.createElement('div');
        userDiv.classList.add('user-div');
        const userImage = document.createElement('img');
        userImage.classList.add('user-img');
        userImage.src = './assets/nick.png';
        const timeStamp = document.createElement('p');
        timeStamp.classList.add('created-at');

        userDiv.append(userImage, timeStamp);

        const cardTitle = document.createElement('h3');
        cardTitle.classList.add('card-title');

        const imgOrText = document.createElement('div');
        imgOrText.classList.add('img-or-text');

        if (!recipe.image && !recipe.description) {
            imgOrText.classList.add('nothing');
        } else if (!recipe.image) {
            imgOrText.textContent = recipe.description;
        } else {
            imgOrText.style.backgroundImage = `url('${recipe.image}')`;
        }

        timeStamp.textContent = recipe.created_at;
        cardTitle.textContent = recipe.name;
        cardInner.append(userDiv, cardTitle, imgOrText);
        postCardSection.append(sidebarDiv, cardInner);
        postCardsContainer.append(postCardSection);
    }
}
export async function renderMyRecipes() {
    const recipes = await fetchMyRecipes();

    const postCardsContainer = document.querySelector('.post-cards-container');
    postCardsContainer.textContent = '';

    for (let recipe of recipes) {
        const postCardSection = document.createElement('section');
        postCardSection.classList.add('post-card');
        const sidebarDiv = document.createElement('div');
        sidebarDiv.classList.add('side-bar');
        const arrowUpButton = document.createElement('p');
        arrowUpButton.classList.add('arrow', 'up');
        const arrowDownButton = document.createElement('p');
        arrowDownButton.classList.add('arrow', 'down');
        const counterP = document.createElement('p');
        counterP.classList.add('counter');

        arrowDownButton.textContent = '▼';
        arrowUpButton.textContent = '▲';
        console.log(recipe);

        arrowDownButton.addEventListener('click', async() => {
            await decrementRecipeRating(recipe.id);
            counterP.textContent = recipe.recipe_rating[0].rating;
            await renderMyRecipes();
            // await updateBool(recipe.id, true);
        });


        arrowUpButton.addEventListener('click', async() => {
            await incrementRecipeRating(recipe.id);
            counterP.textContent = recipe.recipe_rating[0].rating;
            await renderMyRecipes();
        });

        console.log(recipe.recipe_rating.rating);
        counterP.textContent = recipe.recipe_rating[0].rating;

        sidebarDiv.append(arrowUpButton, counterP, arrowDownButton);

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        cardInner.addEventListener('click', async()=> {
            location.replace(`../details/index.html?id=${recipe.id}`);
            await renderRecipeDetails();
        });


        const userDiv = document.createElement('div');
        userDiv.classList.add('user-div');
        const userImage = document.createElement('img');
        userImage.classList.add('user-img');
    
        userImage.src = './assets/nick.png';
        const timeStamp = document.createElement('p');
        timeStamp.classList.add('created-at');

        userDiv.append(userImage, timeStamp);

        const cardTitle = document.createElement('h3');
        cardTitle.classList.add('card-title');

        const imgOrText = document.createElement('div');
        imgOrText.classList.add('img-or-text');
        // console.log(recipe.image, recipe.description);
        if (!recipe.image && !recipe.description) {
            imgOrText.classList.add('nothing');
        } else if (recipe.description) {
            imgOrText.textContent = recipe.description;
        } else {
            imgOrText.style.backgroundImage = `url('${recipe.image}')`;
        }

        timeStamp.textContent = recipe.created_at;
        cardTitle.textContent = recipe.name;
        cardInner.append(userDiv, cardTitle, imgOrText);
        postCardSection.append(sidebarDiv, cardInner);
        postCardsContainer.append(postCardSection);
    }
}

export async function renderRecipeDetails() {
    const user = await getUserProfile();
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const recipe = await fetchSingleRecipe(id);
    const recipeDetailsPage = document.querySelector('.right');
    recipeDetailsPage.textContent = '';
    const recipeName = document.querySelector('.detail-header');
    recipeName.textContent = recipe.name;

    const counter = document.querySelector('.counter');
    counter.textContent = recipe.recipe_rating[0].rating;
    const userDiv = document.createElement('div');
    userDiv.classList.add('user-div');

    const userImage = document.createElement('img');
    userImage.classList.add('user-img');
    userImage.src = '../assets/nick.png';

    const timeStamp = document.createElement('p');
    const userName = document.createElement('p');
    userName.textContent = user.username;
    timeStamp.classList.add('created-at');
    timeStamp.textContent = recipe.created_at;

    userDiv.append(userImage, userName, timeStamp);

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('recipe-details-container');

    const foodImage = document.createElement('img');
    foodImage.classList.add('dish-img');
    foodImage.setAttribute('alt', 'Image how good this dish is gonna taste');
    foodImage.src = recipe.image;

    const dishDescription = document.createElement('p');
    dishDescription.classList.add('dish-description');
    dishDescription.textContent = recipe.description;

    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('recipe-display-container');

    const ingredients = document.createElement('div');
    ingredients.classList.add('ingredients');

    const ingredientLabel = document.createElement('h3');
    ingredientLabel.textContent = 'Ingredients';

    const ingredientsList = document.createElement('ul');

    for (let ingredient of recipe.ingredients) {
        const listItem = document.createElement('li');
        // const quantityItem = { ingredient };
        // console.log(quantityItem);
        const newObject = JSON.parse(ingredient);
        listItem.textContent = `${newObject.quantity} ${newObject.name} ${newObject.prep}`;
        ingredientsList.append(listItem);
    }
    ingredients.append(ingredientLabel, ingredientsList);

    const directions = document.createElement('div');
    directions.classList.add('directions');

    const directionLabel = document.createElement('h3');
    directionLabel.textContent = 'Directions';

    const directionsList = document.createElement('ol');

    for (let direction of recipe.directions) {
        const listItem = document.createElement('li');
        listItem.textContent = direction;
        directionsList.append(listItem);
    }

    directions.append(directionLabel, directionsList);

    ingredientsContainer.append(ingredients, directions);

    detailsContainer.append(foodImage, dishDescription, ingredientsContainer);

    recipeDetailsPage.append(userDiv, detailsContainer);

}



