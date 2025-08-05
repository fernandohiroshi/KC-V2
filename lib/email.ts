"use server";

import { Resend } from "resend";
import { z } from "zod";
import { formSchema } from "./schemas";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const send = async (emailFormData: z.infer<typeof formSchema>) => {
  try {
    // TODO: Add this emailFormData to some database

    const { error } = await resend.emails.send({
      from: `KONBINI CODE <onboarding@resend.dev>`,
      to: ["konbinicode@gmail.com"],
      subject: "Novo contato pelo site!",
      react: EmailTemplate({
        firstName: emailFormData.firstName,
        lastName: emailFormData.lastName,
        email: emailFormData.email,
        message: emailFormData.message,
      }) as React.ReactNode,
    });

    if (error) {
      throw error;
    }
  } catch (e) {
    throw e;
  }
};
