import client from '../config/connection.js';
import User from './User.js';
import Meal from './Meal.js';
import Category from './Category.js';

User.hasMany(Meal, { foreignKey: 'user_id' });
Meal.belongsTo(User, { foreignKey: 'user_id' });

Meal.hasOne(Category, { foreignKey: 'meal_id' });
Category.belongsTo(Meal, { foreignKey: 'meal_id' });

export { client, User, Meal, Category };