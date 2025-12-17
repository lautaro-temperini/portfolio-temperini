import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RootPage() {
  // Leer la cookie de idioma preferido
  const cookieStore = await cookies()
  const savedLang = cookieStore.get('NEXT_LOCALE')?.value
  
  // Si hay idioma guardado, usar ese; sino inglés por defecto
  const lang = (savedLang === 'es' || savedLang === 'en') ? savedLang : 'en'
  
  redirect(`/${lang}`)
}
