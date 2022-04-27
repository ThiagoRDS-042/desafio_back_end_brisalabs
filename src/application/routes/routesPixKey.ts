import { Router } from "express";
import { createPixKeyControllerFactory } from "../factories/createPixKeyController";

export const routerPixKey = Router();

routerPixKey.post("/api/v1/pixKeys", (req, res) => {
  return createPixKeyControllerFactory().execute(req, res);
});
