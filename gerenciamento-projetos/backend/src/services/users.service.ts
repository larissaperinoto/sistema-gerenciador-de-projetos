import User from "../database/models/users.model";
import { httpStatus } from "../utils/httpStatus";
import { ServiceResponse } from "../utils/types/responses";

export interface IUserService {
  findAll: () => Promise<ServiceResponse>;
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
}
