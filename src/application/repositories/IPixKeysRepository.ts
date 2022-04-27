import { PixKey } from "../../domain/entities/pixKey.model";

export interface IPixKeysRepository {
  pixKeyAlreadyExists(key: string): Promise<boolean>;
  create(pixKey: PixKey): Promise<PixKey>;
  findByUserId(user_id: string): Promise<PixKey[]>;
}
