import { DataTypes, Model } from 'sequelize';
import client from '../config/connection.js';

interface CategoryAttributes {
  id: number;
  name: string;
}

class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public id!: number;
  public name!: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { // specify custom validation rule:
        isIn: [['Breakfast', 'Lunch/Dinner', 'Dessert', 'Snack']]
      }
    }
  },

  {
    sequelize: client,
    tableName: 'shops',
    underscored: true
  }
);