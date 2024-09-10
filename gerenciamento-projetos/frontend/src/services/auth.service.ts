import { fetchData, HttpMethod } from "../utils/fetch";

export enum UserRole {
  GERENTE = "Gerente",
  DESENVOLVEDOR = "Desenvolvedor",
  DESIGNER = "Designer",
}

export type UserType = {
  id?: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
};

export class AuthService {
  private _serverUrl: string;
  static instance: AuthService;

  constructor(serverUrl: string) {
    this._serverUrl = serverUrl;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthService(
        process.env.REACT_APP_SERVER_URL as string
      );
    }

    return this.instance;
  }

  private saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  public getToken(): string | null {
    return localStorage.getItem("token");
  }

  public async login(credentials: Partial<UserType>) {
    const loginPath = process.env.REACT_APP_LOGIN_PATH as string;

    const data = await fetchData(
      this._serverUrl + loginPath,
      HttpMethod.POST,
      credentials
    );

    this.saveToken(data.token);
  }

  public async register(user: UserType) {
    const registerPath = process.env.REACT_APP_REGISTER_PATH as string;

    const data = await fetchData(
      this._serverUrl + registerPath,
      HttpMethod.POST,
      user
    );

    this.saveToken(data.token);
  }
}
