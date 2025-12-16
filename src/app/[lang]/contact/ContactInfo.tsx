// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * ContactInfo - Información de contacto (email y redes sociales)
 * 
 * Muestra la información de contacto del diseñador:
 * - Email con enlace mailto
 * - Enlaces a redes sociales (LinkedIn, Behance)
 * 
 * NOTA: Este componente está actualmente sin uso, ya que la información
 * de contacto se muestra directamente en el componente Contact.
 * Se mantiene por si se necesita una versión alternativa del layout.
 * 
 * @returns Componente JSX con la información de contacto
 */
const ContactInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Sección de Email */}
      <div>
        <h3 
          className="text-2xl font-bold text-[#F2F2F2] mb-4" 
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Email
        </h3>
        <p 
          className="text-[#A6A6A6] mb-6" 
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          <a 
            href="mailto:hola@temperini.dev" 
            className="inline-block p-2 -m-2 text-[#8900C3] hover:text-[#A020F0] transition-colors"
          >
            hola@temperini.dev
          </a>
        </p>
      </div>
      
      {/* Sección de Redes Sociales */}
      <div>
        <h3 
          className="text-2xl font-bold text-[#F2F2F2] mb-4" 
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          Redes Sociales
        </h3>
        <div className="flex gap-4">
          <a 
            href="https://www.linkedin.com/in/lautaro-temperini/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block p-2 -m-2 text-[#A6A6A6] hover:text-[#8900C3] transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="https://www.behance.net/temperini" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block p-2 -m-2 text-[#A6A6A6] hover:text-[#8900C3] transition-colors"
          >
            Behance
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
