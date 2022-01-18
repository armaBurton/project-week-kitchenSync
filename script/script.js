import {
    redirectIfLoggedIn,
    signInUser,
    signupUser,
} from './fetch-utils.js';

const signUpButton = document.querySelector('#sign-up-button');
const signInButton = document.querySelector('#sign-in-button');

const signInForm = document.getElementById('sign-in');
const signInEmail = document.getElementById('sign-in-email');
const signInPassword = document.getElementById('sign-in-password');

const signUpDisplay = document.getElementById('signup');
const signUpForm = document.getElementById('sign-up');
const signUpEmail = document.getElementById('sign-up-email');
const signUpPassword = document.getElementById('sign-up-password');

redirectIfLoggedIn();

signUpButton.addEventListener('click', () => {
    console.log('im inside signup');
    signUpDisplay.classList.remove('visibility');
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