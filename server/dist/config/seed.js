import { client } from '../models/index.js';
import User from '../models/User.js';
import Recipe from '../models/Recipe.js';
await client.sync({ force: true });
async function seed() {
    // @ts-ignore
    await User.bulkCreate([
        // @ts-ignore
        {
            first_name: 'Tom',
            last_name: 'Jackson',
            email: 'tom.jackson@example.com',
            password: 'password123',
        },
        // @ts-ignore
        {
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
            user_id: 1
        },
        {
            recipeName: 'Spaghetti Bolognese',
            mealTime: 'Lunch/Dinner',
            ingredients: 'Spaghetti, Ground Beef, Tomato Sauce, Garlic, Onion',
            servings: 4,
            preparation: 'Cook spaghetti and mix with sauce.',
            user_id: 1
        },
    ]);
    console.log('Tables have been seeded!');
}
seed().catch((error) => {
    console.error('There was an error with seeding:', error);
});
