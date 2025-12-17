'use client'

// ============================================================================
// IMPORTS
// ============================================================================

import React, { useState, FormEvent } from "react"
import type { Dictionary } from '@/lib/dictionary-types'

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente ContactForm
 * 
 * @property dict - Diccionario de traducciones con los labels del formulario
 */
interface ContactFormProps {
  dict: Dictionary
}

/**
 * Estructura del estado del formulario
 */
interface FormData {
  name: string
  email: string
  message: string
}

/**
 * Estados posibles del formulario
 */
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

/**
 * Respuesta de la API de contacto
 */
interface ApiResponse {
  success: boolean
  message?: string
  error?: string
  code?: string
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * ContactForm - Formulario de contacto interactivo con envío de emails
 * 
 * Este es un Client Component que maneja:
 * - Estado del formulario con los campos nombre, email y mensaje
 * - Validación del lado del cliente
 * - Envío de datos a la API /api/contact
 * - Estados de carga, éxito y error
 * - Rate limiting del lado del cliente
 * 
 * @param dict - Diccionario con las traducciones del formulario
 * @returns Componente JSX del formulario
 */
const ContactForm: React.FC<ContactFormProps> = ({ dict }) => {
  // ============================================================================
  // ESTADOS
  // ============================================================================

  /**
   * Estado del formulario con los valores de cada campo
   */
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  
  /**
   * Estado actual del formulario (idle, submitting, success, error)
   */
  const [formStatus, setFormStatus] = useState<FormStatus>('idle')
  
  /**
   * Mensaje de error o éxito para mostrar al usuario
   */
  const [statusMessage, setStatusMessage] = useState<string>('')
  
  /**
   * Contador de intentos para rate limiting del cliente
   */
  const [submitAttempts, setSubmitAttempts] = useState(0)
  
  /**
   * Timestamp del último envío para rate limiting
   */
  const [lastSubmitTime, setLastSubmitTime] = useState(0)

  // ============================================================================
  // CONSTANTES
  // ============================================================================

  /**
   * Tiempo mínimo entre envíos (30 segundos)
   */
  const MIN_SUBMIT_INTERVAL = 30 * 1000

  /**
   * Máximo de intentos en un período de tiempo
   */
  const MAX_ATTEMPTS = 3

  /**
   * Período de tiempo para el rate limiting del cliente (5 minutos)
   */
  const RATE_LIMIT_PERIOD = 5 * 60 * 1000

  // ============================================================================
  // MANEJADORES DE EVENTOS
  // ============================================================================

  /**
   * Maneja los cambios en los campos del formulario
   * Actualiza el estado correspondiente al campo que cambió
   * 
   * @param event - Evento de cambio del input o textarea
   */
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData(previousData => ({ ...previousData, [name]: value }))
    
    // Limpiar mensajes de error cuando el usuario empieza a escribir
    if (formStatus === 'error') {
      setFormStatus('idle')
      setStatusMessage('')
    }
  }

  /**
   * Valida el formulario antes de enviar
   * 
   * @returns true si el formulario es válido, false en caso contrario
   */
  const validateForm = (): boolean => {
    // Validar nombre
    if (formData.name.trim().length < 2) {
      setStatusMessage(dict.contact.form.errors?.nameMin || 'El nombre debe tener al menos 2 caracteres.')
      setFormStatus('error')
      return false
    }

    // Validar email con regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatusMessage(dict.contact.form.errors?.invalidEmail || 'Por favor, ingresa un email válido.')
      setFormStatus('error')
      return false
    }

    // Validar mensaje
    if (formData.message.trim().length < 10) {
      setStatusMessage(dict.contact.form.errors?.messageMin || 'El mensaje debe tener al menos 10 caracteres.')
      setFormStatus('error')
      return false
    }

