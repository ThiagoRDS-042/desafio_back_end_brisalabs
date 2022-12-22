import { User } from "../../domain/entities/user.model";

export interface IUsersRepository {
  userAlreadyExists(email: string): Promise<boolean>;
  create(user: User): Promise<User>;
  findByID(user_id: string): Promise<User | null>;
}
