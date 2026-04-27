# **Version B** **MANIJAPP**

## **Descubrir eventos no es el problema. El problema es saber cuáles valen la pena.**

**MVP independiente para discovery de eventos alternativos en CABA y La Plata, con validación comunitaria visible y geolocalización.**

**\*** [• Ir a Manijapp ↗](https://manijapp.vercel.app/)  **\*** 

\[ Banner Manijapp \] 

**Tipo · MVP independiente, validación en producción**  
 **Rol · Product Designer — estrategia, UX/UI, discovery, métricas**  
**Timeline · 3 semanas**  
**Stack · React, Cursor, Vercel, GA4, Clarity, Supabase**  
**Estado · Validación activa.** 

---

## **TL;DR**

**Problema. Los eventos independientes en CABA y La Plata no tienen una fuente centralizada confiable. El discovery ocurre de forma fragmentada: Instagram, WhatsApp, boca a boca.**

**Insight. El problema no es encontrar más eventos, sino identificar cuáles valen la pena. La fricción está en la curaduría y la confianza, no en la disponibilidad.**

**Solución. Plataforma de discovery con validación comunitaria visible, geolocalización y foco en eventos fuera del circuito tradicional.**

**Resultados. Señales tempranas de retención sostenidas en múltiples días, comportamiento real en todo el core loop (exploración, validación, compartir, publicación) y primeros casos de supply sin pedido explícito.**

---

## **El problema**

**Los fines de semana en La Plata y CABA, la pregunta "¿qué hay para hacer?" se resuelve mal. Eventbrite tiene los eventos masivos. CulturaBA tiene la agenda oficial. Instagram tiene todo mezclado.**

**El show underground en un espacio alternativo, la fiesta que solo circula por WhatsApp, el evento en un bar nuevo sin visibilidad — no aparecen en ninguna plataforma.**

**La hipótesis inicial era simple: centralizar eventos cerca tuyo. Eso cambió en el primer ciclo de discovery.**

### **El insight que lo redefine**

**Con el prototipo en producción, la validación arrancó el mismo día. Cinco sesiones de guerrilla research. Tres de ellos llegaron a la misma conclusión sin que nadie se las sugiriera: el diferencial no son todos los eventos, son los que no están en ningún otro lado.** 

**No querían otro Eventbrite. Querían acceso a lo que existe cerca pero está invisible, verificado, que hoy solo circula por WhatsApp.**

**Eso redefine el producto. No es un problema de volumen. Es un problema de curaduría y confianza.**

\[ Mockup de sección Explorar y mockup de Mapa \] 

---

## **Cómo se construyó: metodología antes que stack**

### **Construir antes que research**

**El primer trade-off fue explícito: esperar a tener mayor claridad conceptual o salir a producción con un sistema incompleto.**

**La decisión fue lanzar. No por velocidad en sí misma, sino porque una interfaz genera un tipo de señal que ningún research previo puede reemplazar. Cinco conversaciones reales en 48 horas aportan más que cualquier encuesta por email.**

### **El costo de saltear la especificación**

**Sin un brief previo, la IA tomó miles de micro-decisiones que nunca pedí: copy que no comunicaba, jerarquía visual sin lógica, estados indefinidos. El costo no era solo eficiencia — era metodología. Si la UX tiene ruido de defaults del generador, los testers reaccionan a decisiones que nunca tomaste. Los datos quedan contaminados antes de empezar.**

\[ Sistema de validación antes: estrellas y recomendación mezcladas, señal ambigua \] Antes — estrellas y recomendación mezcladas. Señal ambigua. 

\[ Sistema de validación después: estrellas para venue, pulgares para evento, tracking diferenciado \]   
Después — sistemas separados. Tracking diferenciado por origen (card vs detalle). 

### **Spec-Driven Development**

**La corrección no fue técnica, sino de proceso. Sin una especificación clara, la IA completa los vacíos y define el producto en lugar del diseñador.**

**El paso a un enfoque spec-driven introduce una diferencia clave: permite dirigir al agente en lugar de dejar que el agente dirija. Sin esa capa de control, la velocidad de ejecución amplifica el error y aumenta la superficie de corrección. Ese costo temprano no desaparece; se transforma en deuda técnica.**

---

## **Del Concierge al backend**

### **Contexto**

**Un solo criterio rigió cada decisión técnica del proyecto: no construir infraestructura antes de tener evidencia que la justifique.**

**El formulario de publicación existía desde el día uno. Los eventos que subían los organizadores llegaban a un Google Sheet y la publicación la hacía yo manualmente — era el flujo del lado oferta.**

**Los eventos que yo cargaba manualmente (flyers de Instagram, contactos directos) pasaban por asistencia de IA para extraer datos, pero con reglas documentadas, tabla de venues fijos y criterios de geocodificación para validar cada campo de manera sistematizada. La IA aceleraba la extracción pero cada dato requería revisión antes de publicar.**

**El organizador percibía que el flujo funcionaba.**

\[ Flujo Wizard of Oz: Form → Google Sheet → publicación manual → Mail \] 

*Flujo de carga: el organizador percibe que la publicación existe. El backend espera evidencia real de demanda.* 

\[ Flujo Ingesta de eventos: Parseo → IA → Event\_spec.md→ Array → Ajustes manuales \] 

### **Trigger y decisión**

**La misma lógica definió cuándo sumar Supabase. Durante las primeras semanas, los contadores de pulgares eran valores simulados — suficientes para validar si alguien tocaba los botones, no para medir comportamiento real. El trigger fue concreto: aparecieron eventos de organizadores reales. En ese momento los datos simulados dejaron de ser neutrales. Los números afectaban la credibilidad. Necesitaba persistencia real.**

### **Aprendizaje**

**Empecé sin backend para no escalar infraestructura sin validación. El problema: el costo de mantener todo manual fue mayor que el costo de construir persistencia temprana. La regla metodológica era correcta, pero el trade-off cambió — el costo tiende a cero.**

**La dependencia era triple: el interés dependía de la curaduría, la tracción dependía de la distribución, y ambas dependían de mi energía. Eso es sostenible para validar. No es sostenible en el tiempo.**

---

## **Benchmarking y definición del diferencial** 

### **Jodify**

El benchmark competitivo más útil tampoco vino de research — vino de cargar eventos. Jodify apareció en redes mientras operaba el catálogo. El análisis fue desde adentro: contacto directo posando como productora. Jodify opera como canal B2B con gatekeeping humano — llamada de onboarding, 10% de comisión, posicionamiento pago. El contraste con Manijapp es estructural: Jodify valida antes de publicar, Manijapp valida después vía comunidad. Son apuestas distintas sobre cómo se construye confianza. 

\[ Fiesta electrónica underground en Buenos Aires: DJ mezclando en vinilo y digital frente a una pista densa, con luces rojas y azules entre humo y ambiente cinematográfico. \] 

### **El naming: cuando la evidencia no es conclusiva**

Después del primer ciclo aparecieron dos señales contradictorias sobre el nombre. Una persona con contexto de marketing lo validó. Otra con contexto de producto señaló que "manija" puede evocar segunda marca — nombres que priorizan lo fonético sobre lo aspiracional — y que eso podía bajarle el precio al producto.

La decisión fue no cambiar. No porque una señal pesara más que la otra, sino porque no hay dato de que el nombre frene el uso o genere rechazo en el segmento target. Una opinión bien fundamentada no es evidencia de comportamiento. El trigger para revisarlo está definido: si el reposicionamiento hacia un segmento con mayor capacidad de pago avanza, el naming entra a revisión como parte del sistema de identidad. No antes.

---

## **Validación: tres ciclos, decisiones encadenadas**

**La tabla primero:**

| Métrica | Ciclo 2 | Ciclo 3 |
| ----- | ----- | ----- |
| **Usuarios activos (GA4)** | **89** | **32** |
| **Pages / sesión** | **2.45** | **4.02** |
| **Scroll depth** | **63.7%** | **78.4%** |
| **Active time** | **57s** | **1m 30s** |
| **Retención 7 días (cohorte)** | **7.9% (7/89)** | **| \~7.1% (2/28)**  |
| **Usuarios returning (GA4)** | **2** | **3** |
| **validation\_tap** | **13%** | **6.25%** |
| **event\_shared** | **5.2%** | **6.25%** |
| **event\_submitted** | **1** | **2** |

### **Ciclo 1 · Primera señal, metodología contaminada**

**17 contactos activados, 5 sesiones reales. Un usuario regresó tres veces sin intervención, lo que indicaba interés. Sin embargo, las variables del sistema cambiaban mientras se medía, lo que invalidaba la señal.**

**La decisión fue aislar condiciones antes de continuar.**

**Este ciclo también expuso una inconsistencia: la validación comunitaria, definida como diferencial en el brief, no era visible en el scanning. La decisión de remover los indicadores de las cards había sido correcta a nivel visual, pero incorrecta a nivel estratégico. El brief funcionó como herramienta de corrección.**

### **Ciclo 2 · Señales tempranas confirmadas**

**Con variables controladas y un outreach rediseñado —más contextual y segmentado— comenzaron a aparecer patrones estables.**

**Se registraron entre 4 y 6 returning users diarios durante varios días sin contacto directo, superando el umbral definido. Además, apareció un evento publicado por un organizador sin intervención previa.**

**Ambas señales indicaban que el sistema empezaba a sostenerse por sí mismo.**

### **Ciclo 3 · Experimento de seeding y límite de red**

**El tercer ciclo introdujo un experimento de seeding. La interacción con validación fue mayor en ese contexto, pero la calidad de sesión mejoró cuando se redujo la intervención.**

**La retención se mantuvo estable, incluso con menor volumen y una red de distribución más distante. Esto sugiere que el producto no pierde valor; lo que se degrada es la eficiencia del canal.**

**El aprendizaje es claro: el outreach directo tiene retorno decreciente. Escalar no implica insistir en el mismo canal, sino cambiarlo. El siguiente paso es presencia en el ecosistema, no mayor volumen de mensajes.**

\[ Funnel de métricas reales en el core loop: sesiones, detalle de evento, interacción con pulgares, compartir, publicar \] 

---

## **Supply: no solo fricción, también incentivo**

La hipótesis inicial era que tener red directa en la escena independiente resolvía el lado oferta. Años como DJ daban acceso a promotores y organizadores — suficiente para arrancar el supply sin depender de que desconocidos publicaran solos.

La señal existe pero no es suficiente. Tres submissions en dos ciclos confirman que la hipótesis de red directa genera alguna tracción, pero está lejos de sostener un catálogo de 40 eventos por fin de semana. El acceso a la escena reduce la fricción del arranque; no reemplaza el incentivo estructural que hace que un organizador publique solo. 

La segunda hipótesis fue fricción. Eso también se rompe con dos señales convergentes. En research, una entrevistada lo dijo directo: "subir eventos no es hábito, es una tarea más."  
El rediseño del formulario reduce fricción para quien ya tiene intención, pero no genera esa intención.

La conclusión es estructural: sin audiencia, no hay incentivo para publicar.

Esto define la secuencia del producto. Primero se construye demanda. Luego se escala el supply. Sin una audiencia visible, no existe una propuesta de valor real para organizadores o venues.

Cuando esa masa crítica exista, la conversación cambia: deja de ser pedirle un favor a un organizador y pasa a ser ofrecerle acceso a una audiencia real. El modelo de negocio no se posterga; se secuencia.

---

## **Qué sigue**

**El ciclo 4 cambia el canal: de cold outreach digital a presencia en el ecosistema. Las stories de Instagram se formalizan como infraestructura de retención semanal — es la solución más barata disponible antes de construir cualquier feature de notificación.**

**Los avances pendientes tienen triggers, no fechas.**

**La decisión más importante no es qué construir. Es qué medir, con qué criterio, y cuándo la señal es suficiente para actuar.**

***Manijapp es un proyecto en curso — manijapp.vercel.app***