import { Request, Response } from "express";
import { IProjectService } from "../services/projects.service";

export class ProjectsController {
  private service: IProjectService;

  constructor(service: IProjectService) {
    this.service = service;
  }

  public async findAll(_req: Request, res: Response) {
    const { status, message } = await this.service.findAll();
    res.status(status).json(message);
  }

  public async findOne(req: Request, res: Response) {
    const id = req.params["projectId"];

    const { status, message } = await this.service.findOne({ id });
    res.status(status).json(message);
  }

  public async insert(req: Request, res: Response) {
    const { status, message } = await this.service.insert(req.body);
    res.status(status).json(message);
  }

  public async update(req: Request, res: Response) {
    const projectId = req.params["projectId"];

    const { status, message } = await this.service.update(projectId, req.body);
    res.status(status).json(message);
  }

  public async remove(req: Request, res: Response) {
    const projectId = req.params["projectId"];
    const { status, message } = await this.service.remove(projectId);

    if (message) {
      res.status(status!).json(message);
    }

    res.sendStatus(status!);
  }
}
