import { PixKeysRepository } from "../../infra/repositories/pixKeysRepository";
import { UsersRepository } from "../../infra/repositories/usersRepository";
import { CreatePixKeyController } from "../controllers/createPixKeyController";
import { CreatePixKeyUseCase } from "../usecases/createPixKeyUseCase";

export const createPixKeyControllerFactory = () => {
  const usersRepository = new UsersRepository();
  const pixKeysRepository = new PixKeysRepository();
  const createPixKeyUseCase = new CreatePixKeyUseCase(
    pixKeysRepository,
    usersRepository
  );
  const createPixKeyController = new CreatePixKeyController(
    createPixKeyUseCase
  );

  return createPixKeyController;
};
