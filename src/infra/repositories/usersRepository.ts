import { EntityRepository, getRepository, Repository } from "typeorm";
import { IUsersRepository } from "../../application/repositories/IUsersRepository";
import { User } from "../../domain/entities/user.model";

@EntityRepository(User)
export class UsersRepository implements IUsersRepository {
  private usersRepo: Repository<User>;

  constructor() {
    this.usersRepo = getRepository(User);
  }

  async userAlreadyExists(email: string): Promise<boolean> {
    const user = await this.usersRepo.findOne({ where: { email } });

    return !!user;
  }

  async create(user: User): Promise<User> {
    const newUser = await this.usersRepo.save(user);

    return newUser;
  }

  async findByID(user_id: string): Promise<User | null> {
    const user = await this.usersRepo.findOne({ where: { id: user_id } });

    return user || null;
  }
}
