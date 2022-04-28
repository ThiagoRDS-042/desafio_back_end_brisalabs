import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

type SendMailRequest = {
  to: string;
  subject: string;
  content: string;
};

export class SendMailUseCase {
  constructor(
    private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>
  ) {}

  async execute({ to, content, subject }: SendMailRequest) {
    const mail = await this.transporter.sendMail({
      from: `${process.env.NODEMAILER_NAME}  <${process.env.NODEMAILER_USER}>`,
      subject: subject,
      html: content,
      to: to,
      date: new Date(),
    });

    return mail;
  }
}
