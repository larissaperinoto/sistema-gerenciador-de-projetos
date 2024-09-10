import { fetchData, HttpMethod } from "../utils/fetch";

export enum ProjectStatus {
  EM_ANDAMENTO = "Em andamento",
  CONCLUIDO = "Concluído",
  PENDENTE = "Pendente",
}

export type ProjectType = {
  id?: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
};

export class ProjectsService {
  private _serverUrl: string;
  static instance: ProjectsService;

  constructor(serverUrl: string) {
    this._serverUrl = serverUrl;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProjectsService(
        process.env.REACT_APP_SERVER_URL as string
      );
    }

    return this.instance;
  }

  public async getProjects() {
    const getProjectsPath = process.env.REACT_APP_PROJECTS_PATH as string;
    const data = await fetchData(
      this._serverUrl + getProjectsPath,
      HttpMethod.GET
    );
    return data;
  }

  public async removeProject(projectId: string) {
    const getProjectsPath = process.env.REACT_APP_PROJECTS_PATH as string;

    await fetchData(
      this._serverUrl + getProjectsPath + `/${projectId}`,
      HttpMethod.DELETE
    );
  }

  public async createProject({
    name,
    description,
    startDate,
    endDate,
    status,
  }: Partial<ProjectType>) {
    const createProjectsPath = process.env.REACT_APP_PROJECTS_PATH as string;

    const data = await fetchData(
      this._serverUrl + createProjectsPath,
      HttpMethod.POST,
      {
        name,
        description,
        startDate,
        endDate,
        status,
      }
    );

    return data;
  }

  public async updateProject(project: Partial<ProjectType>) {
    const createProjectsPath = process.env.REACT_APP_PROJECTS_PATH as string;

    const data = await fetchData(
      this._serverUrl + createProjectsPath + `/${project.id}`,
      HttpMethod.PUT,
      project
    );

    return data;
  }

  public async getProject(projectId: string) {
    const projectsPath = process.env.REACT_APP_PROJECTS_PATH as string;

    const data = await fetchData(
      this._serverUrl + projectsPath + `/${projectId}`,
      HttpMethod.GET
    );

    return data;
  }

  public async getMembers(projectId: string) {
    const projectsPath = process.env.REACT_APP_PROJECTS_PATH as string;

    const data = await fetchData(
      this._serverUrl + projectsPath + `/${projectId}/users`,
      HttpMethod.GET
    );

    return data;
  }

  public async removeMember(projectId: string, userId: string) {
    const getProjectsPath = process.env.REACT_APP_PROJECTS_PATH as string;

    await fetchData(
      this._serverUrl + getProjectsPath + `/${projectId}/users/${userId}`,
      HttpMethod.DELETE
    );
  }

  public async addMember(projectId: string, userId: string) {
    const getProjectsPath = process.env.REACT_APP_PROJECTS_PATH as string;

    await fetchData(
      this._serverUrl + getProjectsPath + `/${projectId}/users`,
      HttpMethod.POST,
      { userId }
    );
  }
}
