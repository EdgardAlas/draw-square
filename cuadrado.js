const canvas = document.querySelector("#myCanvas");
const x1 = document.querySelector("#x1")
const y1 = document.querySelector("#y1")
const x2 = document.querySelector("#x2")
const y2 = document.querySelector("#y2")

let valorAnteriorX1 = 0

const form = document.querySelector("#form")
let cuadrado_anterior = []


const plano = canvas.getContext("2d");

const ancho = canvas.width / 2,
    alto = canvas.height / 2

plano.translate(canvas.width / 2, canvas.height / 2);
plano.scale(1, -1);

const pintarPunto = (x, y, multiplicar = false) => {

    let multiplicador = 1;

    //Se multiplica por 10 solamente para la escala pintar a escala
    multiplicar && (multiplicador = 10)

    plano.fillRect(x * multiplicador, y * multiplicador, 3, 3);
}

const dibujarLinea = (x1, y1, x2, y2) => {

    //Se multiplica por 10 solamente para la escala pintar a escala
    x1 *= 10;
    x2 *= 10;
    y1 *= 10;
    y2 *= 10;

    dx = (x2 - x1);
    dy = (y2 - y1);

    let pasos = 0;

    if (Math.abs(dx) > Math.abs(dy)) {
        pasos = Math.abs(dx);
    } else {
        pasos = Math.abs(dy);
    }

    const siguienteX = dx / pasos;
    const siguienteY = dy / pasos;

    let x = x1;
    let y = y1;

    for (let i = 0; i < pasos; i++) {
        x += siguienteX;
        y += siguienteY;

        pintarPunto(x, y);
    }


}


const dibujarCuadrado = (x1, y1, x2, y2) => {

    cuadrado_anterior = [x1, y1, x2, y2]

    plano.moveTo(0, 0)

    // x1,y1 -> x2,y1
    dibujarLinea(x1, y1, x2, y1)

    // x1,y1 -> x1,y2
    dibujarLinea(x1, y1, x1, y2)

    // x1,y2 -> x2,y2
    dibujarLinea(x1, y2, x2, y2)

    // x2,y2 -> x2,y1
    dibujarLinea(x2, y2, x2, y1)

}

const dibujarPlano = () => {

    plano.fillStyle = `#000`;
    dibujarLinea(-ancho, 0, ancho, 0)
    dibujarLinea(0, -alto, 0, alto)
}




form.addEventListener("submit", (e) => {
    e.preventDefault()

    dibujarPlano()

    const valor_x1 = x1.value
    const valor_y1 = y1.value
    const valor_x2 = x2.value
    const valor_y2 = y2.value

    const color = Math.floor(Math.random() * 16777215).toString(16);

    plano.fillStyle = `#fff`;

    console.log(...cuadrado_anterior);

    dibujarCuadrado(...cuadrado_anterior)

    plano.fillStyle = `#${color}`;
    dibujarCuadrado(valor_x1, valor_y1, valor_x2, valor_y2)
})

dibujarPlano()

