import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do Site",
  type: "document",
  fields: [
    defineField({
      name: "whatsappPhone",
      title: "WhatsApp (DDI+DDD+Número)",
      type: "string",
      description: "Ex: 5511999999999 (sem +, sem espaços)",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "whatsappDefaultMessage",
      title: "Mensagem padrão do WhatsApp",
      type: "text",
      initialValue: "Oi! Tenho interesse em um produto da Dobra.",
    }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({
      name: "heroImage",
      title: "Imagem hero (home)",
      type: "image",
      description: "Imagem em destaque no topo da home. Recomendado: 1600×600px ou proporção larga.",
      options: { hotspot: true },
    }),
    defineField({
      name: "topBannerText",
      title: "Faixa superior (opcional)",
      type: "string",
      description: "Se preenchido, exibe uma faixa no topo da home. Ex: Entrega sob encomenda · Pedidos pelo WhatsApp.",
    }),
    defineField({
      name: "seo",
      title: "SEO padrão",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Título", type: "string" }),
        defineField({ name: "description", title: "Descrição", type: "text" }),
        defineField({ name: "ogImage", title: "OG Image", type: "image" }),
      ],
    }),
  ],
});
