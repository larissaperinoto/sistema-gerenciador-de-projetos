import "dotenv/config";
import { Options } from "sequelize";

const config: Options = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.DB_NAME || "projects_manager",
  host: process.env.MYSQL_HOST || "localhost",
  port: Number(process.env.MYSQL_PORT) || 3306,
  dialect: "mysql",
  logging: false,
};

module.exports = config;
