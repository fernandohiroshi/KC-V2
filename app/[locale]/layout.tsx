import type { Metadata } from "next";
import "../globals.css";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsApp from "@/components/whatsapp";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";

export const metadata: Metadata = {
  title: "Konbini Code",
  description:
    "Konbini Code - Desenvolvimento de Software sob medida para seu negócio. Criação de sites, sistemas, landing pages, integrações e automações.",
  keywords: [
    "desenvolvimento de software",
    "agência digital",
    "criação de sites",
    "criação de aplicativos",
    "landing page",
    "sistemas web",
    "sistemas personalizados",
    "automação de processos",
    "integração de sistemas",
    "consultoria em tecnologia",
    "produtividade empresarial",
    "transformação digital",
    "soluções digitais",
    "web design",
    "UX/UI design",
    "Next.js",
    "React",
    "TypeScript",
    "frontend",
    "backend",
    "API",
    "SEO",
    "otimização de sites",
    "performance web",
    "startup tecnologia",
    "empresa de tecnologia",
    "software sob medida",
    "desenvolvimento ágil",
    "inovação digital",
    "automação comercial",
    "plataforma digital",
    "consultoria TI",
    "site institucional",
    "e-commerce",
    "app mobile",
    "soluções para empresas",
    "empresa de software",
    "programador freelance",
    "agência web",
    "desenvolvimento web em São Paulo",
    "desenvolvimento web Brasil",
    "Konbini Code"
  ],
  metadataBase: new URL("https://konbinicode.com.br"),
  applicationName: "Konbini Code",
  category: "technology",
  authors: [{ name: "Konbini Code", url: "https://konbinicode.com.br" }],
  publisher: "Konbini Code",
  referrer: "origin-when-cross-origin",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#18181b",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Konbini Code",
    description:
      "Desenvolvimento de Software sob medida para seu negócio. Criação de sites, sistemas, landing pages, integrações e automações.",
    url: "https://konbinicode.com.br",
    siteName: "Konbini Code",
    images: [
      {
        url: "/readme/desktop.png",
        width: 1200,
        height: 630,
        alt: "Konbini Code - Desenvolvimento de Software",
        type: "image/png",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Konbini Code",
    description:
      "Desenvolvimento de Software sob medida para seu negócio. Criação de sites, sistemas, landing pages, integrações e automações.",
    images: ["/readme/desktop.png"],
    creator: "@konbinicode",
    site: "@konbinicode",
  },
  alternates: {
    canonical: "https://konbinicode.com.br",
  },
};

const montserrat = Montserrat({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  let messages: AbstractIntlMessages;

  try {
    messages = await getMessages();
  } catch {
    return notFound();
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
