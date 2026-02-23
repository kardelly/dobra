const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dobra.vercel.app";

/**
 * Monta o texto da mensagem do WhatsApp com link do produto e preço.
 * O link gera preview no chat (imagem via Open Graph do site).
 */
export function buildWhatsAppMessage(
  baseMessage: string,
  productTitle: string,
  productSlug: string,
  price?: number | null
): string {
  const productUrl = `${siteUrl}/produtos/${productSlug}`;
  let text = `${baseMessage}\n\nProduto: ${productTitle}\nVer peça: ${productUrl}`;
  if (price != null) {
    text += `\nPreço no site: A partir de R$ ${price.toLocaleString("pt-BR")}`;
  }
  return text;
}

export function buildWhatsAppUrl(
  phone: string,
  baseMessage: string,
  productTitle: string,
  productSlug: string,
  price?: number | null
): string {
  const text = buildWhatsAppMessage(
    baseMessage,
    productTitle,
    productSlug,
    price
  );
  return `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}
