import { UserType } from "src/utils/types/register.type";
import User from "../database/models/users.model";
import { httpStatus } from "../utils/httpStatus";
import { ServiceResponse } from "../utils/types/responses";

export interface IUserService {
  findAll: () => Promise<ServiceResponse>;
  update: (userId: string, user: Partial<UserType>) => Promise<ServiceResponse>;
}

export class UserService implements IUserService {
  private _model: typeof User;

  constructor(model: typeof User) {
    this._model = model;
  }

  public async findAll() {
    try {
      const users = await this._model.findAll({
        attributes: { exclude: ["password"] },
      });
      return {
        status: httpStatus.OK,
        message: users,
      };
    } catch (e) {
      return {
        status: httpStatus.InternalSeverError,
        message: {
          error: `Unable to complete action. Error: ${e}`,
        },
      };
    }
  }

  public async update(userId: string, user: Partial<UserType>) {
    try {
      const res = await this._model.update(
        { role: user.role },
        { where: { id: userId } }
      );

      return {
        status: httpStatus.OK,
        message: res,
      };
    } catch (e) {
      return {
        status: httpStatus.InternalSeverError,
        message: {
          error: `Unable to complete action. Error: ${e}`,
        },
      };
    }
  }
}
