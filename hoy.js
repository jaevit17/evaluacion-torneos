// Actividad 3. Declarar el arreglo global
let torneos = [];

let indiceEdicion
/**
 * Actividad 4. Registrar y validar un torneo
 */
function registrarTorneo() {
    let cmpNombre = document.getElementById("nombreT");
    let nombre = cmpNombre.value;
    let cmpCategoria = document.getElementById("categoriaT");
    let categoria = cmpCategoria.value;
    let cmpParticipantes = document.getElementById("participantesT");
    let participantes = Number(cmpParticipantes.value);
    let cmpValor = document.getElementById("valorT");
    let valor = Number(cmpValor.value);
    let cmpEmail = document.getElementById("emailT");
    let email = cmpEmail.value;
    let smsError = document.getElementById("smsError");
    smsError.innerHTML = "";
    // 14. Validar nombre mínimo de 4 caracteres
    if (nombre.length < 4) {
        alert("Ingrese mínimo 4 caracteres en el nombre");
        return;
    }
    // 15. Validar categoría
    if (categoria === "") {
        smsError.innerHTML = "Seleccione o ingrese una categoría.";
        return;
    }
    // 16. Validar participantes: entero entre 1 y 100
    if (participantes < 1 || participantes > 100) {
    alert("Ingrese un número entero entre 1 y 100");
    return;
}
    // 17. Validar valor de inscripción mayor que 0
    if (cmpValor.value === "" || valor <= 0) {
        alert("El valor de inscripción debe ser mayor que 0");
        return;
    }
    // 18. Validar email no vacío
    if (email.trim() === "") {
        smsError.innerHTML = "Ingrese un correo electrónico.";
        return;
    }
    // 19. Calcular recaudación estimada
    let recaudacion = participantes * valor;
    // 20. Crear objeto del torneo
    let nuevoTorneo = {
        nombre: nombre,
        categoria: categoria,
        participantes: participantes,
        valorInscripcion: valor,
        email: email,
        recaudacion: recaudacion
    };
    // 21. Agregar torneo al arreglo
    torneos.push(nuevoTorneo);
    // 22. Mostrar torneos y limpiar formulario
    mostrarTorneos();
    limpiarFormulario();
    // 23. Mostrar mensaje de éxito
    smsError.innerHTML = "¡Torneo registrado exitosamente!";
}


/**
 * Actividad 5. Mostrar los torneos
 */
function mostrarTorneos() {
    let contenido = "";
    contenido = "<table>";
    contenido += "<tr>" +
        "<th>Nombre</th>" +
        "<th>Categoría</th>" +
        "<th>Participantes</th>" +
        "<th>Valor de inscripción</th>" +
        "<th>Email</th>" +
        "<th>Recaudación</th>" +
        "</tr>";
    // Recorrer el arreglo obligatoriamente con for
    for (let i = 0; i < torneos.length; i++) {
        let torneo = torneos[i];
        contenido += "<tr>" +
            "<td>" + torneo.nombre + "</td>" +
            "<td>" + torneo.categoria + "</td>" +
            "<td>" + torneo.participantes + "</td>" +
            "<td>" + torneo.valorInscripcion.toFixed(2) + "</td>" +
            "<td>" + torneo.email + "</td>" +
            "<td>" + torneo.recaudacion.toFixed(2) + "</td>" +
            "</tr>";
    }
    contenido += "</table>";
    document.getElementById("tablaRegistro").innerHTML = contenido;
}


/**
 * Actividad 6. Limpiar el formulario
 */
function limpiarFormulario() {

    document.getElementById("nombreT").value = "";
    document.getElementById("categoriaT").value = "";
    document.getElementById("participantesT").value = "";
    document.getElementById("valorT").value = "";
    document.getElementById("emailT").value = "";
}

function editarTorneo(indice){

    let indiceRecuperado = indice

    mostrarTextoSpan("botonPrincipal", "ACTUALIZAR TORNEO");

    let torneoEd = torneos[indiceRecuperado]

    document.getElementById("nombreT").value = torneoEd.nombre; 
    document.getElementById("categoriaT").value = torneoEd.categoria;
    document.getElementById("participantesT").value = torneoEd.participantes;
    document.getElementById("valorT").value = torneoEd.valorInscripcion;
    document.getElementById("emailT").value = torneoEd.email;

    let nombreEd = document.getElementById("nombreT").value
    let categoriaEd = document.getElementById("categoriaT").value
    let participantesEd = document.getElementById("participantesT").value
    let valorEd = document.getElementById("valorT").value
    let emailEd = document.getElementById("emailT").value

    let recaudacionEd = participantesEd * valorEd;

    torneoEd.nombre = nombreEd
    torneoEd.categoria = categoriaEd
    torneoEd.participantes = participantesEd
    torneoEd.valorInscripcion = valorEd
    torneoEd.email = emailEd
    torneoEd.recaudacion  = recaudacionEd
    
    mostrarTorneos();

    indiceEdicion = -1

    limpiarFormulario();

    mostrarTextoSpan("botonPrincipal", "REGISTRAR TORNEO");
}

function mostrarTextoSpan(idSpan, texto) {
    const span = document.getElementById(idSpan);
    if (span) {
        span.textContent = texto;
    } else {
        console.error(`No se encontró un elemento con id "${idSpan}"`);
    }
}