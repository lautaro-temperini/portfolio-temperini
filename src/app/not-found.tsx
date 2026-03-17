import Link from "next/link"

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-16">
      {/* Panel que se lee bien sobre el fondo, sin taparlo del todo */}
      <div className="relative z-10 max-w-xl w-full rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl px-8 py-10 shadow-[0_18px_60px_rgba(0,0,0,0.65)]">
        <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
          Página no encontrada
        </h2>
        <p className="text-sm sm:text-base text-white/70 mb-8">
          La página que estás buscando no existe o fue movida. Volvé al inicio
          o explorá los proyectos desde la home.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-[#f2f2f2] transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

