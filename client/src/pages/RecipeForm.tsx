import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecipeForm() {
  const [recipeName, setRecipeName] = useState('');
  const [mealTime, setMealTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [servings, setServings] = useState('');
  const [preparation, setPreparation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const recipeData = {
      recipeName,
      mealTime,
      ingredients,
      servings,
      preparation,
    };

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        // Handle successful response
        console.log('Recipe added successfully');
        navigate('/cuisines/yours')
      } else {
        // Handle error response
        console.error('Failed to add recipe');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <main id="recipeForm">
        <section className="row formStyle">
          <form className="col-4 mx-auto" onSubmit={handleSubmit}>
            <div className="mb-3">
              <h2>Its Cookin Time!</h2>

              <label htmlFor="recipeName" className="form-label">Lets give this cuisine a name</label>
              <input
                className="form-control"
                type="text"
                id="recipeName"
                placeholder="Give it a tasty name!"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                value={mealTime}
                onChange={(e) => setMealTime(e.target.value)}
              >
                <option defaultValue="none">When is the meal best served?</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch/Dinner">Lunch/Dinner</option>
                <option value="Dessert">Dessert</option>
                <option value="Snack">Snack</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="ingredients" className="form-label">Tell us what goes into your dish</label>
              <textarea
                className="form-control"
                id="ingredients"
                placeholder="Describe your dish! What are the ingredients?"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="servings" className="form-label">How many servings does this dish make?</label>
              <input
                className="form-control"
                type="text"
                id="servings"
                placeholder="Only enter a number!"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="preparation" className="form-label">How is the cuisine prepared?</label>
              <textarea
                className="form-control"
                id="preparation"
                placeholder="Give us the scoop...or slice...or...something..."
                value={preparation}
                onChange={(e) => setPreparation(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Add To Your Cuisines</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default RecipeForm;