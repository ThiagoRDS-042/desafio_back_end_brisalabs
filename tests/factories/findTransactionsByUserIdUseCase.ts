import { FindTransactionsByUserIdUseCase } from "../../src/application/usecases/findTransactionsByUserIdUseCase";
import { InMemoryTransactionsRepository } from "../repositories/inMemoryTransactionsRepository";

export const findTransactionsByUserIdUseCaseFactory = (
  transactionRepository: InMemoryTransactionsRepository
) => {
  const findTransactionsByUserIdUseCase = new FindTransactionsByUserIdUseCase(
    transactionRepository
  );

  return findTransactionsByUserIdUseCase;
};
