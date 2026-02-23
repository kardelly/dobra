# Dobra — Cerâmica autoral

Loja/portfólio de cerâmica com catálogo editável no CMS. Conversão via WhatsApp (link com mensagem pré-preenchida, link do produto e preço). Sem checkout: o pedido é fechado em conversa.

## Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui, fonte Inter
- **CMS:** Sanity (Studio em `dobra-sanity/`)
- **Host:** Vercel

## Estrutura do repositório

```
Dobra/
├── app/                 # Next.js (rotas, layout, páginas)
├── components/         # React (layout, ui)
├── lib/                 # Utils, Sanity client, queries, WhatsApp
├── public/
├── dobra-sanity/        # Sanity Studio (schemas, config)
└── package.json         # App Next.js (raiz)
```

- **Site:** raiz do repo (`npm run dev`, `npm run build`).
- **CMS:** pasta `dobra-sanity/` (projeto Sanity separado).

## Pré-requisitos

- Node.js 18+
- Conta no [Sanity](https://sanity.io) e projeto criado em [sanity.io/manage](https://sanity.io/manage)

## Variáveis de ambiente

### Site (Next.js)

Crie `.env.local` na raiz (copie de `.env.local.example`):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://seu-dominio.vercel.app
```

- **Project ID:** mesmo do projeto Sanity em [sanity.io/manage](https://sanity.io/manage).
- **NEXT_PUBLIC_SITE_URL:** URL do site em produção (metadata, Open Graph, link no WhatsApp).

### Sanity Studio

Em `dobra-sanity/` crie `.env` (copie de `.env.example`):

```env
SANITY_STUDIO_PROJECT_ID=seu_project_id
SANITY_STUDIO_DATASET=production
```

Use o mesmo Project ID do site.

## Como rodar

### Site (Next.js)

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Sanity Studio (CMS)

```bash
cd dobra-sanity
npm install
npm run dev
```

Abre [http://localhost:3333](http://localhost:3333). Faça login com a conta Sanity do projeto e edite **Produto**, **Categoria** e **Configurações do Site**.

### Build

```bash
npm run build
npm run start
```

## Deploy

- **Site:** conectar o repo na [Vercel](https://vercel.com); a raiz já é o app Next.js. Configurar as mesmas variáveis em **Settings → Environment Variables**.
- **Studio:** opcionalmente `npm run deploy` dentro de `dobra-sanity/` para hospedar o Studio no Sanity.

## Conteúdo no CMS

- **Configurações do Site:** WhatsApp (número e mensagem padrão), faixa superior opcional, imagem hero da home, SEO padrão.
- **Produto:** nome, slug, status (Disponível / Sob encomenda / Esgotado), quantidade (quando disponível), preço, fotos, descrição, destaque, mensagem WhatsApp opcional, SEO.
- **Categoria:** nome, slug, ordem.

## Scripts principais

| Comando        | Onde    | Descrição              |
|----------------|---------|------------------------|
| `npm run dev`  | Raiz    | Sobe o site em dev     |
| `npm run build`| Raiz    | Build de produção      |
| `npm run dev`  | dobra-sanity | Sobe o Sanity Studio |

## Licença

Projeto privado.
