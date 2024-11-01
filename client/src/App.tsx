import { Routes, Route } from 'react-router-dom';
// import { useState } from 'react'

import Header from './components/Header';
import Footer from './components/Footer';

import Landing from './pages/Landing';
import Cuisines from './pages/Cuisines';
import RecipeForm from './pages/RecipeForm';
import AuthForm from './pages/AuthForm';

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
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App;
