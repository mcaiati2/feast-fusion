import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useStore } from './store';

import Header from './components/Header';
import Footer from './components/Footer';

import Landing from './pages/Landing';
import Cuisines from './pages/Cuisines';
import UserCuisines from './pages/UserCuisines';
import RecipeForm from './pages/RecipeForm';
import AuthForm from './pages/AuthForm';
import ContactForm from './pages/ContactForm';
import NotFound from './pages/NotFound';

function App() {
  const store = useStore();

  if (!store) {
    throw new Error("Store is not available");
  }

  const { state } = store;

  const location = useLocation();

  const titles: { [key: string]: string } = {
    '/': 'Feast Fusion - Home',
    '/register': 'Feast Fusion - Register',
    '/login': 'Feast Fusion - Log In',
    '/cuisines': 'Feast Fusion - Cuisines',
    '/cuisines/add': 'Feast Fusion - Create A Dish',
    '/cuisines/yours': 'Feast Fusion - Your Cuisines'
  };

  const getTitle = (path: string): string => {
    if (path.startsWith('/cuisines/')) {
      const route = path.split('/cuisines/')[1];
      if (!isNaN(Number(route))) {
        return `Feast Fusion - Cuisines ${route}`;
      } else {
        return `Feast Fusion - ${route[0].toUpperCase()}${route.slice(1)}`;
      }
    }
    return titles[path] || 'Page Not Found';
  };

  useEffect(() => {
    const title = getTitle(location.pathname);

    document.title = title || 'Page Not Found';
  }, [location]);

  return (
    <>
      {state.loading && (
        <>
          <div className="loading d-flex justify-content-center align-items-center">
            <h2>Curating the menu...</h2>
          </div>
        </>
      )}

      <Header />
      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cuisines" element={<Cuisines />} />


          {state.user ? (
            <>
              <Route path="/cuisines/add" element={<RecipeForm />} />
              <Route path="/cuisines/yours" element={<UserCuisines />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<AuthForm isLogin={true} />} />
              <Route path="/register" element={<AuthForm isLogin={false} />} />
            </>
          )}
          <Route path="/contact" element={<ContactForm />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;