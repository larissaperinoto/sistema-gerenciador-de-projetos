import Project from "../database/models/projects.model";
import { httpStatus } from "../utils/httpStatus";
import { ProjectType } from "../utils/types/project.type";
import { ServiceResponse } from "../utils/types/responses";

export interface IProjectService {
  findAll: () => Promise<ServiceResponse>;
  findOne: (where: Record<string, any>) => Promise<ServiceResponse>;
  insert: (payload: ProjectType) => Promise<ServiceResponse>;
  update: (
    projectId: string,
    payload: Partial<ProjectType>
  ) => Promise<ServiceResponse>;
  remove: (projectId: string) => Promise<Partial<ServiceResponse>>;
}

export class ProjectsService implements IProjectService {
  private _model: typeof Project;

  constructor(model: typeof Project) {
    this._model = model;
  }

  public async findAll() {
    const projects = await this._model.findAll();

    if (!projects.length) {
      return {
        status: httpStatus.NotFound,
        message: { error: "There are no registered projects." },
      };
    }

    return {
      status: httpStatus.OK,
      message: projects,
    };
  }

  public async findOne(where: Record<string, any>) {
    const project = await this._model.findOne({ where });

    return {
      status: httpStatus.OK,
      message: project!,
    };
  }

  public async insert(payload: ProjectType) {
    const created = await this._model.create(payload);

    return {
      status: httpStatus.Created,
      message: created,
    };
  }

  public async update(projectId: string, payload: Partial<ProjectType>) {
    await this._model.update(payload, {
      where: { id: projectId },
    });

    const project = await this._model.findOne({ where: { id: projectId } });

    return {
      status: httpStatus.OK,
      message: project!,
    };
  }
  public async remove(projectId: string) {
    await this._model.destroy({ where: { id: projectId } });

    return {
      status: httpStatus.NoContent,
    };
  }
}
