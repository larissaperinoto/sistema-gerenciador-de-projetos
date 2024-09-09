import { DataTypes, Model } from "sequelize";
import connection from "../connection";
import Users from "./users.model";
import Projects from "./projects.model";

class ProjectsUsers extends Model {
  public userId!: number;
  public projectId!: number;
}

ProjectsUsers.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: "id",
      },
      primaryKey: true,
      field: "user_id",
    },
    projectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Projects,
        key: "id",
      },
      primaryKey: true,
      field: "project_id",
    },
  },
  {
    underscored: true,
    timestamps: false,
    sequelize: connection,
    tableName: "ProjectsUsers",
  }
);

Users.belongsToMany(Projects, { through: ProjectsUsers });
Projects.belongsToMany(Users, { through: ProjectsUsers });

export default ProjectsUsers;
