import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";
import { createTransportSendMailFactory } from "../../application/factories/createTransportSendMail";
import { SendMailUseCase } from "../../application/usecases/sendMailUseCase";
import { Transaction } from "../../domain/entities/transaction.model";
import { PixKeysRepository } from "../repositories/pixKeysRepository";

@EventSubscriber()
export class TransactionSubscriber
  implements EntitySubscriberInterface<Transaction>
{
  listenTo() {
    return Transaction;
  }

  async afterInsert(event: InsertEvent<Transaction>) {
    const transaction = event.entity;

    const pixKeysRepository = new PixKeysRepository();

    const pixKey_user_to = await pixKeysRepository.findByKey(
      transaction.pixKey_key_to
    );
    const pixKey_user_from = await pixKeysRepository.findByKey(
      transaction.pixKey_key_from
    );

    const sendMailUseCase = new SendMailUseCase(
      createTransportSendMailFactory()
    );

    const date = format(new Date(), "dd MMM yyyy", {
      locale: ptBR,
    });

    Promise.all([
      sendMailUseCase.execute({
        subject: "Transação Concluída",
        content: `Olá, <strong>${pixKey_user_to.user.name}!</strong> você acaba de receber <strong>R$ ${transaction.amount},00</strong>, vindo de <strong>${pixKey_user_from.user.name}</strong>  <${pixKey_user_from.user.email}> | <strong>${date}</strong>`,
        to: pixKey_user_to.user.email,
      }),
      sendMailUseCase.execute({
        subject: "Transação Concluída",
        content: `Olá, <strong>${pixKey_user_from.user.name}!</strong> você acaba de enviar <strong>R$ ${transaction.amount},00</strong> para <strong>${pixKey_user_to.user.name}</strong>  <${pixKey_user_to.user.email}>  | </strong>${date}<strong>`,
        to: pixKey_user_from.user.email,
      }),
    ]);
  }
}
