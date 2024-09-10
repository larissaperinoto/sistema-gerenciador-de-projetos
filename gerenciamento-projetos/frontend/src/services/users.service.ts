import { fetchData, HttpMethod } from "../utils/fetch";

export class UsersService {
  private _serverUrl: string;
  static instance: UsersService;

  constructor(serverUrl: string) {
    this._serverUrl = serverUrl;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UsersService(
        process.env.REACT_APP_SERVER_URL as string
      );
    }

    return this.instance;
  }

  public async getUsers() {
    const getProjectsPath = process.env.REACT_APP_USERS_PATH as string;
    const data = await fetchData(
      this._serverUrl + getProjectsPath,
      HttpMethod.GET
    );
    return data;
  }

  public async changeRole(userId: string, role: string) {
    const getProjectsPath = process.env.REACT_APP_USERS_PATH as string;
    const data = await fetchData(
      this._serverUrl + getProjectsPath + `/${userId}`,
      HttpMethod.PUT,
      { role }
    );
    return data;
  }
}
