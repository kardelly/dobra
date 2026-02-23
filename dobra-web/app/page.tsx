import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">Dobra</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Cerâmica autoral por Luiza
        </h1>
        <p className="max-w-prose text-base text-muted-foreground">
          Peças feitas à mão, com calma e carinho. Veja o catálogo e peça direto no WhatsApp.
        </p>

        <div className="mt-2 flex gap-3">
          <Button asChild>
            <a href="/produtos">Ver produtos</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/sobre">Sobre</a>
          </Button>
        </div>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <Card className="rounded-xl">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium tracking-tight">Sob encomenda</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A maioria das peças é feita sob demanda. Você escolhe, eu produzo e combinamos tudo pelo WhatsApp.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium tracking-tight">Acabamento profissional</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Um site leve, rápido e claro — sem "cara de loja gigante".
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
