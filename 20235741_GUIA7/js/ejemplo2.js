// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
// aquí se está utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");

// Recorrer el formulario
const recorrerFormulario = function () {
    let totText = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totDate = 0;
    let totSelect = 0;
    let totFile = 0;
    let totPass = 0;
    let totEmail = 0;

    // Recorriendo elementos del formulario
    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    for (let index = 0; index < totalElementos; index++) {
        // Accediendo a cada hijo del formulario
        let elemento = elementos[index];

        // Verificando el tipo de control en el formulario
        let tipoElemento = elemento.type;
        // Verificando el tipo de nodo
        let tipoNode = elemento.nodeName;
    }
};
// Contabilizando el total de INPUT TYPE = TEXT
if (tipoElemento == "text" && tipoNode == "INPUT") {
    console.log(elemento);
    totText++;
}
// Contabilizando el total de INPUT TYPE = PASSWORD
else if (tipoElemento == "password" && tipoNode == "INPUT") {
    console.log(elemento);
    totPass++;
}
// Contabilizando el total de INPUT TYPE = EMAIL
else if (tipoElemento == "email" && tipoNode == "INPUT") {
    console.log(elemento);
    totEmail++;
}
// Contabilizando el total de INPUT TYPE = RADIO
else if (tipoElemento == "radio" && tipoNode == "INPUT") {
    console.log(elemento);
    totRadio++;
}
// Contabilizando el total de INPUT TYPE = CHECKBOX
else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
    console.log(elemento);
    totCheck++;
}
// Contabilizando el total de INPUT TYPE = FILE
else if (tipoElemento == "file" && tipoNode == "INPUT") {
    console.log(elemento);
    totFile++;
}
// Contabilizando el total de INPUT TYPE = DATE
else if (tipoElemento == "date" && tipoNode == "INPUT") {
    console.log(elemento);
    totDate++;
}
// Contabilizando el total de INPUT TYPE = SELECT
else if (tipoNode == "SELECT") {
    console.log(elemento);
    totSelect++;
}
let resultado = `
    Total de input[type="text"] = ${totText}<br>
    Total de input[type="password"] = ${totPass}<br>
    Total de input[type="radio"] = ${totRadio}<br>
    Total de input[type="checkbox"] = ${totCheck}<br>
    Total de input[type="date"] = ${totDate}<br>
    Total de input[type="email"] = ${totEmail}<br>
    Total de select = ${totSelect}<br>
`;

bodyModal.innerHTML = resultado;
// Función que permite mostrar el modal de Bootstrap
// Esta función es definida por Bootstrap
modal.show();
// agregando eventos al botón
button.onclick = () => {
    recorrerFormulario();
};
document.querySelector("button[name='btnRegistro']").addEventListener("click", validateForm);

function validateForm() {
    const modalBody = document.getElementById("idBodyModal");
    modalBody.innerHTML = ""; // Limpiar el modal antes de agregar contenido

    const nombre = document.getElementById("idNombre").value.trim();
    const apellidos = document.getElementById("idApellidos").value.trim();
    const fechaNac = document.getElementById("idFechaNac").value;
    const correo = document.getElementById("idCorreo").value.trim();
    const password = document.getElementById("idPassword").value;
    const passwordRepetir = document.getElementById("idPasswordRepetir").value;
    const paisOrigen = document.getElementById("idCmPais").value;
    const carreraSeleccionada = document.querySelector("input[name='idRdCarrera']:checked");
    const intereses = document.querySelectorAll(".form-check-input:checked");

    let isValid = true;
    const errors = [];

    // Validar que los campos no estén vacíos
    if (!nombre) errors.push("El campo 'Nombres' no puede estar vacío");
    if (!apellidos) errors.push("El campo 'Apellidos' no puede estar vacío");
    if (!fechaNac) errors.push("El campo 'Fecha de Nacimiento' no puede estar vacío");
    if (!correo) errors.push("El campo 'Correo electrónico' no puede estar vacío");
    if (!password) errors.push("El campo 'Contraseña' no puede estar vacío");
    if (!passwordRepetir) errors.push("El campo 'Repetir Contraseña' no puede estar vacío");

    // Validar fecha de nacimiento
    const birthDate = new Date(fechaNac);
    const currentDate = new Date();
    if (birthDate > currentDate) {
        errors.push("La fecha de nacimiento no puede ser posterior a la fecha actual");
    }

    // Validar formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(correo)) {
        errors.push("El correo electrónico no tiene un formato válido");
    }

    // Validar que las contraseñas coincidan
    if (password !== passwordRepetir) {
        errors.push("Las contraseñas no coinciden");
    }

    // Verificar que al menos un interés esté seleccionado
    if (intereses.length === 0) {
        errors.push("Debe seleccionar al menos un interés");
    }

    // Verificar que se haya seleccionado una carrera
    if (!carreraSeleccionada) {
        errors.push("Debe seleccionar una carrera");
    }

    // Verificar que se haya seleccionado un país de origen
    if (paisOrigen === "Seleccione una opcion") {
        errors.push("Debe seleccionar un país de origen");
    }

    if (errors.length > 0) {
        // Si hay errores, mostrar mensajes y no continuar con la generación de la tabla
        alert(errors.join("\n"));
        return;
    }

    // Si no hay errores, mostrar los datos en el modal
    displayDataInModal({
        nombre,
        apellidos,
        fechaNac,
        correo,
        carrera: carreraSeleccionada ? carreraSeleccionada.nextElementSibling.textContent : "No seleccionado",
        paisOrigen,
        intereses: Array.from(intereses).map((checkbox) => checkbox.nextElementSibling.textContent),
    });
}

// Función para mostrar los datos en el modal en una tabla
function displayDataInModal(data) {
    const modal = new bootstrap.Modal(document.getElementById("idModal"));
    const modalBody = document.getElementById("idBodyModal");

    const table = document.createElement("table");
    table.className = "table table-bordered";

    const tbody = document.createElement("tbody");

    // Agregar filas a la tabla con los datos
    Object.keys(data).forEach((key) => {
        const row = document.createElement("tr");

        const cellKey = document.createElement("th");
        cellKey.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        row.appendChild(cellKey);

        const cellValue = document.createElement("td");
        if (Array.isArray(data[key])) {
            cellValue.textContent = data[key].join(", ");
        } else {
            cellValue.textContent = data[key];
        }
        row.appendChild(cellValue);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    modalBody.appendChild(table);

    modal.show();
}
