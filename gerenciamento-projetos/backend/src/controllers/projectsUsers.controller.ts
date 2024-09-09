import { Request, Response } from "express";
import { IProjectsUsersService } from "../services/projetcsUsers.service";

export class ProjectsUsersController {
  private service: IProjectsUsersService;

  constructor(service: IProjectsUsersService) {
    this.service = service;
  }

  public async findUsersInProject(req: Request, res: Response) {
    const projectId = req.params["projectId"];
    const { status, message } = await this.service.findUsersInProject(
      projectId
    );
    res.status(status).json(message);
  }

  public async insertUserInProject(req: Request, res: Response) {
    const projectId = req.params["projectId"];

    const { status, message } = await this.service.insertUserInProject(
      projectId,
      req.body
    );
    res.status(status).json(message);
  }

  public async removeUserFromProject(req: Request, res: Response) {
    const projectId = req.params["projectId"];
    const userId = req.params["userId"];

    const { status } = await this.service.removeUserFromProject(
      projectId,
      userId
    );
    res.sendStatus(status!);
  }
}
