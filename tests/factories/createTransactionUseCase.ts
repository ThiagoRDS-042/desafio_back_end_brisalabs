import { CreateTransactionUseCase } from "../../src/application/usecases/createTransactionUseCase";
import { InMemoryPixKeysRepository } from "../repositories/inMemoryPixKeysRepository";
import { InMemoryTransactionsRepository } from "../repositories/inMemoryTransactionsRepository";

export const createTransactionUseCaseFactory = (
  pixKeysRepository: InMemoryPixKeysRepository
) => {
  const transactionRepository = new InMemoryTransactionsRepository(
    pixKeysRepository
  );
  const createTransactionUseCase = new CreateTransactionUseCase(
    pixKeysRepository,
    transactionRepository
  );

  return createTransactionUseCase;
};
