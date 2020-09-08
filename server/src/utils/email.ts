import { createTransport } from "nodemailer";
import Mail = require("nodemailer/lib/mailer");

class Messenger {
  transporter: Mail;
  username: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.transporter = createTransport({
      service: "gmail",
      auth: {
        user: username,
        pass: password,
      },
    });
  }

  sendEmail(name: string, email: string, password: string, subject: string) {
    return this.transporter.sendMail({
      from: `"SIMS" <${this.username}>`,
      to: email,
      subject: subject,
      html: `
              <div>
                <p>Hi ${name}</p>
                <p>You have been added as an employee.</p>
                <p>Use the following details to log into the dashboard.</p>
                <ul>
                  <li>Username: ${email}</li>
                  <li>Password: ${password}</li>
                </ul>
                <p>Thank you!</p>
              </div>
            `,
    });
  }
}

export const messenger = new Messenger(
  process.env.EMAIL_CLIENT_USERNAME! ?? "",
  process.env.EMAIL_CLIENT_PASSWORD! ?? ""
);
