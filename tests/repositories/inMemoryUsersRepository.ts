import { IUsersRepository } from "../../src/application/repositories/IUsersRepository";
import { User } from "../../src/domain/entities/user";

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }

  async userAlreadyExists(email: string): Promise<boolean> {
    const userAlreadyExists = this.users.find(
      (user) => user.props.email === email
    );

    return !!userAlreadyExists;
  }
}
