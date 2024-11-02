import { Router, Request, Response } from 'express';
import { Meal, User, Category } from '../../models/index.js';

const router = Router();

// Get the number of meals for the homepage
router.get('/meal', async (_, res: Response) => {
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
          model: User,
          attributes: ['first_name', 'last_name']
        }
      ]
    });

    res.json({ meal });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating a meal' });
  }
});

// Get wines for a shop
router.get('/category', async (req: Request, res: Response) => {
  // Get all wines by shop id and also attach the user that created the shop
  // We use the attributes property to specify the fields we want on the user
  const category = await Category.findAll({
    include: {
      model: User,
      attributes: ['first_name']
    },
    where: {
      shop_id: req.body.shop_id
    }
  });

  res.json({
    category
  });
});

export default router;

// attributes for category are id and name