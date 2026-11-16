"use client";

import { useEffect } from "react";

export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("Error de ruta:", error); }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-5 py-24 sm:px-8 lg:px-12">
      <div role="alert" className="w-full max-w-xl rounded-[1.7rem] border border-[#eacdc9] bg-[#fff9f7] p-8 sm:p-12">
        <h1 className="text-2xl font-bold text-[#763d35]">Esta página no se pudo mostrar</h1>
        <p className="mt-3 text-sm leading-7 text-[#664d49]">Ocurrió un error inesperado. Puedes intentar cargarla de nuevo.</p>
        <button type="button" onClick={reset} className="mt-7 min-h-12 rounded-full bg-[#12465a] px-6 text-sm font-bold text-white hover:bg-[#0b7585]">Reintentar</button>
      </div>
    </main>
  );
}
