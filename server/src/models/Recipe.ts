import { DataTypes, Model } from 'sequelize';
import client from '../config/connection.js';

export interface RecipeAttributes {
  recipeName: string;
  mealTime: string;
  ingredients: string;
  servings: number;
  preparation: string;
  user_id?: number;
}

class Recipe extends Model<RecipeAttributes> implements RecipeAttributes {
  public recipeName!: string;
  public mealTime!: string;
  public ingredients!: string;
  public servings!: number;
  public preparation!: string;
}

Recipe.init(
  {
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
  },
  {
    sequelize: client,
    tableName: 'recipes',
    underscored: true,
  }
);

export default Recipe;