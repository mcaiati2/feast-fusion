import { DataTypes, Model } from 'sequelize';
import client from '../config/connection.js';
class Cuisine extends Model {
}
Cuisine.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: client,
    tableName: 'cuisines',
    underscored: true
});
export default Cuisine;
