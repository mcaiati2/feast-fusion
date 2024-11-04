import express, { Request, Response } from 'express';
import Recipe from '../..//models/Recipe.js';
import User from '../../models/User.js';

const router = express.Router();

// Middleware to parse JSON bodies/
router.use(express.json());
// 
// POST endpoint to add a new recipe
router.post('/api/recipes', async (req: Request, res: Response) => {
  const { recipeName, mealTime, ingredients, servings, preparation } = req.body;

  try {
    // Save the recipe data to your database
    await Recipe.create({ recipeName, mealTime, ingredients, servings, preparation });

    res.status(201).send('Recipe added successfully');
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the recipe' });
  }
});

// GET endpoint to retrieve the list of cuisines
router.get('/recipes', async (_: Request, res: Response) => {
  try {
    const meals = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name']
        }
      ]
    });

    res.status(200).json({ meals });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the cuisines' });
  }
});

export default router;