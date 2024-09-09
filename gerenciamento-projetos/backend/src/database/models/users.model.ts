import { DataTypes, Model } from "sequelize";
import connection from "../connection";

class Users extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "Gerente" | "Desenvolvedor" | "Designer";
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Gerente", "Desenvolvedor", "Designer"),
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
    tableName: "Users",
    sequelize: connection,
  }
);

export default Users;
