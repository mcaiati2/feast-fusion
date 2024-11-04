import { DataTypes, Model } from 'sequelize';
import client from '../config/connection.js';
class Recipe extends Model {
}
Recipe.init({
    recipeName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mealTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ingredients: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    servings: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    preparation: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize: client,
    tableName: 'recipes',
    underscored: true,
});
export default Recipe;
