import { TransactionsRepository } from "../../infra/repositories/transactionsRepository";
import { FindTransactionsByUserIdController } from "../controllers/findTransactionsByUserIdController";
import { FindTransactionsByUserIdUseCase } from "../usecases/findTransactionsByUserIdUseCase";

export const findTransactionsByUserIdControllerFactory = () => {
  const transactionsRepository = new TransactionsRepository();
  const findTransactionsByUserIdUseCase = new FindTransactionsByUserIdUseCase(
    transactionsRepository
  );
  const findTransactionsByUserIdController =
    new FindTransactionsByUserIdController(findTransactionsByUserIdUseCase);

  return findTransactionsByUserIdController;
};
