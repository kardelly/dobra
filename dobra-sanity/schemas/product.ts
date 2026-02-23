import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Produto",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nome",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "made_to_order",
      options: {
        list: [
          { title: "Disponível", value: "available" },
          { title: "Sob encomenda", value: "made_to_order" },
          { title: "Esgotado", value: "sold_out" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "quantityAvailable",
      title: "Quantidade disponível",
      type: "number",
      description: "Preencha só quando o status for \"Disponível\". Deixe vazio para sob encomenda ou esgotado.",
      hidden: ({ parent }) => parent?.status !== "available",
    }),
    defineField({
      name: "startingPrice",
      title: "Preço (a partir de)",
      type: "number",
      description: "Somente referência. Pode ser omitido.",
    }),
    defineField({
      name: "shortDescription",
      title: "Descrição curta",
      type: "text",
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "images",
      title: "Fotos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "featured",
      title: "Destaque",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordem",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "whatsappMessage",
      title: "Mensagem WhatsApp (opcional)",
      type: "text",
      description: "Se vazio, usa a mensagem padrão do SiteSettings.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "description", title: "Descrição", type: "text" }),
        defineField({ name: "ogImage", title: "OG Image", type: "image" }),
      ],
    }),
  ],
});
