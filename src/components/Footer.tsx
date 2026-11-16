import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#dbe6e9] bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-2 lg:px-12">
        <div>
          <Link href="/" className="text-xl font-extrabold tracking-[-0.06em] text-[#123e51]">clima<span className="text-[#149ca9]">sv</span><span className="text-[#ffad68]">.</span></Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-[#5b707b]">Una mirada más clara al clima de nuestras ciudades. Hecho para explorar El Salvador.</p>
        </div>
        <div className="flex flex-col gap-3 text-sm md:items-end">
          <nav aria-label="Enlaces del pie de página" className="flex flex-wrap gap-x-5 gap-y-2 font-semibold text-[#274a59]">
            <Link href="/clima" className="hover:text-[#0b8c9a]">Clima</Link>
            <Link href="/ciudades" className="hover:text-[#0b8c9a]">Ciudades</Link>
            <Link href="/acerca" className="hover:text-[#0b8c9a]">Acerca de</Link>
          </nav>
          <p className="text-[#5b707b]">Fuente de datos meteorológicos: <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#076d7b] underline underline-offset-4 hover:text-[#094957]">Open-Meteo</a></p>
          <p className="text-xs text-[#4d626d]">ClimaSV · Proyecto académico</p>
        </div>
      </div>
    </footer>
  );
}
