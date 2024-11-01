// import {Router, Request, Response} from 'express';
// import { Category, Meal } from '../../models/index.js';
// import { isAuthenticated } from '../helpers/index.js';
import axios from 'axios';

const router = Router();
router.get('/search', async (req: Request, res: Response) => {
    const ninjaRes = await axios.get('https://api.api-ninjas.com/v1/recipe?query=' + req.body.search, {
        headers: {
        'X-Api-Key': process.env.NINJA_API_KEY
    }
        })

ninjaRes.data
res.json({
    results: ninjaRes.data
});
    });
export default router;



// router.get('/category/user', isAuthenticated, async(req: Request, res: Response) => {
//   const userCategory = await Category.findAll({
//     where: {
//       user_id: req.user.id
//     }
//   });

//   res.json(userCategory);
// });

// router.post('/category', isAuthenticated, async (req: Request, res: Response) => {
//   try {
//     await Category.create({
//       ...req.body,
//       user_id: req.user.id
//     });

//     res.json({
//       message: 'Category created successfully!'
//     })
//   } catch (error) {
//     console.log('create category error', error);
//     res.status(500).json({
//       message: 'There was a problem creating the category'
//     });
//   }
// });

// // Add a wine to a shop
// router.post('/meal', isAuthenticated, async (req: Request, res: Response) => {

//   const userCategory = await Category.findOne({
//     where: {
//       user_id: req.user.id,
//       id: req.body.CategoryId
//     }
//   });


//   if (!userCategory) {
//     res.status(401).json({
//       message: 'Error finding that category. Please make sure the CategoryId is correct.'
//     });
//     return;
//   }

//   try {
//     const meal = await Meal.create({
//       ...req.body,
//       user_id: req.user.id
//     });

//     res.json({
//       meal,
//       message: 'Meal added successfully!'
//     })
//   } catch (error) {
//     console.log('ERROR CREATING MEAL', error);
//     res.status(500).json({
//       message: 'There was a problem adding a meal'
//     });
//   }
// });
// export default router; 