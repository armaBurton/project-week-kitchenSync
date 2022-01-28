import { logout, redirectIfLoggedIn, signInUser, signupUser } from '../script/fetch-utils.js';
import { renderHeader } from '../script/render-utils.js';

const jack = document.getElementById('jack');
const philippe = document.getElementById('philippe');
const arma = document.getElementById('arma');
const alex = document.getElementById('alex');

const logoutButton = document.querySelector('#logout-button');

const signUpButton = document.querySelector('#sign-up-button');
const signUpDisplay = document.getElementById('signup');
const signUpForm = document.getElementById('sign-up');
const signUpEmail = document.getElementById('sign-up-email');
const signUpPassword = document.getElementById('sign-up-password');

const signInButton = document.querySelector('#sign-in-button');
const signInDisplay = document.getElementById('login');
const signInForm = document.getElementById('sign-in');
const signInEmail = document.getElementById('sign-in-email');
const signInPassword = document.getElementById('sign-in-password');

const xOutButton = document.querySelectorAll('.close-popup');
const switchModalButton = document.querySelector('.new-user-span');




renderHeader();

logoutButton.addEventListener('click', async() => {
    await logout();
    location.replace('../');
});

signUpButton.addEventListener('click', () => {
    signUpDisplay.classList.remove('visibility');
});

signInButton.addEventListener('click', () => {
    signInDisplay.classList.remove('visibility');

});

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

switchModalButton.addEventListener('click', () => {
    signInDisplay.classList.add('visibility');
    signUpDisplay.classList.remove('visibility');
});

for (let button of xOutButton) {
    button.addEventListener('click', () => {
        signInDisplay.classList.add('visibility');
        signUpDisplay.classList.add('visibility');
    });
}

function visitGithub(name) {
    location.replace(`https://github.com/${name}`);
}

alex.addEventListener('click', () => {
    visitGithub('alex-i-blair');
});

arma.addEventListener('click', () => {
    visitGithub('armaBurton');
});

philippe.addEventListener('click', () => {
    visitGithub('philngom');
});

jack.addEventListener('click', () => {
    visitGithub('CadillacJack42');
});
