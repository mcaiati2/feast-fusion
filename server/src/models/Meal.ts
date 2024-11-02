import { DataTypes, Model } from "sequelize";
import client from '../config/connection.js';

export interface MealAttributes {
  title: string;
  ingredients: string;
  servings: string;
  instructions: string;
  category?: string;
}

class Meal extends Model<MealAttributes> implements MealAttributes {
  public title!: string;
  public ingredients!: string;
  public servings!: string;
  public instructions!: string;
  public category?: string; // optional since it's not returned by apininjas
}

Meal.init(
  {
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
  },

  {
    sequelize: client,
    tableName: 'meals',
    underscored: true
  }

);

export default Meal;