import * as jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { httpStatus } from "../utils/httpStatus";

const authMiddleware: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res
      .status(httpStatus.Unauthorized)
      .json({ error: "Token not found." });

  try {
    const user = jwt.verify(authorization, process.env.JWT_SECRET as string);
    req.body.user = user;
    next();
  } catch (error) {
    return res
      .status(httpStatus.Unauthorized)
      .json({ error: "Token must be a valid token." });
  }
};

export default authMiddleware;
