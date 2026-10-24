/* ==========================================================================
   RECURSO PARA ESTUDIANTES - EVALUACIÓN JAVASCRIPT
   Dashboard de Torneos Gamer
   ========================================================================== */

// Actividad 3. Declarar el arreglo (10 puntos)
// Declarar un arreglo global vacío llamado torneos.
// Cada elemento deberá ser un objeto con las propiedades:
// nombre, categoria, participantes, valorInscripcion, email y recaudacion.
let torneos = [];


/**
 * Actividad 4. Registrar y validar un torneo (30 puntos)
 * 12. Crear la función registrarTorneo() sin parámetros.
 */
function registrarTorneo() {
    // 13. Obtener los valores de todos los campos con document.getElementById()
    let nombre=recuperarCajaTexto("nombreT");
    let categoria=recuperarCajaTexto("categoriaT");
    let participantes=recuperarInt("participantesT");
    let valor=recuperarInt("valorT");
    let email=recuperarCajaTexto("emailT");
    // 14. Validar que el nombre tenga al menos 4 caracteres
    if(nombre.length<5){
        document.getElementById("smsNombre").textContent="Ingrese minimo 4 caracteres";
    }
    // 15. Validar que se haya seleccionado una categoría
    if(categoria==null){
        document.getElementById("smsCatg").textContent="Ingrese una categoria";
    }
    // 16. Validar que los participantes sean un entero entre 1 y 100
    if(participantes>=1&&participantes<=100){
        document.getElementById("smsParticipantes").textContent="Ingrese un valor entre 1 y 100";
    }
    // 17. Validar que el valor de inscripción sea mayor que 0
    if(valor<=0){
        document.getElementById("smsValor").textContent="Ingrese un valor mayor a 0";
    }
    // 18. Validar que el email no esté vacío. No se requiere validación avanzada de formato.
    if(email==null){
        document.getElementById("smsEmail").textContent="Ingrese un correo";
    }
    // Si alguna validación falla, mostrar mensajes de error y detener la ejecución
    if(nombre.length<5||categoria==null||participantes>=1&&participantes<=100||valor<=0||email==null){
        document.getElementById("smsError").innerHTML="ERROR, complete los campos";
        return
    }
    // 19. Calcular la recaudación estimada con: participantes × valor de inscripción
    let recaudacion=participantes*valor;
    // 20. Crear el objeto nuevoTorneo con los datos obtenidos
    let torneo1={}
        torneo1.nombre=nombre,
        torneo1.categoria=categoria,
        torneo1.participantes=participantes,
        torneo1.valorInscrip=valor,
        torneo1.email=email,
        torneo1.recaudacion=recaudacion
    // 21. Agregar el objeto al arreglo con push()
    torneos.push(torneo1);
    // 22. Llamar a mostrarTorneos() y limpiarFormulario()
    mostrarTorneos();
    limpiarFormulario();
    // 23. Mostrar un mensaje de registro exitoso
    document.getElementById("smsError").innerHTML="REGISTRO EXITOSO!";
}

/**
 * Actividad 5. Mostrar los torneos (15 puntos)
 * 24. Crear la función mostrarTorneos() sin parámetros.
 */
function mostrarTorneos() {
    // 25. Crear una variable vacía para concatenar el HTML
    
    // 26. Recorrer el arreglo torneos utilizando obligatoriamente un ciclo for
    
    // 27. En cada vuelta, obtener el objeto actual y construir una fila de la tabla (<tr>...</tr>)
    
    // 28. Mostrar todos los datos y la recaudación calculada

    // 29. Insertar el HTML final en el cuerpo de la tabla sin duplicar filas (usando innerHTML)
    
}

/**
 * Actividad 6. Limpiar el formulario (5 puntos)
 * 30. Crear la función limpiarFormulario().
 */
function limpiarFormulario() {
    // 31. Vaciar los campos del formulario, restablecer la categoría y limpiar los mensajes de error
}
