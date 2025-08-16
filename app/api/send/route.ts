import { EmailTemplate } from "../../../components/email-template";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED_ORIGINS = [
  "https://www.konbinicode.com",
  "http://localhost:3000",
];

function getCorsHeaders(origin: string | null) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin",
    } as Record<string, string>;
  }
  return {
    "Access-Control-Allow-Origin": "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  } as Record<string, string>;
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

const rateLimitMap = new Map<string, { count: number; firstRequest: number }>();
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  const entry = rateLimitMap.get(ip) || { count: 0, firstRequest: now };

  if (now - entry.firstRequest > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
  } else {
    if (entry.count >= RATE_LIMIT) {
      return new Response(
        JSON.stringify({
          error: "Limite de requisições excedido. Tente novamente mais tarde.",
        }),
        {
          status: 429,
          headers: getCorsHeaders(request.headers.get("origin")),
        }
      );
    }
    rateLimitMap.set(ip, {
      count: entry.count + 1,
      firstRequest: entry.firstRequest,
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: "Hello world",
      react: EmailTemplate({
        firstName: "John",
        lastName: "",
        email: "",
        message: "",
      }) as React.ReactElement,
    });

    if (error) {
      return new Response(
        JSON.stringify({ error: "Erro interno ao enviar e-mail." }),
        {
          status: 500,
          headers: getCorsHeaders(request.headers.get("origin")),
        }
      );
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: getCorsHeaders(request.headers.get("origin")),
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Erro interno ao enviar e-mail." }),
      {
        status: 500,
        headers: getCorsHeaders(request.headers.get("origin")),
      }
    );
  }
}
