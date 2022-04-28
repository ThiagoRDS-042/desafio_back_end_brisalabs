import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import nodemailer from "nodemailer";
import { createTransactionFakeFactory } from "../../../tests/factories/createTransactionFake";
import { createTransportSendMailFakeFactory } from "../../../tests/factories/createTransportSendMailFake";
import { InMemoryPixKeysRepository } from "../../../tests/repositories/inMemoryPixKeysRepository";
import { InMemoryTransactionsRepository } from "../../../tests/repositories/inMemoryTransactionsRepository";
import { InMemoryUsersRepository } from "../../../tests/repositories/inMemoryUsersRepository";
import { SendMailUseCase } from "./sendMailUseCase";

describe("Send mail use case", () => {
  it("should be able to send transaction completed confirmation emails", async () => {
    const pixKeysRepository = new InMemoryPixKeysRepository(
      new InMemoryUsersRepository()
    );
    const transactionRepository = new InMemoryTransactionsRepository(
      pixKeysRepository
    );
    const { transaction, user_to, user_from } = createTransactionFakeFactory(
      pixKeysRepository,
      transactionRepository
    );

    const date = format(new Date(), "dd MMM yyyy", {
      locale: ptBR,
    });

    const transporter = await createTransportSendMailFakeFactory();

    const sendMailUseCase = new SendMailUseCase(transporter);

    const [mailReceive, MailSend] = await Promise.all([
      sendMailUseCase.execute({
        subject: "Transação Concluída",
        contentText: `${user_to.name} você acaba de receber R$ ${transaction.amount}, vindo de ${user_from.name}  <${user_from.email}> | ${date}`,
        to: user_to.email,
      }),
      sendMailUseCase.execute({
        subject: "Transação Concluída",
        contentText: `${user_from.name} você acaba de enviar R$ ${transaction.amount} para ${user_to.name}  <${user_to.email}>  | ${date}`,
        to: user_to.email,
      }),
    ]);

    expect(mailReceive).not.toBeNull();
    expect(MailSend).not.toBeNull();

    const urlFakeReceive = nodemailer.getTestMessageUrl(mailReceive);
    const urlFakeSend = nodemailer.getTestMessageUrl(MailSend);

    console.log("Visualizar e-mails:");
    console.log("e-mail recebido: ", urlFakeReceive);
    console.log("e-mail enviado: ", urlFakeSend);

    expect(urlFakeReceive).not.toBeNull();
    expect(urlFakeSend).not.toBeNull();
  });
});
