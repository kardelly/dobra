import Link from "next/link";
import Image from "next/image";

const navItems = [
  { href: "/produtos", label: "Produtos" },
  { href: "/sobre", label: "Sobre" },
] as const;

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
        <Link
          href="/"
          className="flex items-center hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          aria-label="Dobra — Página inicial"
        >
          <Image
            src="/logo.png"
            alt="Dobra"
            width={156}
            height={52}
            className="h-[2.6rem] w-auto object-contain"
            priority
          />
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
