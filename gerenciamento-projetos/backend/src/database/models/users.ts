import { DataTypes, Model, Optional } from "sequelize";
import connection from "../connection";

interface UsersAttributes {
  id: number;
  nome: string;
  email: string;
  senha: string;
  papel: "Gerente" | "Desenvolvedor" | "Designer";
}

interface UsersCreationAttributes extends Optional<UsersAttributes, "id"> {}

class Users
  extends Model<UsersAttributes, UsersCreationAttributes>
  implements UsersAttributes
{
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public papel!: "Gerente" | "Desenvolvedor" | "Designer";
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    papel: {
      type: DataTypes.ENUM("Gerente", "Desenvolvedor", "Designer"),
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "Users",
  }
);

export default Users;
