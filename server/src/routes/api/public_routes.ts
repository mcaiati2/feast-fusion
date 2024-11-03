import { Router, Request, Response } from 'express';
import Meal from '../../models/Meal.js';

const router = Router();

// POST endpoint to add a new cuisine
router.post('/cuisines/add', async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    // Create a new cuisine
    const newMeal = await Meal.create({
      title,
      ingredients: req.body.ingredients || '',
      servings: req.body.servings || 1,
      instructions: req.body.instructions || ''
    });

    res.status(201).json({ cuisine: newMeal });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding the cuisine' });
  }
});

// GET endpoint to retrieve the list of cuisines
router.get('/cuisines', async (_: Request, res: Response) => {
  try {
    const meals = await Meal.findAll();

    res.status(200).json({ meals });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the cuisines' });
  }
});

export default router;