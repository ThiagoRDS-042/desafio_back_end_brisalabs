import { Router } from "express";
import { createUserControllerFactory } from "../factories/createUserControllerFactory";

export const routerUser = Router();

routerUser.post("/user", (req, res) => {
  return createUserControllerFactory().execute(req, res);
});
