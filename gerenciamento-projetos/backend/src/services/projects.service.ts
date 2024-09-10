import Project from "../database/models/projects.model";
import { isEndDateValid, isStartDateValid } from "../utils/validators";
import { httpStatus } from "../utils/httpStatus";
import { ProjectStatus, ProjectType } from "../utils/types/project.type";
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
    if (!isStartDateValid(payload.startDate)) {
      return {
        status: httpStatus.BadRequest,
        message: {
          error:
            "A data inicial do projeto não deve ser menor do que a data atual.",
        },
      };
    }

    if (!isEndDateValid(payload.endDate, payload.startDate)) {
      return {
        status: httpStatus.BadRequest,
        message: {
          error:
            "A data final do projeto não deve ser menor do que a data inicial.",
        },
      };
    }

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
    const response = await this.findOne({
      id: projectId,
      status: ProjectStatus.CONCLUIDO,
    });

    if (!response.message) {
      return {
        status: httpStatus.BadRequest,
        message: {
          error: "Não é possível remover um projeto que não esteja concluído.",
        },
      };
    }

    await this._model.destroy({ where: { id: projectId } });

    return {
      status: httpStatus.NoContent,
    };
  }
}
