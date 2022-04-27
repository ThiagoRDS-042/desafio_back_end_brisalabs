import { Request, Response } from "express";
import { StatusCode } from "../../responses";
import { CreateUserUseCase } from "../usecases/createUserUseCase";

class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}

  async execute(request: Request, response: Response) {
    const { email, name, phone } = request.body;

    const user = await this.createUser.execute({ email, name, phone });

    return response.status(StatusCode.CREATED).json(user);
  }
}

export { CreateUserController };
