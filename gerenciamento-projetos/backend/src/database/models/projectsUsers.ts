import { DataTypes, Model } from "sequelize";
import connection from "../connection";
import Users from "./users";
import Projects from "./projects";

class ProjectsUsers extends Model {
  public usuario_id!: number;
  public projeto_id!: number;
}

ProjectsUsers.init(
  {
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
      primaryKey: true,
    },
    projeto_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Projects,
        key: "id",
      },
      primaryKey: true,
    },
  },
  {
    sequelize: connection,
    tableName: "Projects_Users",
    timestamps: false,
  }
);

Users.belongsToMany(Projects, { through: ProjectsUsers });
Projects.belongsToMany(Users, { through: ProjectsUsers });

export default ProjectsUsers;
