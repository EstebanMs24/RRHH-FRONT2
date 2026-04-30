// ============================================================
//  PROCESOS.JS  —  SELECCIÓN RRHH CESDE
//
//  Lógica del proceso de selección:
//    - Cargar las vacantes y aspirantes en los <select>
//    - Registrar un proceso (relacionar aspirante + vacante)
//    - Cambiar la etapa de un proceso desde la tabla
//    - Eliminar un proceso
// ============================================================


// Cuando el HTML esté listo, poblar los selectores y la tabla
document.addEventListener("DOMContentLoaded", function () {
    cargarSelectVacantes();
    cargarSelectAspirantes();
    actualizarTablaProcesos();
});


// ============================================================
//  CARGAR VACANTES EN EL <select> DEL FORMULARIO
//
//  Leemos las vacantes del localStorage y creamos una
//  opción (<option>) por cada una dentro del <select>.
// ============================================================
function cargarSelectVacantes() {
    var selectVacante = document.getElementById("selectVacante");
    var listaVacantes = obtenerVacantes();

    // Primero ponemos la opción por defecto (sin valor)
    selectVacante.innerHTML = '<option value="">-- Selecciona una vacante --</option>';

    // Agregamos una opción por cada vacante guardada
    listaVacantes.forEach(function (v) {
        var opcion = document.createElement("option");
        opcion.value       = v.id;                               // ID como valor
        opcion.textContent = v.titulo + " (" + v.departamento + ")"; // texto visible
        selectVacante.appendChild(opcion);
    });
}


// ============================================================
//  CARGAR ASPIRANTES EN EL <select> DEL FORMULARIO
// ============================================================
function cargarSelectAspirantes() {
    var selectAspirante = document.getElementById("selectAspirante");
    var listaAspirantes = obtenerAspirantes();

    selectAspirante.innerHTML = '<option value="">-- Selecciona un aspirante --</option>';

    listaAspirantes.forEach(function (a) {
        var opcion = document.createElement("option");
        opcion.value       = a.id;
        opcion.textContent = a.nombre + " " + a.apellido;
        selectAspirante.appendChild(opcion);
    });
}


// ============================================================
//  REGISTRAR UN NUEVO PROCESO
// ============================================================
function registrarProceso() {

    // Los <select> devuelven el 'value' como texto (string),
    // por eso necesitamos convertir los IDs a número con parseInt().
    var idVacante   = document.getElementById("selectVacante").value;
    var idAspirante = document.getElementById("selectAspirante").value;
    var etapa       = document.getElementById("etapa").value;
    var observaciones = document.getElementById("observaciones").value.trim();

    // Validar que se hayan seleccionado ambos
    if (idVacante === "" || idAspirante === "") {
        mostrarMensaje("Debes seleccionar una vacante y un aspirante.", "error");
        return;
    }

    // Convertir a número (los IDs se guardaron como número en el localStorage)
    idVacante   = parseInt(idVacante);
    idAspirante = parseInt(idAspirante);

    // Buscar el nombre de la vacante y del aspirante para mostrarlos en la tabla
    // find() devuelve el primer elemento del array que cumple la condición
    var vacanteEncontrada   = obtenerVacantes().find(function (v) { return v.id === idVacante;   });
    var aspiranteEncontrado = obtenerAspirantes().find(function (a) { return a.id === idAspirante; });

    // Guardamos los nombres directamente en el proceso para que la tabla
    // siga funcionando aunque la vacante o aspirante sea eliminado después
    var nombreVacante   = vacanteEncontrada   ? vacanteEncontrada.titulo                                   : "Vacante eliminada";
    var nombreAspirante = aspiranteEncontrado ? aspiranteEncontrado.nombre + " " + aspiranteEncontrado.apellido : "Aspirante eliminado";

    // Crear el objeto proceso
    var nuevoProceso = {
        id:              generarId(),
        idVacante:       idVacante,
        idAspirante:     idAspirante,
        nombreVacante:   nombreVacante,     // guardamos el nombre para no buscarlo siempre
        nombreAspirante: nombreAspirante,
        etapa:           etapa,
        observaciones:   observaciones,
        fecha:           new Date().toLocaleDateString("es-CO")
    };

    var listaProcesos = obtenerProcesos();
    listaProcesos.push(nuevoProceso);
    guardarProcesos(listaProcesos);

    mostrarMensaje("Proceso registrado exitosamente.", "exito");
    limpiarFormulario();
    actualizarTablaProcesos();
}


