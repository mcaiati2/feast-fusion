import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Landing from './pages/Landing';
import Cuisines from './pages/Cuisines';
import RecipeForm from './pages/RecipeForm';
import AuthForm from './pages/AuthForm';
import ContactForm from './pages/ContactForm';


  // Create an object of page titles to use for the browser tab
  const titles: {[key: string]: string} = {
    '/': 'Feast Fusion - Home',
    '/register': 'Feast Fusion - Register',
    '/login': 'Feast Fusion - Log In',
    '/cuisines': 'Feast Fusion - Cuisines',
    '/cuisines/add': 'Feast Fusion - Create A Dish',
  };

  const getTitle = (path: string): string => {
    if (path.startsWith('/cuisines/')) {
      const route = path.split('/cuisines/')[1];
      if (!isNaN(Number(route))) {
        return `Feast Fusion - Cuisines ${route}`;
      } else {
        return `Feast Fusion - Create A Dish ${route}`
      }
    }
    return titles[path] || 'Page Not Found';
  };

  // useEffect(() => {
  //   // Grab the corresponding title based on the current route - what comes after localhost:5173
  //   const title = getTitle(location.pathname);

  //   // Set the browser tab title when the location of the browser changes
  //   document.title = title || 'Page Not Found';
  // }, [location]);  

function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cuisines" element={<Cuisines />} />
          <Route path="/cuisines/add" element={<RecipeForm />} />
          <Route path="/register" element={<AuthForm isLogin={false} />} />
          <Route path="/login" element={<AuthForm isLogin={true} />} />
          <Route path="/contact" element={<ContactForm />} />

        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App;
