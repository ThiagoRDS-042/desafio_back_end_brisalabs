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
        contentText: `${pixKey_user_to.user.name} você acaba de receber R$ ${transaction.amount}, vindo de ${pixKey_user_from.user.name}  <${pixKey_user_from.user.email}> | ${date}`,
        to: pixKey_user_to.user.email,
      }),
      sendMailUseCase.execute({
        subject: "Transação Concluída",
        contentText: `${pixKey_user_from.user.name} você acaba de enviar R$ ${transaction.amount} para ${pixKey_user_to.user.name}  <${pixKey_user_to.user.email}>  | ${date}`,
        to: pixKey_user_from.user.email,
      }),
    ]);
  }
}
