import Link from "next/link";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/sobre", label: "Sobre" },
] as const;

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="text-lg font-medium tracking-tight text-foreground hover:opacity-80"
          aria-label="Dobra — Página inicial"
        >
          Dobra
        </Link>
        <nav aria-label="Navegação principal" className="flex items-center gap-6">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
