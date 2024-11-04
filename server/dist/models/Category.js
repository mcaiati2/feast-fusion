import { DataTypes, Model } from 'sequelize';
import client from '../config/connection.js';
class Category extends Model {
}
Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: client,
    tableName: 'category',
    underscored: true
});
export default Category;
