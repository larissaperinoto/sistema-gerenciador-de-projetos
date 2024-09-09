import { Request, Response } from "express";
import { IAuthService } from "../services/auth.service";

export class AuthController {
  private service: IAuthService;

  constructor(service: IAuthService) {
    this.service = service;
  }

  public async register(req: Request, res: Response) {
    const { status, message } = await this.service.register(req.body);
    res.status(status).json(message);
  }

  public async login(req: Request, res: Response) {
    const { status, message } = await this.service.login(req.body);
    res.status(status).json(message);
  }

  public async getUser(req: Request, res: Response) {
    const { status, message } = await this.service.getUser(req.body);
    res.status(status).json(message);
  }
}
