import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import client from '../config/connection.js';
const { hash, compare } = bcrypt;
class User extends Model {
    async validatePassword(formPassword) {
        const is_valid = await compare(formPassword, this.password);
        return is_valid;
    }
    toJSON() {
        const user = Object.assign({}, this.get());
        delete user.password;
        return user;
    }
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            name: 'unique_email',
            msg: 'The email address you have entered is already in use'
        },
        validate: {
            isEmail: {
                msg: 'You must provide a valid email address'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, Infinity],
                msg: 'Please ensure your password is at least 6 characters in length'
            }
        }
    },
    full_name: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.first_name} ${this.last_name}`;
        }
    }
}, {
    sequelize: client,
    tableName: 'users',
    underscored: true,
    hooks: {
        async beforeCreate(userRow) {
            userRow.password = await hash(userRow.password, 10);
            return userRow;
        },
        async beforeBulkCreate(users) {
            for (const user of users) {
                user.password = await hash(user.password, 10);
            }
        }
    }
});
export default User;
