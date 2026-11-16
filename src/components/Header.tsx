import Link from "next/link";
import MobileNavigation from "./MobileNavigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/clima", label: "Clima" },
  { href: "/ciudades", label: "Ciudades" },
  { href: "/acerca", label: "Acerca de" },
] as const;

export default function Header() {
  return (
    <header className="relative z-20 border-b border-[#e1e9ed] bg-white/95">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2.5 rounded-lg text-[#123547]" aria-label="ClimaSV, ir al inicio">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#123e51] text-xl text-[#8de1e3]" aria-hidden="true">✳</span>
          <span className="text-[1.35rem] font-extrabold tracking-[-0.06em]">clima<span className="text-[#149ca9]">sv</span><span className="text-[#ffad68]">.</span></span>
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#455b68] transition-colors hover:bg-[#eaf5f5] hover:text-[#0a5967] focus-visible:bg-[#eaf5f5]">
              {label}
            </Link>
          ))}
        </nav>

        <Link href="/clima" className="hidden rounded-full bg-[#12465a] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#0d7585] md:inline-flex">
          Consultar clima <span className="ml-2" aria-hidden="true">↗</span>
        </Link>

        <MobileNavigation links={links} />
      </div>
    </header>
  );
}
