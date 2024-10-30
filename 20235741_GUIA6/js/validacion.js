function validarFormulario() {
    const nombreCompleto = document.getElementById("nombreCompleto").value;
    const correo = document.getElementById("correo").value;
    const direccion = document.getElementById("direccion").value;

    const regexNombre = /^[A-Za-z\s]+$/;
    const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    let mensaje = "";

    if (!regexNombre.test(nombreCompleto)) {
        mensaje += "Nombre completo no válido (solo letras y espacios)<br>";
    }
    if (!regexCorreo.test(correo)) {
        mensaje += "Correo electrónico no válido<br>";
    }

    const resultadoDiv = document.getElementById("resultado");
    if (mensaje) {
        resultadoDiv.innerHTML = `<div class="alert alert-danger">${mensaje}</div>`;
    } else {
        resultadoDiv.innerHTML = `<div class="alert alert-success">Todos los campos son válidos</div>`;
    }
}
