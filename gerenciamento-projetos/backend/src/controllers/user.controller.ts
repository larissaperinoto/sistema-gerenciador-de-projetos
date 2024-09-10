import { Request, Response } from "express";
import { IUserService } from "../services/users.service";

export class UserController {
  private service: IUserService;

  constructor(service: IUserService) {
    this.service = service;
  }

  public async findAll(_req: Request, res: Response) {
    const { status, message } = await this.service.findAll();
    res.status(status).json(message);
  }

  public async update(req: Request, res: Response) {
    const userId = req.params["userId"];
    const { status, message } = await this.service.update(userId, req.body);
    res.status(status).json(message);
  }
}
