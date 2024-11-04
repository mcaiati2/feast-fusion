import { NavLink } from 'react-router-dom';
import { useStore } from '../store';

function Landing() {
  const store = useStore();
  if (!store) {
    throw new Error("Store is not available");
  }
  const { state } = store;

  return (
    <>
      <main id="landing">
        <section className="d-flex flex-column justify-content-center align-items-center">
          <h1 className='formStyle'>Feast Fusion</h1>
          <p>If you have time to eat, then its time to <i>FEAST</i></p>
          {state.user ? (
            <NavLink to="/cuisines/add" className="btn btn-primary btn-lg px-5">Get Cookin!</NavLink>
          ) : (
            <NavLink to="/register" className="btn btn-primary btn-lg px-5">Get Cookin!</NavLink>
          )}
        </section>
      </main>
    </>
  )
}

export default Landing;