import { DataTypes, Model } from 'sequelize';
// import bcrypt from 'bcrypt';
import client from '../config/connection.js';

// TODO - bcrypt for password

interface UserAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  full_name: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password!: string;
  public age!: number;
  public full_name?: string;

  // TODO async validatePassword

}

// TODO toJSON polymorphism

User.init(
  {
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
      type: DataTypes.VIRTUAL
      get() {
        return `${this.first_name} ${this.last_name}`
      }
    }
  }
);


export default User;