import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { Transaction } from "../../domain/entities/transaction.model";
import { AppError } from "../../error/appError";
import { Message, StatusCode } from "../../responses";
import { IPixKeysRepository } from "../repositories/IPixKeysRepository";
import { ITransactionsRepository } from "../repositories/ITransactionsRepository";
import { SendMailUseCase } from "./sendMailUseCase";

type CreateTransactionRequest = {
  amount: number;
  pixKey_key_from: string;
  pixKey_key_to: string;
};

export class CreateTransactionUseCase {
  constructor(
    private PixKeysRepository: IPixKeysRepository,
    private transactionRepository: ITransactionsRepository,
    private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>
  ) {}

  async execute({
    amount,
    pixKey_key_from,
    pixKey_key_to,
  }: CreateTransactionRequest) {
    const pixKeyFromExists = await this.PixKeysRepository.pixKeyAlreadyExists(
      pixKey_key_from
    );

    if (!pixKeyFromExists) {
      throw new AppError(Message.PIX_KEY_DOES_NOT_EXISTS, StatusCode.NOT_FOUND);
    }

    const pixKeyToExists = await this.PixKeysRepository.pixKeyAlreadyExists(
      pixKey_key_to
    );

    if (!pixKeyToExists) {
      throw new AppError(Message.PIX_KEY_DOES_NOT_EXISTS, StatusCode.NOT_FOUND);
    }

    const transaction = Transaction.create({
      amount,
      pixKey_key_from,
      pixKey_key_to,
    });

    await this.transactionRepository.create(transaction);

    const pixKey_user_to = await this.PixKeysRepository.findByKey(
      pixKey_key_to
    );
    const pixKey_user_from = await this.PixKeysRepository.findByKey(
      pixKey_key_from
    );

    const sendMailUseCase = new SendMailUseCase(this.transporter);

    const date = format(new Date(), "dd MMM yyyy", {
      locale: ptBR,
    });

    Promise.all([
      sendMailUseCase.execute({
        subject: "Transação Concluída",
        contentText: `${pixKey_user_to.user.name} você acaba de receber R$ ${transaction.amount}, vindo de ${pixKey_user_from.user.name}  <${pixKey_user_from.user.email}> | ${date}`,
        to: pixKey_user_to.user.email,
      }),
      sendMailUseCase.execute({
        subject: "Transação Concluída",
        contentText: `${pixKey_user_from.user.name} você acaba de enviar R$ ${transaction.amount} para ${pixKey_user_to.user.name}  <${pixKey_user_to.user.email}>  | ${date}`,
        to: pixKey_user_from.user.email,
      }),
    ]);

    return transaction;
  }
}
