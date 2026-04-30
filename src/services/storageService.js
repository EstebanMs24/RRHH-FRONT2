// ============================================================
//  STORAGE SERVICE  —  Servicio de almacenamiento
// ============================================================

const STORAGE_KEYS = {
  ASPIRANTES: "rrhh_aspirantes",
  VACANTES: "rrhh_vacantes",
  PROCESOS: "rrhh_procesos",
};

/**
 * Genera un ID único basado en timestamp
 */
export const generarId = () => Date.now();

/**
 * ASPIRANTES - Obtener todos los aspirantes
 */
export const obtenerAspirantes = () => {
  const datos = localStorage.getItem(STORAGE_KEYS.ASPIRANTES);
  return datos ? JSON.parse(datos) : [];
};

/**
 * ASPIRANTES - Guardar aspirantes
 */
export const guardarAspirantes = (aspirantes) => {
  localStorage.setItem(STORAGE_KEYS.ASPIRANTES, JSON.stringify(aspirantes));
};

/**
 * ASPIRANTES - Obtener un aspirante por ID
 */
export const obtenerAspirante = (id) => {
  const aspirantes = obtenerAspirantes();
  return aspirantes.find((a) => a.id === id);
};

/**
 * ASPIRANTES - Crear nuevo aspirante
 */
export const crearAspirante = (datos) => {
  const aspirantes = obtenerAspirantes();
  const nuevoAspirante = {
    id: generarId(),
    ...datos,
    fecha: new Date().toLocaleDateString("es-CO"),
    estado: "pendiente",
  };
  aspirantes.push(nuevoAspirante);
  guardarAspirantes(aspirantes);
  return nuevoAspirante;
};

/**
 * ASPIRANTES - Actualizar aspirante
 */
export const actualizarAspirante = (id, datos) => {
  const aspirantes = obtenerAspirantes();
  const indice = aspirantes.findIndex((a) => a.id === id);
  if (indice !== -1) {
    aspirantes[indice] = { ...aspirantes[indice], ...datos };
    guardarAspirantes(aspirantes);
    return aspirantes[indice];
  }
  return null;
};

/**
 * ASPIRANTES - Eliminar aspirante
 */
export const eliminarAspirante = (id) => {
  const aspirantes = obtenerAspirantes();
  const aspirantesActualizados = aspirantes.filter((a) => a.id !== id);
  guardarAspirantes(aspirantesActualizados);
  return aspirantesActualizados;
};

/**
 * VACANTES - Obtener todas las vacantes
 */
export const obtenerVacantes = () => {
  const datos = localStorage.getItem(STORAGE_KEYS.VACANTES);
  return datos ? JSON.parse(datos) : [];
};

/**
 * VACANTES - Guardar vacantes
 */
export const guardarVacantes = (vacantes) => {
  localStorage.setItem(STORAGE_KEYS.VACANTES, JSON.stringify(vacantes));
};

/**
 * PROCESOS - Obtener todos los procesos
 */
export const obtenerProcesos = () => {
  const datos = localStorage.getItem(STORAGE_KEYS.PROCESOS);
  return datos ? JSON.parse(datos) : [];
};

/**
 * PROCESOS - Guardar procesos
 */
export const guardarProcesos = (procesos) => {
  localStorage.setItem(STORAGE_KEYS.PROCESOS, JSON.stringify(procesos));
};
