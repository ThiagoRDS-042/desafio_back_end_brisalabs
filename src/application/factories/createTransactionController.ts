import { PixKeysRepository } from "../../infra/repositories/pixKeysRepository";
import { TransactionsRepository } from "../../infra/repositories/transactionsRepository";
import { CreateTransactionController } from "../controllers/createTransactionController";
import { CreateTransactionUseCase } from "../usecases/createTransactionUseCase";

export const createTransactionControllerFactory = () => {
  const pixKeysRepository = new PixKeysRepository();
  const transactionsRepository = new TransactionsRepository();
  const createTransactionUseCase = new CreateTransactionUseCase(
    pixKeysRepository,
    transactionsRepository
  );
  const createTransactionController = new CreateTransactionController(
    createTransactionUseCase
  );

  return createTransactionController;
};
