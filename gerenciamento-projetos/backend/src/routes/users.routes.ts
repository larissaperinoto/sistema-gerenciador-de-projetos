import { Router } from "express";
import User from "../database/models/users.model";
import { UserService } from "../services/users.service";
import { UserController } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const route = Router();
const service = new UserService(User);
const controller = new UserController(service);

route.get("/users", authMiddleware, controller.findAll.bind(controller));

export default route;
