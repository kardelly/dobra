import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { sanityFetch } from "@/lib/sanity";
import { siteSettingsQuery } from "@/lib/sanity.queries";
import type { SanitySiteSettings } from "@/lib/sanity.types";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dobra.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dobra — Cerâmica autoral por Luiza",
    template: "%s | Dobra",
  },
  description: "Peças autorais feitas à mão. Pedidos via WhatsApp.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Dobra",
    title: "Dobra — Cerâmica autoral por Luiza",
    description: "Peças autorais feitas à mão. Pedidos via WhatsApp.",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let whatsappPhone: string | null = null;
  let topBannerText: string | null = null;
  try {
    const settings = await sanityFetch<SanitySiteSettings | null>({
      query: siteSettingsQuery,
      revalidate: 300,
    });
    whatsappPhone = settings?.whatsappPhone ?? null;
    topBannerText = settings?.topBannerText?.trim() ?? null;
  } catch {
    // Sanity indisponível: footer sem link WhatsApp, sem faixa
  }

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dobra",
    description: "Cerâmica autoral por Luiza. Peças feitas à mão, sob encomenda.",
    url: siteUrl,
  };

  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground focus:outline-none"
        >
          Pular para o conteúdo
        </a>
        {topBannerText && (
          <div
            className="w-full border-b border-[#50c097]/30 bg-[#4b2e1a] px-4 py-2.5 text-center text-sm text-[#50c097]"
            role="region"
            aria-label="Aviso"
          >
            {topBannerText}
          </div>
        )}
        <Header />
        <div id="main" className="flex-1">
          {children}
        </div>
        <Footer whatsappPhone={whatsappPhone} />
      </body>
    </html>
  );
}
