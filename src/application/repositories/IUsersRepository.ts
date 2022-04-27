import { User, UserProps } from "../../domain/entities/user.model";

export interface IUsersRepository {
  userAlreadyExists(email: string): Promise<boolean>;
  create(user: UserProps): Promise<User>;
}
