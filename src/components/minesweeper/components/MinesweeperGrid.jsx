import './MinesweeperGrid.css';

import { useState } from "react"
import MinesweeperCell from "./MinesweeperCell";
import deserticBackground from '/src/assets/minesweeper/minesweeper-background.jpg'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Cells containing the value : 0 = no mine, -1 = mine
function createGrid(gridSize, minesNumber) {
    const grid = Array.from({ length: gridSize }, () =>
        Array(gridSize).fill(0)
    );

    let placedMines = 0;

    while (placedMines < minesNumber) {
        const row = getRandomInt(gridSize);
        const col = getRandomInt(gridSize);

        if (grid[row][col] !== -1){
            grid[row][col] = -1;
            placedMines++;
        }
    }

    return grid;
}


export default function MinesweeperGrid({isGameOver, gameOver, gridSize, minesNumber,key, setScore, score, isFlagMode}){
    const grid =  useState(() => createGrid(gridSize, minesNumber))[0];
    const maxScore = (gridSize*gridSize) - minesNumber;

    const style = {
    "--grid-size": gridSize,
        backgroundImage: `url("${deserticBackground}")`,
        backgroundSize: "cover",
    };

    return (
        <section key={key} className="minesweeper-grid-container" style={style}>

        {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
               <MinesweeperCell gameOver={gameOver} setScore={setScore} score={score} isFlagMode={isFlagMode} cellType={cell} grid={grid} position={[rowIndex,colIndex]} /> 
            ))
            
        ))}

        {isGameOver ?
            <div className='minesweeper-gameover-modal'>
                <h2>GAME OVER</h2>
            </div>
        :
            null
        }

        {score === maxScore
            ?
            <div className='minesweeper-gameover-modal'>
                <h2>WIN</h2>
            </div>
            :
            null
        }

        </section>
    )

}