//Constructores

function Seguro(marca, año, tipo) {
    this.marca = marca;
    this.año = año;
    this.tipo = tipo;
}

//Realiza la cotizacion con los datos que intodujo el usuario


Seguro.prototype.cotizar = function () {

    let cantidad;
    const base = 2500;

    switch (this.marca) {

        case '1':
            cantidad = base * 1.15;
            break;

        case '2':
            cantidad = base * 1.05;
            break;

        case '3':
            cantidad = base * 1.45;
            break;
        default:
            break;
    }

    //Leer año
    const diferencia = new Date().getFullYear() - this.año;

    //El costo se reduce un 3% por cada año de antiguedad

    cantidad -= ((diferencia * 3) * cantidad) / 100;

    //Si el seguro elegido por el usuario es basico se multiplica por un 30%
    //Si el seguro elegido por el usuario es completo se multiplica por un 50%

    if (this.tipo === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }
    return cantidad;
}


function UI() { }

//Años para elegir
UI.prototype.elegirAño = function () {
    const max = new Date().getFullYear(),
        min = max - 20;

    const seleccionarAño = document.getElementById('año');

    for (let i = max; i > min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        seleccionarAño.appendChild(opcion);
    }
}

//Alertas en pantalla

UI.prototype.mostrarMensaje = function (mensaje, tipo) {
    const div = document.createElement('div');
    if (tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje');
    div.textContent = mensaje;

    //Insertar en HTML
    const formulario = document.getElementById('cotizar-seguro');
    formulario.insertBefore(div, document.getElementById('resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);

}

UI.prototype.mostrarResultado = function (total, seguro) {

    const { marca, año, tipo } = seguro;

    let nacionalidadMarca;

    switch (marca) {

        case '1':
            nacionalidadMarca = 'Americano';
            break;

        case '2':
            nacionalidadMarca = 'Asiatico';
            break;

        case '3':
            nacionalidadMarca = 'Europeo';
            break;

        default:

            break;
    }

    //Crear el resultado

    const div = document.createElement('DIV');
    div.classList.add('div-resultado');
    div.innerHTML =
        `
    <p class="header">Resumen de la cotización</p>
    <p class="font-bold">Marca: <span class="font-normal">${nacionalidadMarca}</span></p>
    <p class="font-bold">Año: <span class="font-normal">${año}</span></p>
    <p class="font-bold">Tipo de seguro: <span class="font-normal capitalize">${tipo}</span></p>
    <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>
    `

    const resultadoDiv = document.getElementById('resultado');

    //Mostrar animacion de carga

    const animacion = document.getElementById('cargando');
    animacion.style.display = 'block';

    setTimeout(() => {
        animacion.style.display = 'none';
        resultadoDiv.appendChild(div); //Cuando se elimina la animacion se muestra el div con el resultado
    }, 3000);
}


//Instanciar UI

const ui = new UI();
console.log(ui);

document.addEventListener('DOMContentLoaded', () => {
    ui.elegirAño(); //Llena el select de año
})


//Validar formulario

listener();
function listener() {
    const formulario = document.getElementById('cotizar-seguro');
    formulario.addEventListener('submit', cotizar);
}
function cotizar(e) {
    e.preventDefault();

    //Leer marca seleccionada

    const marca = document.getElementById('marca').value;

    //Leer año seleccionado

    const año = document.getElementById('año').value;

    //Leer tipo de seguro

    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //Muestra los avisos

    if (marca === '' || año === '' || tipo === '') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');

    } else {
        ui.mostrarMensaje('Cotizando... ', 'correcto');
    }

    //Mostrar solo un div con el resultado

    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }





    //Instanciar en seguro

    const seguro = new Seguro(marca, año, tipo);
    const total = seguro.cotizar();


    //Utilizar el prototype que va a cotizar

    ui.mostrarResultado(total, seguro);
}

