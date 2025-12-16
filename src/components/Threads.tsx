'use client'

// ============================================================================
// IMPORTS - Importaciones de librerías
// ============================================================================

import React, { useEffect, useRef } from "react"
// OGL es una librería WebGL minimalista para gráficos 3D
import { Renderer, Program, Mesh, Triangle, Color } from "ogl"

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

/**
 * Props del componente Threads
 * 
 * @property color - Color de las líneas en formato RGB normalizado [r, g, b]
 *                   Cada componente va de 0 a 1 (ej: [1, 1, 1] = blanco)
 * @property amplitude - Amplitud del movimiento de las líneas (qué tan alto se mueven)
 * @property distance - Separación entre las líneas
 * @property enableMouseInteraction - Si el mouse debe afectar el movimiento de las líneas
 */
interface ThreadsProps {
  color?: [number, number, number]
  amplitude?: number
  distance?: number
  enableMouseInteraction?: boolean
}

// ============================================================================
// SHADERS DE WEBGL
// ============================================================================

/**
 * Vertex Shader
 * 
 * El vertex shader se ejecuta una vez por cada vértice del triángulo.
 * En este caso, simplemente pasa la posición y las coordenadas UV al fragment shader.
 * 
 * - attribute vec2 position: Coordenadas del vértice (-1 a 1)
 * - attribute vec2 uv: Coordenadas de textura (0 a 1)
 * - varying vec2 vUv: Pasa las UVs al fragment shader
 */
const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

/**
 * Fragment Shader
 * 
 * El fragment shader se ejecuta una vez por cada píxel y calcula su color.
 * Este shader dibuja múltiples líneas ondulantes usando ruido Perlin.
 * 
 * Uniforms (variables que vienen de JavaScript):
 * - iTime: Tiempo transcurrido para animación
 * - iResolution: Resolución del canvas
 * - uColor: Color de las líneas
 * - uAmplitude: Amplitud del movimiento
 * - uDistance: Separación entre líneas
 * - uMouse: Posición del mouse (0 a 1)
 */
const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

// Función de ruido Perlin 2D para generar movimiento orgánico
float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

// Función auxiliar para convertir un conteo a tamaño en píxeles
float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

// Función que dibuja una línea individual
float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

// Función principal que renderiza todas las líneas
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * Threads - Componente WebGL que dibuja líneas animadas ondulantes
 * 
 * Este componente crea un efecto visual de "hilos" o líneas que se mueven
 * de forma ondulante, creando un fondo dinámico y atractivo.
 * 
 * Tecnología:
 * - Usa OGL (librería WebGL minimalista) para renderizar gráficos
 * - Los shaders (programas de GPU) calculan el color de cada píxel
 * - Ruido Perlin para movimiento orgánico y natural
 * 
 * Funcionamiento:
 * 1. Se crea un renderer WebGL y se añade al contenedor
 * 2. Se compilan los shaders y se configuran los uniforms
 * 3. Un loop de animación actualiza el tiempo y renderiza cada frame
 * 4. Si enableMouseInteraction es true, la posición del mouse afecta el efecto
 * 
 * @param color - Color RGB de las líneas (por defecto blanco [1,1,1])
 * @param amplitude - Qué tanto se mueven las líneas (por defecto 1)
 * @param distance - Separación entre líneas (por defecto 0)
 * @param enableMouseInteraction - Si el mouse afecta el movimiento (por defecto false)
 * @returns Componente JSX con el canvas WebGL
 */
