const containerEstudiantes = document.querySelector("#idContainerEstudiantes");
const btnPromedio = document.querySelector("#idBtnPromedio");

// Agregar el evento click al botón "Generar"
btnPromedio.addEventListener("click", generarEstudiantes);

function generarEstudiantes() {
    let arrayEstudiante = [];
    let totalEstudiantes = parseInt(document.querySelector("#inputNumeroEstudiantes").value);
    let contador = 1;
    let estudiante, calificacion, convertir;

    while (contador <= totalEstudiantes) {
        estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`);
        
        // Validación de la calificación
        do {
            calificacion = prompt(`Ingrese la calificación del estudiante ${estudiante}`);
            convertir = parseFloat(calificacion);
        } while (isNaN(convertir) || convertir < 0 || convertir > 10);

        arrayEstudiante.push([estudiante, convertir.toFixed(2)]);
        contador++;
    }

    // Variables para calcular la calificación más alta y el promedio
    let calificacionAlta = -Infinity;
    let promedio = 0;
    let posicion = null;
    let listado = "<h3>Listado de estudiantes registrados</h3>";
    listado += "<ol>";

    // Iterar sobre el array para calcular promedio y encontrar la calificación más alta
    arrayEstudiante.forEach((indice, i) => {
        let nombre = indice[0];
        let nota = parseFloat(indice[1]);
        listado += `<li><b>Nombre:</b> ${nombre} - <b>Calificación:</b> ${nota}</li>`;

        // Verificación de calificación más alta
        if (nota > calificacionAlta) {
            calificacionAlta = nota;
            posicion = i;
        }

        promedio += nota;
    });

    listado += "</ol>";
    promedio = (promedio / arrayEstudiante.length).toFixed(2);
    listado += `<p><b>Promedio de calificaciones:</b> ${promedio}</p>`;
    if (posicion !== null) {
        listado += `<p><b>Estudiante con mejor calificación:</b> ${arrayEstudiante[posicion][0]}</p>`;
    }

    containerEstudiantes.innerHTML = listado;
}
