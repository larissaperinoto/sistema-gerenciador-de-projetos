import { Router } from "express";

import ProjectsUsers from "../database/models/projectsUsers.model";
import Project from "../database/models/projects.model";
import User from "../database/models/users.model";

import { ProjectsService } from "../services/projects.service";
import { ProjectsUsersService } from "../services/projetcsUsers.service";
import { AuthService } from "../services/auth.service";

import { ProjectsController } from "../controllers/projects.controller";
import { ProjectsUsersController } from "../controllers/projectsUsers.controller";

import { validatorMiddleware } from "../middlewares/validator.middleware";
import authMiddleware from "../middlewares/auth.middleware";

import {
  CreateProjectValidatorSchema,
  InsertUserInProjectValidatorSchema,
  UpdateProjectValidatorSchema,
} from "../utils/class-validator/project.validator";

const route = Router();

const projectsService = new ProjectsService(Project);
const projectsController = new ProjectsController(projectsService);

const projectsUsersService = new ProjectsUsersService(
  ProjectsUsers,
  new AuthService(User),
  new ProjectsService(Project)
);
const projectsUsersController = new ProjectsUsersController(
  projectsUsersService
);

route.use(authMiddleware);

route.get("/projects", projectsController.findAll.bind(projectsController));
route.get(
  "/projects/:projectId",
  projectsController.findOne.bind(projectsController)
);

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
  (req, res, next) =>
    validatorMiddleware(req, res, next, InsertUserInProjectValidatorSchema),
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
