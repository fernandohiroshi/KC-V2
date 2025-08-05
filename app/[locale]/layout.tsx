import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsApp from "@/components/whatsapp";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Konbini Code",
  description: "Konbini Code - Desenvolvimento de Software",
};
const montserrat = Montserrat({ subsets: ["latin"] });

import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';

export default async function RootLayout(props: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { children, params } = props;
  const locale = (await params).locale;
  let messages;
  try {
    messages = await getMessages();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning className="!scroll-smooth">
      <body className={`antialiased ${montserrat.className}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
            <WhatsApp />
          </ThemeProvider>
          <Toaster position="top-right" duration={2000} richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
