import { CreateTransactionUseCase } from "../../src/application/usecases/createTransactionUseCase";
import { InMemoryPixKeysRepository } from "../repositories/inMemoryPixKeysRepository";
import { InMemoryTransactionsRepository } from "../repositories/inMemoryTransactionsRepository";
import { createTransportSendMailFakeFactory } from "./createTransportSendMailFake";

export const createTransactionUseCaseFactory = async (
  pixKeysRepository: InMemoryPixKeysRepository
) => {
  const transactionRepository = new InMemoryTransactionsRepository(
    pixKeysRepository
  );
  const transporter = await createTransportSendMailFakeFactory();
  const createTransactionUseCase = new CreateTransactionUseCase(
    pixKeysRepository,
    transactionRepository,
    transporter
  );

  return createTransactionUseCase;
};
