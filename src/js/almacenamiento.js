// ============================================================
//  ALMACENAMIENTO.JS  —  SELECCIÓN RRHH CESDE
//
//  Este archivo contiene TODAS las funciones para guardar y
//  leer datos del localStorage. Los demás archivos JS usan
//  estas funciones en lugar de acceder directamente al localStorage.
//
//  ¿Qué es localStorage?
//    Es un espacio de almacenamiento del navegador donde podemos
//    guardar texto de forma permanente (sobrevive al cerrar la página).
//    Solo guarda texto (strings), por eso usamos JSON.stringify()
//    para convertir objetos a texto y JSON.parse() para devolverlos.
// ============================================================


// ----- CLAVES: nombres con los que se guarda cada lista -----
// Centralizar las claves evita errores de tipeo más adelante.
var CLAVE_VACANTES   = "rrhh_vacantes";
var CLAVE_ASPIRANTES = "rrhh_aspirantes";
var CLAVE_PROCESOS   = "rrhh_procesos";


// ============================================================
//  FUNCIONES DE VACANTES
// ============================================================

// Devuelve el array de vacantes guardadas.
// Si no hay nada guardado todavía, devuelve un array vacío [].
function obtenerVacantes() {
    var datos = localStorage.getItem(CLAVE_VACANTES);
    // Si 'datos' es null (no existe), devuelve []
    // Si existe, convierte el texto JSON a un array de objetos
    return datos ? JSON.parse(datos) : [];
}

// Recibe un array de vacantes y lo guarda en localStorage.
// JSON.stringify() convierte el array a texto para poder guardarlo.
function guardarVacantes(listaVacantes) {
    localStorage.setItem(CLAVE_VACANTES, JSON.stringify(listaVacantes));
}


// ============================================================
//  FUNCIONES DE ASPIRANTES
// ============================================================

function obtenerAspirantes() {
    var datos = localStorage.getItem(CLAVE_ASPIRANTES);
    return datos ? JSON.parse(datos) : [];
}

function guardarAspirantes(listaAspirantes) {
    localStorage.setItem(CLAVE_ASPIRANTES, JSON.stringify(listaAspirantes));
}


// ============================================================
//  FUNCIONES DE PROCESOS
// ============================================================

function obtenerProcesos() {
    var datos = localStorage.getItem(CLAVE_PROCESOS);
    return datos ? JSON.parse(datos) : [];
}

function guardarProcesos(listaProcesos) {
    localStorage.setItem(CLAVE_PROCESOS, JSON.stringify(listaProcesos));
}


// ============================================================
//  UTILIDAD: Generar un ID único
//
//  Date.now() devuelve el número de milisegundos transcurridos
//  desde el 1 de enero de 1970. Como el tiempo siempre avanza,
//  cada llamada produce un número diferente. Es un ID simple
//  y suficiente para un proyecto local.
//
//  Ejemplo: 1741693847321
// ============================================================
function generarId() {
    return Date.now();
}
