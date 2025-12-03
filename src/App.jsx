import { useState, useRef } from 'react'
import './App.css'
import { dfs, bfs } from './algorithms'
import Grid from './Grid'
import SortVisualizer from './SortVisualizer'
import Header from './Header'

function App() {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [drawValue, setDrawValue] = useState(1)
  const [algo1, setAlgo1] = useState('DFS')
  const [algo2, setAlgo2] = useState('BFS')

  const [targetMode, setTargetMode] = useState(false)
  const [targetPos, setTargetPos] = useState([10, 10])

  const timeoutIds = useRef([])

  const generateGrid = (target) => {
    const grid = Array(15).fill().map(() => Array(15).fill(0))
    grid[target[0]][target[1]] = 3
    return grid
  }

  const [maze, setMaze] = useState(() => generateGrid(targetPos))
  const [maze2, setMaze2] = useState(() => generateGrid(targetPos))

  const handleCell = (gridId, row, col, newValue) => {
    if (gridId === 1) {
      setMaze(prev => prev.map((r, ri) => r.map((c, ci) => (ri === row && ci === col ? newValue : c))))
    } else if (gridId === 2) {
      setMaze2(prev => prev.map((r, ri) => r.map((c, ci) => (ri === row && ci === col ? newValue : c))))
    }
  }

  const handleMouseDown = (row, col, currentVal) => {
    if (targetMode) {
      handleCell(1, targetPos[0], targetPos[1], 0)
      handleCell(2, targetPos[0], targetPos[1], 0)
      setTargetPos([row, col])
      handleCell(1, row, col, 3)
      handleCell(2, row, col, 3)
      setTargetMode(false)
      return
    }

    setIsMouseDown(true)
    const newVal = currentVal === 1 ? 0 : 1
    setDrawValue(newVal)
    handleCell(1, row, col, newVal)
    handleCell(2, row, col, newVal)
  }

  const handleMouseEnter = (row, col) => {
    if (!isMouseDown) return
    if (row === targetPos[0] && col === targetPos[1]) return
    handleCell(1, row, col, drawValue)
    handleCell(2, row, col, drawValue)
  }

  const handleMouseUp = () => setIsMouseDown(false)

  const runAlgorithm = (name, grid, history) => {
    if (name === 'DFS') dfs(0, 0, targetPos, grid, new Set(), history)
    if (name === 'BFS') bfs(0, 0, targetPos, grid, new Set(), history)
  }

  const visualizePath = () => {
    timeoutIds.current.forEach(clearTimeout)
    timeoutIds.current = []

    const mazeCopy1 = JSON.parse(JSON.stringify(maze))
    const mazeCopy2 = JSON.parse(JSON.stringify(maze2))
    const history1 = []
    const history2 = []

    runAlgorithm(algo1, mazeCopy1, history1)
    runAlgorithm(algo2, mazeCopy2, history2)

    const maxSteps = Math.max(history1.length, history2.length)

    for (let i = 0; i < maxSteps; i++) {
      const id = setTimeout(() => {
        if (i < history1.length) {
          const step = history1[i]
          handleCell(1, step.r, step.c, step.val)
        }
        if (i < history2.length) {
          const step = history2[i]
          handleCell(2, step.r, step.c, step.val)
        }
      }, 40 * i)
      timeoutIds.current.push(id)
    }
  }

  const handleReset = () => {
    timeoutIds.current.forEach(clearTimeout)
    timeoutIds.current = []
    setMaze(generateGrid(targetPos))
    setMaze2(generateGrid(targetPos))
  }

  return (
    <div>
      <Header></Header>
      <div id='container' onMouseUp={handleMouseUp}>
        

        <div className='grids'>
          <div className='grid-wrapper'>
            <Grid mazeData={maze} handleMouseDown={handleMouseDown} handleMouseEnter={handleMouseEnter} handleMouseUp={handleMouseUp} />
            <select value={algo1} onChange={e => setAlgo1(e.target.value)}>
              <option value='DFS'>DFS</option>
              <option value='BFS'>BFS</option>
            </select>
          </div>

          <div className='grid-wrapper'>
            <Grid mazeData={maze2} handleMouseDown={handleMouseDown} handleMouseEnter={handleMouseEnter} handleMouseUp={handleMouseUp} />
            <select value={algo2} onChange={e => setAlgo2(e.target.value)}>
              <option value='DFS'>DFS</option>
              <option value='BFS'>BFS</option>
            </select>
          </div>
        </div>

        <div className='buttonGridMenu'>
          <button onClick={() => setTargetMode(!targetMode)}>Set Target</button>
          <button onClick={handleReset}>Reset Board</button>
          <button onClick={visualizePath}>Compare!</button>
        </div>
      
        <hr style={{ margin: '40px 0' }} />

        <SortVisualizer />
      </div>
    </div>
  )
}

export default App
