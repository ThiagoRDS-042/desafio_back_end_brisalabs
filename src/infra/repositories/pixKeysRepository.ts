import { getRepository, Repository } from "typeorm";
import { IPixKeysRepository } from "../../application/repositories/IPixKeysRepository";
import { PixKey, PixKeyProps } from "../../domain/entities/pixKey.model";

export class PixKeysRepository implements IPixKeysRepository {
  private pixKeyRepo: Repository<PixKey>;

  constructor() {
    this.pixKeyRepo = getRepository(PixKey);
  }

  async pixKeyAlreadyExists(key: string): Promise<boolean> {
    const pixKey = await this.pixKeyRepo.findOne({
      where: { key },
    });

    return !!pixKey;
  }

  async create(pixKey: PixKeyProps): Promise<PixKey> {
    const newPixKey = await this.pixKeyRepo.save(pixKey);

    return newPixKey;
  }

  async findByUserId(user_id: string): Promise<PixKey[]> {
    const pixKeys = await this.pixKeyRepo.find({ where: { user_id } });

    return pixKeys;
  }
}
