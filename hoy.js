
// Actividad 3. Declarar el arreglo global
let torneos = [];

// Actividad 2. Índice del torneo que se está editando
let indiceEdicion = -1;


/**
 * Actividad 4 y Actividad 2.
 * Registrar o actualizar un torneo.
 */
function registrarTorneo() {

    let cmpNombre = document.getElementById("nombreT");
    let nombre = cmpNombre.value.trim();

    let cmpCategoria = document.getElementById("categoriaT");
    let categoria = cmpCategoria.value;

    let cmpParticipantes = document.getElementById("participantesT");
    let participantes = Number(cmpParticipantes.value);

    let cmpValor = document.getElementById("valorT");
    let valor = Number(cmpValor.value);

    let cmpEmail = document.getElementById("emailT");
    let email = cmpEmail.value.trim();

    let smsError = document.getElementById("smsError");

    smsError.textContent = "";

    // Validar nombre mínimo de 4 caracteres
    if (nombre.length < 4) {
        smsError.textContent =
            "Ingrese mínimo 4 caracteres en el nombre.";
        return;
    }

    // Validar categoría
    if (categoria === "") {
        smsError.textContent =
            "Seleccione una categoría.";
        return;
    }

    // Validar participantes: entero entre 1 y 100
    if (
        cmpParticipantes.value === "" ||
        !Number.isInteger(participantes) ||
        participantes < 1 ||
        participantes > 100
    ) {
        smsError.textContent =
            "Ingrese un número entero entre 1 y 100.";
        return;
    }

    // Validar valor de inscripción mayor que 0
    if (
        cmpValor.value === "" ||
        !Number.isFinite(valor) ||
        valor <= 0
    ) {
        smsError.textContent =
            "El valor de inscripción debe ser mayor que 0.";
        return;
    }

    // Validar correo electrónico
    if (email === "" || !cmpEmail.checkValidity()) {
        smsError.textContent =
            "Ingrese un correo electrónico válido.";
        return;
    }

    // Actividad 2.8. Recalcular la recaudación
    let recaudacion = participantes * valor;

    // Actividad 2.9. Actualizar el objeto existente
    if (indiceEdicion !== -1) {

        let torneoEd = torneos[indiceEdicion];

        torneoEd.nombre = nombre;
        torneoEd.categoria = categoria;
        torneoEd.participantes = participantes;
        torneoEd.valorInscripcion = valor;
        torneoEd.email = email;
        torneoEd.recaudacion = recaudacion;

        smsError.textContent =
            "¡Torneo actualizado exitosamente!";

    } else {

        // Registrar un torneo nuevo solamente si no estamos editando
        let nuevoTorneo = {
            nombre: nombre,
            categoria: categoria,
            participantes: participantes,
            valorInscripcion: valor,
            email: email,
            recaudacion: recaudacion
        };

        torneos.push(nuevoTorneo);

        smsError.textContent =
            "¡Torneo registrado exitosamente!";
    }

    // Actividad 2.10. Actualizar la información de la página
    mostrarTorneos();
    actualizarEstadisticas();
    buscarTorneos();
    
    // Actividad 2.11. Restablecer el formulario
    indiceEdicion = -1;

    mostrarTextoSpan(
        "textoBoton",
        "REGISTRAR TORNEO"
    );

    limpiarFormulario();

    // Restaurar la insignia del formulario
    document.getElementById("insigniaFormulario").textContent =
        "NUEVO TORNEO";

}


/**
 * Actividad 5. Mostrar los torneos registrados.
 */
