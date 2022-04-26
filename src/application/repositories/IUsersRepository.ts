import { User } from "../../domain/entities/user";

export interface IUsersRepository {
  userAlreadyExists(email: string): Promise<boolean>;
  create(user: User): Promise<User>;
}
