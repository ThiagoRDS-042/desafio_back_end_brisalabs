import { getRepository } from "typeorm";
import { IUsersRepository } from "../../application/repositories/IUsersRepository";
import { User } from "../../domain/entities/user.model";

export class UsersRepository implements IUsersRepository {
  async userAlreadyExists(email: string): Promise<boolean> {
    const user = await getRepository(User).findOne({ where: { email: email } });

    return !!user;
  }

  async create(user: User): Promise<User> {
    const newUser = await getRepository(User).save(user);

    return newUser;
  }
}
