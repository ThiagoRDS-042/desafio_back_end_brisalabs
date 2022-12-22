import { Request, Response } from "express";
import { StatusCode } from "../../responses";
import { CreatePixKeyUseCase } from "../usecases/createPixKeyUseCase";

export class CreatePixKeyController {
  constructor(private createPixKey: CreatePixKeyUseCase) {}

  async execute(request: Request, response: Response) {
    const { key, user_id } = request.body;

    const pixKey = await this.createPixKey.execute({ key, user_id });

    return response.status(StatusCode.CREATED).json(pixKey);
  }
}
