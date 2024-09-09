import { DataTypes, Model } from "sequelize";
import connection from "../connection";

class Project extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public start_date!: Date;
  public end_date?: Date;
  public status!: "Em andamento" | "Concluído" | "Pendente";
}

Project.init(
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Em andamento", "Concluído", "Pendente"),
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "Projects",
    underscored: true,
  }
);

export default Project;