const Threads: React.FC<ThreadsProps> = ({
  color = [1, 1, 1],
  amplitude = 1,
  distance = 0,
  enableMouseInteraction = false,
  ...rest
}) => {
  // ============================================================================
  // REFERENCIAS
  // ============================================================================

  /**
   * Referencia al div contenedor donde se añadirá el canvas WebGL
   */
  const containerRef = useRef<HTMLDivElement>(null)
  
  /**
   * Referencia al ID del requestAnimationFrame para poder cancelarlo
   */
  const animationFrameId = useRef<number | undefined>(undefined)

  // ============================================================================
  // EFECTO DE INICIALIZACIÓN Y ANIMACIÓN
  // ============================================================================

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    // ==================== CONFIGURACIÓN DEL RENDERER ====================
    
    /**
     * Crear el renderer WebGL con transparencia habilitada
     */
    const renderer = new Renderer({ alpha: true })
    const gl = renderer.gl
    
    // Configurar transparencia
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    
    // Añadir el canvas al contenedor
    container.appendChild(gl.canvas)

    // ==================== CONFIGURACIÓN DE LA GEOMETRÍA ====================
    
    /**
     * Crear un triángulo que cubre toda la pantalla
     * Es una técnica común en shaders de pantalla completa
     */
    const geometry = new Triangle(gl)
    
    /**
     * Crear el programa (shader) con los uniforms
     * Los uniforms son variables que se pueden cambiar desde JavaScript
     */
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          ),
        },
        uColor: { value: new Color(...color) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
      },
    })

    /**
     * Crear el mesh (combinación de geometría y programa)
     */
    const mesh = new Mesh(gl, { geometry, program })

    // ==================== MANEJO DE RESIZE ====================
    
    /**
     * Función que ajusta el tamaño del canvas cuando la ventana cambia
     */
    function handleResize() {
      const { clientWidth, clientHeight } = container
      renderer.setSize(clientWidth, clientHeight)
      
      // Actualizar la resolución en el shader
      program.uniforms.iResolution.value.r = clientWidth
      program.uniforms.iResolution.value.g = clientHeight
      program.uniforms.iResolution.value.b = clientWidth / clientHeight
    }
    
    window.addEventListener("resize", handleResize)
    handleResize()

    // ==================== MANEJO DEL MOUSE ====================
    
    /**
     * Variables para interpolar suavemente la posición del mouse
     */
    let currentMousePosition = [0.5, 0.5]
    let targetMousePosition = [0.5, 0.5]

    /**
     * Actualiza la posición objetivo del mouse
     */
    function handleMouseMove(event: MouseEvent) {
      const rect = container.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = 1.0 - (event.clientY - rect.top) / rect.height
      targetMousePosition = [x, y]
    }
    
    /**
     * Resetea el mouse al centro cuando sale del contenedor
     */
    function handleMouseLeave() {
      targetMousePosition = [0.5, 0.5]
    }
    
    // Solo añadir listeners si la interacción está habilitada
    if (enableMouseInteraction) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    // ==================== LOOP DE ANIMACIÓN ====================
    
    /**
     * Función que se ejecuta cada frame
     * Actualiza el tiempo y la posición del mouse, luego renderiza
     */
    function animationLoop(time: number) {
      // Interpolar suavemente la posición del mouse
      if (enableMouseInteraction) {
        const smoothingFactor = 0.05
        currentMousePosition[0] += smoothingFactor * (targetMousePosition[0] - currentMousePosition[0])
        currentMousePosition[1] += smoothingFactor * (targetMousePosition[1] - currentMousePosition[1])
        program.uniforms.uMouse.value[0] = currentMousePosition[0]
        program.uniforms.uMouse.value[1] = currentMousePosition[1]
      } else {
        // Sin interacción, mantener en el centro
        program.uniforms.uMouse.value[0] = 0.5
        program.uniforms.uMouse.value[1] = 0.5
      }
      
      // Actualizar el tiempo (convertir de ms a segundos)
      program.uniforms.iTime.value = time * 0.001

      // Renderizar el frame
      renderer.render({ scene: mesh })
      
      // Solicitar el siguiente frame
      animationFrameId.current = requestAnimationFrame(animationLoop)
    }
    
    // Iniciar el loop de animación
    animationFrameId.current = requestAnimationFrame(animationLoop)

    // ==================== CLEANUP AL DESMONTAR ====================
    
    return () => {
      // Cancelar el loop de animación
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      
      // Remover listeners
      window.removeEventListener("resize", handleResize)
      if (enableMouseInteraction) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
      
      // Remover el canvas y liberar recursos WebGL
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas)
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    }
  }, [color, amplitude, distance, enableMouseInteraction])

  // ============================================================================
  // RENDERIZADO
  // ============================================================================

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full relative" 
      {...rest} 
    />
  )
}

export default Threads
