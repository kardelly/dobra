import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/lib/sanity";
import { productsQuery, siteSettingsQuery } from "@/lib/sanity.queries";
import type { SanityProduct, SanitySiteSettings } from "@/lib/sanity.types";
import { urlFor } from "@/lib/sanity.image";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Catálogo de cerâmica autoral. Peças feitas à mão, sob encomenda. Peça pelo WhatsApp.",
  openGraph: {
    title: "Produtos | Dobra",
    description:
      "Catálogo de cerâmica autoral. Peças feitas à mão, sob encomenda. Peça pelo WhatsApp.",
  },
};

const STATUS_LABEL: Record<string, string> = {
  available: "Disponível",
  made_to_order: "Sob encomenda",
  sold_out: "Esgotado",
};

function buildWhatsAppUrl(phone: string, message: string, productTitle?: string): string {
  const text = productTitle ? `${message}\n\nProduto: ${productTitle}` : message;
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

export default async function ProdutosPage() {
  let products: SanityProduct[] = [];
  let siteSettings: SanitySiteSettings | null = null;
  try {
    [products, siteSettings] = await Promise.all([
      sanityFetch<SanityProduct[]>({ query: productsQuery }),
      sanityFetch<SanitySiteSettings | null>({ query: siteSettingsQuery }),
    ]);
  } catch {
    // Build ou ambiente sem projeto Sanity configurado: mostra vazio
  }

  const phone = siteSettings?.whatsappPhone ?? "";
  const defaultMessage = siteSettings?.whatsappDefaultMessage ?? "Oi! Tenho interesse em um produto da Dobra.";

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="flex items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Produtos</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Catálogo. Escolha a peça e peça direto pelo WhatsApp.
          </p>
        </div>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const imageSrc = p.image ? urlFor(p.image).width(600).height(600).url() : null;
          const whatsappUrl = phone ? buildWhatsAppUrl(phone, defaultMessage, p.title) : "#";

          return (
            <Card key={p._id} className="overflow-hidden rounded-xl">
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
                    <h2 className="text-base font-medium tracking-tight hover:underline">
                      {p.title}
                    </h2>
                    <Badge variant="secondary">{STATUS_LABEL[p.status] ?? p.status}</Badge>
                  </div>
                {p.shortDescription && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.shortDescription}</p>
                )}
                {p.startingPrice != null && (
                  <p className="mt-2 text-sm font-medium text-muted-foreground">
                    A partir de R$ {p.startingPrice.toLocaleString("pt-BR")}
                  </p>
                )}
              </CardContent>
            </Link>
              <CardContent className="border-t px-6 py-4">
                <div className="mt-0">
                  <Button asChild size="sm" disabled={!phone || p.status === "sold_out"}>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Pedir ${p.title} no WhatsApp`}
                    >
                      Pedir no WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {products.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Nenhum produto no catálogo ainda. Adicione no Sanity Studio.
        </p>
      )}
    </main>
  );
}
