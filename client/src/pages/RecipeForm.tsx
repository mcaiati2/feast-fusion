function RecipeForm() {
  return (
    <>
      <main id="recipeForm">
        <section className="row formStyle">
          <form className="col-4 mx-auto">
            <div className="mb-3">
              <h2>Its Cookin Time!</h2>

              <label htmlFor="textarea" className="form-label">Lets give this cuisine a name</label>
              <input className="form-control" type="text" placeholder="Give it a tasty name!" />
            </div>
            <div className="mb-3">
              <select className="form-select" aria-label="Default select example">
                <option selected>When is the meal best served?</option>
                <option value="1">Breakfast</option>
                <option value="2">Lunch/Dinner</option>
                <option value="3">Dessert</option>
                <option value="4">Snack</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Tell us what goes into your dish</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Describe your dish! What are the ingredients?"></textarea>
            </div>
            <div className="mb-3">
            <label htmlFor="textarea" className="form-label">How many servings does this dish make?</label>
            <input className="form-control" type="text" placeholder="Only enter a number!" />
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">How is the cuisine prepared?</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Give us the scoop...or slice...or...something..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Add To Your Cuisines</button>
          </form>
        </section>
      </main>
    </>
  )
}

export default RecipeForm;

