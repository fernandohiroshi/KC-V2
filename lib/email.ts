"use server";

import { Resend } from "resend";
import { z } from "zod";
import { formSchema } from "./schemas";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (emailFormData: z.infer<typeof formSchema>) => {
  try {
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: [process.env.EMAIL_TO!],
      subject: "Novo contato pelo site!",
      react: EmailTemplate({
        firstName: emailFormData.firstName,
        lastName: emailFormData.lastName,
        email: emailFormData.email,
        message: emailFormData.message,
      }) as React.ReactNode,
    });

    if (error) {
      throw new Error("Erro ao enviar e-mail.");
    }
  } catch {
    throw new Error("Erro ao enviar e-mail.");
  }
};
