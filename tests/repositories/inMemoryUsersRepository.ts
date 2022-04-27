import { IUsersRepository } from "../../src/application/repositories/IUsersRepository";
import { User } from "../../src/domain/entities/user.model";

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }

  async userAlreadyExists(email: string): Promise<boolean> {
    const userAlreadyExists = this.users.find((user) => user.email === email);

    return !!userAlreadyExists;
  }

  async findByID(user_id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === user_id);

    return user || null;
  }
}
