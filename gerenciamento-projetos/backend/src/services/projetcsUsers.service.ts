import Users from "../database/models/users.model";
import ProjectsUsers from "../database/models/projectsUsers.model";
import { httpStatus } from "../utils/httpStatus";
import { ServiceResponse } from "../utils/types/responses";
import { IAuthService } from "./auth.service";
import { IProjectService } from "./projects.service";

export interface IProjectsUsersService {
  findUsersInProject: (projectId: string) => Promise<ServiceResponse>;
  insertUserInProject: (
    projectIdId: string,
    paylod: { userId: string }
  ) => Promise<ServiceResponse>;
  removeUserFromProject: (
    projectId: string,
    userId: string
  ) => Promise<Partial<ServiceResponse>>;
}

export class ProjectsUsersService implements IProjectsUsersService {
  private _model: typeof ProjectsUsers;
  private _usersService: IAuthService;
  private _projectsService: IProjectService;

  constructor(
    model: typeof ProjectsUsers,
    usersService: IAuthService,
    projectsService: IProjectService
  ) {
    this._model = model;
    this._usersService = usersService;
    this._projectsService = projectsService;
  }

  public async findUsersInProject(projectId: string) {
    const users = await this._model.findAll({
      where: { projectId: projectId },
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email", "role"],
        },
      ],
    });

    if (!users.length) {
      return {
        status: httpStatus.NotFound,
        message: "There are no registered users for this project.",
      };
    }

    return {
      status: httpStatus.OK,
      message: users.map(({ User }: any) => User),
    };
  }
  public async insertUserInProject(
    projectId: string,
    { userId }: { userId: string }
  ) {
    const user = await this._usersService.getUser({ user: { id: userId } });

    if (!user.message) {
      return {
        status: httpStatus.NotFound,
        message: "User not found.",
      };
    }

    const project = await this._projectsService.findOne({ id: projectId });

    if (!project.message) {
      return {
        status: httpStatus.NotFound,
        message: "Project not found.",
      };
    }

    const res = await this._model.create({ projectId, userId });

    return {
      status: httpStatus.OK,
      message: res,
    };
  }

  public async removeUserFromProject(projectId: string, userId: string) {
    try {
      await this._model.destroy({ where: { projectId, userId } });
      return {
        status: httpStatus.NoContent,
      };
    } catch (e) {
      return {
        status: httpStatus.InternalSeverError,
        message: `Unable to complete action. Error: ${e}`,
      };
    }
  }
}
