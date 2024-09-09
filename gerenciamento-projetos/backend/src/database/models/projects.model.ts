import { DataTypes, Model } from "sequelize";
import connection from "../connection";

class Project extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public startDate!: Date;
  public endDate?: Date;
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "start_date",
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "end_date",
    },
    status: {
      type: DataTypes.ENUM("Em andamento", "Concluído", "Pendente"),
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: true,
    tableName: "Projects",
    sequelize: connection,
  }
);

export default Project;
