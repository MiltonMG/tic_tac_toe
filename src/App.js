import React, { useState } from "react";

export default function Board() {

  //*Status
  //state para manejar quien es el siguiente jugador (True: X, False: O)
  const [xIsNext, setXIsNext] = useState(true);

  //State para manejar el estado del tablero
  const [squares, setSquares] = useState(Array(9).fill(null));

  //*Functions
  //Manejador del click en el cuadrado
  function handleClick( position ){ 

    //Verificando si hay un ganador
    if(calculateWinner(squares)) return;

    //Si el cuadrado ya tiene un valor, retornamos y no hacemos nada
    if (squares[position]) {
      return;
    }

    //Creamos una replica del array con los valores del tablero
    const squareClicked = squares.slice();
    
    //Verificamos quien es el siguiente jugador X o O
    if (xIsNext) {
      squareClicked[position] = "X";
    } else {
      squareClicked[position] = "O";
    }
    
    setSquares( squareClicked );
    setXIsNext( !xIsNext );
  }

  function calculateWinner(squares) {
    const lines = [//Todas las opciones para ganar
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    //Recorrido para analizar si alguien cumplio las opciones para ganar 
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a]) {
        return squares[a];
      }
    }
    return null;
  }
  
  //* instrucciones para anunciar quien sigue o quien gano
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Ganador: " + winner;
  } else {
    status = "Siguiente jugador: " + (xIsNext ? "X" : "O");
  }
  
  //*HTML
  return (
    <React.Fragment>

      <div className="status">{status}</div>

      <div className="board-row"> {/*Primera fila */}

        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />

      </div>

      <div className="board-row"> {/*Segunda fila */}

        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />

      </div>

      <div className="board-row"> {/*Tercera fila */}

        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />

      </div>

    </React.Fragment>
  );
}


function Square({ value, onSquareClick }) {

  return(
    <React.Fragment>
      <button className="square" onClick={onSquareClick}>{ value }</button>
    </React.Fragment>
  )
}
