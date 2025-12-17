import { getDictionary } from "@/lib/getDictionary"
import Navbar from "@/components/navbar/Navbar"
import ScrollToTop from "@/components/fxscripts/scroll-to-top"
import Footer from "@/components/footer/Footer"
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout"
import ProseSection from "@/components/case-study/ProseSection"
import ImageBreakout from "@/components/case-study/ImageBreakout"

export const metadata = {
  title: "DÍGITO | Módulo Operativo | Lautaro R. Temperini",
  description:
    "Rediseño UX/UI del módulo operativo de Dígito: transformé el registro de horas de una tarea olvidada en parte natural del flujo diario.",
  keywords:
    "Dígito, UX/UI, time tracking, módulo operativo, registro de horas, B2B SaaS, Lautaro Temperini, caso de estudio, productividad, business intelligence",
  openGraph: {
    title: "DÍGITO | Módulo Operativo | Lautaro R. Temperini",
    description: "Dígito es una empresa de Business Intelligence y RPA. Su plataforma SaaS B2B incluía facturación, reportes y administración, pero el módulo operativo para consultores tenía baja adopción y uso inconsistente.",
    url: "https://temperini.vercel.app/digito",
    siteName: "Temperini Portfolio",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://temperini.vercel.app/images/digito-logo.png",
        width: 1200,
        height: 630,
        alt: "DÍGITO - Módulo Operativo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DÍGITO | Módulo Operativo | Lautaro R. Temperini",
    description: "Transformé el registro de horas de una tarea adicional en parte natural del flujo de trabajo.",
    images: ["https://temperini.vercel.app/images/digito-logo.png"],
  },
}

/**
 * Página de Dígito localizada - Diseño editorial tipo Medium
 * @param params - Parámetros de la ruta, incluye lang (es | en)
 */
