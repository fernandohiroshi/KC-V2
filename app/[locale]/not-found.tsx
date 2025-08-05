import Link from "next/link";
import { Skull } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
      <div className="h-[calc(100vh-16rem)] flex items-center justify-center">
        <main className="w-full flex flex-col items-center justify-center px-4 py-8">
          <Skull className="w-24 h-24 mb-4 text-primary animate-pulse" />
          <h2 className="text-2xl font-semibold mb-2">Página não encontrada</h2>
          <p className="mb-8 text-center max-w-md text-neutral-600">
            Ops! A página que você procura não existe.
          </p>
          <Link href="/">
            <Button size="lg" className="cursor-pointer">
              Voltar para o Home
            </Button>
          </Link>
        </main>
      </div>
    </div>
  );
}
