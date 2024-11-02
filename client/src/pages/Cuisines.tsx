import { useState } from 'react';
import axios from 'axios';

function Cuisines() {
    const [recipe, setRecipe] = useState('Loading...');
    const [query, setQuery] = useState('');
    const apiKey = 'OSQFnPo3Rdpb4EkVN2yIYg==Ynp7X1zAOb47qGta';

    const fetchRecipe = (query: string) => {
        const url = `https://api.api-ninjas.com/v1/recipe?query=${query}`;
        axios.get(url, {
            headers: {
                'X-Api-Key': apiKey
            }
        }).then((res) => {
            setRecipe(res.data.recipe || 'No recipe found');
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchRecipe(query);
    };

    return (
        <>
            <main id="cuisines">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        placeholder="Enter cuisine name" 
                    />
                    <button type="submit">Search</button>
                </form>
                <p>{recipe}</p>
            </main>
        </>
    );
}

export default Cuisines;