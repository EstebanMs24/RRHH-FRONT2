// ============================================================
//  VACANTES.JS  —  SELECCIÓN RRHH CESDE
//
//  Contiene toda la lógica relacionada con las vacantes:
//    - Registrar una nueva vacante
//    - Mostrar las vacantes en una tabla
//    - Eliminar una vacante
//
//  NOTA: Este archivo depende de almacenamiento.js, que debe
//  cargarse primero en el HTML (está en el <script> de arriba).
// ============================================================


// Cuando el navegador termina de cargar el HTML, mostramos la tabla.
// "DOMContentLoaded" significa "el documento HTML ya está listo".
document.addEventListener("DOMContentLoaded", function () {
    actualizarTablaVacantes();
});


// ============================================================
//  REGISTRAR UNA NUEVA VACANTE
// ============================================================
function registrarVacante() {

    // PASO 1: Leer los valores que el usuario escribió en el formulario.
    // .value  → obtiene el texto del campo
    // .trim() → elimina espacios al inicio y al final
    var titulo       = document.getElementById("titulo").value.trim();
    var departamento = document.getElementById("departamento").value.trim();
    var descripcion  = document.getElementById("descripcion").value.trim();
    var estado       = document.getElementById("estado").value;

    // PASO 2: Validar que los campos obligatorios no estén vacíos.
    // Si alguno está vacío, mostramos un error y salimos con 'return'.
    if (titulo === "" || departamento === "") {
        mostrarMensaje("Por favor completa los campos obligatorios (*).", "error");
        return; // ← detiene la función aquí
    }

    // PASO 3: Crear el objeto vacante con todos sus datos.
    // Un objeto en JS es como una ficha con propiedades (clave: valor).
    var nuevaVacante = {
        id:           generarId(),             // ID único (número grande)
        titulo:       titulo,
        departamento: departamento,
        descripcion:  descripcion,
        estado:       estado,
        fecha:        new Date().toLocaleDateString("es-CO") // fecha de hoy
    };

    // PASO 4: Obtener la lista actual de vacantes del localStorage,
    // agregar la nueva vacante al final del array con push(),
    // y volver a guardar la lista completa.
    var listaVacantes = obtenerVacantes();  // lee del localStorage
    listaVacantes.push(nuevaVacante);       // agrega al array
    guardarVacantes(listaVacantes);         // guarda en localStorage

    // PASO 5: Dar retroalimentación al usuario.
    mostrarMensaje("Vacante registrada exitosamente.", "exito");
    limpiarFormulario();           // borra los campos
    actualizarTablaVacantes();     // refresca la tabla
}


// ============================================================
//  ELIMINAR UNA VACANTE  (recibe el ID como parámetro)
// ============================================================
function eliminarVacante(id) {

    // Pedir confirmación antes de borrar (buena práctica)
    if (!confirm("¿Estás seguro de que deseas eliminar esta vacante?")) {
        return; // si el usuario dice "Cancelar", no hacemos nada
    }

    var listaVacantes = obtenerVacantes();

    // filter() crea un NUEVO array con los elementos que cumplen la condición.
    // Aquí nos quedamos con todas las vacantes EXCEPTO la que tiene el ID recibido.
    var listaActualizada = listaVacantes.filter(function (v) {
        return v.id !== id;
    });

    guardarVacantes(listaActualizada);     // guarda la lista sin la vacante eliminada
    mostrarMensaje("Vacante eliminada.", "exito");
    actualizarTablaVacantes();             // refresca la tabla
}


// ============================================================
//  CONSTRUIR Y MOSTRAR LA TABLA DE VACANTES
// ============================================================
function actualizarTablaVacantes() {

    var listaVacantes = obtenerVacantes();

    // Buscamos el <tbody> de la tabla por su id
    var cuerpoTabla = document.getElementById("cuerpo-tabla-vacantes");

    // Limpiamos el contenido anterior (para no duplicar filas)
    cuerpoTabla.innerHTML = "";

    // Si no hay vacantes, mostramos un mensaje informativo y salimos
    if (listaVacantes.length === 0) {
        cuerpoTabla.innerHTML =
            '<tr><td colspan="6" class="sin-datos">No hay vacantes registradas aún.</td></tr>';
        return;
    }

    // Recorremos el array de vacantes y creamos una fila (<tr>) por cada una
    listaVacantes.forEach(function (vacante) {

        // Elegimos el badge según el estado de la vacante
        var claseBadge = "badge-" + vacante.estado; // "badge-activa" o "badge-cerrada"

        // Creamos el elemento <tr>
        var fila = document.createElement("tr");

        // Llenamos la fila con HTML. Las template literals (`) permiten
        // insertar variables con ${variable} dentro del texto.
        fila.innerHTML =
            "<td>" + vacante.titulo + "</td>" +
            "<td>" + vacante.departamento + "</td>" +
            "<td>" + (vacante.descripcion || "---") + "</td>" +
            "<td><span class='badge " + claseBadge + "'>" + vacante.estado + "</span></td>" +
            "<td>" + vacante.fecha + "</td>" +
            "<td>" +
                "<button class='btn btn-peligro' onclick='eliminarVacante(" + vacante.id + ")'>" +
                "Eliminar" +
                "</button>" +
            "</td>";

        // Agregamos la fila al cuerpo de la tabla
        cuerpoTabla.appendChild(fila);
    });
}


// ============================================================
//  LIMPIAR EL FORMULARIO  (borra todos los campos)
// ============================================================
function limpiarFormulario() {
    document.getElementById("titulo").value       = "";
    document.getElementById("departamento").value = "";
    document.getElementById("descripcion").value  = "";
    document.getElementById("estado").value       = "activa";
}


// ============================================================
//  MOSTRAR MENSAJE DE ÉXITO O ERROR
//
//  texto → el texto a mostrar
//  tipo  → "exito" o "error"  (son las clases CSS que usamos)
// ============================================================
function mostrarMensaje(texto, tipo) {
    var divMensaje = document.getElementById("mensaje");
    divMensaje.textContent = texto;          // poner el texto
    divMensaje.className   = "mensaje " + tipo; // agregar clase de color

    // Después de 3 segundos (3000 ms), ocultar el mensaje
    setTimeout(function () {
        divMensaje.className   = "mensaje";  // quita la clase de color
        divMensaje.textContent = "";
    }, 3000);
}
