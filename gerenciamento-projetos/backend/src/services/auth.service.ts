import User from "../database/models/users.model";
import bcrypt from "bcrypt";
import { httpStatus } from "../utils/httpStatus";
import { RegisterType } from "../utils/types/register.type";
import { ServiceResponse } from "../utils/types/responses";
import generateToken from "../utils/generateToken";

export interface IAuthService {
  register: (payload: RegisterType) => Promise<ServiceResponse>;
  login: (payload: Partial<RegisterType>) => Promise<ServiceResponse>;
  getUser: (payload: {
    user: Partial<RegisterType>;
  }) => Promise<ServiceResponse>;
}

export class AuthService implements IAuthService {
  private _model: typeof User;

  constructor(model: typeof User) {
    this._model = model;
  }

  public async register(payload: RegisterType) {
    const { name, email, password, role } = payload;

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

    const { id } = await this._model.create({
      name,
      email,
      role,
      password: hashedPassword,
    });
    const res = await this.login({ email, password });

    return {
      status: httpStatus.Created,
      message: {
        id,
        name,
        email,
        role,
        token: res.message.token,
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

  public async getUser(payload: { user: Partial<RegisterType> }) {
    const { email, id } = payload.user;

    let where = {};

    if (email) {
      where = { ...where, email };
    }

    if (id) {
      where = { ...where, id };
    }

    const user = await this._model.findOne({
      where,
      attributes: { exclude: ["password"] },
    });

    return {
      status: httpStatus.OK,
      message: user!,
    };
  }
}
