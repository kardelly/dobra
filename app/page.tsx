import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sanityFetch } from "@/lib/sanity";
import { featuredProductsQuery, siteSettingsQuery } from "@/lib/sanity.queries";
import type { SanityProduct, SanitySiteSettings } from "@/lib/sanity.types";
import { urlFor } from "@/lib/sanity.image";

const STATUS_LABEL: Record<string, string> = {
  available: "Disponível",
  made_to_order: "Sob encomenda",
  sold_out: "Esgotado",
};

function buildWhatsAppUrl(
  phone: string,
  message: string,
  productTitle?: string
): string {
  const text = productTitle
    ? `${message}\n\nProduto: ${productTitle}`
    : message;
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export default async function HomePage() {
  let featured: SanityProduct[] = [];
  let siteSettings: SanitySiteSettings | null = null;
  try {
    [featured, siteSettings] = await Promise.all([
      sanityFetch<SanityProduct[]>({ query: featuredProductsQuery }),
      sanityFetch<SanitySiteSettings | null>({ query: siteSettingsQuery }),
    ]);
  } catch {
    // Sanity indisponível
  }

  const phone = siteSettings?.whatsappPhone ?? "";
  const defaultMessage =
    siteSettings?.whatsappDefaultMessage ??
    "Oi! Tenho interesse em um produto da Dobra.";
  const [destaquePrincipal, ...outrosDestaques] = featured ?? [];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">Dobra</p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Cerâmica autoral por Luiza
        </h1>
        <p className="max-w-prose text-base text-muted-foreground">
          Peças feitas à mão, com calma e carinho. Veja o catálogo e peça direto
          no WhatsApp.
        </p>

        <div className="mt-2 flex gap-3">
          <Button asChild>
            <Link href="/produtos">Ver produtos</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/sobre">Sobre</Link>
          </Button>
        </div>
      </header>

      {destaquePrincipal && (
        <section
          className="mt-12"
          aria-labelledby="destaque-title"
        >
          <h2 id="destaque-title" className="sr-only">
            Destaque
          </h2>
          <article className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
            <div className="grid gap-6 sm:grid-cols-2">
              {destaquePrincipal.image && (
                <Link
                  href={`/produtos/${destaquePrincipal.slug}`}
                  className="relative block aspect-square bg-muted sm:aspect-auto sm:min-h-[320px]"
                >
                  <Image
                    src={urlFor(destaquePrincipal.image)
                      .width(800)
                      .height(800)
                      .url()}
                    alt={destaquePrincipal.title}
                    width={800}
                    height={800}
                    className="object-cover"
                    priority
                  />
                </Link>
              )}
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="shrink-0">
                    Destaque
                  </Badge>
                  <Badge variant="outline">
                    {STATUS_LABEL[destaquePrincipal.status] ??
                      destaquePrincipal.status}
                  </Badge>
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  <Link
                    href={`/produtos/${destaquePrincipal.slug}`}
                    className="hover:underline"
                  >
                    {destaquePrincipal.title}
                  </Link>
                </h3>
                {destaquePrincipal.shortDescription && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {destaquePrincipal.shortDescription}
                  </p>
                )}
                {destaquePrincipal.startingPrice != null && (
                  <p className="mt-3 text-lg font-medium text-muted-foreground">
                    A partir de R${" "}
                    {destaquePrincipal.startingPrice.toLocaleString("pt-BR")}
                  </p>
                )}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href={`/produtos/${destaquePrincipal.slug}`}>
                      Ver peça
                    </Link>
                  </Button>
                  {phone && destaquePrincipal.status !== "sold_out" && (
                    <Button variant="outline" asChild>
                      <a
                        href={buildWhatsAppUrl(
                          phone,
                          defaultMessage,
                          destaquePrincipal.title
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Pedir ${destaquePrincipal.title} no WhatsApp`}
                      >
                        Pedir no WhatsApp
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </article>
        </section>
      )}

      {outrosDestaques.length > 0 && (
        <section
          className="mt-12"
          aria-labelledby="outros-destaques-title"
        >
          <h2
            id="outros-destaques-title"
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            Outros destaques
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {outrosDestaques.map((p) => {
              const imageSrc = p.image
                ? urlFor(p.image).width(600).height(600).url()
                : null;
              const whatsappUrl = phone
                ? buildWhatsAppUrl(phone, defaultMessage, p.title)
                : "#";

              return (
                <Card
                  key={p._id}
                  className="overflow-hidden rounded-xl border-border/80 bg-card shadow-sm"
                >
                  <Link href={`/produtos/${p.slug}`} className="block">
                    {imageSrc && (
                      <div className="relative aspect-square bg-muted">
                        <Image
                          src={imageSrc}
                          alt={p.title}
                          width={600}
                          height={600}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-medium tracking-tight hover:underline">
                          {p.title}
                        </h3>
                        <Badge variant="secondary">
                          {STATUS_LABEL[p.status] ?? p.status}
                        </Badge>
                      </div>
                      {p.shortDescription && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {p.shortDescription}
                        </p>
                      )}
                      {p.startingPrice != null && (
                        <p className="mt-2 text-sm font-medium text-muted-foreground">
                          A partir de R${" "}
                          {p.startingPrice.toLocaleString("pt-BR")}
                        </p>
                      )}
                    </CardContent>
                  </Link>
                  <CardContent className="border-t border-border/80 px-6 py-4">
                    <Button
                      asChild
                      size="sm"
                      disabled={!phone || p.status === "sold_out"}
                    >
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Pedir ${p.title} no WhatsApp`}
                      >
                        Pedir no WhatsApp
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      <section
        className="mt-12 grid gap-4 sm:grid-cols-2"
        aria-label="Como trabalhamos"
      >
        <Card className="rounded-xl border-border/80 bg-card shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium tracking-tight text-foreground">
              Sob encomenda
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A maioria das peças é feita sob demanda. Você escolhe, eu produzo
              e combinamos tudo pelo WhatsApp.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border/80 bg-card shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium tracking-tight text-foreground">
              Acabamento profissional
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Um site leve, rápido e claro — sem &quot;cara de loja
              gigante&quot;.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