function mostrarTorneos() {

    let contenido = "";

    contenido += "<div class='tabla-scroll'>";
    contenido += "<table>";

    contenido += "<thead><tr>" +
        "<th>Nombre</th>" +
        "<th>Categoría</th>" +
        "<th>Participantes</th>" +
        "<th>Valor de inscripción</th>" +
        "<th>Email</th>" +
        "<th>Recaudación</th>" +
        "<th>Acciones</th>" +
        "</tr></thead><tbody>";

    // Recorrer el arreglo con for
    for (let i = 0; i < torneos.length; i++) {

        let torneo = torneos[i];

        contenido += "<tr>" +
            "<td>" + torneo.nombre + "</td>" +
            "<td>" + torneo.categoria + "</td>" +
            "<td>" + torneo.participantes + "</td>" +
            "<td>$" + torneo.valorInscripcion.toFixed(2) + "</td>" +
            "<td>" + torneo.email + "</td>" +
            "<td>$" + torneo.recaudacion.toFixed(2) + "</td>" +

            "<td>" +
                "<button type='button' " +
                "onclick='editarTorneo(" + i + ")'>" +
                "Editar</button> " +

                "<button type='button' " +
                "onclick='eliminarTorneo(" + i + ")'>" +
                "Eliminar</button>" +
            "</td>" +

            "</tr>";
    }

    contenido += "</tbody></table></div>";

    document.getElementById("tablaRegistro").innerHTML =
        contenido;
}


/**
 * Actividad 2. Crear la función editarTorneo(indice).
 *
 * Recupera los datos y los carga en el formulario.
 * No modifica el torneo todavía.
 */
