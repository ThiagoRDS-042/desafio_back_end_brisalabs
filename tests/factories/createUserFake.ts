import { User } from "../../src/domain/entities/user.model";
import { InMemoryUsersRepository } from "../repositories/inMemoryUsersRepository";

export const createUserFakeFactory = (
  usersRepository: InMemoryUsersRepository
) => {
  const user = User.create({
    name: "user-fake",
    email: "userFake@example.com",
    phone: "+55 (11) 9.9546-1235",
  });

  usersRepository.users.push(user);

  return user;
};
