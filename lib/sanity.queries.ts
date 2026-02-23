export const productsQuery = `*[_type == "product"] | order(order asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  status,
  startingPrice,
  shortDescription,
  "image": images[0]
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  whatsappPhone,
  whatsappDefaultMessage,
  topBannerText,
  "seo": seo {
    title,
    description,
    "ogImage": ogImage
  }
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  status,
  startingPrice,
  shortDescription,
  description,
  "images": images[],
  whatsappMessage,
  "seo": seo {
    title,
    description,
    "ogImage": ogImage
  }
}`;

export const productSlugsQuery = `*[_type == "product" && defined(slug.current)]{ "slug": slug.current }`;