function editarTorneo(indice) {

    // Verificar que el índice exista
    if (indice < 0 || indice >= torneos.length) {
        return;
    }

    // 1. Obtener el torneo seleccionado desde el arreglo
    let torneoEd = torneos[indice];

    // 2. Guardar el índice seleccionado
    indiceEdicion = indice;

    // 3. Cargar sus datos en el formulario
    document.getElementById("nombreT").value =
        torneoEd.nombre;

    document.getElementById("categoriaT").value =
        torneoEd.categoria;

    document.getElementById("participantesT").value =
        torneoEd.participantes;

    document.getElementById("valorT").value =
        torneoEd.valorInscripcion;

    document.getElementById("emailT").value =
        torneoEd.email;

    // 4. Cambiar el texto del botón principal
    mostrarTextoSpan(
        "textoBoton",
        "ACTUALIZAR TORNEO"
    );

    // Cambiar la insignia para indicar el modo de edición
    document.getElementById("insigniaFormulario").textContent =
        "EDITANDO TORNEO";

    // Limpiar mensajes anteriores
    document.getElementById("smsError").textContent = "";

    // Llevar el formulario a la vista
    document.getElementById("formularioTorneo").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/**
 * Actividad 6. Limpiar el formulario.
 */
function limpiarFormulario() {

    document.getElementById("formularioTorneo").reset();

    document.getElementById("smsError").textContent = "";
}


/**
 * Cambiar el texto de un elemento HTML.
 */
function mostrarTextoSpan(idSpan, texto) {

    const elemento = document.getElementById(idSpan);

    if (elemento) {
        elemento.textContent = texto;
    } else {
        console.error(
            'No se encontró un elemento con id "' + idSpan + '"'
        );
    }
}


/**
 * Actividad 6. Actualizar estadísticas.
 */
function actualizarEstadisticas() {

    let totalTorneos = torneos.length;
    let totalParticipantes = 0;
    let totalRecaudacion = 0;

    for (let i = 0; i < torneos.length; i++) {

        totalParticipantes += torneos[i].participantes;
        totalRecaudacion += torneos[i].recaudacion;
    }

    let cmpTabla = document.getElementById(
        "contenidoEstadisticas"
    );

    let contenidoTabla = "";

    contenidoTabla += "<tr>" +
        "<td>" + totalTorneos + "</td>" +
        "<td>" + totalParticipantes + "</td>" +
        "<td>$" + totalRecaudacion.toFixed(2) + "</td>" +
        "</tr>";

    cmpTabla.innerHTML = contenidoTabla;
}


/**
 * Actividad grupal. Eliminar un torneo.
 */
function eliminarTorneo(indice) {

    let confirmar = confirm(
        "¿Estás seguro de que deseas eliminar este torneo?"
    );

    if (confirmar) {

        torneos.splice(indice, 1);

        // Si se elimina el torneo que se estaba editando,
        // salir del modo edición.
        if (indiceEdicion === indice) {

            indiceEdicion = -1;

            limpiarFormulario();

            mostrarTextoSpan(
                "textoBoton",
                "REGISTRAR TORNEO"
            );

            document.getElementById(
                "insigniaFormulario"
            ).textContent = "NUEVO TORNEO";

        } else if (indiceEdicion > indice) {

            // Ajustar el índice porque el arreglo cambió
            indiceEdicion--;
        }

        // Actualizar tabla, estadísticas y búsqueda
        mostrarTorneos();
        actualizarEstadisticas();
        buscarTorneos();

        document.getElementById("smsError").textContent =
            "Torneo eliminado correctamente.";

    } else {

        alert("La eliminación del torneo ha sido cancelada.");
    }
}

function generarTarjetas() {

    let contenedor = document.getElementById("contenedorTarjetas");

    let contenido = '<div class="contenedor-tarjetas">';

    for (let i = 0; i < torneos.length; i++) {

        let torneo = torneos[i];

        contenido += `
            <div class="tarjeta-torneo">
                <h3>${torneo.nombre}</h3>

                <p>
                    <strong>Categoría:</strong>
                    ${torneo.categoria}
                </p>

                <p>
                    <strong>Participantes:</strong>
                    ${torneo.participantes}
                </p>

                <p>
                    <strong>Inscripción:</strong>
                    $${torneo.valorInscripcion.toFixed(2)}
                </p>

                <p class="recaudacion">
                    <strong>Recaudación:</strong>
                    $${torneo.recaudacion.toFixed(2)}
                </p>
            </div>
        `;
    }

    contenido += '</div>';

    if (torneos.length === 0) {
        contenedor.innerHTML =
            '<p class="mensaje-tarjetas">No hay torneos registrados.</p>';
        return;
    }

    contenedor.innerHTML = contenido;
}



/**
 * Búsqueda de torneos por nombre o categoría.
 */
function buscarTorneos() {

    let cmpBuscar = document.getElementById("cmpBuscarT");

    let busqueda = cmpBuscar.value.trim().toLowerCase();

    let torneosEncontrados = [];

    for (let i = 0; i < torneos.length; i++) {

        let nombre = torneos[i].nombre.toLowerCase();

        let categoria = torneos[i].categoria.toLowerCase();

        if (
            nombre.includes(busqueda) ||
            categoria.includes(busqueda)
        ) {
            torneosEncontrados.push(torneos[i]);
        }
    }

    mostrarTorneosBuscados(torneosEncontrados);
}


/**
 * Mostrar los resultados de la búsqueda.
 */
function mostrarTorneosBuscados(listaTorneos) {

    let contenido = "";

    contenido += "<div class='tabla-scroll'>";
    contenido += "<table>";

    contenido += "<thead><tr>" +
        "<th>Nombre</th>" +
        "<th>Categoría</th>" +
        "<th>Participantes</th>" +
        "<th>Valor de inscripción</th>" +
        "<th>Email</th>" +
        "<th>Recaudación</th>" +
        "</tr></thead><tbody>";

    for (let i = 0; i < listaTorneos.length; i++) {

        let torneo = listaTorneos[i];

        contenido += "<tr>" +
            "<td>" + torneo.nombre + "</td>" +
            "<td>" + torneo.categoria + "</td>" +
            "<td>" + torneo.participantes + "</td>" +
            "<td>$" + torneo.valorInscripcion.toFixed(2) + "</td>" +
            "<td>" + torneo.email + "</td>" +
            "<td>$" + torneo.recaudacion.toFixed(2) + "</td>" +
            "</tr>";
    }

    contenido += "</tbody></table></div>";

    document.getElementById("tablaBusqueda").innerHTML =
        contenido;
}


/**
 * Conectar el formulario con registrarTorneo().
 *
 * Permite usar el botón tanto para registrar como para actualizar.
 */
document.getElementById("formularioTorneo").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        registrarTorneo();
    }
);


// Mostrar los datos iniciales
mostrarTorneos();
actualizarEstadisticas();
buscarTorneos();
