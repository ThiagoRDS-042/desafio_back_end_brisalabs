import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

type SendMailRequest = {
  to: string;
  subject: string;
  contentText: string;
};

export class SendMailUseCase {
  constructor(
    private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>
  ) {}

  async execute({ to, contentText, subject }: SendMailRequest) {
    const mail = await this.transporter.sendMail({
      from: `${process.env.NODEMAILER_NAME}  <${process.env.NODEMAILER_USER}>`,
      subject: subject,
      text: contentText,
      to: to,
      date: new Date(),
    });

    return mail;
  }
}