export default async function DigitoPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  // Await params en Next.js 15
  const { lang: langParam } = await params
  const lang = langParam === "es" || langParam === "en" ? langParam : "es"
  const dict = await getDictionary(lang)
  const digitoData = (dict as any).projectPages?.digito || {}

  // Fallback completo con todas las propiedades necesarias
  const defaultData: any = {
    hero: {
      title: "DÍGITO",
      subtitle: "Módulo Operativo para Registro Inteligente",
      description: "De 1-3 semanas de demora en registro → Registro integrado al flujo diario",
    },
    myRole: {
      title: "Mi rol",
      description:
        "El objetivo fue claro: convertir el registro de horas en parte natural del flujo de trabajo, no en una tarea adicional.",
      sections: [
        {
          subtitle: "Research y síntesis",
          items: [
            "Conduje 1 de 3 entrevistas cualitativas (UX Designer de Dígito)",
            "Estructuré vacíos de investigación y prioricé áreas de desk research",
            "Sintetizé insights de entrevistas en tabla comparativa + generé HMW questions",
            "Creé customer journey para validar patrones de comportamiento",
          ],
        },
        {
          subtitle: "Estrategia y arquitectura",
          items: [
            "Propuse dirección estratégica: concentrarnos en el módulo operativo del consultor (vs. rediseñar toda la plataforma)",
            "Definí 3 ejes de diseño: Autonomía (asistente proactivo), Visibilidad (Kanban↔Gantt), Velocidad (FAB + registro rápido)",
            "Prioricé features basándome en viabilidad técnica + impacto en adopción",
          ],
        },
        {
          subtitle: "Diseño y prototipado",
          items: [
            "Diseñé wireframe completo usado como base para HiFi",
            "Diseñé múltiples pantallas: Dashboard, Registro de horas, Calendario, Vista de Proyectos",
            "Armé flujos de interacción principales del prototipo",
            "Resolví problemas técnicos de componentes (dropdowns con overlay, states del sidebar)",
          ],
        },
        {
          subtitle: "Testing y validación",
          items: [
            "Monté test en Useberry con 4 tareas + 3 preguntas cualitativas",
            "Contacté usuarios para testing",
            "Iteré prototipo basándome en feedback",
          ],
        },
      ],
      decisions: [
        'Descartar gamificación superficial (basándome en research sobre "fatiga del juego")',
        "Priorizar FAB siempre visible sobre navegación profunda",
        "Proponer sincronización Kanban↔Gantt en tiempo real",
        "Agregar tooltips fijos en lugar de wizard intrusivo",
      ],
    },
    context: {
      title: "Contexto",
      text1:
        "Este proyecto se desarrolló como parte del curso Product Design Fundamentals de Repensar, en equipo de 4 personas durante 3.5 meses, culminando con la presentación ante el CEO de Dígito.",
      text2:
        "De 1-3 semanas de demora en registro → Registro integrado al flujo diario",
    },
    problem: {
      title: "El problema: las horas se registraban 1-3 semanas tarde",
      businessImpact: "Impacto en el negocio",
      impactText: "Esa demora afectaba:",
      impactItems: [
        "Facturación",
        "Seguimiento operativo",
        "Evaluación de carga y capacidad",
        "Detección temprana de desvíos",
      ],
      hypothesis: "Los usuarios se olvidan de cargar las horas.",
      hypothesisAuthor: "— CEO de Dígito",
      criticalQuestion: "Pregunta crítica sin responder: ¿El registro realmente se olvida o se evita activamente?",
      problemTitle: "",
      scopeTitle: "Alcance definido:",
      scopeText:
        "No modificar contratos, procesos organizacionales ni estructuras internas. Identificar qué aspectos de la experiencia generaban fricción y cómo reducirla desde diseño.",
    },
    research: {
      title: "Research: el problema real no es olvido, es depriorización activa",
      subtitle:
        "Combiné desk research, entrevistas con usuarios reales y auditoría del MVP para entender por qué el módulo operativo tenía baja adopción.",
      methodsTitle: "Métodos",
      deskResearch: {
        title: "Desk Research",
        text: "Validé patrones de comportamiento en literatura sobre productividad",
        theory:
          'Respaldo teórico: "Los usuarios tienden a evitar procesos que demandan esfuerzo cognitivo extra" (Kahneman, Thinking Fast and Slow)',
        benchmark:
          "Benchmark del mercado: 60% de empleados perciben el time tracking como vigilancia (Paymo, Hubstaff)",
      },
      interviews: {
        title: "3 Entrevistas cualitativas",
        profiles: "Perfiles: PM, Desarrollador, UX Designer (todos de Dígito)",
        objective: "Objetivo: observar patrones de comportamiento, no recopilar opiniones aisladas",
      },
      audit: {
        title: "Auditoría heurística del MVP",
        text: "Identifiqué flujos fragmentados, interfaz centrada en administración y carga cognitiva permanente",
      },
      quotesTitle: "Citas que revelaron el problema real",
      quotes: {
        perception: {
          label: "Percepción del sistema:",
          text: '"En una escala de 1 a 10, lo veo más como un 1: control administrativo."',
        },
        postponement: {
          label: "Postergación activa:",
          text1: '"Si estoy en varios proyectos al mismo tiempo y surge una urgencia, el registro queda para después."',
          text2: '"Yo lo hago al final del día, a las seis de la tarde, donde registro todo junto."',
        },
        friction: {
          label: "Fricción física:",
          text: '"Si cierro la laptop en la oficina, es engorroso volver a encenderla solo para registrar."',
        },
        dependencies: {
          label: "Dependencias operativas:",
          text: '"Si el CEO no revisa ese día, la aprobación queda en pausa. A veces podemos avanzar, pero otras veces tenemos que esperar."',
        },
      },
    },
    insight: {
      title: "Insight emergente",
      mainText: "El registro no se hace porque no aporta valor al flujo real de trabajo.",
      explanation:
        "El sistema está construido desde la lógica del dato, no desde la lógica de la acción. Los consultores priorizan lo que mueve la operación y descartan lo que no devuelve utilidad inmediata.",
      pivotTitle: "Pivot del diseño:",
      pivotFrom: 'De: "¿Cómo logramos que la gente recuerde cargar horas?"',
      pivotTo: 'A: "¿Cómo logramos que registrar sea un resultado natural del trabajo, no una tarea adicional?"',
    },
    strategy: {
      title: "Estrategia: módulo operativo, no rediseño total",
      text: "Tras analizar los insights, quedó claro que mejorar el registro no implicaba rediseñar toda la plataforma, sino construir un módulo operativo cohesivo alineado con el flujo real de los consultores.",
      alternativeTitle: "Alternativa evaluada desde negocio: penalizar el registro tardío",
      alternativeText: "Además de las direcciones de UX, surgió desde negocio: forzar el registro mediante sanciones.",
      discardedTitle: "Camino descartado por:",
      discardedReasons: [
        "Genera cumplimiento, no adopción",
        "Degrada la calidad del dato (incentiva registros genéricos)",
        "Castiga al usuario por una fricción no resuelta",
        "Contradice una cultura basada en autonomía",
      ],
      conclusion:
        "Conclusión: La vía sostenible es lograr que registrar sea rápido, útil y parte del ritmo de trabajo.",
      scopeTitle: "Alcance: concentrarnos en el módulo operativo del consultor",
      scopeText1:
        "El brief original del CEO incluía 8 áreas de mejora. Rediseñar toda la plataforma era inviable en 3.5 meses y estratégicamente ineficiente: nuestra investigación mostró que la fricción crítica estaba concentrada en el módulo operativo, no en los módulos administrativos.",
      ourDecision: "Nuestra decisión:",
      ourDecisionText: "Concentrarnos en donde registra horas, gestiona tareas y ve su carga de trabajo.",
      thisAllowed: "Esto permitió:",
      thisAllowedItems: [
        "Atacar directamente el problema detectado (registro tardío de 1-3 semanas)",
        "Proponer una solución completa y validable en el plazo académico",
        "Mantener compatibilidad con módulos administrativos que ya funcionaban",
        "Sentar bases para futuras integraciones (Reportes, Tickets, mobile)",
      ],
      whyNotJustScope: "Por qué no fue solo una limitación de scope:",
      whyNotJustScopeText:
        "El research validó que los consultores no se quejaban de facturación ni reportes gerenciales. Se quejaban del flujo diario: registro tardío, herramientas paralelas (Freedcamp, Teams, Excel), falta de visibilidad del equipo.",
    },
    principles: {
      title: "Principios que guiaron las decisiones",
      subtitle: "",
      items: {
        relevance: {
          title: "Relevancia",
          text: "Responder a la causa raíz, no solo el síntoma",
        },
        userImpact: {
          title: "Impacto en el usuario",
          text: "Disminuir fricción, aumentar continuidad del flujo",
        },
        differentiation: {
          title: "Diferenciación",
          text: "Ofrecer experiencia más coherente que herramientas fragmentadas",
        },
        technicalViability: {
          title: "Viabilidad técnica",
          text: "Soluciones implementables dentro del ecosistema actual",
        },
        scalability: {
          title: "Escalabilidad",
          text: "Bases sólidas para incorporar automatización o IA",
        },
      },
      guidingPrinciple: "El principio rector: Acompañar el ciclo completo del trabajo, no simplemente documentarlo.",
    },
    frictions: {
      title: "Insights y decisiones de diseño: 5 fricciones críticas",
      subtitle:
        "Tras analizar entrevistas, benchmark y auditoría del MVP, identifiqué cinco patrones consistentes que explicaban por qué el registro fallaba.",
      friction1: {
        number: "1.",
        title: "El usuario piensa en tareas, no en horas",
        pain: "Los consultores estructuran su día en base a qué tienen que hacer, no cuánto tiempo dedicarán.",
        decision: "Asistente proactivo + autocompletado desde historial",
        whyWorks:
          "El sistema sugiere actividades basadas en calendario y patrones previos. El usuario confirma en lugar de reconstruir memoria.",
        translatedTo:
          'FAB permanente con sugerencias contextuales, opción "Duplicar día anterior" y autocompletado basado en historial de tareas recurrentes.',
      },
      friction2: {
        number: "2.",
        title: "Falta de visibilidad del equipo",
        pain: 'Los usuarios usaban Freedcamp y Teams porque el sistema no mostraba "qué está haciendo el equipo" ni "qué sigue después de esta tarea".',
        decision:
          "Panel unificado con Kanban (flujo diario) + Gantt (dependencias y planificación macro) + Vista General (actividad del equipo)",
        whyWorks: [
          'Kanban = "qué hacer hoy" con estados visibles',
          'Gantt = "qué viene después" con jerarquías claras',
          "Vista General = contexto del proyecto + actividad reciente sin salir del sistema",
        ],
        translatedTo:
          "Integración Kanban↔Gantt↔Calendario en un mismo componente con tabs persistentes. Todas las vistas consumen la misma fuente de datos: mover una card en Kanban actualiza automáticamente el Gantt y el dashboard personal en tiempo real.",
      },
      friction3: {
        number: "3.",
        title: "Plataforma percibida como control",
        pain: '"Para mí es un 1. Es solo control administrativo, no me organiza nada."',
        decision: "Estados visibles + progreso personal + señales de avance",
        whyWorks:
          'El sistema pasa de "registro para facturación" a "herramienta que muestra mi progreso". El usuario ve valor inmediato: qué completó, qué avanzó, qué falta.',
        translatedTo:
          'Dashboard con indicadores de progreso del día, estados de completitud por proyecto y feedback ligero al registrar ("Día completo registrado", sin trofeos ni streaks infantiles).',
      },
      friction4: {
        number: "4.",
        title: "Tareas repetitivas",
        pain: '"Yo lo hago al final del día, a las seis de la tarde, donde registro todo junto."',
        decision: '"Duplicar día anterior" + sugerencias desde calendario',
        whyWorks:
          "Los usuarios tienen rutinas predecibles. Prefieren confirmar patrones en lugar de cargar todo manual. Validado en entrevistas (mencionaron usar Excel y copiar filas anteriores).",
        translatedTo:
          'Botón destacado "Duplicar día anterior" en el FAB y sugerencias automáticas extraídas de eventos del calendario sincronizado (Google/Microsoft).',
      },
      friction5: {
        number: "5.",
        title: "Trabajo en equipo dependiente de terceros",
        pain: '"Si el CEO no revisa ese día, la aprobación queda en pausa. A veces podemos avanzar, pero otras veces tenemos que esperar."',
        decision: "Transparencia en estados + permisos claros + notas públicas",
        whyWorks:
          "Los usuarios ven el estado sin pings innecesarios. Las notas públicas funcionan como knowledge base ligero y evitan preguntas repetidas.",
        translatedTo:
          "Tooltips explicativos sobre permisos, iconografía diferenciada para tareas propias vs. del equipo, y sección de notas públicas por proyecto visible para todo el equipo.",
      },
    },
    architecture: {
      title: "Arquitectura, flujos y UI: tres ejes de diseño",
      subtitle:
        "La solución se tradujo en flujos y componentes organizados en tres ejes: estructural, funcional y motivacional.",
      unifiedPanel: {
        title: "Panel Operativo Unificado",
        axis: "Eje estructural",
        problem:
          "Fragmentación y navegación confusa entre vistas. Algunos roles dependían del CEO para confirmar estados por falta de visibilidad del trabajo del equipo.",
        solution: "Integrar todas las vistas operativas en un único espacio coherente.",
        features: [],
        components: [
          'Kanban: ejecución rápida, estados visibles, foco en "qué sigue"',
          "Vista General: brief, información del proyecto y actividad reciente del equipo (cambios en Kanban, notas públicas, acceso al perfil de cada miembro)",
          "Gantt: dependencias, jerarquías claras, planificación macro y visualización del equipo",
        ],
        syncTitle: "Sincronización Kanban ↔ Gantt:",
        syncText:
          "Todas las vistas consumen la misma fuente de datos. Mover una card en Kanban actualiza automáticamente el Gantt general, el dashboard personal y la visibilidad del equipo en tiempo real.",
      },
      automation: {
        title: "Automatización Ligera",
        axis: "Eje funcional",
        problem:
          "Al final del día, los usuarios están saturados y registrar exige reconstruir memoria, cambiar de contexto y retomar la laptop.",
        solution:
          'Un asistente "ligero" que sugiere actividades basadas en agenda, historial y patrones de trabajo, transformando el registro en una confirmación rápida en lugar de una tarea de memoria.',
        features: [
          '"Duplicar día anterior"',
          "Sugerencias desde calendario (Google/Microsoft)",
          "Autocompletado basado en historial",
          "Stopwatch",
        ],
      },
      social: {
        title: "Capa Social y Transparencia",
        axis: "Eje motivacional",
        problem:
          "El brief sugería gamificación mediante puntajes y recompensas. El research mostró que sistemas de puntos generan fatiga del juego cuando no están conectados con motivación intrínseca ni valor real.",
        solution: "Mantener elementos sociales valiosos, pero redirigidos a productividad:",
        solutionItems: [
          "Reconocimiento público ligado a consistencia, no trofeos",
          "Notas públicas para fomentar conocimiento compartido",
          "Perfiles visibles que facilitan colaboración",
          "Señales de avance que refuerzan autonomía, no vigilancia",
        ],
        result:
          "Una capa motivacional adulta, centrada en progreso, transparencia operativa y colaboración, sin caer en fatiga de gamificación superficial.",
      },
      dashboard: {
        title: "Dashboard Refinado",
        subtitle: "Componente que articula los tres ejes",
        text: "El dashboard funciona como puerta de entrada al módulo operativo. Su diseño se centró en dar contexto inmediato sin sobrecargar al usuario.",
        includes: [
          "Tareas del día",
          "Reuniones diarias",
          "Últimos proyectos con modificaciones propias",
          "Widget de notas pendientes",
        ],
      },
      kanbanGantt: { title: "", problem: "", solution: "", features: [] },
      fab: { title: "", problem: "", solution: "", features: [] },
    },
    testing: {
      title: "Testing: validación con 4 usuarios reales",
      subtitle: "Realicé pruebas exploratorias de usabilidad con prototipo HiFi en Useberry mediante tareas guiadas.",
      participants: "4 usuarios reales de Dígito (Desarrollador, Diseñador UX, Líder de Proyecto, Analista PowerBI)",
      method: "Observación del comportamiento + feedback cualitativo",
      objective:
        "Identificar fricciones críticas en navegación, comprensión de vistas y continuidad entre planificación-ejecución.",
      frictionsTitle: "Fricciones detectadas",
      friction1: {
        title: "Dificultad para relacionar Gantt ↔ Kanban",
        text: "Los usuarios entendían cada vista aislada, pero no cómo se conectaban. El cambio entre modos no preservaba suficiente contexto.",
      },
      friction2: {
        title: "Falta de claridad en roles, permisos y visibilidad",
        text: 'Los participantes no tenían claro qué podían ver o modificar según su rol. Esto reforzaba la percepción de "control" detectada en investigación.',
      },
      iterationsTitle: "Iteraciones aplicadas",
      iteration1: {
        title: "Reorganización profunda del Dashboard",
        adjustments: [
          'Bifurcación de "Proyectos" en Proyectos Recientes (últimos modificados) y Tareas Recientes (obtenidas del Kanban)',
          "Logros movidos al Perfil",
          "Calendario + notas reubicados en columna lateral más estrecha",
        ],
        result: 'El dashboard dejó de percibirse "plano" y pasó a funcionar como punto de orientación diario.',
      },
      iteration2: {
        title: "Clarificación de visibilidad y señales contextuales",
        adjustments: [
          "Iconografía para distinguir tareas propias y del equipo",
          "Tooltips en el Gantt que aclaran que su progreso se calcula a partir del estado de las tareas en Kanban",
          "Tooltips en el Kanban que indican que ese avance es visible para todo el equipo",
        ],
        learning:
          "Algunas funciones (notas públicas, sincronización Gantt-Kanban) requieren educación inicial, no solo señalización. De ahí surge la idea de sumar posteriormente un Wizard de onboarding orientado a los flujos más complejos.",
      },
    },
    results: {
      title: "Resultados, aprendizajes y próximos pasos",
      qualitative: {
        title: "Validación cualitativa",
        before: "Antes del rediseño:",
        beforeQuote: '"Para mí es un 1. Es solo control administrativo, no me organiza nada."',
        after: "Después del prototipo:",
        afterQuote: '"Lo veo sencillo de manejar, así que sí me ayudaría bastante."',
        impact: "Impacto real:",
        impactText: "El sistema pasó de ser un registrador de horas a funcionar como una herramienta operativa.",
      },
      learnings: {
        title: "Aprendizajes críticos",
        subtitle: "Qué hubiera hecho distinto",
        text1:
          "La funcionalidad de sugerencias inteligentes se diseñó con posibilidad de incorporar IA, pero quedó fuera del alcance porque no teníamos validación directa de gerencia.",
        text2:
          "En la presentación final, el CEO mostró interés fuerte por soluciones basadas en IA, interés que no había sido evidente durante el proceso.",
        learning:
          "Validar la ambición tecnológica con dirección, incluso cuando el acceso es limitado, puede desbloquear oportunidades que no surgen únicamente desde la investigación con usuarios.",
        text3:
          "De haber tenido esa confirmación temprana, habría planteado desde el inicio un enfoque híbrido: IA ligera como complemento (no como dependencia), con reglas tradicionales como base.",
      },
      aiEvolution: {
        title: "Cómo evolucionaría hacia IA (Fase 2)",
        text: "El módulo quedó diseñado para escalar sin reescritura. Si el negocio decidiera invertir, la evolución hacia IA sería directa y controlada.",
        componentsTitle: "Componentes necesarios:",
        components: [
          "API de Azure OpenAI",
          "Dataset existente: historial de horas, calendario sincronizado, tipos de tareas y patrones de uso",
          "Lógica híbrida: reglas simples como fallback",
          "IA como capa de contextualización, no como motor principal",
        ],
        benefitsTitle: "Beneficios esperados:",
        benefits: [
          'Sugerencias predictivas ("Probablemente trabajaste en X de 11-13 h")',
          "Recomendación automática de carga o replanificación",
          "Precisión creciente a medida que la IA aprende patrones reales",
          "Datos más coherentes para facturación y seguimiento",
        ],
        note: "Esta funcionalidad quedó planteada como Fase 2, condicionada a validar adopción del sistema base.",
      },
      nextSteps: {
        title: "Próximos pasos estratégicos",
        onboarding: {
          title: "Onboarding: pieza crítica para acelerar adopción",
          text: "El sistema incorpora conceptos potentes (registro contextual, automatización ligera, sincronización entre vistas), pero requieren comprensión inicial.",
          flows: "Diseñé un onboarding guiado basado en cuatro flujos clave:",
          flowItems: [
            "Dashboard como punto de partida",
            "Relación Kanban ↔ Gantt",
            "Perfil y capa social",
            "Registro sin fricción",
          ],
          note: "El wizard aparece solo en la primera sesión y luego queda accesible desde un punto discreto de ayuda.",
          impact: "Impacto esperado:",
          impactText: "Menos soporte, incorporación más rápida, adopción más consistente.",
        },
        mobile: {
          title: "Mobile-first: extensión natural del sistema",
          text1:
            "El patrón fue claro en la investigación: cuando la laptop se cierra, el registro se posterga. El mercado refuerza esta dirección: más del 60% del time-tracking ligero ocurre en mobile.",
          text2:
            "La decisión de priorizar desktop en el MVP fue deliberada: primero había que resolver la raíz del problema (flujo, coherencia entre vistas y valor percibido) antes de expandir a otros dispositivos.",
          note: "Con esa base ya resuelta, mobile se convierte en la evolución lógica para reducir retroactividad y sostener adopción en contextos fuera de escritorio.",
        },
      },
      phase2Principles: {
        title: "Principios que guían la Fase 2",
        items: [
          {
            title: "Adopción ocurre cuando hay valor inmediato:",
            text: "El usuario registra cuando el sistema devuelve algo útil en tiempo real. Cualquier feature futuro debe aumentar utilidad, no suma de pasos.",
          },
          {
            title: "El ecosistema importa más que cada vista:",
            text: "Kanban, Calendario y Gantt funcionan cuando actúan como un único modelo mental. Mantener esa coherencia es clave para escalar.",
          },
          {
            title: "Automatización ligera es la base para IA:",
            text: "El diseño actual ya opera con reglas que permiten evolucionar hacia sugerencias predictivas sin reescribir el sistema. La transición a IA es una ampliación, no un reemplazo.",
          },
        ],
      },
      gridLearnings: [],
      closing: {
        title: "Cierre",
        text1: "Este proyecto no buscó mejorar una tarea: buscó redefinir el rol del sistema dentro del día laboral.",
        text2:
          "El resultado es un módulo operativo coherente que reduce esfuerzo, anticipa fricción y acompaña el trabajo real.",
        highlight: "No diseñé pantallas. Diseñé un comportamiento nuevo.",
      },
      conclusion: {
        title: "",
        subtitle: "",
        text: "",
      },
    },
    solution: { title: "", subtitle: "", dashboard: {}, timeTracking: {}, projectVisibility: {} },
    iterations: { title: "", text1: "", text2: "", result: "" },
    learnings: [],
    conclusion: { title: "", subtitle: "", text: "" },
  }

  // Merge profundo de digitoData con defaultData
  const t: any = {
    ...defaultData,
    ...digitoData,
    hero: { ...defaultData.hero, ...digitoData.hero },
    myRole: { ...defaultData.myRole, ...digitoData.myRole },
    context: { ...defaultData.context, ...digitoData.context },
    problem: { ...defaultData.problem, ...digitoData.problem },
    research: { ...defaultData.research, ...digitoData.research },
    insight: { ...defaultData.insight, ...digitoData.insight },
    strategy: { ...defaultData.strategy, ...digitoData.strategy },
    principles: { ...defaultData.principles, ...digitoData.principles },
    frictions: { ...defaultData.frictions, ...digitoData.frictions },
    architecture: {
      ...defaultData.architecture,
      ...digitoData.architecture,
      unifiedPanel: { ...defaultData.architecture.unifiedPanel, ...digitoData.architecture?.unifiedPanel },
      automation: { ...defaultData.architecture.automation, ...digitoData.architecture?.automation },
      social: { ...defaultData.architecture.social, ...digitoData.architecture?.social },
      dashboard: { ...defaultData.architecture.dashboard, ...digitoData.architecture?.dashboard },
    },
    testing: { ...defaultData.testing, ...digitoData.testing },
    results: { ...defaultData.results, ...digitoData.results },
    solution: { ...defaultData.solution, ...digitoData.solution },
    iterations: { ...defaultData.iterations, ...digitoData.iterations },
    learnings: digitoData.learnings || defaultData.learnings,
    conclusion: { ...defaultData.conclusion, ...digitoData.conclusion },
  }

  return (
    <div className="page-transition">
      <Navbar dict={dict} lang={lang} />
      <main className="pt-16 md:pt-20 lg:pt-24">
        <CaseStudyLayout>
          {/* Hero Section - 60vh */}
          <section className="w-full h-[60vh] flex items-center justify-center">
            <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold leading-tight text-[#F2F2F2] mb-6">
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-[#F2F2F2] mb-4">{t.hero.subtitle}</p>
              <p className="text-base md:text-lg text-[#F1F1F1] leading-relaxed">{t.hero.description}</p>
            </div>
          </section>

          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.myRole.title}</h2>
            <p className="text-[#F1F1F1] mb-8 leading-relaxed">{t.myRole.description}</p>

            <div className="space-y-8">
              {t.myRole.sections?.map((section: any, index: number) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold text-[#F2F2F2] mb-4">{section.subtitle}</h3>
                  <ul className="list-disc pl-5 space-y-2 text-[#F1F1F1]">
                    {section.items.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-[#F2F2F2] mb-4">Decisiones clave que propuse:</h3>
              <ul className="list-disc pl-5 space-y-2 text-[#F1F1F1]">
                {t.myRole.decisions?.map((decision: string, index: number) => (
                  <li key={index}>{decision}</li>
                ))}
              </ul>
            </div>
          </ProseSection>

          {/* Contexto */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.context.title}</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="mb-4">{t.context.text1}</p>
              <p>{t.context.text2}</p>
            </div>
          </ProseSection>

          {/* El Problema */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.problem.title}</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <h3 className="text-2xl font-semibold text-[#F2F2F2] mt-6 mb-4">{t.problem.businessImpact}</h3>
              <p className="mb-4">{t.problem.impactText}</p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {(t.problem.impactItems || []).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="text-2xl font-semibold text-[#F2F2F2] mt-8 mb-4">Hipótesis inicial vs. realidad</h3>
              <blockquote className="text-[#F1F1F1] italic border-l-4 border-red-500 pl-4 mb-6">
                Hipótesis del CEO: {t.problem.hypothesis}
              </blockquote>
              <p className="text-[#F2F2F2] font-semibold mb-4">{t.problem.criticalQuestion}</p>

              <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20 mt-6">
                <h4 className="font-semibold text-[#F2F2F2] mb-2">{t.problem.scopeTitle}</h4>
                <p className="text-[#F1F1F1] text-sm">{t.problem.scopeText}</p>
              </div>
            </div>
          </ProseSection>

          {/* Screenshot del MVP */}
          <ImageBreakout
            src="/vista-fragmentada-del-mvp-de-d-gito-mostrando-inte.jpg"
            alt="Screenshot del MVP actual - Vista fragmentada"
            width={1200}
            height={800}
            border={false}
          />

          {/* Research: Métodos */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.research.title}</h2>
            <p className="text-[#F1F1F1] mb-6">{t.research.subtitle}</p>
            <h3 className="text-2xl font-bold text-[#F2F2F2] mb-4">{t.research.methodsTitle}</h3>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed space-y-6">
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">{t.research.deskResearch.title}</h4>
                <p className="mb-2">{t.research.deskResearch.text}</p>
                <p className="text-sm mb-2">{t.research.deskResearch.theory}</p>
                <p className="text-sm">{t.research.deskResearch.benchmark}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">{t.research.interviews.title}</h4>
                <p className="mb-2">{t.research.interviews.profiles}</p>
                <p>{t.research.interviews.objective}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">{t.research.audit.title}</h4>
                <p>{t.research.audit.text}</p>
              </div>
            </div>
          </ProseSection>

          {/* Customer Journey */}
          <ImageBreakout
            src="/customer-journey-diagram-mostrando-flujo-actual-de.jpg"
            alt="Customer Journey - Flujo actual del usuario"
            width={1200}
            height={800}
            border={false}
          />

          {/* Quotes de usuarios */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.research.quotesTitle}</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed space-y-4">
              <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20">
                <p className="text-[#F1F1F1] italic mb-2">{t.research.quotes.perception.label}</p>
                <p className="text-[#F2F2F2]">{t.research.quotes.perception.text}</p>
              </div>
              <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20">
                <p className="text-[#F1F1F1] italic mb-2">{t.research.quotes.postponement.label}</p>
                <p className="text-[#F2F2F2] mb-2">{t.research.quotes.postponement.text1}</p>
                <p className="text-[#F2F2F2]">{t.research.quotes.postponement.text2}</p>
              </div>
              <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20">
                <p className="text-[#F1F1F1] italic mb-2">{t.research.quotes.friction.label}</p>
                <p className="text-[#F2F2F2]">{t.research.quotes.friction.text}</p>
              </div>
              <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20">
                <p className="text-[#F1F1F1] italic mb-2">{t.research.quotes.dependencies.label}</p>
                <p className="text-[#F2F2F2]">{t.research.quotes.dependencies.text}</p>
              </div>
            </div>
          </ProseSection>

          {/* Insight Emergente */}
          <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12 mb-16">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-blue-400/30">
              <h3 className="text-2xl font-bold text-[#F2F2F2] mb-4">{t.insight.title}</h3>
              <p className="text-xl text-[#F2F2F2] mb-6">{t.insight.mainText}</p>
              <p className="text-[#F1F1F1] leading-relaxed mb-6">{t.insight.explanation}</p>
              <div className="mt-8 pt-6 border-t border-[#F2F2F2]/20">
                <p className="text-[#F2F2F2] font-semibold mb-2">{t.insight.pivotTitle}</p>
                <p className="text-[#F1F1F1] mb-2">{t.insight.pivotFrom}</p>
                <p className="text-[#F2F2F2] text-lg">{t.insight.pivotTo}</p>
              </div>
            </div>
          </div>

          {/* Tabla comparativa */}
          <ImageBreakout
            src="/tabla-comparativa-de-desk-research--entrevistas-y-.jpg"
            alt="Tabla comparativa - Desk Research + Entrevistas + Auditoría"
            width={1200}
            height={800}
            border={false}
          />

          {/* Estrategia */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.strategy.title}</h2>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed">
              <p className="mb-4">{t.strategy.text}</p>
              <h4 className="text-lg font-semibold text-[#F2F2F2] mt-6 mb-2">{t.strategy.alternativeTitle}</h4>
              <p className="mb-4">{t.strategy.alternativeText}</p>
              <p className="text-[#F2F2F2] font-semibold mb-2">{t.strategy.discardedTitle}</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                {(t.strategy.discardedReasons || []).map((reason: string, index: number) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
              <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-green-400/30 mt-4">
                <p className="text-[#F2F2F2]">{t.strategy.conclusion}</p>
              </div>
              <h4 className="text-lg font-semibold text-[#F2F2F2] mt-6 mb-2">{t.strategy.scopeTitle}</h4>
              <p className="mb-4">{t.strategy.scopeText1}</p>
              <h4 className="text-lg font-semibold text-[#F2F2F2] mb-2">{t.strategy.ourDecision}</h4>
              <p className="mb-4">{t.strategy.ourDecisionText}</p>
              <h4 className="text-lg font-semibold text-[#F2F2F2] mt-4 mb-2">{t.strategy.thisAllowed}</h4>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                {(t.strategy.thisAllowedItems || []).map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="text-[#F2F2F2] font-semibold mt-4 mb-2">{t.strategy.whyNotJustScope}</p>
              <p>{t.strategy.whyNotJustScopeText}</p>
            </div>
          </ProseSection>

          {/* Principios que guiaron las decisiones */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.principles.title}</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20">
                <p className="text-[#F2F2F2] font-semibold mb-2">{t.principles.items.relevance.title}</p>
                <p className="text-[#F1F1F1] text-sm">{t.principles.items.relevance.text}</p>
              </div>
              <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20">
                <p className="text-[#F2F2F2] font-semibold mb-2">{t.principles.items.userImpact.title}</p>
                <p className="text-[#F1F1F1] text-sm">{t.principles.items.userImpact.text}</p>
              </div>
              <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20">
                <p className="text-[#F2F2F2] font-semibold mb-2">{t.principles.items.differentiation.title}</p>
                <p className="text-[#F1F1F1] text-sm">{t.principles.items.differentiation.text}</p>
              </div>
              <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20">
                <p className="text-[#F2F2F2] font-semibold mb-2">{t.principles.items.technicalViability.title}</p>
                <p className="text-[#F1F1F1] text-sm">{t.principles.items.technicalViability.text}</p>
              </div>
              <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20 md:col-span-2">
                <p className="text-[#F2F2F2] font-semibold mb-2">{t.principles.items.scalability.title}</p>
                <p className="text-[#F1F1F1] text-sm">{t.principles.items.scalability.text}</p>
              </div>
            </div>
            <p className="text-xl text-[#F2F2F2] font-semibold text-center">{t.principles.guidingPrinciple}</p>
          </ProseSection>

          {/* Insights y decisiones de diseño: 5 fricciones críticas */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.frictions.title}</h2>
            <p className="text-[#F1F1F1] mb-8">{t.frictions.subtitle}</p>

            {/* Fricción 1 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#F2F2F2]">{t.frictions.friction1.number}</span>
                <h3 className="text-2xl font-bold text-[#F2F2F2]">{t.frictions.friction1.title}</h3>
              </div>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed space-y-3">
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Dolor:" : "Pain:"}</h4>
                  <p>{t.frictions.friction1.pain}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Decisión:" : "Decision:"}</h4>
                  <p className="text-[#F2F2F2]">{t.frictions.friction1.decision}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">
                    {lang === "es" ? "Por qué funciona:" : "Why it works:"}
                  </h4>
                  <p>{t.frictions.friction1.whyWorks}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">
                    {lang === "es" ? "Se tradujo en UI como:" : "Translated to UI as:"}
                  </h4>
                  <p>{t.frictions.friction1.translatedTo}</p>
                </div>
              </div>
            </div>

            {/* Fricción 2 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#F2F2F2]">{t.frictions.friction2.number}</span>
                <h3 className="text-2xl font-bold text-[#F2F2F2]">{t.frictions.friction2.title}</h3>
              </div>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed space-y-3">
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Dolor:" : "Pain:"}</h4>
                  <p>{t.frictions.friction2.pain}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Decisión:" : "Decision:"}</h4>
                  <p className="text-[#F2F2F2]">{t.frictions.friction2.decision}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">
                    {lang === "es" ? "Por qué funciona:" : "Why it works:"}
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {(Array.isArray(t.frictions.friction2.whyWorks)
                      ? t.frictions.friction2.whyWorks
                      : [t.frictions.friction2.whyWorks]
                    ).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">
                    {lang === "es" ? "Se tradujo en UI como:" : "Translated to UI as:"}
                  </h4>
                  <p>{t.frictions.friction2.translatedTo}</p>
                </div>
              </div>
            </div>

            {/* Fricción 3 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#F2F2F2]">{t.frictions.friction3.number}</span>
                <h3 className="text-2xl font-bold text-[#F2F2F2]">{t.frictions.friction3.title}</h3>
              </div>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed space-y-3">
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Dolor:" : "Pain:"}</h4>
                  <p className="italic">{t.frictions.friction3.pain}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Decisión:" : "Decision:"}</h4>
                  <p className="text-[#F2F2F2]">{t.frictions.friction3.decision}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">
                    {lang === "es" ? "Por qué funciona:" : "Why it works:"}
                  </h4>
                  <p>{t.frictions.friction3.whyWorks}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">
                    {lang === "es" ? "Se tradujo en UI como:" : "Translated to UI as:"}
                  </h4>
                  <p>{t.frictions.friction3.translatedTo}</p>
                </div>
              </div>
            </div>

            {/* Fricción 4 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#F2F2F2]">{t.frictions.friction4.number}</span>
                <h3 className="text-2xl font-bold text-[#F2F2F2]">{t.frictions.friction4.title}</h3>
              </div>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed space-y-3">
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Dolor:" : "Pain:"}</h4>
                  <p className="italic">{t.frictions.friction4.pain}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Decisión:" : "Decision:"}</h4>
                  <p className="text-[#F2F2F2]">{t.frictions.friction4.decision}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">
                    {lang === "es" ? "Por qué funciona:" : "Why it works:"}
                  </h4>
                  <p>{t.frictions.friction4.whyWorks}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">
                    {lang === "es" ? "Se tradujo en UI como:" : "Translated to UI as:"}
                  </h4>
                  <p>{t.frictions.friction4.translatedTo}</p>
                </div>
              </div>
            </div>

            {/* Fricción 5 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#F2F2F2]">{t.frictions.friction5.number}</span>
                <h3 className="text-2xl font-bold text-[#F2F2F2]">{t.frictions.friction5.title}</h3>
              </div>
              <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed space-y-3">
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Dolor:" : "Pain:"}</h4>
                  <p className="italic">{t.frictions.friction5.pain}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Decisión:" : "Decision:"}</h4>
                  <p className="text-[#F2F2F2]">{t.frictions.friction5.decision}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">
                    {lang === "es" ? "Por qué funciona:" : "Why it works:"}
                  </h4>
                  <p>{t.frictions.friction5.whyWorks}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-2">
                    {lang === "es" ? "Se tradujo en UI como:" : "Translated to UI as:"}
                  </h4>
                  <p>{t.frictions.friction5.translatedTo}</p>
                </div>
              </div>
            </div>
          </ProseSection>

          {/* Cards interactivas de insights */}
          <ImageBreakout
            src="/cards-interactivas-mostrando-insight---decisi-n---.jpg"
            alt="Cards interactivas - Insight → Decisión → UI"
            width={1200}
            height={800}
            border={false}
          />

          {/* Arquitectura, flujos y UI */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.architecture.title}</h2>
            <p className="text-[#F1F1F1] mb-8">{t.architecture.subtitle}</p>
          </ProseSection>

          {/* Diagrama de arquitectura */}
          <ImageBreakout
            src="/diagrama-de-arquitectura-mostrando-tres-ejes--estr.jpg"
            alt="Diagrama de arquitectura - Tres ejes"
            width={1200}
            height={800}
            border={false}
          />

          {/* Panel Operativo Unificado */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.architecture.unifiedPanel.title}</h2>
            <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30 mb-4">
              <p className="text-[#F2F2F2] font-semibold">{t.architecture.unifiedPanel.axis}</p>
            </div>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed space-y-4">
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">
                  {lang === "es" ? "Problema detectado:" : "Detected problem:"}
                </h4>
                <p>{t.architecture.unifiedPanel.problem}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Solución:" : "Solution:"}</h4>
                <p>{t.architecture.unifiedPanel.solution}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Componentes:" : "Components:"}</h4>
                <ul className="list-disc pl-5 space-y-2">
                  {(t.architecture.unifiedPanel.components || []).map((component: string, index: number) => (
                    <li key={index}>
                      <span className="text-[#F2F2F2]">{component.split(":")[0]}:</span>
                      {component.split(":")[1]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-green-400/30">
                <h4 className="font-semibold text-[#F2F2F2] mb-2">{t.architecture.unifiedPanel.syncTitle}</h4>
                <p className="text-[#F1F1F1] text-sm">{t.architecture.unifiedPanel.syncText}</p>
              </div>
            </div>
          </ProseSection>

          <ImageBreakout
            src="/panel-unificado-con-tabs-kanban--gantt-y-calendari.jpg"
            alt="Mockup - Panel unificado con tabs Kanban/Gantt/Calendario"
            width={1200}
            height={800}
            border={false}
            shadow={true}
          />

          {/* Automatización Ligera */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.architecture.automation.title}</h2>
            <div className="bg-green-500/10 backdrop-blur-sm rounded-lg p-4 border border-green-400/30 mb-4">
              <p className="text-[#F2F2F2] font-semibold">{t.architecture.automation.axis}</p>
            </div>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed space-y-4">
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">
                  {lang === "es" ? "Problema detectado:" : "Detected problem:"}
                </h4>
                <p>{t.architecture.automation.problem}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Solución:" : "Solution:"}</h4>
                <p>{t.architecture.automation.solution}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">
                  {lang === "es" ? "Funcionalidades principales:" : "Main features:"}
                </h4>
                <ul className="list-disc pl-5 space-y-2">
                  {(t.architecture.automation.features || []).map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ProseSection>

          <ImageBreakout
            src="/fab-con-sugerencias-contextuales--duplicar-d-a-ant.jpg"
            alt="Mockup - FAB con sugerencias contextuales"
            width={1200}
            height={800}
            border={false}
            shadow={true}
          />

          {/* Capa Social y Transparencia */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.architecture.social.title}</h2>
            <div className="bg-purple-500/10 backdrop-blur-sm rounded-lg p-4 border border-purple-400/30 mb-4">
              <p className="text-[#F2F2F2] font-semibold">{t.architecture.social.axis}</p>
            </div>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed space-y-4">
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">
                  {lang === "es" ? "Problema detectado:" : "Detected problem:"}
                </h4>
                <p>{t.architecture.social.problem}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Solución:" : "Solution:"}</h4>
                <p className="mb-2">{t.architecture.social.solution}</p>
                <ul className="list-disc pl-5 space-y-2">
                  {(t.architecture.social.solutionItems || []).map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20">
                <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Resultado:" : "Result:"}</h4>
                <p className="text-[#F1F1F1] text-sm">{t.architecture.social.result}</p>
              </div>
            </div>
          </ProseSection>

          <ImageBreakout
            src="/dashboard-con-indicadores-de-progreso-social-y-se-.jpg"
            alt="Mockup - Dashboard con indicadores de progreso"
            width={1200}
            height={800}
            border={false}
            shadow={true}
          />

          {/* Dashboard Refinado */}
          <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12 mb-16">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-blue-400/30">
              <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.architecture.dashboard.title}</h2>
              <p className="text-[#F1F1F1] mb-4">{t.architecture.dashboard.subtitle}</p>
              <p className="text-[#F1F1F1] mb-6">{t.architecture.dashboard.text}</p>
              <h4 className="text-lg font-semibold text-[#F2F2F2] mb-3">{lang === "es" ? "Incluye:" : "Includes:"}</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {(t.architecture.dashboard.includes || []).map((item: string, index: number) => (
                  <div
                    key={index}
                    className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20"
                  >
                    <p className="text-[#F2F2F2]">• {item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dashboard completo */}
          <ImageBreakout
            src="/dashboard-completo-mostrando-tareas--reuniones--pr.jpg"
            alt="Mockup - Dashboard completo"
            width={1200}
            height={800}
            border={false}
          />

          {/* Testing: validación con usuarios reales */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.testing.title}</h2>
            <p className="text-[#F1F1F1] mb-8">{t.testing.subtitle}</p>
            <div className="prose prose-invert max-w-none text-[#F1F1F1] leading-relaxed space-y-4">
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">
                  {lang === "es" ? "Participantes:" : "Participants:"}
                </h4>
                <p>{t.testing.participants}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Método:" : "Method:"}</h4>
                <p>{t.testing.method}</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">{lang === "es" ? "Objetivo:" : "Objective:"}</h4>
                <p>{t.testing.objective}</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#F2F2F2] mt-8 mb-4">{t.testing.frictionsTitle}</h3>
            <div className="space-y-4">
              <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-4 border border-red-400/30">
                <h4 className="font-semibold text-[#F2F2F2] mb-2">{t.testing.friction1.title}</h4>
                <p className="text-[#F1F1F1] text-sm">{t.testing.friction1.text}</p>
              </div>
              <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-4 border border-red-400/30">
                <h4 className="font-semibold text-[#F2F2F2] mb-2">{t.testing.friction2.title}</h4>
                <p className="text-[#F1F1F1] text-sm">{t.testing.friction2.text}</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#F2F2F2] mt-8 mb-4">{t.testing.iterationsTitle}</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-3">{t.testing.iteration1.title}</h4>
                <div className="space-y-2">
                  <p className="text-[#F1F1F1] text-sm font-semibold">{lang === "es" ? "Ajustes:" : "Adjustments:"}</p>
                  <ul className="list-disc pl-5 text-[#F1F1F1] text-sm space-y-1">
                    {(t.testing.iteration1.adjustments || []).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-[#F2F2F2] text-sm font-semibold mt-2">
                    {lang === "es" ? "Resultado:" : "Result:"}
                  </p>
                  <p className="text-[#F1F1F1] text-sm">{t.testing.iteration1.result}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[#F2F2F2] mb-3">{t.testing.iteration2.title}</h4>
                <div className="space-y-2">
                  <p className="text-[#F1F1F1] text-sm font-semibold">{lang === "es" ? "Ajustes:" : "Adjustments:"}</p>
                  <ul className="list-disc pl-5 text-[#F1F1F1] text-sm space-y-1">
                    {(t.testing.iteration2.adjustments || []).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-[#F2F2F2] text-sm font-semibold mt-2">
                    {lang === "es" ? "Aprendizaje:" : "Learning:"}
                  </p>
                  <p className="text-[#F1F1F1] text-sm">{t.testing.iteration2.learning}</p>
                </div>
              </div>
            </div>
          </ProseSection>

          {/* Imágenes de antes/después del testing */}
          <ImageBreakout
            src="/antes-despu-s-del-dashboard-iterado-mostrando-reor.jpg"
            alt="Antes/Después - Dashboard iterado"
            width={1200}
            height={800}
            border={false}
          />

          <ImageBreakout
            src="/antes-despu-s-tooltips-y-se-ales-contextuales-most.jpg"
            alt="Antes/Después - Tooltips y señales contextuales"
            width={1200}
            height={800}
            border={false}
          />

          {/* Resultados, aprendizajes y próximos pasos */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.results.title}</h2>
            <h3 className="text-2xl font-bold text-[#F2F2F2] mb-4">{t.results.qualitative.title}</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-4 border border-red-400/30">
                <p className="text-[#F1F1F1] text-sm mb-2">{t.results.qualitative.before}</p>
                <p className="text-[#F2F2F2] italic">{t.results.qualitative.beforeQuote}</p>
              </div>
              <div className="bg-green-500/10 backdrop-blur-sm rounded-lg p-4 border border-green-400/30">
                <p className="text-[#F1F1F1] text-sm mb-2">{t.results.qualitative.after}</p>
                <p className="text-[#F2F2F2] italic">{t.results.qualitative.afterQuote}</p>
              </div>
            </div>
            <p className="text-[#F2F2F2] font-semibold text-lg mb-2">{t.results.qualitative.impact}</p>
            <p className="text-[#F1F1F1]">{t.results.qualitative.impactText}</p>

            <h3 className="text-2xl font-bold text-[#F2F2F2] mt-8 mb-4">{t.results.learnings.title}</h3>
            <h4 className="text-lg font-semibold text-[#F2F2F2] mb-2">{t.results.learnings.subtitle}</h4>
            <p className="mb-4 text-[#F1F1F1]">{t.results.learnings.text1}</p>
            <p className="mb-4 text-[#F1F1F1]">{t.results.learnings.text2}</p>
            <div className="bg-yellow-500/10 backdrop-blur-sm rounded-lg p-4 border border-yellow-400/30 mb-4">
              <p className="text-[#F2F2F2] font-semibold mb-2">{lang === "es" ? "Aprendizaje:" : "Learning:"}</p>
              <p className="text-[#F1F1F1] text-sm">{t.results.learnings.learning}</p>
            </div>
            <p className="text-[#F1F1F1]">{t.results.learnings.text3}</p>
          </ProseSection>

          {/* Cómo evolucionaría hacia IA */}
          <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12 mb-16">
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purple-400/30">
              <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.results.aiEvolution.title}</h2>
              <p className="text-[#F1F1F1] mb-6">{t.results.aiEvolution.text}</p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-3">{t.results.aiEvolution.componentsTitle}</h4>
                  <ul className="list-disc pl-5 text-[#F1F1F1] space-y-2 text-sm">
                    {(t.results.aiEvolution.components || []).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#F2F2F2] mb-3">{t.results.aiEvolution.benefitsTitle}</h4>
                  <ul className="list-disc pl-5 text-[#F1F1F1] space-y-2 text-sm">
                    {(t.results.aiEvolution.benefits || []).map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20">
                <p className="text-[#F2F2F2] text-sm">{t.results.aiEvolution.note}</p>
              </div>
            </div>
          </div>

          {/* Próximos pasos estratégicos */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-8">{t.results.nextSteps.title}</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#F2F2F2] mb-4">{t.results.nextSteps.onboarding.title}</h3>
                <p className="mb-4 text-[#F1F1F1]">{t.results.nextSteps.onboarding.text}</p>
                <h4 className="font-semibold text-[#F2F2F2] mb-2">{t.results.nextSteps.onboarding.flows}</h4>
                <ul className="list-disc pl-5 text-[#F1F1F1] space-y-2 text-sm mb-4">
                  {(t.results.nextSteps.onboarding.flowItems || []).map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="text-[#F1F1F1] text-sm mb-4">{t.results.nextSteps.onboarding.note}</p>
                <div className="bg-green-500/10 backdrop-blur-sm rounded-lg p-4 border border-green-400/30">
                  <p className="text-[#F2F2F2] font-semibold mb-2">{t.results.nextSteps.onboarding.impact}</p>
                  <p className="text-[#F1F1F1] text-sm">{t.results.nextSteps.onboarding.impactText}</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#F2F2F2] mb-4">{t.results.nextSteps.mobile.title}</h3>
                <p className="mb-4 text-[#F1F1F1]">{t.results.nextSteps.mobile.text1}</p>
                <p className="mb-4 text-[#F1F1F1]">{t.results.nextSteps.mobile.text2}</p>
                <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30">
                  <p className="text-[#F2F2F2] text-sm">{t.results.nextSteps.mobile.note}</p>
                </div>
              </div>
            </div>
          </ProseSection>

          {/* Principios que guían la Fase 2 */}
          <ProseSection className="mb-16">
            <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6">{t.results.phase2Principles.title}</h2>
            <div className="space-y-4">
              {(t.results.phase2Principles.items || []).map((item: { title: string; text: string }, index: number) => (
                <div key={index} className="bg-[#F2F2F2]/10 backdrop-blur-sm rounded-lg p-4 border border-[#F2F2F2]/20">
                  <p className="text-[#F2F2F2] font-semibold mb-2">{item.title}</p>
                  <p className="text-[#F1F1F1] text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </ProseSection>

          {/* Cierre */}
          <div className="w-full lg:w-3/5 lg:mx-auto px-4 md:px-6 lg:px-12 mb-16">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-blue-400/30">
              <h2 className="text-3xl font-bold text-[#F2F2F2] mb-6 text-center">{t.results.closing.title}</h2>
              <div className="space-y-6 text-center max-w-3xl mx-auto">
                <p className="text-xl text-[#F1F1F1] leading-relaxed">{t.results.closing.text1}</p>
                <p className="text-xl text-[#F1F1F1] leading-relaxed">{t.results.closing.text2}</p>
                <p className="text-2xl text-[#F2F2F2] font-bold mt-8">{t.results.closing.highlight}</p>
              </div>
            </div>
          </div>
        </CaseStudyLayout>
      </main>
      <Footer dict={dict} lang={lang} />
      <ScrollToTop size={48} />
    </div>
  )
}
