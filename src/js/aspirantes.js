// ============================================================
//  ASPIRANTES.JS  —  SELECCIÓN RRHH CESDE
//
//  Lógica de la página de aspirantes:
//    - Registrar un nuevo aspirante
//    - Mostrar los aspirantes en tabla
//    - Eliminar un aspirante
// ============================================================


// Cuando el HTML esté listo, cargamos la tabla
document.addEventListener("DOMContentLoaded", function () {
    actualizarTablaAspirantes();
});


// ============================================================
//  REGISTRAR UN NUEVO ASPIRANTE
// ============================================================
function registrarAspirante() {

    // PASO 1: Leer los valores del formulario
    var nombre    = document.getElementById("nombre").value.trim();
    var apellido  = document.getElementById("apellido").value.trim();
    var email     = document.getElementById("email").value.trim();
    var telefono  = document.getElementById("telefono").value.trim();
    var perfil    = document.getElementById("perfil").value.trim();

    // PASO 2: Validar campos obligatorios
    if (nombre === "" || apellido === "" || email === "") {
        mostrarMensaje("Por favor completa los campos obligatorios (*).", "error");
        return;
    }

    // PASO 3: Validar que el email tenga el símbolo @
    // Esta es una validación básica. No es perfecta, pero es suficiente.
    if (!email.includes("@") || !email.includes(".")) {
        mostrarMensaje("Por favor ingresa un correo electrónico válido.", "error");
        return;
    }

    // PASO 4: Crear el objeto aspirante
    var nuevoAspirante = {
        id:       generarId(),
        nombre:   nombre,
        apellido: apellido,
        email:    email,
        telefono: telefono,           // puede estar vacío (no es obligatorio)
        perfil:   perfil,             // resumen de hoja de vida (opcional)
        fecha:    new Date().toLocaleDateString("es-CO")
    };

    // PASO 5: Agregar a la lista y guardar
    var listaAspirantes = obtenerAspirantes();
    listaAspirantes.push(nuevoAspirante);
    guardarAspirantes(listaAspirantes);

    // PASO 6: Retroalimentar al usuario
    mostrarMensaje("Aspirante registrado exitosamente.", "exito");
    limpiarFormulario();
    actualizarTablaAspirantes();
}


// ============================================================
//  ELIMINAR UN ASPIRANTE POR SU ID
// ============================================================
function eliminarAspirante(id) {

    if (!confirm("¿Estás seguro de que deseas eliminar este aspirante?")) {
        return;
    }

    var listaAspirantes = obtenerAspirantes();

    // Nos quedamos con todos los aspirantes excepto el que tiene este ID
    var listaActualizada = listaAspirantes.filter(function (a) {
        return a.id !== id;
    });

    guardarAspirantes(listaActualizada);
    mostrarMensaje("Aspirante eliminado.", "exito");
    actualizarTablaAspirantes();
}


// ============================================================
//  CONSTRUIR Y MOSTRAR LA TABLA DE ASPIRANTES
// ============================================================
function actualizarTablaAspirantes() {

    var listaAspirantes = obtenerAspirantes();
    var cuerpoTabla     = document.getElementById("cuerpo-tabla-aspirantes");

    cuerpoTabla.innerHTML = ""; // limpiar filas anteriores

    if (listaAspirantes.length === 0) {
        cuerpoTabla.innerHTML =
            '<tr><td colspan="6" class="sin-datos">No hay aspirantes registrados aún.</td></tr>';
        return;
    }

    listaAspirantes.forEach(function (asp) {

        var fila = document.createElement("tr");

        // Unimos nombre y apellido para mostrar el nombre completo
        fila.innerHTML =
            "<td>" + asp.nombre + " " + asp.apellido + "</td>" +
            "<td>" + asp.email + "</td>" +
            "<td>" + (asp.telefono || "---") + "</td>" +
            "<td>" + (asp.perfil   || "---") + "</td>" +
            "<td>" + asp.fecha + "</td>" +
            "<td>" +
                "<button class='btn btn-peligro' onclick='eliminarAspirante(" + asp.id + ")'>" +
                "Eliminar" +
                "</button>" +
            "</td>";

        cuerpoTabla.appendChild(fila);
    });
}


// ============================================================
//  LIMPIAR EL FORMULARIO
// ============================================================
function limpiarFormulario() {
    document.getElementById("nombre").value    = "";
    document.getElementById("apellido").value  = "";
    document.getElementById("email").value     = "";
    document.getElementById("telefono").value  = "";
    document.getElementById("perfil").value    = "";
}


// ============================================================
//  MOSTRAR MENSAJE DE ÉXITO O ERROR
// ============================================================
function mostrarMensaje(texto, tipo) {
    var divMensaje = document.getElementById("mensaje");
    divMensaje.textContent = texto;
    divMensaje.className   = "mensaje " + tipo;

    setTimeout(function () {
        divMensaje.className   = "mensaje";
        divMensaje.textContent = "";
    }, 3000);
}
