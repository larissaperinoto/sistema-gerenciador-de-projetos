import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import Users from "../database/models/users.model";
import { validatorMiddleware } from "../middlewares/validator.middleware";
import {
  LoginValidatorSchema,
  RegisterUserValidatorSchema,
} from "../utils/class-validator/auth.validator";
import authMiddleware from "../middlewares/auth.middleware";

const route = Router();
const service = new AuthService(Users);
const controller = new AuthController(service);

route.get("/auth/me", authMiddleware, controller.getUser.bind(controller));
route.post(
  "/auth/register",
  (req, res, next) =>
    validatorMiddleware(req, res, next, RegisterUserValidatorSchema),
  controller.register.bind(controller)
);
route.post(
  "/auth/login",
  (req, res, next) => validatorMiddleware(req, res, next, LoginValidatorSchema),
  controller.login.bind(controller)
);

export default route;
