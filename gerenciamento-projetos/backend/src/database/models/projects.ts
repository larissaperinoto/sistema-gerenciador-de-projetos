import { DataTypes, Model, Optional } from "sequelize";
import connection from "../connection";

interface ProjectAttributes {
  id: number;
  nome: string;
  descricao: string;
  data_inicio: Date;
  data_fim?: Date;
  status: "Em andamento" | "Concluído" | "Pendente";
}

interface ProjetoCreationAttributes extends Optional<ProjectAttributes, "id"> {}

class Project
  extends Model<ProjectAttributes, ProjetoCreationAttributes>
  implements ProjectAttributes
{
  public id!: number;
  public nome!: string;
  public descricao!: string;
  public data_inicio!: Date;
  public data_fim?: Date;
  public status!: "Em andamento" | "Concluído" | "Pendente";
}

Project.init(
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
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_fim: {
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
  }
);

export default Project;
