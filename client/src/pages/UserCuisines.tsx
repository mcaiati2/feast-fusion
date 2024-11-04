import axios from "axios";
import { useEffect, useState } from "react";

function UserCuisines() {
    const [recipes, setRecipes] = useState<any[]>([]);

    useEffect(() => {
        axios.get('/api/recipes')
            .then((res) => {
                console.log(res);
                setRecipes([...res.data.recipes])
            })
    }, [])
    // recipeName: string;
    // mealTime: string;
    // ingredients: string;
    // servings: number;
    // preparation: string;
    // user_id?: number;
    return (
        <section className="container">
            <h2 className="mt-4 fw-light">Your Recipes</h2>
            <hr></hr>
            <div className="row">
                {recipes.map((recipe) => (
                    <article className="col-4" key={recipe.id}>
                        <h4 className="fw-light text-decoration-underline">{recipe.recipeName}</h4>
                        <p>Meal Time: {recipe.mealTime}</p>
                        <p>Ingredients: {recipe.ingredients}</p>
                        <p>Servings: {recipe.servings}</p>
                        <p>Preparation: {recipe.preparation}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default UserCuisines;