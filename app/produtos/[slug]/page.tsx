import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/lib/sanity";
import {
  productBySlugQuery,
  productSlugsQuery,
  siteSettingsQuery,
} from "@/lib/sanity.queries";
import type { SanityProductDetail, SanitySiteSettings } from "@/lib/sanity.types";
import { urlFor } from "@/lib/sanity.image";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dobra.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let product: SanityProductDetail | null = null;
  try {
    product = await sanityFetch<SanityProductDetail | null>({
      query: productBySlugQuery,
      params: { slug },
    });
  } catch {
    return { title: "Produto" };
  }
  if (!product) return { title: "Produto" };

  const title =
    product.seo?.title?.trim() || `${product.title} | Dobra`;
  const description =
    product.seo?.description?.trim() ||
    product.shortDescription?.trim() ||
    `Peça ${product.title} pelo WhatsApp. Cerâmica autoral Dobra.`;
  // Imagem para compartilhamento: SEO ogImage ou primeira foto do produto (ex.: link no WhatsApp)
  const ogImage =
    (product.seo?.ogImage && urlFor(product.seo.ogImage).width(1200).height(630).url()) ||
    (product.images?.[0] && urlFor(product.images[0]).width(1200).height(630).url());

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/produtos/${product.slug}`,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    ...(ogImage && {
      twitter: { card: "summary_large_image" as const, images: [ogImage] },
    }),
  };
}

const STATUS_LABEL: Record<string, string> = {
  available: "Disponível",
  made_to_order: "Sob encomenda",
  sold_out: "Esgotado",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product: SanityProductDetail | null = null;
  let siteSettings: SanitySiteSettings | null = null;
  try {
    [product, siteSettings] = await Promise.all([
      sanityFetch<SanityProductDetail | null>({
        query: productBySlugQuery,
        params: { slug },
      }),
      sanityFetch<SanitySiteSettings | null>({ query: siteSettingsQuery }),
    ]);
  } catch {
    // Build ou Sanity indisponível
  }

  if (!product) notFound();

  const phone = siteSettings?.whatsappPhone ?? "";
  const defaultMessage =
    siteSettings?.whatsappDefaultMessage ??
    "Oi! Tenho interesse em um produto da Dobra.";
  const message = product.whatsappMessage?.trim() || defaultMessage;
  const whatsappUrl = phone
    ? buildWhatsAppUrl(
        phone,
        message,
        product.title,
        product.slug,
        product.startingPrice
      )
    : "#";
  const images = product.images ?? [];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description:
      product.seo?.description?.trim() ||
      product.shortDescription ||
      `Cerâmica autoral: ${product.title}. Peça pelo WhatsApp.`,
    image:
      images.length > 0
        ? urlFor(images[0]).width(1200).height(1200).url()
        : undefined,
    url: `${siteUrl}/produtos/${product.slug}`,
    ...(product.startingPrice != null && {
      offers: {
        "@type": "Offer",
        price: product.startingPrice,
        priceCurrency: "BRL",
      },
    }),
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <p className="mb-6">
        <Link
          href="/produtos"
          className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          ← Voltar ao catálogo
        </Link>
      </p>

      <article className="grid gap-8 sm:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          {images.length > 0 && (
            <div className="space-y-3">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                <Image
                  src={urlFor(images[0]).width(800).height(800).url()}
                  alt={product.title}
                  width={800}
                  height={800}
                  className="object-cover"
                  priority
                />
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(1, 5).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-lg bg-muted"
                    >
                      <Image
                        src={urlFor(img).width(200).height(200).url()}
                        alt={`${product.title} - foto ${i + 2}`}
                        width={200}
                        height={200}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {product.title}
            </h1>
            <Badge variant="secondary">
              {STATUS_LABEL[product.status] ?? product.status}
            </Badge>
          </div>
          {(product.status === "available" && product.quantityAvailable != null) ? (
            <p className="mt-2 text-sm text-muted-foreground">
              {product.quantityAvailable} {product.quantityAvailable === 1 ? "unidade disponível" : "unidades disponíveis"}
            </p>
          ) : product.status === "made_to_order" ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Sob encomenda — produção após o pedido.
            </p>
          ) : product.status === "sold_out" ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Esgotado no momento.
            </p>
          ) : null}
          {product.startingPrice != null && (
            <p className="mt-2 text-lg font-medium text-muted-foreground">
              R$ {product.startingPrice.toLocaleString("pt-BR")}
            </p>
          )}
          {product.shortDescription && (
            <p className="mt-4 text-muted-foreground">
              {product.shortDescription}
            </p>
          )}
          {product.description && product.description.length > 0 && (
            <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
              <PortableText value={product.description} />
            </div>
          )}
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              disabled={!phone || product.status === "sold_out"}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Pedir ${product.title} no WhatsApp`}
              >
                Pedir no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  try {
    const slugs = await sanityFetch<{ slug: string }[]>({
      query: productSlugsQuery,
    });
    return (slugs ?? []).map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}
