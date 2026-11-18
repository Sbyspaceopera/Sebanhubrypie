import { Routes, Route } from 'react-router'

import './App.css'
import GameGrid from './components/GameGrid'
import Layout from './components/Layout'
import MinesweeperLauncher from './components/minesweeper/MinesweeperLauncher'
import CheesyChess from './components/chess/CheesyChess'
import GameOfLife from './components/gameOfLife/GameOfLife'
import BrickBreaker from './components/brickBreaker/BrickBreaker'

export default function App(){

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<GameGrid />} />
        <Route path="snake" element={<h2>Replace by the Snake component</h2>} />
        <Route path="echecs" element={<CheesyChess />} />
        <Route path="gameOfLife" element={<GameOfLife />} />
        <Route path="dames" element={<h2>Replace by the Gambits component</h2>} />
        <Route path="demineur" element={<MinesweeperLauncher />} />
        <Route path="brickBreaker" element={<BrickBreaker />} />
      </Route>
    </Routes>
  )
}
