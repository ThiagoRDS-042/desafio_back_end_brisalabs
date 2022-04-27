import { PixKey, PixKeyProps } from "../../domain/entities/pixKey.model";

export interface IPixKeysRepository {
  pixKeyAlreadyExists(key: string): Promise<boolean>;
  create(pixKey: PixKeyProps): Promise<PixKey>;
  findByUserId(user_id: string): Promise<PixKey[]>;
}
