document.addEventListener("DOMContentLoaded", function () {
    // Accedemos al contenedor donde se mostrará los estudiantes
    const containerEstudiantes = document.querySelector("#idContainerEstudiantes");

    // Accedemos a cada botón por medio de la API DOM
    const btnAddEstudiante = document.querySelector("#idBtnAgregarEstudiante");
    const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiantes");

    // Agregamos el evento click a los botones y asignamos las funciones correspondientes
    btnAddEstudiante.addEventListener("click", addEstudiantes);
    btnViewEstudiantes.addEventListener("click", viewEstudiantes);

    // Arreglo de forma global
    let arrayEstudiantes = [];

    // Creando funciones
    function addEstudiantes() {
        const inputCarnet = document.querySelector("#inputCarnet").value.trim().toUpperCase();
        const inputNombre = document.querySelector("#inputNombre").value.trim().toUpperCase();
        const inputApellidos = document.querySelector("#inputApellidos").value.trim().toUpperCase();

        if (inputCarnet !== "" && inputNombre !== "" && inputApellidos !== "") {
            arrayEstudiantes.push([inputCarnet, inputNombre, inputApellidos]);
            alert("Se registró el nuevo estudiante");

            // Limpiando campos del formulario
            document.querySelector("#inputCarnet").value = "";
            document.querySelector("#inputNombre").value = "";
            document.querySelector("#inputApellidos").value = "";
            document.querySelector("#inputCarnet").focus();
        } else {
            alert("Faltan campos que completar");
        }
    }

    function viewEstudiantes() {
        if (arrayEstudiantes.length > 0) {
            let table = `<table class='table table-light table-striped'>
                            <thead>
                                <tr>
                                    <th scope='col' style='width: 5%;'>#</th>
                                    <th scope='col' style='width: 15%;'>Carnet</th>
                                    <th scope='col'>Nombres</th>
                                    <th scope='col'>Apellidos</th>
                                </tr>
                            </thead>
                            <tbody>`;

            arrayEstudiantes.forEach((estudiante, index) => {
                table += `<tr>
                            <td scope='row' style='font-weight: bold;'>${index + 1}</td>
                            <td>${estudiante[0]}</td>
                            <td>${estudiante[1]}</td>
                            <td>${estudiante[2]}</td>
                        </tr>`;
            });

            table += `</tbody></table>`;
            containerEstudiantes.innerHTML = table;
        } else {
            containerEstudiantes.innerHTML = "No se han registrado estudiantes";
        }
    }
});
