"use client";

import { useRef } from "react";
import Link from "next/link";

export default function MobileNavigation({ links }: { links: readonly { href: string; label: string }[] }) {
  const menuRef = useRef<HTMLDetailsElement>(null);

  return (
    <details ref={menuRef} className="group md:hidden">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-[#d2e2e7] px-4 text-sm font-bold text-[#174153] marker:content-none [&::-webkit-details-marker]:hidden" aria-label="Abrir o cerrar menú de navegación">
        Menú <span aria-hidden="true">☰</span>
      </summary>
      <nav aria-label="Navegación móvil" className="absolute inset-x-4 top-[calc(100%-3px)] flex flex-col gap-1 rounded-2xl border border-[#dbe8ec] bg-white p-3 shadow-xl sm:inset-x-8">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} onClick={() => { if (menuRef.current) menuRef.current.open = false; }} className="rounded-xl px-4 py-3 text-sm font-semibold text-[#244c5b] hover:bg-[#eaf5f5] focus-visible:bg-[#eaf5f5]">
            {label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