// ============================================================
//  CAMBIAR LA ETAPA DE UN PROCESO
//
//  Se llama desde el <select> que está dentro de cada fila
//  de la tabla. Cuando el usuario cambia la opción, se
//  actualiza automáticamente en el localStorage.
//
//  idProceso  → número (el ID del proceso a modificar)
//  nuevaEtapa → string (el valor seleccionado en el <select>)
// ============================================================
function cambiarEtapa(idProceso, nuevaEtapa) {

    var listaProcesos = obtenerProcesos();

    // Recorremos todos los procesos y actualizamos el que coincide
    listaProcesos.forEach(function (p) {
        if (p.id === idProceso) {
            p.etapa = nuevaEtapa; // actualizar la etapa
        }
    });

    guardarProcesos(listaProcesos);

    // Refrescamos la tabla para que el badge de etapa también se actualice
    actualizarTablaProcesos();
}


// ============================================================
//  ELIMINAR UN PROCESO
// ============================================================
function eliminarProceso(id) {

    if (!confirm("¿Estás seguro de que deseas eliminar este proceso?")) {
        return;
    }

    var listaProcesos    = obtenerProcesos();
    var listaActualizada = listaProcesos.filter(function (p) {
        return p.id !== id;
    });

    guardarProcesos(listaActualizada);
    mostrarMensaje("Proceso eliminado.", "exito");
    actualizarTablaProcesos();
}


// ============================================================
//  CONSTRUIR Y MOSTRAR LA TABLA DE PROCESOS
// ============================================================
function actualizarTablaProcesos() {

    var listaProcesos = obtenerProcesos();
    var cuerpoTabla   = document.getElementById("cuerpo-tabla-procesos");

    cuerpoTabla.innerHTML = "";

    if (listaProcesos.length === 0) {
        cuerpoTabla.innerHTML =
            '<tr><td colspan="7" class="sin-datos">No hay procesos registrados aún.</td></tr>';
        return;
    }

    // Lista de todas las etapas posibles (para construir el <select> de cada fila)
    var todasLasEtapas = [
        "convocatoria",
        "preseleccion",
        "entrevista",
        "prueba",
        "seleccionado",
        "rechazado"
    ];

    listaProcesos.forEach(function (proc) {

        var fila = document.createElement("tr");

        // Construir el <select> para cambiar etapa dentro de la tabla.
        // Marcamos con 'selected' la opción que ya tiene el proceso.
        var opcionesHtml = "";
        todasLasEtapas.forEach(function (etapa) {
            var marcado = (etapa === proc.etapa) ? " selected" : "";
            opcionesHtml += "<option value='" + etapa + "'" + marcado + ">" + etapa + "</option>";
        });

        var selectEtapa =
            "<select onchange='cambiarEtapa(" + proc.id + ", this.value)'>" +
            opcionesHtml +
            "</select>";

        // Badge para la columna de "Etapa Actual"
        var claseBadge = "badge-" + proc.etapa;

        fila.innerHTML =
            "<td>" + proc.nombreVacante   + "</td>" +
            "<td>" + proc.nombreAspirante + "</td>" +
            "<td><span class='badge " + claseBadge + "'>" + proc.etapa + "</span></td>" +
            "<td>" + selectEtapa + "</td>" +
            "<td>" + (proc.observaciones || "---") + "</td>" +
            "<td>" + proc.fecha + "</td>" +
            "<td>" +
                "<button class='btn btn-peligro' onclick='eliminarProceso(" + proc.id + ")'>" +
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
    document.getElementById("selectVacante").value   = "";
    document.getElementById("selectAspirante").value = "";
    document.getElementById("etapa").value           = "convocatoria";
    document.getElementById("observaciones").value   = "";
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
