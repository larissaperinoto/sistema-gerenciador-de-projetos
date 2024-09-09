import { Router } from "express";
import Project from "../database/models/projects.model";
import { ProjectsService } from "../services/projects.service";
import { ProjectsController } from "../controllers/projects.controller";
import { validatorMiddleware } from "../middlewares/validator.middleware";
import {
  CreateProjectValidatorSchema,
  UpdateProjectValidatorSchema,
} from "../utils/class-validator/project.validator";

const route = Router();

const service = new ProjectsService(Project);
const controller = new ProjectsController(service);

route.get("/projects", controller.findAll.bind(controller));
route.post(
  "/projects",
  (req, res, next) =>
    validatorMiddleware(req, res, next, CreateProjectValidatorSchema),
  controller.insert.bind(controller)
);
route.put(
  "/projects/:id",
  (req, res, next) =>
    validatorMiddleware(req, res, next, UpdateProjectValidatorSchema),
  controller.update.bind(controller)
);
route.delete("/projects/:id", controller.remove.bind(controller));

export default route;
