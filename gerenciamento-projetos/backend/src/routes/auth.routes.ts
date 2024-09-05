import { Router } from "express";

const route = Router();

route.get("/auth/me", () => {});
route.post("/auth/register", () => {});
route.post("/auth/login", () => {});

export default route;
