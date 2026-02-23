import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { sanityFetch } from "@/lib/sanity";
import { siteSettingsQuery } from "@/lib/sanity.queries";
import type { SanitySiteSettings } from "@/lib/sanity.types";

export default async function HomePage() {
  let topBannerText: string | null = null;
  try {
    const settings = await sanityFetch<SanitySiteSettings | null>({
      query: siteSettingsQuery,
      revalidate: 300,
    });
    topBannerText = settings?.topBannerText?.trim() ?? null;
  } catch {
    // Sanity indisponível: sem faixa
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {topBannerText && (
        <div
          className="mb-8 rounded-lg border border-border/80 bg-muted/50 px-4 py-3 text-center text-sm text-muted-foreground"
          role="region"
          aria-label="Aviso"
        >
          {topBannerText}
        </div>
      )}

      <header className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">Dobra</p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
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

      <section className="mt-10 grid gap-4 sm:grid-cols-2" aria-label="Como trabalhamos">
        <Card className="rounded-xl border-border/80 bg-card shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium tracking-tight text-foreground">
              Sob encomenda
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A maioria das peças é feita sob demanda. Você escolhe, eu produzo e combinamos tudo pelo WhatsApp.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border/80 bg-card shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium tracking-tight text-foreground">
              Acabamento profissional
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Um site leve, rápido e claro — sem &quot;cara de loja gigante&quot;.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
