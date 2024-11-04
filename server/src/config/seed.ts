import client from './connection.js';
import User from '../models/User.js';
import Recipe from '../models/Recipe.js';

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

  await Recipe.bulkCreate([
    {
      recipeName: 'Pancakes',
      mealTime: 'Breakfast',
      ingredients: 'Flour, Eggs, Milk, Sugar, Baking Powder',
      servings: 4,
      preparation: 'Mix ingredients and cook on a griddle.',
    },
    {
      recipeName: 'Spaghetti Bolognese',
      mealTime: 'Lunch/Dinner',
      ingredients: 'Spaghetti, Ground Beef, Tomato Sauce, Garlic, Onion',
      servings: 4,
      preparation: 'Cook spaghetti and mix with sauce.',
    },
  ]);

  console.log('Tables have been seeded!');
}

seed().catch((error) => {
  console.error('There was an error with seeding:', error);
});