function Cuisines () {
    return (
        <>
        <main id="recipeForm">
                <section className="row formStyle">
                    <form className="col-4 mx-auto">
                        <div className="mb-3">
                            <label htmlFor="textarea" className="form-label"></label>
                            <input className="form-control" type="text" placeholder="Give it a tasty name!" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                            <div className="form-text">Feast Fusion would never share your password with anyone.</div>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Stay logged in?</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </section>
            </main>
        </>
    )
}

export default Cuisines;





[['Breakfast', 'Lunch/Dinner', 'Dessert', 'Snack']]