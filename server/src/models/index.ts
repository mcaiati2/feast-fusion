import client from '../config/connection.js';
import User from './User.js';
import Recipe from './Recipe.js';

User.hasMany(Recipe, { foreignKey: 'user_id' });
Recipe.belongsTo(User, { foreignKey: 'user_id' });


export { client, User, Recipe };