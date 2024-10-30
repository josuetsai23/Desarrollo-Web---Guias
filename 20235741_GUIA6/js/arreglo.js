// Accedemos al contenedor donde se mostrará el arreglo ingresado y el arreglo ordenado
const containerArreglo = document.querySelector("#idContainerArreglo");
const containerArregloOrdenado = document.querySelector("#idContainerArregloOrdenado");

// Accedemos a cada botón
const btnAgregar = document.querySelector("#idBtnAgregar");
const btnOrdenar = document.querySelector("#idBtnOrdenar");

// Agregamos el evento click a los botones
btnAgregar.addEventListener("click", agregarElemento);
btnOrdenar.addEventListener("click", ordenarElementos);

let arreglo = [];

function agregarElemento() {
    const numero = parseInt(document.querySelector("#inputNumero").value);
    // Verificación de número válido
    if (isNaN(numero)) {
        alert("Debe ingresar un número válido");
    } else {
        // Agregamos el número al arreglo
        arreglo.push(numero);

        // Crear y mostrar el nuevo número en el contenedor del arreglo original
        let caja = document.createElement("div");
        caja.className = "col-md-1 column";
        let valor = document.createElement("h3");
        valor.textContent = numero;
        caja.appendChild(valor);

        containerArreglo.insertAdjacentElement("beforeend", caja);
    }
}

function ordenarElementos() {
    // Limpiar el contenedor del arreglo ordenado antes de insertar nuevos elementos
    containerArregloOrdenado.innerHTML = '<h3>Arreglo ordenado</h3>';

    // Ordenar el arreglo y crear elementos visuales para mostrarlo
    arreglo.sort((a, b) => a - b); // Orden ascendente
    for (let i of arreglo) {
        let caja = document.createElement("div");
        caja.className = "col-md-1 column-green";
        let valor = document.createElement("h3");
        valor.textContent = i;
        caja.appendChild(valor);
        containerArregloOrdenado.insertAdjacentElement("beforeend", caja);
    }
}
