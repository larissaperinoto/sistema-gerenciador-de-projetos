import { Request, Response } from "express";
import { IProjectsUsersService } from "../services/projetcsUsers.service";
import { httpStatus } from "../utils/httpStatus";

export class ProjectsUsersController {
  private service: IProjectsUsersService;

  constructor(service: IProjectsUsersService) {
    this.service = service;
  }

  public async findUsersInProject(req: Request, res: Response) {
    const projectId = req.params["projectId"];

    if (!projectId) {
      return res.status(httpStatus.BadRequest).json({
        error: "É necessário um id de projeto para completar a ação.",
      });
    }

    const { status, message } = await this.service.findUsersInProject(
      projectId
    );
    res.status(status).json(message);
  }

  public async insertUserInProject(req: Request, res: Response) {
    const projectId = req.params["projectId"];

    if (!projectId) {
      return res.status(httpStatus.BadRequest).json({
        error: "É necessário um id de projeto para completar a ação.",
      });
    }

    const { status, message } = await this.service.insertUserInProject(
      projectId,
      req.body
    );
    res.status(status).json(message);
  }

  public async removeUserFromProject(req: Request, res: Response) {
    const projectId = req.params["projectId"];
    const userId = req.params["userId"];

    if (!projectId) {
      return res.status(httpStatus.BadRequest).json({
        error: "É necessário um id de projeto para completar a ação.",
      });
    }

    if (!userId) {
      return res.status(httpStatus.BadRequest).json({
        error: "É necessário um id de usuário para completar a ação.",
      });
    }

    const { status } = await this.service.removeUserFromProject(
      projectId,
      userId
    );
    res.sendStatus(status!);
  }
}
