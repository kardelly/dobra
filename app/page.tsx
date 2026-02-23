import Image from "next/image";
import Link from "next/link";
import { Sparkles, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sanityFetch } from "@/lib/sanity";
import { featuredProductsQuery, siteSettingsQuery } from "@/lib/sanity.queries";
import type { SanityProduct, SanitySiteSettings } from "@/lib/sanity.types";
import { urlFor } from "@/lib/sanity.image";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const STATUS_LABEL: Record<string, string> = {
  available: "Disponível",
  made_to_order: "Sob encomenda",
  sold_out: "Esgotado",
};

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
  const heroImage = siteSettings?.heroImage;

  return (
    <main>
      {heroImage && (
        <section className="relative w-full" aria-label="Destaque">
          <div className="relative aspect-[21/9] w-full bg-muted min-h-[200px] sm:min-h-[280px]">
            <Image
              src={urlFor(heroImage).width(1600).height(600).url()}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
        </section>
      )}

      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <header className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Cerâmica autoral por Luiza
        </h1>
        <p className="max-w-prose text-base text-muted-foreground">
          Peças feitas à mão, com calma e carinho. Veja o catálogo e peça direto
          no WhatsApp.
        </p>
      </header>

      {destaquePrincipal && (
        <section
          className="mt-14 sm:mt-20"
          aria-labelledby="destaque-title"
        >
          <h2 id="destaque-title" className="sr-only">
            Destaque
          </h2>
          <article className="overflow-hidden rounded-2xl bg-muted/30">
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
                {(destaquePrincipal.status === "available" && destaquePrincipal.quantityAvailable != null) ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {destaquePrincipal.quantityAvailable} {destaquePrincipal.quantityAvailable === 1 ? "unidade disponível" : "unidades disponíveis"}
                  </p>
                ) : destaquePrincipal.status === "made_to_order" ? (
                  <p className="mt-2 text-sm text-muted-foreground">Sob encomenda — produção após o pedido.</p>
                ) : destaquePrincipal.status === "sold_out" ? (
                  <p className="mt-2 text-sm text-muted-foreground">Esgotado no momento.</p>
                ) : null}
                {destaquePrincipal.shortDescription && (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {destaquePrincipal.shortDescription}
                  </p>
                )}
                {destaquePrincipal.startingPrice != null && (
                  <p className="mt-3 text-lg font-medium text-muted-foreground">
                    R$ {destaquePrincipal.startingPrice.toLocaleString("pt-BR")}
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
                          destaquePrincipal.title,
                          destaquePrincipal.slug,
                          destaquePrincipal.startingPrice
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
          className="mt-14 sm:mt-20"
          aria-labelledby="outros-destaques-title"
        >
          <h2
            id="outros-destaques-title"
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            Outros destaques
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {outrosDestaques.map((p) => {
              const imageSrc = p.image
                ? urlFor(p.image).width(600).height(600).url()
                : null;
              const whatsappUrl = phone
                ? buildWhatsAppUrl(
                    phone,
                    defaultMessage,
                    p.title,
                    p.slug,
                    p.startingPrice
                  )
                : "#";

              return (
                <Card
                  key={p._id}
                  className="overflow-hidden rounded-2xl border-0 bg-transparent shadow-none"
                >
                  <Link href={`/produtos/${p.slug}`} className="block">
                    {imageSrc && (
                      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                        <Image
                          src={imageSrc}
                          alt={p.title}
                          width={600}
                          height={600}
                          className="object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-0 pt-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-medium tracking-tight hover:underline">
                          {p.title}
                        </h3>
                        <Badge variant="secondary" className="shrink-0">
                          {STATUS_LABEL[p.status] ?? p.status}
                        </Badge>
                      </div>
                      {(p.status === "available" && p.quantityAvailable != null) ? (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {p.quantityAvailable} {p.quantityAvailable === 1 ? "unidade" : "unidades"}
                        </p>
                      ) : p.status === "made_to_order" ? (
                        <p className="mt-1 text-xs text-muted-foreground">Sob encomenda</p>
                      ) : null}
                      {p.shortDescription && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {p.shortDescription}
                        </p>
                      )}
                      {p.startingPrice != null && (
                        <p className="mt-2 text-sm font-medium text-muted-foreground">
                          R$ {p.startingPrice.toLocaleString("pt-BR")}
                        </p>
                      )}
                    </CardContent>
                  </Link>
                  <CardContent className="p-0 pt-4">
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
        className="mt-20 grid gap-12 sm:grid-cols-2 sm:gap-16"
        aria-label="Como trabalhamos"
      >
        <Card className="rounded-2xl border-0 bg-transparent shadow-none">
          <CardContent className="p-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/5 text-foreground" aria-hidden>
              <Sparkles className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h2 className="mt-5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Sob encomenda
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A maioria das peças é feita sob demanda. Você escolhe, eu produzo
              e combinamos tudo pelo WhatsApp.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 bg-transparent shadow-none">
          <CardContent className="p-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/5 text-foreground" aria-hidden>
              <Award className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h2 className="mt-5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              Acabamento cuidado
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Cada peça é finalizada à mão, com atenção aos detalhes — para
              você ter cerâmica que dura e faz diferença no dia a dia.
            </p>
          </CardContent>
        </Card>
      </section>
      </div>
    </main>
  );
}
