// Acceder al parrafo
const parrafo = document.querySelector("#idParrafo");
console.log(parrafo);

// Acceder a cada boton por medio de la API DOM
const btnSumar = document.querySelector("#idBtnSumar");
const btnRestar = document.querySelector("#idBtnRestar");
const btnMultiplicar = document.querySelector("#idBtnMultiplicar");
const btnDividir = document.querySelector("#idBtnDividir");

//Agregamos el evento click a los botones y se le asigna la función correspondiente
btnSumar.addEventListener("click", sumar);
btnRestar.addEventListener("click", restar);
btnMultiplicar.addEventListener("click", multiplicar);
btnDividir.addEventListener("click", dividir);

// Creamos la variable que contrendra el resultado de la operación
let resultado;


//funciones de operaciones
function sumar() {
    //Obtenemos los valores ingresados por el usuario
    let numero1 = parseInt(prompt("Ingrese el primer número"));
    let numero2 = parseInt(prompt("Ingrese el segundo número"));

    //Realizamos la operación
    resultado = numero1 + numero2;

    //Mostramos el resultado
    parrafo.innerHTML = `${numero1} + ${numero2} = ${resultado}`;
}

function restar() {
    //Obtenemos los valores ingresados por el usuario
    let numero1 = parseInt(prompt("Ingrese el primer número"));
    let numero2 = parseInt(prompt("Ingrese el segundo número"));

    //Realizamos la operación
    resultado = numero1 - numero2;

    //Mostramos el resultado
    parrafo.innerHTML = `${numero1} - ${numero2} = ${resultado}`;
}

function multiplicar() {
    //Obtenemos los valores ingresados por el usuario
    let numero1 = parseInt(prompt("Ingrese el primer número"));
    let numero2 = parseInt(prompt("Ingrese el segundo número"));

    //Realizamos la operación
    resultado = numero1 * numero2;

    //Mostramos el resultado
    parrafo.innerHTML = `${numero1} * ${numero2} = ${resultado}`;
}

function dividir() {
    //Obtenemos los valores ingresados por el usuario
    let numero1 = parseInt(prompt("Ingrese el primer número"));
    let numero2 = parseInt(prompt("Ingrese el segundo número"));

    //Realizamos la operación
    resultado = numero1 / numero2;

    //Mostramos el resultado
    parrafo.innerHTML = `${numero1} / ${numero2} = ${resultado}`;
}
