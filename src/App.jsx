import { Routes, Route } from 'react-router'

import './App.css'
import GameGrid from './components/GameGrid'
import Layout from './components/Layout'

export default function App(){

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<GameGrid />} />
        <Route path="snake" element={<h2>Replace by the Snake component</h2>} />
        <Route path="echecs" element={<h2>Replace by the Chess component</h2>} />
        <Route path="dames" element={<h2>Replace by the Gambits component</h2>} />
        <Route path="demineur" element={<h2>Replace by the Minesweeper component</h2>} />
      </Route>
    </Routes>
  )
}
