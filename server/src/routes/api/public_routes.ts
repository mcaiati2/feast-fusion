import { Router, Request, Response } from 'express';
import Meal from '../../models/Meal.js';
import User from '../../models/User.js';
import Category from '../../models/Category.js';

const router = Router();

// Get the number of meals for the homepage
router.get('/cuisines/add', async (_, res: Response) => {
  try {
    // Find all categories and attach the user that created the categories and also all the meals associated with the category
    // We use the attributes property to select the columns/fields that we want
    const meal = await Meal.findAll({
      include: [
        {
          model: Meal,
          attributes: ['title', 'ingredients', 'servings', 'instructions', 'category']
        },
        {
          model: Category,
          attributes: ['name']
        }
      ]
    });

    res.json({ meal });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating a meal' });
  }
});


router.get('/', async (req: Request, res: Response) => {

  const category = await Category.findAll({
    include: [
      {
        model: User,
        attributes: ['first_name']
      }
    ],
    where: {
      id: req.body.category_id
    }
  });

  res.json({
    category
  });
});

export default router;

