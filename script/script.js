import {
    redirectIfLoggedIn,
    signInUser,
    signupUser,
    getUser,
    logout,
} from './fetch-utils.js';
import { renderHeader, renderMyRecipes, renderRecipes } from './render-utils.js';


const signUpButton = document.querySelector('#sign-up-button');
const signInButton = document.querySelector('#sign-in-button');

const logoutButton = document.querySelector('#logout-button');

const signInDisplay = document.getElementById('login');
const signInForm = document.getElementById('sign-in');
const signInEmail = document.getElementById('sign-in-email');
const signInPassword = document.getElementById('sign-in-password');

const signUpDisplay = document.getElementById('signup');
const signUpForm = document.getElementById('sign-up');
const signUpEmail = document.getElementById('sign-up-email');
const signUpPassword = document.getElementById('sign-up-password');

const xOutButton = document.querySelectorAll('.close-popup');
const switchModalButton = document.querySelector('.new-user-span');

const loggedOutButtons = document.querySelector('.login-div');

const loggedInButton = document.querySelector('.logged-in-div');

const createRecipeButton = document.getElementById('create-recipe');

const myrecipesBtn = document.getElementById('my-recipes');
const allRecipesBtn = document.getElementById('all-recipes');
allRecipesBtn.classList.add('visibility');

// redirectIfLoggedIn();

renderHeader();


switchModalButton.addEventListener('click', () => {
    signInDisplay.classList.add('visibility');
    signUpDisplay.classList.remove('visibility');
});

logoutButton.addEventListener('click', async() => {
    await logout();
    loggedInButton.classList.remove('visibility');
    loggedOutButtons.classList.add('visibility');
});

signUpButton.addEventListener('click', () => {
    signUpDisplay.classList.remove('visibility');
});

signInButton.addEventListener('click', () => {
    signInDisplay.classList.remove('visibility');

});

for (let button of xOutButton) {
    button.addEventListener('click', () => {
        signInDisplay.classList.add('visibility');
        signUpDisplay.classList.add('visibility');
    });
}


signUpForm.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const data = new FormData(signUpForm);
    const username = data.get('user-name');
    const user = await signupUser(signUpEmail.value, signUpPassword.value, username);
    if (user){
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});

signInForm.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const user = await signInUser(signInEmail.value, signInPassword.value);
    if (user){
        redirectIfLoggedIn();
    } else {
        console.error(user);
    }
});

createRecipeButton.addEventListener('click', async() => {
    const user = await getUser();
    if (user) {
        location.replace('./create-recipe');
    } else {
        signInDisplay.classList.remove('visibility');
        renderHeader();
    }

});

myrecipesBtn.addEventListener('click', async() => {
    await renderMyRecipes();
    myrecipesBtn.classList.add('visibility');
    allRecipesBtn.classList.remove('visibility');
});

allRecipesBtn.addEventListener('click', async() => {
    await renderRecipes();
    myrecipesBtn.classList.remove('visibility');
    allRecipesBtn.classList.add('visibility');
});

