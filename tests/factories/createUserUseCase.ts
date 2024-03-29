import { CreateUserUseCase } from "../../src/application/usecases/createUserUseCase";
import { InMemoryUsersRepository } from "../repositories/inMemoryUsersRepository";

export const createUserUseCaseFactory = () => {
  const usersRepository = new InMemoryUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  return createUserUseCase;
};
