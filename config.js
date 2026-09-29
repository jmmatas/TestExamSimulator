// ══════════════════════════════════════════════════════════════
// ---- DEPRECATED FILE: storage.js ---- Codigo trasladado a script.js para centralizarlo.
// Minsait DIC - Exam Simulator — Fichero de configuración
// ══════════════════════════════════════════════════════════════

const CONFIG = {

  // ── APLICACIÓN / MARCA ───────────────────────────────────────
  app: {
    name:           "Test Exam Simulator",              // Nombre corto (logo, título de pestaña)
    title:          "CIS-DF Practice Quiz",     // Título grande en la home
    subtitle:       "CMDB &amp; CSDM · Certified Implementation Specialist – Data Foundations",
    aboutName:      "Test Exam Simulator",              // Nombre en la sección "Acerca de"
    aboutSubtitle:  "Simulador de examen para la certificación ServiceNow<br>Certified Implementation Specialist - Data Foundations",
    examLabel:      "CIS-DF",                   // Usado en el mensaje de resultados ("El examen X requiere...")
    version:        "8.0",
    // TODO: Eliminar //totalQuestions: 194,       // Mostrado en el badge del header
    storageKey:     "cisdf4",  // Clave de localStorage (cambia si quieres resetear todo al cambiar de examen)
  },

  // ── DOMINIOS DEL EXAMEN ──────────────────────────────────────
  // Estos valores deben coincidir EXACTAMENTE con el campo "domain"
  // usado en metadata.js para cada pregunta. Generan los botones de
  // filtro en Historial y las opciones del desplegable de la home.
  domains: [
    { value: "Configuration", label: "Configuration", icon: "⚙", cssClass: "domain-config" },
    { value: "Ingest",        label: "Ingest",        icon: "⇩", cssClass: "domain-ingest" },
    { value: "Govern",        label: "Govern",        icon: "⚖", cssClass: "domain-govern" },
    { value: "Insight",       label: "Insight",       icon: "◉", cssClass: "domain-insight" },
    { value: "CSDM",          label: "CSDM",          icon: "🏛", cssClass: "domain-csdm" },
  ],

  // ── QUIZ: valores por defecto en la pantalla de inicio ──────
  defaults: {
    questionCount: 20,         // Número de preguntas por defecto
    timerMinutes:  60,         // Tiempo por defecto en minutos (0 = sin límite)
    questionOrder: "smart",    // "smart" | "random" | "seq" | "wrong" | "flagged"
    optionOrder:   "original", // "original" | "random"
    mode:          "exam",     // "exam" | "practice"
  },

  // ── OPCIONES DE CONFIGURACIÓN (dropdowns) ───────────────────
  questionCounts: [
    { value: 10,    label: "10" },
    { value: 20,    label: "20" },
    { value: 40,    label: "40" },
    { value: 60,    label: "60" },
    { value: 75,    label: "75 (examen real)" },
    { value: "all", label: "Todas (194)" },
  ],
  timerOptions: [
    { value: 0,  label: "Sin límite" },
    { value: 10, label: "10 min" },
    { value: 20, label: "20 min" },
    { value: 30, label: "30 min" },
    { value: 60, label: "60 min" },
    { value: 90, label: "90 min (examen real)" },
  ],
  orderOptions: [
    { value: "smart",   label: "Inteligente (menos vistas)" },
    { value: "random",  label: "Aleatorio" },
    { value: "seq",     label: "Secuencial" },
    { value: "wrong",   label: "Solo falladas" },
    { value: "flagged", label: "Solo marcadas ⚑" },
  ],

  // ── PRESETS ─────────────────────────────────────────────────
  presets: [
    {
      id:    "cert",
      label: "🎓 Examen Real (75q · 90min)",
      style: "cert",           // clase CSS extra para el botón
      count: 75,
      timer: 90,
      order: "smart",
      mode:  "exam",
    },
    {
      id:    "practice20",
      label: "📚 Práctica rápida (20q)",
      style: "",
      count: 20,
      timer: 0,
      order: "smart",
      mode:  "practice",
    },
    {
      id:    "weakonly",
      label: "⚠ Solo débiles",
      style: "",
      count: 20,
      timer: 0,
      order: "wrong",
      mode:  "practice",
    }/* ,
    {
      id:    "weak-domain",
      label: "🎯 Practicar dominio más débil",
      style: "",
      count: 20,
      timer: 0,
      order: "weak-domain",
      mode:  "practice",
    }, */
  ],

  // ── UMBRALES DE PUNTUACIÓN ───────────────────────────────────
  scoring: {
    passPercent:      70,   // % mínimo para aprobar (examen real ~70%)
    excellentPercent: 80,   // % para mostrar "¡Excelente!"
    okPercent:        70,   // % para mostrar "¡Aprobado!"
    closePercent:     50,   // % para mostrar "Cerca, sigue"
    // Por debajo de closePercent → "Sigue practicando"
  },

  // ── HISTORIAL Y ESTADÍSTICAS ─────────────────────────────────
  history: {
    scoreHistoryMax:   50,  // Máximo de puntuaciones guardadas en historial
    recentScoresCount:  3,  // Cuántas puntuaciones recientes para calcular la media
    weakThreshold:     50,  // % por debajo del cual una pregunta se considera "débil"
  },

  // ── TEMPORIZADOR ─────────────────────────────────────────────
  timer: {
    warnPercent:    25,  // % de tiempo restante para aviso amarillo
    urgentPercent:  10,  // % de tiempo restante para aviso rojo
  },

  // ── ORDEN INTELIGENTE ────────────────────────────────────────
  smart: {
    // Si true, dentro del mismo número de vistas se priorizan las preguntas débiles
    prioritizeWeak: true,
    weakWeight:     2,   // Multiplicador de prioridad para preguntas con <50% aciertos
  },

  
  // ── ACERCA DE ────────────────────────────────────────────────
  about: {
    versions: [
      {
        version: "8",
        date:    "10 Julio 2026",
        current: true,
        notes: [
          "Cambios para que se pueda usar en cualquier certificación de ServiceNow, no solo CIS-DF",
          "- Renombrado el HTML a exam simulator.",
          "- Fichero HTML es independiente de la certificación.",
          "- Ahora toda la configuración (nombre cert, versión, etc) está en config.js.",
          "Otros cambios: ",
          "- Subido proyecto simulador de examen a GitHub público para que cualquiera de la compañía pueda usarlo y adaptarlo a su certificación.",
          "- Ya no será necesario enviar el simulador a los alumnos, podrán descargar la última versión directamente de GitHub.",
          "- HTML compartido en Github pages, accesible desde cualquier navegador sin necesidad de instalar nada.",
          "- Se podrá colaborar con mejoras y correcciones o añadidos mediante pull requests.",
          "- El fichero de preguntas questions.js es independiente de la certificación y puede ser modificado para adaptarlo a cualquier examen.",
          "- El fichero de preguntas no se sube a github para evitar posibles problemas con las empresas examinadoras.",
          "- Añadida opción Responsible, para visualizar el simulador correctamente desde tablets y móviles.", 
          "- ",
          "- "
        ],
      },{
        version: "7.1",
        date:    "23 Junio 2026",
        current: true,
        notes: [
          "Corregidos algunos errores tipográficos en enunciados y respuestas",
          "Rehechas las opciones de las preguntas D&D 25, 30, 46, 47, 74 a imagen del PDF",
          "Añadidas preguntas 193 y 194 del examen Jorge Alfonso, muchas gracias!",
        ],
      },{
        version: "7.0",
        date:    "19 Junio 2026",
        current: false,
        notes: [
          "Restauradas preguntas correctas de la v5, descartadas las de la v6 con explicaciones",
          "Añadidas correcciones de Diego y Antonio a las preguntas",
          "Ahora se muestra el Dominio de cada pregunta y se puede filtrar en examen y historial",
          "Ahora se muestra el número del orden de cada pregunta en la pantalla de revisión",
          "Eliminado el número de versión del nombre de fichero html y del fichero de preguntas",
          "Añadido fichero metadata.json con explicaciones y dominios de las preguntas",
          "Añadido fichero test-runner.html para testear funcionalmente la aplicación",
        ],
      },
      {
        version: "6.1",
        date:    "12 Junio 2026",
        current: false,
        notes: [
          "Corregido error que impedía hacer revisión del examen o prueba al finalizar; gracias Raúl!",
        ],
      },
      {
        version: "6.0",
        date:    "11 Junio 2026",
        current: false,
        notes: [
          "Nueva pantalla de fin de examen para confirmar y ver resumen añadida con Claude",
          "Añadidas 7 preguntas Drag & Drop. Ahora hay 192 preguntas; gracias Diego!",
          "Corregidas 7 preguntas que tenían mal la respuesta; gracias Diego y Antonio!",
          "Añadidas con Gemini explicaciones para las preguntas al resolverlas",
          "Opción de prueba rápida de 10 min",
        ],
      },
      {
        version: "5.0",
        date:    "9 Junio 2026",
        current: false,
        notes: [
          "Nuevo indicador y contador de rachas",
          "Los textos de preguntas aceptan saltos de línea",
          "Todos los textos de preguntas corregidos para añadir saltos de línea",
          "Corregidos 7 textos de respuestas con caracteres adicionales",
          "Corregida pregunta 27 que faltaban textos en las respuestas",
          "Corregida pregunta 120 que solo dejaba marcar una respuesta en vez de dos",
        ],
      },
      {
        version: "4.0",
        date:    "Junio 2026",
        current: false,
        notes: [
          "Preguntas actualizadas desde CSV depurado (19 correcciones de respuestas)",
          "Selectores visuales diferenciados: radio (○) para single, checkbox (☐) para multiselect",
          "Botón \"Siguiente\" para avanzar sin responder la pregunta actual",
          "Preguntas de tipo Drag & Drop con 7 nuevas preguntas interactivas",
          "Sección \"Acerca de\" con notas de versión y colaboradores",
          "185 preguntas totales (178 MCQ + 7 Drag & Drop)",
        ],
      },
      {
        version: "3.0",
        date:    "Junio 2026",
        current: false,
        notes: [
          "Navegación anterior/siguiente entre preguntas",
          "Panel lateral de preguntas marcadas accesible en cualquier momento",
          "Tiempo como cronómetro global del test (no por pregunta)",
          "Historial de preguntas con aciertos/fallos individuales",
          "Media de las últimas 3 puntuaciones en pantalla de inicio",
          "Fichero de preguntas externo (questions.js)",
          "Preset examen real: 75 preguntas, 90 minutos",
          "Orden inteligente: prioriza preguntas menos vistas",
          "Orden aleatorio de opciones de respuesta configurable",
        ],
      },
      {
        version: "2.0",
        date:    "Junio 2026",
        current: false,
        notes: [
          "Sistema de marcado de preguntas ⚑ para revisión posterior",
          "Banco de preguntas falladas persistente entre sesiones",
          "Revisión final con filtros (todas, correctas, falladas, marcadas)",
          "Estadísticas: mejor puntuación, tests realizados",
          "Soporte completo de preguntas multiselect",
        ],
      },
      {
        version: "1.0",
        date:    "Junio 2026",
        current: false,
        notes: [
          "Primera versión del simulador con 177 preguntas del PDF SecExams",
          "Modo Examen y Modo Práctica",
          "Configuración de número de preguntas y temporizador por pregunta",
          "Limpieza de artefactos del PDF y formateo de respuestas con pasos",
        ],
      },
    ],
  },
};