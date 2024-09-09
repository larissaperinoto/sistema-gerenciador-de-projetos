import Users from "../database/models/users.model";
import bcrypt from "bcrypt";
import { httpStatus } from "../utils/httpStatus";
import { RegisterType } from "../utils/types/register.type";
import { ServiceResponse } from "../utils/types/responses";
import generateToken from "../utils/generateToken";

export interface IAuthService {
  register: (payload: RegisterType) => Promise<ServiceResponse>;
  login: (payload: Partial<RegisterType>) => Promise<ServiceResponse>;
  getUser: (payload: Partial<RegisterType>) => Promise<ServiceResponse>;
}

export class AuthService implements IAuthService {
  private _model: typeof Users;

  constructor(model: typeof Users) {
    this._model = model;
  }

  public async register(payload: RegisterType) {
    const { email, password } = payload;

    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const userExists = await this._model.findOne({ where: { email } });

    if (userExists) {
      return {
        status: httpStatus.BadRequest,
        message: {
          error: "Usuário já existe.",
        },
      };
    }

    await this._model.create({ ...payload, password: hashedPassword });

    return {
      status: httpStatus.Created,
      message: {
        error: "User created successfully.",
      },
    };
  }
  public async login(payload: Partial<RegisterType>) {
    const { email, password } = payload;
    const user = await this._model.findOne({ where: { email } });

    if (!user) {
      return {
        status: httpStatus.BadRequest,
        message: {
          error: "Invalid credentials.",
        },
      };
    }

    const correctPassword = await bcrypt.compare(password!, user.password);

    if (!correctPassword) {
      return {
        status: httpStatus.BadRequest,
        message: {
          error: "Invalid credentials.",
        },
      };
    }

    return {
      status: httpStatus.Created,
      message: {
        token: generateToken(user),
      },
    };
  }

  public async getUser(payload: Partial<RegisterType>) {
    const user = await this._model.findOne({
      where: payload,
      attributes: { exclude: ["password"] },
    });

    return {
      status: httpStatus.OK,
      message: user ?? {},
    };
  }
}
