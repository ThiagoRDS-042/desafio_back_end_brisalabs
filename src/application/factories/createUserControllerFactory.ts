import { UsersRepository } from "../../infra/repositories/UsersRepository";
import { CreateUserController } from "../controllers/UserController";
import { CreateUserUseCase } from "../usecases/createUserUseCase";

export const createUserControllerFactory = () => {
  const usersRepository = new UsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};
