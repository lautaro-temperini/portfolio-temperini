// ============================================================================
// API ROUTE: Envío de emails de contacto con Resend
// ============================================================================

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

/**
 * Obtiene la instancia de Resend de forma lazy (solo cuando se necesita)
 * Esto evita errores durante el build cuando la API key no está disponible
 */
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY no está configurada en las variables de entorno')
  }
  return new Resend(apiKey)
}

/**
 * Email destino donde se recibirán los mensajes de contacto
 */
const DESTINATION_EMAIL = 'latta.romero@gmail.com'

/**
 * Email remitente (debe ser un dominio verificado en Resend o onboarding@resend.dev)
 */
const FROM_EMAIL = 'onboarding@resend.dev'

/**
 * Rate limiting simple: máximo de requests por IP en un período de tiempo
 * En producción, usar una solución más robusta (Redis, Upstash, etc.)
 */
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minuto en ms
const MAX_REQUESTS_PER_WINDOW = 3

// Store simple en memoria para rate limiting (se reinicia con cada deploy)
const requestCounts = new Map<string, { count: number; timestamp: number }>()

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Estructura esperada del body de la request
 */
interface ContactFormBody {
  name: string
  email: string
  message: string
}

/**
 * Estructura de respuesta de error
 */
interface ErrorResponse {
  success: false
  error: string
  code: string
}

/**
 * Estructura de respuesta exitosa
 */
interface SuccessResponse {
  success: true
  message: string
}

// ============================================================================
// FUNCIONES DE VALIDACIÓN
// ============================================================================

/**
 * Valida el formato de un email usando regex
 * 
 * @param email - Email a validar
 * @returns true si el formato es válido
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Sanitiza texto para prevenir inyección de HTML/scripts
 * 
 * @param text - Texto a sanitizar
 * @returns Texto sanitizado
 */
