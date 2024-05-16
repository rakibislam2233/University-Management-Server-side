import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.node_env === "production",
    auth: {
      user: "rakib2020.tkg@gmail.com",
      pass: "bezo udzf cdby prwa",
    },
  });
  await transporter.sendMail({
    from: "rakib2020.tkg@gmail.com",
    to,
    subject: "Reset your password for 10 min",
    text: "Reset your password for 10 min",
    html,
  });
};
