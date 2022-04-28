import { PixKeysRepository } from "../../infra/repositories/pixKeysRepository";
import { TransactionsRepository } from "../../infra/repositories/transactionsRepository";
import { CreateTransactionController } from "../controllers/createTransactionController";
import { CreateTransactionUseCase } from "../usecases/createTransactionUseCase";
import { createTransportSendMailFactory } from "./createTranportSendMail";

export const createTransactionControllerFactory = () => {
  const pixKeysRepository = new PixKeysRepository();
  const transactionsRepository = new TransactionsRepository();
  const transporter = createTransportSendMailFactory();
  const createTransactionUseCase = new CreateTransactionUseCase(
    pixKeysRepository,
    transactionsRepository,
    transporter
  );
  const createTransactionController = new CreateTransactionController(
    createTransactionUseCase
  );

  return createTransactionController;
};
