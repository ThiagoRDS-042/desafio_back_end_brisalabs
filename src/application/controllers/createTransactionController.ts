import { Request, Response } from "express";
import { StatusCode } from "../../responses";
import { CreateTransactionUseCase } from "../usecases/createTransactionUseCase";

export class CreateTransactionController {
  constructor(private createTransaction: CreateTransactionUseCase) {}

  async execute(request: Request, response: Response) {
    const { amount, pixKey_key_from, pixKey_key_to } = request.body;

    const transaction = await this.createTransaction.execute({
      amount,
      pixKey_key_from,
      pixKey_key_to,
    });

    return response.status(StatusCode.CREATED).json(transaction);
  }
}
