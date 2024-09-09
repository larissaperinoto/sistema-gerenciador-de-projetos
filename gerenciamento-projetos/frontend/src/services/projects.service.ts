import { AuthService } from "./auth.service";

export type ProjectType = {
  id?: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
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
    const getProjectsPath = process.env.REACT_APP_GET_PROJECTS_PATH as string;

    const token = AuthService.getInstance().getToken();

    if (!token) {
      throw new Error("Unauthorized");
    }

    const res = await fetch(this._serverUrl + getProjectsPath, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    if (res.status !== 200) {
      throw new Error(data.error);
    }

    return data;
  }

  public async removeProject(projectId: string) {
    const getProjectsPath = process.env
      .REACT_APP_REMOVE_PROJECTS_PATH as string;

    const token = AuthService.getInstance().getToken();

    if (!token) {
      throw new Error("Unauthorized");
    }

    const res = await fetch(
      this._serverUrl + getProjectsPath + `/${projectId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const data = await res.json();

    if (res.status === 401) {
      throw new Error("Unauthorized");
    }

    if (res.status !== 204) {
      throw new Error(data.error);
    }

    return data;
  }
}
