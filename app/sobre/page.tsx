import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A Dobra faz cerâmica autoral à mão, sob encomenda. Conheça o trabalho e peça pelo WhatsApp.",
  openGraph: {
    title: "Sobre | Dobra",
    description:
      "A Dobra faz cerâmica autoral à mão, sob encomenda. Conheça o trabalho e peça pelo WhatsApp.",
  },
};

export default function SobrePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Sobre
        </h1>
        <p className="max-w-prose text-base text-muted-foreground">
          A Dobra nasceu do desejo de fazer peças de cerâmica com cuidado e
          tempo. Cada peça é feita à mão, uma de cada vez.
        </p>
      </header>

      <div className="mt-8 max-w-prose space-y-6 text-muted-foreground">
        <p className="text-base leading-relaxed">
          Trabalho sob encomenda: você escolhe no catálogo, combinamos os
          detalhes pelo WhatsApp e eu produzo com calma. Sem pressa, com
          acabamento que faça diferença no seu dia a dia.
        </p>
        <p className="text-base leading-relaxed">
          Se quiser conhecer as peças ou tirar dúvidas, é só chamar. Será um
          prazer te atender.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/produtos">Ver produtos</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Voltar ao início</Link>
        </Button>
      </div>
    </main>
  );
}
