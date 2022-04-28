import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import nodemailer from "nodemailer";
import { createTransactionFakeFactory } from "../../../tests/factories/createTransactionFake";
import { createTransporterSendMailFakeFactory } from "../../../tests/factories/createTransporterSendMailFake";
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

    const transporter = await createTransporterSendMailFakeFactory();

    const sendMailUseCase = new SendMailUseCase(transporter);

    const [mailReceive, MailSend] = await Promise.all([
      sendMailUseCase.execute({
        subject: "Transação Concluída",
        content: `Olá, <strong>${user_to.name}!</strong> você acaba de receber <strong>R$ ${transaction.amount},00</strong>, vindo de <strong>${user_from.name}</strong> | <strong>${date}</strong>`,
        to: user_to.email,
      }),
      sendMailUseCase.execute({
        subject: "Transação Concluída",
        content: `Olá, <strong>${user_from.name}!</strong> você acaba de enviar <strong>R$ ${transaction.amount},00</strong> para <strong>${user_from.name}</strong> | <strong>${date}</strong>`,
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
