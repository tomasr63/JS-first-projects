// Funcion comunes
//      vs
//   Flecha.



// Funcion comun:

// var colores = ['Red', 'Green', 'Blue', 'Black', 'White'];

// colores.forEach( function(color) {
//     console.log(color);
// });

// Funcion flecha:

// colores.forEach( (color) => {
//     console.log(color);
// });


// Funcion flecha sin parentesis:

// colores.forEach( color => {
//     console.log(color);
// });





// Contador

const contador = document.getElementById('cuenta');
const mas = document.getElementById('incr');
const menos = document.getElementById('decr');
const reset = document.getElementById('reset');

let numero = 0;

mas.addEventListener('click', () => {
    numero++;
    contador.innerHTML = numero;
});

menos.addEventListener('click', function() {
    if ( numero == 0 ) {}
    else {
        numero--;
        contador.innerHTML = numero;
    }
});

reset.addEventListener('click', () => {
    numero = 0;
    contador.innerHTML = numero;
});



// Tic Tac Toe



// const casilleros = document.querySelectorAll('.tateti .casillero');

// let turn = true;

// casilleros.forEach( casillero => {

//     casillero.addEventListener("click", () => {

//         if (turn) {
//             casillero.innerHTML = "x";
//             // document.createElement("i");
//             // classList.add("bi bi-x-lg");
//             // casillero.appendChild("i");
//         }
//         else {
//             casillero.innerHTML = "o";
//         }

//         turn = !turn;
//     })
// })


const gameBorard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = ["", "", "", "", "", "", "", "", ""];
let go = "circulo";
infoDisplay.textContent = "Circulo va primero";



function createBoard() {
    startCells.forEach( (cell, index) => {

        const cellElement = document.createElement("div");
        cellElement.classList.add("square");
        cellElement.id = index;
        cellElement.addEventListener("click", addGo);
        gameBorard.append(cellElement);

    })
}

createBoard();

function addGo(e) {
    const goDisplay = document.createElement("div");
    goDisplay.classList.add(go);
    e.target.append(goDisplay);
    go = go === "circulo" ? "cruz" : "circulo";
    infoDisplay.textContent = "Turno: " + go + "...";
    e.target.removeEventListener("click", addGo);
    checkScore();
}


function checkScore() {
    const allSquares = document.querySelectorAll(".square");
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    winningCombos.forEach(combo => {
        const circuloGana = combo.every(cell => 
            allSquares[cell].firstChild?.classList.contains("circulo")
        );

        if (circuloGana) {
            infoDisplay.textContent = "¡Gana Circulo!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            swal({
                title: "¡Gana Circulo!",
                button: {
                    text: "Reiniciar",
                    value: true,
                    visible: true,
                    className: "ttt-button-reset",
                    closeModal: true,
                  }
              });
              const botonReiniciar = document.querySelector(".ttt-button-reset");
              botonReiniciar.addEventListener("click", refrescar)
            return
        }
    });
    
    winningCombos.forEach(combo => {
        const cruzGana = combo.every(cell =>
            allSquares[cell].firstChild?.classList.contains("cruz")
        );

        if (cruzGana) {
            infoDisplay.textContent = "¡Gana Cruz!";
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)));
            swal({
                title: "¡Gana Cruz!",
                button: {
                    text: "Reiniciar",
                    value: true,
                    visible: true,
                    className: "ttt-button-reset",
                    closeModal: true,
                }
            });
            const botonReiniciar = document.querySelector(".ttt-button-reset");
            botonReiniciar.addEventListener("click", refrescar)
            return
        }
    });
}

function refrescar() {
    location.reload();
}