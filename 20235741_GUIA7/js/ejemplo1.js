// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE
// TENDRÁ LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// AGREGANDO FUNCIONES
const verificarTipoElemento = function () {
    let elemento = cmbElemento.value;
    // Validando que se haya seleccionado un elemento
    if (elemento != "") {
        // Método perteneciente al modal de bootstrap
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creará");
    }
};
const newSelect = function () {
    // Creando elementos
    let addElemento = document.createElement("select");
    // Creando atributos para el nuevo elemento
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");

    // Creando options para el select
    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opción ${i}`;
        addElemento.appendChild(addOption);
    }

    // Creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    // Creando texto para label
    labelElemento.textContent = tituloElemento.value;

    // Creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    // Agregando atributos
    divElemento.setAttribute("class", "form-floating");

    // Creando el input que será hijo del div
    divElemento.appendChild(addElemento);
    // Creando el label que será hijo del div
    divElemento.appendChild(labelElemento);

    // Creando el SPAN que será hijo del nuevo formulario
    newForm.appendChild(labelId);

    // Creando el Div que será hijo del nuevo formulario
    newForm.appendChild(divElemento);
};
const newInput = function (newElemento) {
    // Creando elementos de tipo = text, number, date y password
    let addElemento =
        newElemento === "textarea"
            ? document.createElement("textarea")
            : document.createElement("input");

    // Creando atributos para el nuevo elemento
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    // Creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    // Creando icono para el label
    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    // Creando texto para label
    labelElemento.textContent = tituloElemento.value;
    // Insertar el icono como hijo del label, al inicio
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    // Creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    // Agregando atributos
    divElemento.setAttribute("class", "form-floating mb-3");

    // Creando el input que será hijo del div
    divElemento.appendChild(addElemento);
    // Creando el label que será hijo del div
    divElemento.appendChild(labelElemento);

    // Creando el SPAN que será hijo del nuevo formulario
    newForm.appendChild(labelId);

    // Creando el Div que será hijo del nuevo formulario
    newForm.appendChild(divElemento);
};
// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => {
    verificarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;
        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
};

// Agregando evento para el modal de bootstrap
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    // Limpiando campos para los nuevos elementos
    tituloElemento.value = "";
    nombreElemento.value = "";
    // Inicializando puntero en el campo del título para el control
    tituloElemento.focus();
});
// Inicializando referencia de botones
const buttonAgregar = document.getElementById("idBtnCrear");
const buttonAddElement = document.getElementById("idBtnAddElement");
const buttonValidate = document.getElementById("idBtnValidate");
const form = document.getElementById("idNewForm");

buttonAgregar.onclick = function () {
    const elementType = document.getElementById("idCmbElemento").value;
    if (elementType) {
        document.getElementById("idModal").querySelector(".btn-close").click();
    } else {
        alert("Seleccione un tipo de elemento");
    }
};

buttonAddElement.onclick = function () {
    const titulo = document.getElementById("idTituloElemento").value;
    const nombre = document.getElementById("idNombreElemento").value;

    // Validar ID único
    if (document.getElementById(`id${nombre}`)) {
        alert("Ya existe un control con este ID. Por favor, elija otro.");
        return;
    }

    const elementType = document.getElementById("idCmbElemento").value;

    let element;
    if (elementType === "text" || elementType === "number" || elementType === "date" || 
        elementType === "password" || elementType === "color" || elementType === "email") {
        element = document.createElement("input");
        element.type = elementType;
    } else if (elementType === "radio" || elementType === "checkbox") {
        element = document.createElement("input");
        element.type = elementType;
    } else if (elementType === "select") {
        element = document.createElement("select");
        for (let i = 1; i <= 5; i++) {
            const option = document.createElement("option");
            option.value = `option${i}`;
            option.textContent = `Opción ${i}`;
            element.appendChild(option);
        }
    } else if (elementType === "textarea") {
        element = document.createElement("textarea");
    }

    // Asignar atributos al nuevo elemento
    element.id = `id${nombre}`;
    element.name = nombre;
    element.placeholder = titulo;
    element.className = "form-control mb-3";

    // Añadir el elemento al formulario
    form.appendChild(element);

    // Limpiar los campos del modal
    document.getElementById("idTituloElemento").value = "";
    document.getElementById("idNombreElemento").value = "";
};

// Validación de los controles
buttonValidate.onclick = function () {
    let allValid = true;
    const elements = form.elements;

    for (let element of elements) {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
            if (element.type === "radio" || element.type === "checkbox") {
                const name = element.name;
                const group = form.querySelectorAll(`[name="${name}"]`);
                const isChecked = Array.from(group).some(el => el.checked);
                if (!isChecked) {
                    alert(`Debe seleccionar una opción para el control ${name}`);
                    allValid = false;
                    break;
                }
            } else if (element.type === "select-one") {
                if (element.selectedIndex === -1) {
                    alert(`Seleccione una opción en el control ${element.name}`);
                    allValid = false;
                    break;
                }
            } else {
                if (!element.value.trim()) {
                    alert(`El campo ${element.name} está vacío`);
                    allValid = false;
                    break;
                }
            }
        }
    }

    if (allValid) {
        alert("Todos los controles están correctamente llenos");
    }
};
