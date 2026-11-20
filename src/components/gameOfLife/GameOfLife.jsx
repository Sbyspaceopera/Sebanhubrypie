// Adaptation of https://github.com/Keaexe/gameOfLife
import { useEffect, useRef } from "react";
import Board from "./components/Board";
import Controls from "./components/Controls"
import Settings from "./components/Settings"
import StatsPanel from "./components/StatPanel"
import "./style.css";

export default function GameOfLife() {
  const handlersRef = useRef({});

  useEffect(() => {
    let tps = 3; // default tick per second
    let intervalID = 0; // will contain ID of the setInterval of tick
    let board, ticks, livingCells, tickB, pauseB, continueB, squares;

    function init() {
      board = document.getElementById("board");
      ticks = document.getElementById("ticks");
      livingCells = document.getElementById("livingCells");
      tickB = document.getElementById("tickB");
      pauseB = document.getElementById("pauseB");
      continueB = document.getElementById("playB");

      pauseB.disabled = true;

      board.innerHTML = "";
      createBoard();

      if (localStorage.getItem("gol-theme") !== "light") {
        document.body.classList.add("dark-mode");
      }
    }

    function createBoard() {
      let boardSize = Number(
        window.prompt("Entrez la taille de la grille\nValeur par défaut : 15") || 15
      );
      while (!isBetween(boardSize, 2, 100)) {
        boardSize = Number(
          window.prompt(
            "La taille doit être comprise entre 2 et 100\nEntrez la taille de la grille"
          ) || 15
        );
      }

      squares = [];
      for (let i = 0; i < boardSize; i++) {
        let tr = document.createElement("tr");
        board.appendChild(tr);
        squares[i] = [];
        for (let j = 0; j < boardSize; j++) {
          squares[i][j] = document.createElement("td");
          squares[i][j].isAlive = false;
          squares[i][j].livingNeighbors = 0;
          squares[i][j].addEventListener("click", () => {
            toggleLife(i, j);
          });
          tr.appendChild(squares[i][j]);
        }
      }
    }

    function delBoard() {
      endContinuousTick();
      board.innerHTML = "";
    }

    function isBetween(nb, minValue, maxValue) {
      return !Number.isNaN(Number(nb)) && nb <= maxValue && nb >= minValue;
    }

    function toggleLife(YPosition, XPosition) {
      if (squares[YPosition][XPosition].isAlive) {
        squares[YPosition][XPosition].isAlive = false;
        livingCells.textContent--;
      } else {
        squares[YPosition][XPosition].isAlive = true;
        livingCells.textContent++;
      }
      squares[YPosition][XPosition].classList.toggle("alive");
    }

    function isOutOfBound(YPosition, XPosition) {
      return (
        YPosition >= squares.length ||
        XPosition >= squares.length ||
        YPosition < 0 ||
        XPosition < 0
      );
    }

    function tick() {
      for (let YPosition = 0; YPosition < squares.length; YPosition++) {
        for (let XPosition = 0; XPosition < squares.length; XPosition++) {
          if (squares[YPosition][XPosition].isAlive) {
            for (let i = -1; i <= 1; i++) {
              for (let j = -1; j <= 1; j++) {
                if (
                  (i !== 0 || j !== 0) &&
                  !isOutOfBound(YPosition + i, XPosition + j)
                ) {
                  squares[YPosition + i][XPosition + j].livingNeighbors++;
                }
              }
            }
          }
        }
      }
      for (let YPosition = 0; YPosition < squares.length; YPosition++) {
        for (let XPosition = 0; XPosition < squares.length; XPosition++) {
          if (squares[YPosition][XPosition].isAlive) {
            if (
              squares[YPosition][XPosition].livingNeighbors > 3 ||
              squares[YPosition][XPosition].livingNeighbors < 2
            ) {
              toggleLife(YPosition, XPosition);
            }
          } else {
            if (squares[YPosition][XPosition].livingNeighbors === 3) {
              toggleLife(YPosition, XPosition);
            }
          }
          squares[YPosition][XPosition].livingNeighbors = 0;
        }
      }

      ticks.textContent++;
      if (livingCells.textContent == 0) {
        endContinuousTick();
      }
    }

    function continuousTick() {
      intervalID = setInterval(tick, 1000 / tps);
      pauseB.disabled = false;
      continueB.disabled = true;
      tickB.disabled = true;
    }

    function endContinuousTick() {
      clearInterval(intervalID);
      pauseB.disabled = true;
      continueB.disabled = false;
      tickB.disabled = false;
    }

    function reset() {
      endContinuousTick();
      for (let i = 0; i < squares.length; i++) {
        for (let j = 0; j < squares.length; j++) {
          squares[i][j].isAlive = false;
          squares[i][j].classList.remove("alive");
        }
      }
      livingCells.textContent = 0;
      ticks.textContent = 0;
    }

    function toggleTheme() {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "gol-theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light"
      );
    }

    function setTps() {
      endContinuousTick();
      tps = Number(
        window.prompt("Entrez le nombre de ticks par seconde\n(par défaut : 3)") || 3
      );
      while (!isBetween(tps, 0.1, 10)) {
        tps = Number(
          window.prompt(
            "Le nombre de ticks par seconde doit être compris entre 0.1 et 10\nEntrez le nombre de tps"
          ) || 3
        );
      }
    }

    handlersRef.current = {
      setTps,
      resize: () => {
        delBoard();
        createBoard();
      },
      tick,
      continuousTick,
      endContinuousTick,
      reset,
      toggleTheme,
    };

    init();

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="GoL">
      <Settings
        onSetTps={() => handlersRef.current.setTps?.()}
        onResize={() => handlersRef.current.resize?.()}
      />

      <div className="game-container">
        <h1>The Game of Life</h1>
        <StatsPanel />
        <Controls
          onTick={() => handlersRef.current.tick?.()}
          onPlay={() => handlersRef.current.continuousTick?.()}
          onPause={() => handlersRef.current.endContinuousTick?.()}
          onReset={() => handlersRef.current.reset?.()}
        />
        <Board />
      </div>

      <button
        className="theme-toggle"
        onClick={() => handlersRef.current.toggleTheme?.()}
      >
        🌙 / ☀️
      </button>
    </div>
  );
}
