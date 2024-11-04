import { Router, Response } from 'express';
import { Meal, User} from '../../models/index.js';

const router = Router();

// POST endpoint to add a new cuisine
router.get('/cuisines/add', async (_, res: Response) => {
  try {
    // const { title } = req.body;

    // Create a new cuisine
    const meals = await Meal.findAll({
    include: [
      {
        model: Meal,
        attributes: ['ingredients','servings', 'instructions']
      },
       // title,
      // ingredients: req.body.ingredients || '',
      // servings: req.body.servings || 1,
      // instructions: req.body.instructions || ''
      {
        model: User,
        attributes: ['first_name', 'last_name']
      }
    ]
     
    });

    res.json ({meals});
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding a meal'});
  }
});

// // GET endpoint to retrieve the list of cuisines
// router.get('/cuisines', async (_: Request, res: Response) => {
//   try {
//     const meals = await Meal.findAll();

//     res.status(200).json({ meals });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while retrieving the cuisines' });
//   }
// });

export default router;