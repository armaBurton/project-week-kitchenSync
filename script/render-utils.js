import { fetchAllRecipes, getUser } from './fetch-utils.js';

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
};

export async function renderRecipes() {
    const recipes = await fetchAllRecipes();
    console.log(recipes);
    const postCardSection = document.querySelector('.post-card');
    const sidebarDiv = document.createElement('div');
    sidebarDiv.classList.add('side-bar');
    const arrowUpButton = document.createElement('p');
    arrowUpButton.classList.add('arrow', 'up');
    const arrowDownButton = document.createElement('p');
    arrowDownButton.classList.add('arrow', 'down');
    const counterP = document.createElement('p');
    counterP.classList.add('counter');

    arrowDownButton.textContent = '&#9660;';
    arrowUpButton.textContent = '&#9650;';

    sidebarDiv.append(arrowUpButton, counterP, arrowUpButton);

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
    const userDiv = document.createElement('div');
    userDiv.classList.add('user-div');

    const userImage = document.createElement('img');
    userImage.classList.add('user-img');
    userImage.src = '../assets/nick.png';
    const timeStamp = document.createElement('p');
    timeStamp.classList.add('created-at');

    userDiv.append(userImage, timeStamp);

    // for (let recipe of recipes) {
        
}