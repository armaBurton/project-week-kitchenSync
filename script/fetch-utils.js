const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyMTg0Mjc3LCJleHAiOjE5NTc3NjAyNzd9.kSPiiISCwyV3_bbykn8z6FThl1HvsZ0OFXo4evlAon8';

const SUPABASE_URL = 'https://esjhwxqfmwrbnnyyxfav.supabase.co';

const imgClient = supabase;

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
        .select();

    console.log(response);

    return checkError(response);
};

export const fetchMyRecipes = async() => {
    const user = getUser();
    const myrecipes = await client
        .from('recipes')
        .select()
        .match({ user_id: user.id });

    // console.log(myrecipes);

    checkError(myrecipes);
};

export const fetchSingleRecipe = async(id) => {
    const response = await client
        .from('recipes')
        .select()
        .match({ id })
        .single();
    console.log(response);

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
        .from('recipes')
        .update({ rating: recipe.rating + 1 })
        .match({ id });

    return checkError(response);
};

export const decrementRecipeRating = async(id) => {
    const recipe = await fetchSingleRecipe(id);

    const response = await client
        .from('recipes')
        .update({ rating: recipe.rating - 1 })
        .match({ id });

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
    return checkError(response);
};

export const deleteProfile = async() => {
    const user = await getUserProfile();
    console.log(user);

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
    console.log(user);
    const response = await client
        .storage
        .from('recipe-images')
        .upload(`${user.id}/${image.name}`, image.name, {
            cacheControl: '3600',
            upsert: false
        });
    return checkError(response);
};

// export const downloadRecipeImage = async(recipe) => {
//     const user = await getUser();

//     console.log(recipe);
//     const response = await client
//         .storage
//         .from(`recipe-images`)
//         .download(`${user.id}/${recipe.image}`);

//     return checkError(response);
// };


// export const downloadRecipeImage = async(recipe) => {
//     const user = await getUser();

//     return await client.storage
//         .from('recipe-images')
//         .download(`${user.id}/${recipe.image}`)
//         .then(({ data, error }) => {
//             if (error) throw error;
//             // return URL.createObjectURL(data);
//             return data;
//         });
// };