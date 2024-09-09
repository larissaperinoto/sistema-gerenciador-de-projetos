import { DataTypes, Model } from "sequelize";
import connection from "../connection";
import Users from "./users";
import Projects from "./projects";

class ProjectsUsers extends Model {
  public user_id!: number;
  public project_id!: number;
}

ProjectsUsers.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
      primaryKey: true,
    },
    project_id: {
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
    tableName: "ProjectsUsers",
    timestamps: false,
    underscored: true,
  }
);

Users.belongsToMany(Projects, { through: ProjectsUsers });
Projects.belongsToMany(Users, { through: ProjectsUsers });

export default ProjectsUsers;