    return true
  }

  /**
   * Verifica el rate limiting del lado del cliente
   * 
   * @returns true si se puede enviar, false si hay que esperar
   */
  const checkClientRateLimit = (): boolean => {
    const now = Date.now()
    
    // Verificar tiempo mínimo entre envíos
    if (lastSubmitTime && now - lastSubmitTime < MIN_SUBMIT_INTERVAL) {
      const secondsRemaining = Math.ceil((MIN_SUBMIT_INTERVAL - (now - lastSubmitTime)) / 1000)
      setStatusMessage(
        dict.contact.form.errors?.rateLimit?.replace('{seconds}', secondsRemaining.toString()) ||
        `Por favor, espera ${secondsRemaining} segundos antes de enviar otro mensaje.`
      )
      setFormStatus('error')
      return false
    }

    // Verificar máximo de intentos
    if (submitAttempts >= MAX_ATTEMPTS && now - lastSubmitTime < RATE_LIMIT_PERIOD) {
      setStatusMessage(
        dict.contact.form.errors?.tooManyAttempts || 
        'Has enviado demasiados mensajes. Por favor, intenta más tarde.'
      )
      setFormStatus('error')
      return false
    }

    // Resetear contador si pasó el período
    if (now - lastSubmitTime > RATE_LIMIT_PERIOD) {
      setSubmitAttempts(0)
    }

    return true
  }

  /**
   * Maneja el envío del formulario
   * Envía los datos a la API y maneja la respuesta
   * 
   * @param event - Evento de submit del formulario
   */
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault()

    // Validar formulario
    if (!validateForm()) {
      return
    }

    // Verificar rate limiting del cliente
    if (!checkClientRateLimit()) {
      return
    }

    // Actualizar estado a enviando
    setFormStatus('submitting')
    setStatusMessage('')
    setSubmitAttempts(prev => prev + 1)
    setLastSubmitTime(Date.now())

    try {
      // Enviar datos a la API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        }),
      })

      const data: ApiResponse = await response.json()

      if (data.success) {
        // Éxito: mostrar mensaje y limpiar formulario
        setFormStatus('success')
        setStatusMessage(
          formData.name.trim()
            ? dict.contact.form.success.replace('{name}', formData.name.trim().split(" ")[0])
            : dict.contact.form.successGeneric
        )
        
        // Limpiar formulario después de 500ms para mejor UX
        setTimeout(() => {
          setFormData({ name: '', email: '', message: '' })
        }, 500)
      } else {
        // Error: mostrar mensaje de error
        setFormStatus('error')
        setStatusMessage(data.error || dict.contact.form.errors?.generic || 'Hubo un error al enviar el mensaje.')
      }
    } catch (error) {
      // Error de red o inesperado
      console.error('Error al enviar formulario:', error)
      setFormStatus('error')
      setStatusMessage(
        dict.contact.form.errors?.network || 
        'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.'
      )
    }
  }

  // ============================================================================
  // RENDERIZADO
  // ============================================================================

  /**
   * Determina si el formulario está deshabilitado
   */
  const isFormDisabled = formStatus === 'submitting' || formStatus === 'success'

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      
      {/* ==================== CAMPO: NOMBRE ==================== */}
      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-medium text-[#A6A6A6]"
        >
          {dict.contact.form.name}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          disabled={isFormDisabled}
          maxLength={100}
          aria-required="true"
          aria-invalid={formStatus === 'error' && formData.name.length < 2 ? "true" : "false"}
          aria-describedby={formStatus === 'error' ? "form-status" : undefined}
          className={`mt-1 block w-full min-h-[44px] px-3 py-2.5 rounded-md border bg-[#181818] text-[#F2F2F2] placeholder-[#595959] shadow-sm transition-colors
            ${isFormDisabled 
              ? 'border-[#333] opacity-60 cursor-not-allowed' 
              : 'border-[#333]  focus-visible:-visible:-visible::border-[#9D00E0] focus-visible:-visible:-visible::ring-0 focus-visible:-visible:-visible::ring-offset-0'
            }
          `}
        />
      </div>
      
      {/* ==================== CAMPO: EMAIL ==================== */}
      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-[#A6A6A6]"
        >
          {dict.contact.form.email}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          disabled={isFormDisabled}
          aria-required="true"
          aria-invalid={formStatus === 'error' && !formData.email.includes('@') ? "true" : "false"}
          aria-describedby={formStatus === 'error' ? "form-status" : undefined}
          className={`mt-1 block w-full min-h-[44px] px-3 py-2.5 rounded-md border bg-[#181818] text-[#F2F2F2] placeholder-[#595959] shadow-sm transition-colors
            ${isFormDisabled 
              ? 'border-[#333] opacity-60 cursor-not-allowed' 
              : 'border-[#333] focus-visible:-visible:-visible::border-[#9D00E0] focus-visible:-visible:-visible::ring-0 focus-visible:-visible:-visible::ring-offset-0'
            }
          `}
        />
      </div>
      
      {/* ==================== CAMPO: MENSAJE ==================== */}
      <div>
        <label 
          htmlFor="message" 
          className="block text-sm font-medium text-[#A6A6A6]"
        >
          {dict.contact.form.message}
        </label>
        <textarea
  name="message"
  id="message"
  rows={3}
  value={formData.message}
  onChange={handleInputChange}
  required
  disabled={isFormDisabled}
  maxLength={5000}
  aria-required="true"
  aria-invalid={formStatus === 'error' && formData.message.length < 10 ? "true" : "false"}
  aria-describedby={formStatus === 'error' ? "form-status" : undefined}
  className={`
    mt-1 block w-full
    px-3 py-2.5
    rounded-md
    border
    bg-[#18181b]
    text-[#F2F2F2]
    placeholder-[#595959]
    shadow-sm
    resize-none
    transition-colors
    ${
      isFormDisabled
        ? 'border-[#333] opacity-60 cursor-not-allowed'
        : 'border-[#333] focus-visible:-visible:-visible::border-[#9D00E0] focus-visible:-visible:-visible::ring-0 focus-visible:-visible:-visible::ring-offset-0'
    }
  `}
 />
        {/* Contador de caracteres */}
        <p className="mt-1 text-xs text-[#595959] text-right">
          {formData.message.length} / 5000
        </p>
      </div>
      
      {/* ==================== BOTÓN DE ENVÍO ==================== */}
      <button
        type="submit"
        disabled={isFormDisabled}
        className={`btn-primary flex items-center justify-center w-full min-h-[44px] h-10 rounded-full px-6 transition-all duration-200 group
          ${isFormDisabled 
            ? 'bg-[#333] cursor-not-allowed opacity-70' 
            : 'bg-gradient-to-r from-[#F2F2F2] via-[#F2F2F2] to-[#9D00E0] shadow-[0px_4px_25px_rgba(115,0,165,0.25)] hover:shadow-[0px_6px_30px_rgba(115,0,165,0.4)] cursor-pointer'
          }
        `}
        style={{ fontFamily: 'var(--font-inter)' }}
        aria-busy={formStatus === 'submitting'}
      >
        {formStatus === 'submitting' ? (
          // Loading spinner
          <span className="flex items-center gap-2">
            <svg 
              className="animate-spin h-5 w-5 text-[#181818]" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="fluid-text-sm font-semibold text-[#181818]">
              {dict.contact.form.sending || 'Enviando...'}
            </span>
          </span>
        ) : formStatus === 'success' ? (
          // Checkmark de éxito
          <span className="flex items-center gap-2">
            <svg 
              className="h-5 w-5 text-[#181818]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            <span className="fluid-text-sm font-semibold text-[#181818]">
              {dict.contact.form.sent || '¡Enviado!'}
            </span>
          </span>
        ) : (
          // Estado normal
          <span className="fluid-text-sm font-semibold text-background group-hover:text-background transition-colors">
            {dict.contact.form.submit}
          </span>
        )}
      </button>
      
      {/* ==================== MENSAJE DE ESTADO ==================== */}
      {statusMessage && (
        <div
          id="form-status"
          role="alert"
          aria-live="polite"
          className={`mt-4 p-4 rounded-md text-sm font-medium transition-all duration-300 ${
            formStatus === 'success'
              ? 'bg-[#00FFC2]/10 border border-[#00FFC2]/30 text-[#00FFC2]'
              : formStatus === 'error'
              ? 'bg-red-500/10 border border-red-500/30 text-red-400'
              : ''
          }`}
        >
          <div className="flex items-start gap-3">
            {formStatus === 'success' ? (
              <svg 
                className="h-5 w-5 flex-shrink-0 mt-0.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            ) : (
              <svg 
                className="h-5 w-5 flex-shrink-0 mt-0.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            )}
            <span>{statusMessage}</span>
          </div>
        </div>
      )}
    </form>
  )
}

export default ContactForm
