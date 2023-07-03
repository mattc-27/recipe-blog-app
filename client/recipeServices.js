// fetch user's recipe (edit)
export async function listRecipes(recipe) {
    const id = recipe;
    try {
        const response = await fetch(`/api/recipes`);
        const data = await response.json();
        return { ...data };
    } catch (error) {
        console.log(error)
    }
};