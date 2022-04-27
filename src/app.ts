import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import * as routes from "./application/routes";
import { AppError } from "./error/appError";
import "./infra/db";

export const app = express();

app.use(cors());

app.use(express.json());

app.use(routes.routerUser);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ Message: error.message });
  }

  return res.status(500).json({ Message: error.message });
});
