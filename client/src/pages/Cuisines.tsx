import React, { useState } from 'react';
import axios from 'axios';
import { RecipePull } from '../interfaces';

function Cuisines() {
  const [recipes, setRecipes] = useState<RecipePull[]>([]);
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(true);
  const apiKey = 'OSQFnPo3Rdpb4EkVN2yIYg==Ynp7X1zAOb47qGta';

  const fetchRecipes = async (query: string) => {
    try {
      const url = `https://api.api-ninjas.com/v1/recipe?query=${query}`;
      const response = await axios.get(url, {
        headers: {
          'X-Api-Key': apiKey
        }
      });
      setRecipes(response.data || []);
      setCurrentIndex(0); // Reset to the first recipe
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]);
      setCurrentIndex(0);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setQuery(inputValue);
    fetchRecipes(inputValue);
    setIsSearchSubmitted(true);
    setShowSearchForm(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const getHeadingText = () => {
    if (isSearchSubmitted) {
      return `Yum! Lets make some ${query}:`;
    }
    return 'What are we making today?';
  };

  const handleSearchAgain = () => {
    setShowSearchForm(true);
    setIsSearchSubmitted(false);
    setInputValue('');
  };

  return (
    <>
      <main id="cuisines">
        <h2>{getHeadingText()}</h2>
        <div className="search-container">
          {showSearchForm ? (
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                value={inputValue} 
                onChange={(event) => setInputValue(event.target.value)} 
                placeholder="Enter cuisine name" 
              />
              <button type="submit">Search</button>
            </form>
          ) : null}
        </div>
        {recipes.length > 0 && (
          <>
            <div id='cuisines-form'>
              <h4><em>{recipes[currentIndex].title}</em></h4>
              <p><strong>Ingredients:</strong> {recipes[currentIndex].ingredients}</p>
              <p><strong>Servings:</strong> {recipes[currentIndex].servings}</p>
              <p><strong>Instructions:</strong> {recipes[currentIndex].instructions}</p>
            </div>
            {!showSearchForm && (
              <div id="search-again-button-container">
                <button onClick={handleNext} className='form-search-button'>Show another {query} recipe</button>
                <button onClick={handleSearchAgain} className='form-search-button'>I want to make something else</button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default Cuisines;