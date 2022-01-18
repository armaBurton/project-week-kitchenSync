import { renderHeader } from '../script/render-utils.js';

const newIngredientRowButton = document.getElementById('add-row-button');
const ingredientsInputContainer = document.getElementById('ingredient-list-div');

const recipeForm = document.getElementById('add-recipe-form');

recipeForm.addEventListener('submit', async() => {
    const form = new FormData(recipeForm);

    const dishName = form.get('dish-name');
    const description = form.get('description');


});

newIngredientRowButton.addEventListener('click', () => {

    const containerLength = ingredientsInputContainer.children.length;
    const ingredientObjectDiv = document.createElement('div');
    ingredientObjectDiv.classList.add('input-ingredient-row');
    for (let i = 0; i < ingredientsInputContainer.children.length; i++) {
    
        const itemNameInput = document.createElement('input');
        itemNameInput.setAttribute('type', 'text');
        itemNameInput.setAttribute('name', `name-${i + 1}`);
        itemNameInput.setAttribute('placeholder', 'name');
    
        const quanInput = document.createElement('input');
        quanInput.setAttribute('type', 'number');
        quanInput.setAttribute('value', '1');
        quanInput.setAttribute('name', `quantity-${i + 1}`);
        quanInput.setAttribute('placeholder', 'quantity');
    
        const prepInput = document.createElement('input');
        prepInput.setAttribute('type', 'text');
        prepInput.setAttribute('name', `prep-${i + 1}`);
        prepInput.setAttribute('placeholder', 'prep');

        ingredientObjectDiv.append(quanInput, itemNameInput, prepInput);
    }
    ingredientsInputContainer.append(ingredientObjectDiv);

});

const addDirectionRowButton = document.getElementById('add-direction-row-button');
addDirectionRowButton.classList.add(`add-direction-row-button`);
const inputDirectionRowContainer = document.querySelector(`.directions-container`);

addDirectionRowButton.addEventListener(`click`, () => {
    const inputDirectionRow = document.createElement(`div`);
    inputDirectionRow.classList.add(`input-direction-row`);

    for (let i = 0, num = 1; i < inputDirectionRowContainer.children.length; i++, num++){
        inputDirectionRow.textContent = ``;
        const directionText = document.createElement(`textarea`);
        directionText.setAttribute(`type`, `text`);
        directionText.setAttribute(`name`, `name-${i + 1}`);
        directionText.setAttribute(`placeholder`, `step-${num + 1}`);

        inputDirectionRow.append(directionText);
    }
    inputDirectionRowContainer.append(inputDirectionRow);
});