import Link from "next/link";

const navItems = [
  { href: "/produtos", label: "Produtos" },
  { href: "/sobre", label: "Sobre" },
] as const;

interface FooterProps {
  whatsappPhone?: string | null;
}

export function Footer({ whatsappPhone }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-6">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {whatsappPhone && (
            <a
              href={`https://wa.me/${whatsappPhone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm inline-flex items-center gap-2"
              aria-label="Fale conosco no WhatsApp"
            >
              Fale no WhatsApp
            </a>
          )}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          © {year} Dobra — Cerâmica autoral
        </p>
      </div>
    </footer>
  );
}
