import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { StoreProvider } from './store';

import Header from './components/Header';
import Footer from './components/Footer';

import Landing from './pages/Landing';
import Cuisines from './pages/Cuisines';
import UserCuisines from './pages/UserCuisines';
import RecipeForm from './pages/RecipeForm';
import AuthForm from './pages/AuthForm';
import ContactForm from './pages/ContactForm';

const App = () => {
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
    const path = window.location.pathname;
    document.title = getTitle(path);
  }, []);

  return (
    <StoreProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<AuthForm isLogin={false} />} />
          <Route path="/login" element={<AuthForm isLogin={true} />} />
          <Route path="/cuisines" element={<Cuisines />} />
          <Route path="/cuisines/add" element={<RecipeForm />} />
          <Route path="/cuisines/yours" element={<UserCuisines />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </main>
      <Footer />
    </StoreProvider>
  );
};

export default App;