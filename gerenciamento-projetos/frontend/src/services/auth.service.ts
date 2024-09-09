export enum UserRole {
  GERENTE = "Gerente",
  DESENVOLVEDOR = "Desenvolvedor",
  DESIGNER = "Designer",
}

type RegisterType = {
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

  public getToken() {
    localStorage.getItem("token");
  }

  public async login(credentials: Partial<RegisterType>) {
    const loginPath = process.env.REACT_APP_LOGIN_PATH as string;

    const res = await fetch(this._serverUrl + loginPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (res.status !== 200) {
      throw new Error(data.error);
    }

    this.saveToken(data.token);
  }

  public async register(user: RegisterType) {
    const registerPath = process.env.REACT_APP_REGISTER_PATH as string;

    const res = await fetch(this._serverUrl + registerPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.status !== 201) {
      throw new Error(data.error);
    }

    this.saveToken(data.token);
  }
}
