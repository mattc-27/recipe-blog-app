// fetch user
export async function getUser(user) {
    const id = user;
    try {
        const response = await fetch(`/api/user/${id}`);
        const data = await response.json();
        return { ...data };
    } catch (error) {
        console.log(error)
    }
};


// fetch user
export async function updateUser(body, userId) {
    const id = userId;
    try {
        const response = await fetch(`/api/user/update/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
    } catch (error) {
        console.log(error);
    }
};


// fetch user's recipe (edit)
export async function getRecipe(recipe) {
    const id = recipe;
    try {
        const response = await fetch(`/api/recipes/${id}`);
        const data = await response.json();
        return { ...data };
    } catch (error) {
        console.error(error.message)
    }
};


// logout
export async function logoutUser() {
    try {
        await fetch(`/api/logout`);
    } catch (error) {
        console.log(error);
    }
};