import { Request, Response } from "express";
import { StatusCode } from "../../responses";
import { FindTransactionsByUserIdUseCase } from "../usecases/findTransactionsByUserIdUseCase";

export class FindTransactionsByUserIdController {
  constructor(
    private findTransactionsByUserId: FindTransactionsByUserIdUseCase
  ) {}

  async execute(request: Request, response: Response) {
    const { user_id } = request.params;

    const transactions = await this.findTransactionsByUserId.execute({
      user_id,
    });

    return response.status(StatusCode.OK).json(transactions);
  }
}
