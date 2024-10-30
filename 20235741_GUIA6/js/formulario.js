//Accediendo a los elementos HTML
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const idTablaPaciente = document.getElementById("idTablaPacientes");
const idPacientesRegistrados = document.getElementById("idPacientesRegistrados");

const notificacion = document.getElementById("idNotificacion");
const mensaje = document.getElementById("idMensaje");

// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const idModal = document.getElementById("idModal");

// Arreglo global de pacientes
let arrayPaciente = [];
let editIndex = null;

// Limpiar formulario
const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";
    inputNombre.focus();
};

// Validaciones con expresiones regulares
const validarCampos = () => {
    const regexNombre = /^[A-Za-z\s]+$/;
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    const regexDireccion = /^.{5,100}$/;

    if (!regexNombre.test(inputNombre.value)) {
        mensaje.innerHTML = "Nombre inválido. Solo letras y espacios permitidos.";
        toast.show();
        return false;
    }
    if (!regexNombre.test(inputApellido.value)) {
        mensaje.innerHTML = "Apellido inválido. Solo letras y espacios permitidos.";
        toast.show();
        return false;
    }
    if (!regexFecha.test(inputFechaNacimiento.value)) {
        mensaje.innerHTML = "Fecha de nacimiento inválida. Formato: YYYY-MM-DD";
        toast.show();
        return false;
    }
    if (!regexDireccion.test(inputDireccion.value)) {
        mensaje.innerHTML = "Dirección debe tener entre 5 y 100 caracteres.";
        toast.show();
        return false;
    }
    return true;
};

// Agregar o editar paciente
const addPaciente = () => {
    if (!validarCampos()) return;

    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const fechaNacimiento = inputFechaNacimiento.value;
    const sexo = inputRdMasculino.checked ? "Hombre" : inputRdFemenino.checked ? "Mujer" : "";
    const pais = cmbPais.value;
    const labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    const direccion = inputDireccion.value.trim();

    if (nombre && apellido && fechaNacimiento && sexo && pais !== "0" && direccion) {
        const paciente = { nombre, apellido, fechaNacimiento, sexo, labelPais, direccion };

        if (editIndex !== null) {
            arrayPaciente[editIndex] = paciente;
            mensaje.innerHTML = "Paciente editado correctamente.";
            editIndex = null;
        } else {
            arrayPaciente.push(paciente);
            mensaje.innerHTML = "Se ha registrado un nuevo paciente.";
        }
        toast.show();
        limpiarForm();
        imprimirPacientes();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

// Imprimir filas de pacientes
function imprimirFilas() {
    let $fila = "";
    arrayPaciente.forEach((element, index) => {
        $fila += `<tr>
            <td scope="row" class="text-center fw-bold">${index + 1}</td>
            <td>${element.nombre}</td>
            <td>${element.apellido}</td>
            <td>${element.fechaNacimiento}</td>
            <td>${element.sexo}</td>
            <td>${element.labelPais}</td>
            <td>${element.direccion}</td>
            <td>
                <button onclick="editarPaciente(${index})" type="button" class="btn btn-primary" alt="Editar">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button onclick="eliminarPaciente(${index})" type="button" class="btn btn-danger" alt="Eliminar">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>`;
    });
    return $fila;
};

// Imprimir pacientes en tabla
const imprimirPacientes = () => {
    const $table = `
        <div class="table-responsive">
            <table class="table table-striped table-hover table-bordered">
                <tr>
                    <th scope="col" class="text-center">#</th>
                    <th scope="col" class="text-center">Nombre</th>
                    <th scope="col" class="text-center">Apellido</th>
                    <th scope="col" class="text-center">Fecha nacimiento</th>
                    <th scope="col" class="text-center">Sexo</th>
                    <th scope="col" class="text-center">País</th>
                    <th scope="col" class="text-center">Dirección</th>
                    <th scope="col" class="text-center">Opciones</th>
                </tr>
                ${imprimirFilas()}
            </table>
        </div>
    `;
    idTablaPaciente.innerHTML = $table;
};

// Editar paciente
const editarPaciente = (index) => {
    const paciente = arrayPaciente[index];
    inputNombre.value = paciente.nombre;
    inputApellido.value = paciente.apellido;
    inputFechaNacimiento.value = paciente.fechaNacimiento;
    paciente.sexo === "Hombre" ? (inputRdMasculino.checked = true) : (inputRdFemenino.checked = true);
    cmbPais.value = paciente.pais;
    inputDireccion.value = paciente.direccion;
    editIndex = index;
};

// Eliminar paciente
const eliminarPaciente = (index) => {
    arrayPaciente.splice(index, 1);
    mensaje.innerHTML = "Paciente eliminado correctamente.";
    toast.show();
    imprimirPacientes();
};

// Agregar país
const addPais = () => {
    const paisNew = inputNombrePais.value.trim();
    if (paisNew) {
        const option = document.createElement("option");
        option.textContent = paisNew;
        option.value = cmbPais.children.length + 1;
        cmbPais.appendChild(option);
        mensaje.innerHTML = "País agregado exitosamente.";
        toast.show();
    } else {
        mensaje.innerHTML = "Debe ingresar un nombre de país.";
        toast.show();
    }
};

// Eventos de botones
buttonLimpiarPaciente.onclick = limpiarForm;
buttonAgregarPaciente.onclick = addPaciente;
buttonMostrarPaciente.onclick = imprimirPacientes;
buttonAgregarPais.onclick = addPais;

// Al abrir el modal, enfocar en el campo de nombre de país
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

// Ejecutar al cargar la página
limpiarForm();
