import { Router } from "express";
import Project from "../database/models/projects.model";
import { ProjectsService } from "../services/projects.service";
import { ProjectsController } from "../controllers/projects.controller";
import { validatorMiddleware } from "../middlewares/validator.middleware";
import {
  CreateProjectValidatorSchema,
  UpdateProjectValidatorSchema,
} from "../utils/class-validator/project.validator";
import { ProjectsUsersService } from "../services/projetcsUsers.service";
import ProjectsUsers from "../database/models/projectsUsers.model";
import { ProjectsUsersController } from "../controllers/projectsUsers.controller";
import { AuthService } from "../services/auth.service";
import Users from "../database/models/users.model";

const route = Router();

const projectsService = new ProjectsService(Project);
const projectsController = new ProjectsController(projectsService);

const userDervice = new AuthService(Users);
const projectsUsersService = new ProjectsUsersService(
  ProjectsUsers,
  userDervice
);
const projectsUsersController = new ProjectsUsersController(
  projectsUsersService
);

route.get("/projects", projectsController.findAll.bind(projectsController));

route.get(
  "/projects/:projectId/users",
  projectsUsersController.findUsersInProject.bind(projectsUsersController)
);

route.post(
  "/projects",
  (req, res, next) =>
    validatorMiddleware(req, res, next, CreateProjectValidatorSchema),
  projectsController.insert.bind(projectsController)
);

route.post(
  "/projects/:projectId/users",
  projectsUsersController.insertUserInProject.bind(projectsUsersController)
);

route.put(
  "/projects/:projectId",
  (req, res, next) =>
    validatorMiddleware(req, res, next, UpdateProjectValidatorSchema),
  projectsController.update.bind(projectsController)
);

route.delete(
  "/projects/:projectId",
  projectsController.remove.bind(projectsController)
);

route.delete(
  "/projects/:projectId/users/:userId",
  projectsUsersController.removeUserFromProject.bind(projectsUsersController)
);

export default route;
