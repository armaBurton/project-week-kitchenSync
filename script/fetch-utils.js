const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyMTg0Mjc3LCJleHAiOjE5NTc3NjAyNzd9.kSPiiISCwyV3_bbykn8z6FThl1HvsZ0OFXo4evlAon8';

const SUPABASE_URL = 'https://esjhwxqfmwrbnnyyxfav.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export const getUser = () => {
    const user = client.auth.user();
    return user;
};

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../landing'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./workshop');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

export const fetchAllLists = async() => {
    const response = await client 
        .from('recipes')
        .select();

    console.log(response);

    return checkError(response);
};
