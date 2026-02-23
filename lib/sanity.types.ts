export type ProductStatus = "available" | "made_to_order" | "sold_out";

export interface SanityProduct {
  _id: string;
  title: string;
  slug: string;
  status: ProductStatus;
  startingPrice?: number;
  shortDescription?: string | null;
  image?: { _type: string; asset: { _ref: string } } | null;
}

export interface SanitySeo {
  title?: string | null;
  description?: string | null;
  ogImage?: { _type: string; asset?: { _ref: string } } | null;
}

export interface SanitySiteSettings {
  whatsappPhone?: string;
  whatsappDefaultMessage?: string;
  heroImage?: { _type: string; asset?: { _ref: string } } | null;
  topBannerText?: string | null;
  seo?: SanitySeo | null;
}

export type PortableTextBlock = {
  _type: string;
  children?: { _type: string; text?: string }[];
  [key: string]: unknown;
};

export interface SanityProductDetail {
  _id: string;
  title: string;
  slug: string;
  status: ProductStatus;
  startingPrice?: number;
  shortDescription?: string | null;
  description?: PortableTextBlock[] | null;
  images?: { _type: string; asset: { _ref: string } }[] | null;
  whatsappMessage?: string | null;
  seo?: SanitySeo | null;
}
