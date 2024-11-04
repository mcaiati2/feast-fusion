import { DataTypes, Model } from "sequelize";
import client from '../config/connection.js';
class Meal extends Model {
}
Meal.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ingredients: {
        type: DataTypes.STRING,
        allowNull: false
    },
    servings: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instructions: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
    }
}, {
    sequelize: client,
    tableName: 'meals',
    underscored: true
});
export default Meal;
