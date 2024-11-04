import { Router } from 'express';
import axios from 'axios';
import { isAuthenticated } from '../helpers/index.js';
import { Recipe } from '../../models/index.js';
const router = Router();
router.get('/search', isAuthenticated, async (req, res) => {
    try {
        const searchQuery = req.query.search;
        const ninjaRes = await axios.get(`https://api.api-ninjas.com/v1/recipe?query=${searchQuery}`, {
            headers: {
                'X-Api-Key': process.env.NINJA_API_KEY || ''
            }
        });
        res.json({
            results: ninjaRes.data
        });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});
router.post('/recipes', isAuthenticated, async (req, res) => {
    const { recipeName, mealTime, ingredients, servings, preparation } = req.body;
    try {
        // Save the recipe data to your database
        await Recipe.create({
            recipeName,
            mealTime,
            ingredients,
            servings,
            preparation,
            user_id: req.user.id
        });
        res.status(201).send('Recipe added successfully');
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the recipe' });
        console.log(error);
    }
});
// get user recipes
router.get('/recipes', isAuthenticated, async (req, res) => {
    try {
        const recipes = await Recipe.findAll({
            where: {
                user_id: req.user.id
            }
        });
        res.status(200).json({ recipes });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving the cuisines' });
    }
});
export default router;
