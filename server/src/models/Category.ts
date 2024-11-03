import { DataTypes, Model } from 'sequelize';
import client from '../config/connection.js';

export interface CategoryAttributes {
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
    }
  },

  {
    sequelize: client,
    tableName: 'category',
    underscored: true
  }
);

export default Category;