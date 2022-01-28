import { renderHeader } from '../script/render-utils.js';
import { createRecipe, checkAuth, uploadRecipeImage, getUser, logout } from '../script/fetch-utils.js';

const newIngredientRowButton = document.getElementById('add-row-button');
const ingredientsInputContainer = document.getElementById('ingredient-list-div');

const recipeForm = document.getElementById('add-recipe-form');
const cancelButton = document.getElementById('cancel-button');

const logoutButton = document.querySelector('#logout-button');

checkAuth();
renderHeader();

cancelButton.addEventListener('click', () => {
    window.location.href = `../`;

    // recipeForm.reset();
});

recipeForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const form = new FormData(recipeForm);

    const dishName = form.get('dish-name');
    const description = form.get('description');
    // const ingredientsArr = [];
    // for (let i = 0; i < ingredientsInputContainer.children.length; i++) {
    //     // very cool way to get an unpredictable number of items from a from. Seems like one of those famously rare use-case for a this kind of for-loop
    //     const ingredientObj = {
    //         quantity: form.get(`quantity-${i}`),
    //         name: form.get(`name-${i}`),
    //         prep: form.get(`prep-${i}`)
    //     };
    //     ingredientsArr.push(ingredientObj);
    // }

    // on second thought, would a map work? I think it hinges on whether we can turn `children` into a real array using Array.from
    const ingredientsArr = Array.from(ingredientsInputContainer.children)
        .map((item, i) => ({
            quantity: form.get(`quantity-${i}`),
            name: form.get(`name-${i}`),
            prep: form.get(`prep-${i}`)
        }));

    const directionsArr = Array.from(inputDirectionRowContainer.children)
        .map((item, i) => form.get(`direction-name-${i}`));

    const dishImg = form.get('dish-image');
    const user = await getUser();
    const recipe = {
        name: dishName,
        ingredients: ingredientsArr,
        description,
        directions: directionsArr,
        image: `https://esjhwxqfmwrbnnyyxfav.supabase.in/storage/v1/object/public/recipe-images/${user.id}/${dishImg.name}`
    };
    await uploadRecipeImage(dishImg);

    await createRecipe(recipe);
    window.location.href = `../`;
});

newIngredientRowButton.addEventListener('click', () => {

    const ingredientObjectDiv = document.createElement('div');
    ingredientObjectDiv.classList.add('input-ingredient-row');
    for (let i = 0; i < ingredientsInputContainer.children.length; i++) {
        ingredientObjectDiv.textContent = '';
        const itemNameInput = document.createElement('input');
        itemNameInput.setAttribute('type', 'text');
        itemNameInput.setAttribute('name', `name-${i + 1}`);
        itemNameInput.setAttribute('placeholder', 'name');

        const quanInput = document.createElement('input');
        quanInput.setAttribute('type', 'text');
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
        directionText.setAttribute(`name`, `direction-name-${i + 1}`);
        directionText.setAttribute(`placeholder`, `Step ${num + 1}`);

        inputDirectionRow.append(directionText);
    }
    inputDirectionRowContainer.append(inputDirectionRow);
});

logoutButton.addEventListener('click', async() => {
    await logout();
});