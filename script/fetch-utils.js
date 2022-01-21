const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyMTg0Mjc3LCJleHAiOjE5NTc3NjAyNzd9.kSPiiISCwyV3_bbykn8z6FThl1HvsZ0OFXo4evlAon8';

const SUPABASE_URL = 'https://esjhwxqfmwrbnnyyxfav.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export const loggedOutButtons = document.querySelector('.login-div');
export const loggedInButton = document.querySelector('.logged-in-div');

export const getUser = () => {
    const user = client.auth.user();
    return user;
};

export const getUserProfile = async() => {

    const response = await client
        .from('profile')
        .select()
        .single();

    return checkError(response);
};

export async function checkAuth() {
    const user = await getUser();
    if (!user) {
        location.replace('../');
    }
}

export async function redirectIfLoggedIn() {
    location.replace('./');

}

export async function signupUser(email, password, username){
    const response = await client.auth.signUp({ email, password });

    await client
        .from('profile')
        .insert([{
            username,
            email
        }]);

    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = './';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

export const fetchAllRecipes = async() => {
    const response = await client
        .from('recipes')
        .select('*, recipe_rating (*)');


    return checkError(response);
};

export const fetchMyRecipes = async() => {
    const user = getUser();
    const myrecipes = await client
        .from('recipes')
        .select()
        .match({ user_id: user.id });

    checkError(myrecipes);
};

export const fetchSingleRecipe = async(id) => {
    const response = await client
        .from('recipes')
        .select(`*, recipe_rating (*)`)
        .match({ id })
        .single();
    return checkError(response);
};

export const deleteRecipe = async(id) => {
    const response = await client
        .from('recipes')
        .delete()
        .match({ id });

    return checkError(response);
};

export const incrementRecipeRating = async(id) => {
    const recipe = await fetchSingleRecipe(id);

    const response = await client
        .from('recipe_rating')
        .update({
            rating: recipe.recipe_rating[0].rating + 1
        })
        .match({ recipe_id: id });


    return checkError(response);
};

export const decrementRecipeRating = async(id) => {
    const recipe = await fetchSingleRecipe(id);

    const response = await client
        .from('recipe_rating')
        .update({ rating: recipe.recipe_rating[0].rating - 1 })
        .match({ recipe_id: id });

    return checkError(response);
};

export const incrementUserRating = async() => {
    const user = await getUserProfile();

    const response = await client
        .from('profile')
        .update({ rating: user.rating + 1 })
        .match({ user_id: user.user_id });

    return checkError(response);
};

export const decrementUserRating = async() => {
    const user = await getUserProfile();

    const response = await client
        .from('profile')
        .update({ rating: user.rating - 1 })
        .match({ user_id: user.user_id });

    return checkError(response);
};

export const createRecipe = async(recipe) => {
    const response = await client
        .from('recipes')
        .insert(
            recipe
        );

    const single = await fetchSingleRecipe(response.data[0].id);
    console.log(single);
    await insertRecipeRatingRow(single.id);

    return checkError(response);
};

export const deleteProfile = async() => {
    const user = await getUserProfile();

    const response = await client
        .from('profile')
        .delete()
        .match({ user_id: user.user_id });
    logout();
    location.replace('../');

    return checkError(response);
};

export const uploadRecipeImage = async(image) => {
    const user = await getUser();
    const response = await client
        .storage
        .from('recipe-images')
        .upload(`${user.id}/${image.name}`, image, {
            cacheControl: '3600',
            upsert: false
        });
    return checkError(response);
};

export const updateBool = async(id, bool) => {
    const response = await client
        .from('recipes')
        .update({ is_on: bool })
        .match({ id });
    return checkError(response);
};


export async function insertRecipeRatingRow(id){
    const response = await client
        .from(`recipe_rating`)
        .insert({ recipe_id: id });



    return checkError(response);
}