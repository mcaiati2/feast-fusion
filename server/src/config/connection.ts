import { Sequelize } from "sequelize";

const client = new Sequelize({
  username: 'postgres',
  password: 'pass',
  database: 'feast_fusion_db',
  host: 'localhost',
  dialect: 'postgres'
});

export default client;