function sanitizeText(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

/**
 * Verifica y aplica rate limiting por IP
 * 
 * @param ip - Dirección IP del cliente
 * @returns true si la request está permitida, false si excede el límite
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = requestCounts.get(ip)

  // Si no hay registro o el período expiró, crear nuevo registro
  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    requestCounts.set(ip, { count: 1, timestamp: now })
    return true
  }

  // Incrementar contador y verificar límite
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false
  }

  record.count++
  return true
}

/**
 * Obtiene la IP del cliente desde los headers
 * 
 * @param request - Objeto NextRequest
 * @returns IP del cliente o 'unknown'
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return request.headers.get('x-real-ip') || 'unknown'
}

// ============================================================================
// HANDLER POST
// ============================================================================

/**
 * POST /api/contact
 * 
 * Recibe datos del formulario de contacto y envía un email usando Resend.
 * 
 * @param request - NextRequest con el body JSON
 * @returns NextResponse con el resultado de la operación
 */
export async function POST(request: NextRequest): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    // ==================== RATE LIMITING ====================
    const clientIP = getClientIP(request)
    
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Has enviado demasiados mensajes. Por favor, espera un momento antes de intentar nuevamente.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      )
    }

    // ==================== PARSEAR BODY ====================
    let body: ContactFormBody
    
    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'El formato de la solicitud no es válido.',
          code: 'INVALID_JSON'
        },
        { status: 400 }
      )
    }

    const { name, email, message } = body

    // ==================== VALIDACIÓN DE CAMPOS ====================
    
    // Validar que todos los campos estén presentes
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Todos los campos son requeridos: nombre, email y mensaje.',
          code: 'MISSING_FIELDS'
        },
        { status: 400 }
      )
    }

    // Validar longitud mínima del nombre
    if (name.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: 'El nombre debe tener al menos 2 caracteres.',
          code: 'INVALID_NAME'
        },
        { status: 400 }
      )
    }

    // Validar longitud máxima del nombre
    if (name.trim().length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'El nombre no puede exceder los 100 caracteres.',
          code: 'NAME_TOO_LONG'
        },
        { status: 400 }
      )
    }

    // Validar formato del email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Por favor, ingresa un email válido.',
          code: 'INVALID_EMAIL'
        },
        { status: 400 }
      )
    }

    // Validar longitud mínima del mensaje
    if (message.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'El mensaje debe tener al menos 10 caracteres.',
          code: 'MESSAGE_TOO_SHORT'
        },
        { status: 400 }
      )
    }

    // Validar longitud máxima del mensaje
    if (message.trim().length > 5000) {
      return NextResponse.json(
        {
          success: false,
          error: 'El mensaje no puede exceder los 5000 caracteres.',
          code: 'MESSAGE_TOO_LONG'
        },
        { status: 400 }
      )
    }

    // ==================== SANITIZAR DATOS ====================
    const sanitizedName = sanitizeText(name.trim())
    const sanitizedEmail = email.trim().toLowerCase()
    const sanitizedMessage = sanitizeText(message.trim())

    // ==================== ENVIAR EMAIL ====================
    const resend = getResendClient()
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: DESTINATION_EMAIL,
      replyTo: sanitizedEmail,
      subject: `📬 Nuevo mensaje de contacto: ${sanitizedName}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0D0D0D; color: #F2F2F2; padding: 40px 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a 0%, #0D0D0D 100%); border-radius: 16px; padding: 40px; border: 1px solid #333;">
            
            <h1 style="color: #F2F2F2; font-size: 24px; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #333;">
              📬 Nuevo mensaje de contacto
            </h1>
            
            <div style="margin-bottom: 24px;">
              <p style="color: #A6A6A6; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Nombre</p>
              <p style="color: #F2F2F2; font-size: 16px; margin: 0;">${sanitizedName}</p>
            </div>
            
            <div style="margin-bottom: 24px;">
              <p style="color: #A6A6A6; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Email</p>
              <p style="color: #F2F2F2; font-size: 16px; margin: 0;">
                <a href="mailto:${sanitizedEmail}" style="color: #8900C3; text-decoration: none;">${sanitizedEmail}</a>
              </p>
            </div>
            
            <div style="margin-bottom: 24px;">
              <p style="color: #A6A6A6; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Mensaje</p>
              <div style="background-color: #1a1a1a; border-radius: 8px; padding: 16px; border-left: 3px solid #8900C3;">
                <p style="color: #F2F2F2; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${sanitizedMessage}</p>
              </div>
            </div>
            
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333;">
              <p style="color: #595959; font-size: 12px; margin: 0;">
                Enviado desde tu portfolio — temperini.vercel.app
              </p>
            </div>
            
          </div>
        </body>
        </html>
      `,
      text: `
Nuevo mensaje de contacto

Nombre: ${sanitizedName}
Email: ${sanitizedEmail}

Mensaje:
${sanitizedMessage}

---
Enviado desde tu portfolio — temperini.vercel.app
      `.trim()
    })

    // Verificar errores de Resend
    if (error) {
      console.error('Error de Resend:', error)
      return NextResponse.json(
        {
          success: false,
          error: 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.',
          code: 'EMAIL_SEND_ERROR'
        },
        { status: 500 }
      )
    }

    // ==================== RESPUESTA EXITOSA ====================
    console.log('Email enviado exitosamente:', data?.id)
    
    return NextResponse.json(
      {
        success: true,
        message: '¡Mensaje enviado correctamente! Te responderé pronto.'
      },
      { status: 200 }
    )

  } catch (error) {
    // Error no esperado
    console.error('Error inesperado en /api/contact:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Ocurrió un error inesperado. Por favor, intenta nuevamente.',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    )
  }
}

// ============================================================================
// HANDLER GET (para verificar que la API está funcionando)
// ============================================================================

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { 
      status: 'ok',
      message: 'API de contacto funcionando correctamente'
    },
    { status: 200 }
  )
}

