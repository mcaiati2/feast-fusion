import client from './connection.js';
import User from '../models/User.js';
import Meal from '../models/Meal.js';
import Category from '../models/Category.js';


  await client.sync({ force: true });

  async function seed() {
  await User.bulkCreate([
    {
      id: 1,
      first_name: 'Tom',
      last_name: 'Jackson',
      email: 'tom.jackson@example.com',
      password: 'password123',
    },
    {
      id: 2,
      first_name: 'Sarah',
      last_name: 'Thompson',
      email: 'sarah.thompson@example.com',
      password: 'password123',
    },
  ]);

  await Category.bulkCreate([
    { id: 1, name: 'Breakfast' },
    { id: 2, name: 'Lunch/Dinner' },
    { id: 3, name: 'Dessert' },
    { id: 4, name: 'Snack' },
  ]);

  await Meal.bulkCreate([
    {
      title: 'Pancakes',
      ingredients: 'Flour, Eggs, Milk, Sugar, Baking Powder',
      servings: '4',
      instructions: 'Mix ingredients and cook on a griddle.',
      category: 'Breakfast',
    },
    {
      title: 'Spaghetti Bolognese',
      ingredients: 'Spaghetti, Ground Beef, Tomato Sauce, Garlic, Onion',
      servings: '4',
      instructions: 'Cook spaghetti and mix with sauce.',
      category: 'Lunch/Dinner',
    },
  ]);

  console.log('Tables have been seeded!');
}

seed().catch((error) => {
  console.error('There was an error with seeding:', error);
});