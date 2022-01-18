import { getUser } from './fetch-utils.js';

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