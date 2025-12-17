<<<<<<< HEAD
import { redirect } from 'next/navigation'

export default function RootPage() {
  redirect('/en')
=======
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RootPage() {
  // Leer la cookie de idioma preferido
  const cookieStore = await cookies()
  const savedLang = cookieStore.get('NEXT_LOCALE')?.value
  
  // Si hay idioma guardado, usar ese; sino inglés por defecto
  const lang = (savedLang === 'es' || savedLang === 'en') ? savedLang : 'en'
  
  redirect(`/${lang}`)
>>>>>>> b96d859 (feat: agregar RootPage con redirección por idioma y persistencia de cookie)
}