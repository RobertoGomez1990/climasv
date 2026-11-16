export default function LoadingPanel({ title = "Cargando página…" }: { title?: string }) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-5 py-24 sm:px-8 lg:px-12">
      <div role="status" className="w-full max-w-xl rounded-[1.7rem] border border-[#dbe7e9] bg-white px-8 py-16 text-center">
        <span className="mx-auto block size-11 animate-pulse rounded-full bg-[#b8e7e4]" aria-hidden="true" />
        <p className="mt-6 text-lg font-semibold text-[#173849]">{title}</p>
      </div>
    </main>
  );
}
