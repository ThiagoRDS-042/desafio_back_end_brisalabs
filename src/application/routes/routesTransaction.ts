import { Router } from "express";
import { createTransactionControllerFactory } from "../factories/createTransactionController";
import { findTransactionsByUserIdControllerFactory } from "../factories/findTransactionsByUserIdController";

export const routerTransaction = Router();

routerTransaction.post("/api/v1/transactions", (req, res) => {
  return createTransactionControllerFactory().execute(req, res);
});

routerTransaction.get("/api/v1/transactions/:user_id", (req, res) => {
  return findTransactionsByUserIdControllerFactory().execute(req, res);
});
