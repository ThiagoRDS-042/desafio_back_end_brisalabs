import { Router } from "express";
import { createUserControllerFactory } from "../factories/createUserController";

export const routerUser = Router();

routerUser.post("/api/v1/users", (req, res) => {
  return createUserControllerFactory().execute(req, res);
});
