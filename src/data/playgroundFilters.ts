// ============================================================================
// FILTROS DEL PLAYGROUND
// ============================================================================

/**
 * filterOptions - Opciones de filtro para la sección Playground
 * 
 * Cada filtro tiene:
 * - label: Texto que se muestra en el botón de filtro
 * - value: Valor interno usado para filtrar los items
 * 
 * Los items del playground tienen un campo 'type' que debe coincidir
 * con el 'value' del filtro para ser mostrados cuando ese filtro está activo.
 * 
 * El filtro "all" muestra todos los items sin importar su tipo.
 */
export const filterOptions = [
  { label: "Todo", value: "all" },
  { label: "Motion", value: "motiongraphics" },
  { label: "Generativo", value: "generative" },
  { label: "IA Renders", value: "airenders" },
  { label: "Interactivo", value: "interactive" },
]
