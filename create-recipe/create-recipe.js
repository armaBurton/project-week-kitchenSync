import { renderHeader } from '../script/render-utils.js';

const newIngredientRowButton = document.getElementsId('add-row-button');
const ingredientsInputContainer = document.getElementById('ingredient-list-div');


const recipeForm = document.getElementById('add-recipe-form');

recipeForm.addEventListener('submit', async() => {
    const form = new FormData(recipeForm);

    const dishName = form.get('dish-name');
    const description = form.get('description');


});

newIngredientRowButton.addEventListener('click', () => {
    const ingredientObjectDiv = document.createElement('div');

    const dirInput = document.createElement('input');
    dirInput.setAttribute('type', 'text');
    dirInput.setAttribute('name', 'directions');
    dirInput.setAttribute('placeholder', 'name');

    const quanInput = document.createElement('input');
    quanInput.setAttribute('type', 'text');
    quanInput.setAttribute('name', 'quantity');
    quanInput.setAttribute('placeholder', 'quantity');

    const prepInput = document.createElement('input');
    prepInput.setAttribute('type', 'text');
    prepInput.setAttribute('name', 'prep');
    prepInput.setAttribute('placeholder', 'prep');
});