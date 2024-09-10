import { Router } from "express";
import User from "../database/models/users.model";
import { UserService } from "../services/users.service";
import { UserController } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { validatorMiddleware } from "../middlewares/validator.middleware";
import { RoleValidatorSchema } from "../utils/class-validator/user.validator";

const route = Router();
const service = new UserService(User);
const controller = new UserController(service);

route.use(authMiddleware);
route.get("/users", controller.findAll.bind(controller));
route.put(
  "/users/:userId",
  (req, res, next) => validatorMiddleware(req, res, next, RoleValidatorSchema),
  controller.update.bind(controller)
);

export default route;
