import { UsersRepository } from "../../infra/repositories/usersRepository";
import { CreateUserController } from "../controllers/userController";
import { CreateUserUseCase } from "../usecases/createUserUseCase";

export const createUserControllerFactory = () => {
  const usersRepository = new UsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};
