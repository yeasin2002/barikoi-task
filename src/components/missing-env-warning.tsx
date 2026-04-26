export const MissingEnvWarning = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-slate-50">
      <div className="max-w-md space-y-3">
        <p className="text-sm font-medium tracking-[0.24em] text-slate-400 uppercase">
          Barikoi Location Finder
        </p>
        <h1 className="text-2xl font-semibold">Missing map key</h1>
        <p className="text-sm leading-6 text-slate-300">
          Set `NEXT_PUBLIC_BARIKOI_MAP_KEY` in `.env.local` to load the Barikoi map tiles.
        </p>
      </div>
    </main>
  )
}
