export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="max-w-xl space-y-3 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
          Barikoi Location Finder
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Search a location and view it on the map.
        </h1>
        <p className="text-base leading-7 text-slate-600 dark:text-slate-400">
          The app is being reduced to the two assignment requirements only: location search and
          map view.
        </p>
      </div>
    </main>
  )
}
