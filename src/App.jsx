import { useState, useRef } from 'react'
import './App.css'
import { dfs, bfs } from './algorithms'
import Grid from './Grid'

function App() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [drawValue, setDrawValue] = useState(1);
  const [algo1, setAlgo1] = useState('DFS');
  const [algo2, setAlgo2] = useState('BFS');

  const [targetMode, setTargetMode] = useState(false);
  const [targetPos, setTargetPos] = useState([10, 10]);

  const timeoutIds = useRef([]);

  const generateGrid = (target) => {
    const grid = Array(15).fill().map(() => Array(15).fill(0));
    grid[target[0]][target[1]] = 3; // 3 = Green Target
    return grid;
  };

  const [maze, setMaze] = useState(() => generateGrid([10, 10]));
  const [maze2, setMaze2] = useState(() => generateGrid([10, 10]));

  const handleCell = (gridId, row, col, newValue) => {
    if(gridId === 1) {
      setMaze((prevMaze) => {
        return prevMaze.map((gridRow, rIndex) => {
          if (rIndex === row) {
            return gridRow.map((cell, cIndex) => {
              return cIndex === col ? newValue : cell;
            });
          }
          return gridRow;
        });
      });
    }
    if(gridId === 2) {
      setMaze2((prevMaze) => {
        return prevMaze.map((gridRow, rIndex) => {
          if (rIndex === row) {
            return gridRow.map((cell, cIndex) => {
              return cIndex === col ? newValue : cell;
            });
          }
          return gridRow;
        });
      });
    }
  };

  const handleMouseDown = (row, col, currentVal) => {
    if (targetMode) {
      handleCell(1, targetPos[0], targetPos[1], 0);
      handleCell(2, targetPos[0], targetPos[1], 0);

      
      setTargetPos([row, col]);
      handleCell(1, row, col, 3);
      handleCell(2, row, col, 3);

      setTargetMode(false);
      return;
    }
    setIsMouseDown(true);
    
    const newVal = currentVal === 1 ? 0 : 1; 
    setDrawValue(newVal);
    handleCell(row, col, newVal);
    handleCell(1, row, col, drawValue);
    handleCell(2, row, col, drawValue);
  };

  const handleMouseEnter = (row, col) => {
    if (isMouseDown) {
      if (row === targetPos[0] && col === targetPos[1]) return;
      handleCell(1, row, col, drawValue);
      handleCell(2, row, col, drawValue);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const runAlgorithm = (name, grid, history) => {
    if (name === 'DFS') dfs(0, 0, targetPos, grid, new Set(), history);
    if (name === 'BFS') bfs(0, 0, targetPos, grid, new Set(), history);
  };

  const visualizePath = () => {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
    let mazeCopy = JSON.parse(JSON.stringify(maze));
    let history1 = [];
    let mazeCopy2 = JSON.parse(JSON.stringify(maze));
    let history2 = [];
    
    runAlgorithm(algo1, mazeCopy, history1);
    runAlgorithm(algo2, mazeCopy2, history2);

    const maxSteps = Math.max(history1.length, history2.length);

    for (let i = 0; i < maxSteps; i++) {
      const id = setTimeout(() => {
        if (i < history1.length) {
          const stepA = history1[i];
          handleCell(1, stepA.r, stepA.c, stepA.val);
        }

        if (i < history2.length) {
          const stepB = history2[i];
          handleCell(2, stepB.r, stepB.c, stepB.val);
        }
      }, 40 * i);

      timeoutIds.current.push(id);
    }
  };

  const handleReset = () => {
    timeoutIds.current.forEach(clearTimeout);
    timeoutIds.current = [];
    setMaze(generateGrid(targetPos));
    setMaze2(generateGrid(targetPos));
    
  }

  const handleTarget = () => {
    setTargetMode(!targetMode); // Toggle allowing user to cancel
  }

  return (
    <>
      <div id='container' onMouseUp={handleMouseUp}>
        <button onClick={() => visualizePath()}> Compare! </button>

        <div className='grids'>
          <div className='grid-wrapper'>
            <Grid 
              mazeData={maze}
              handleMouseDown={handleMouseDown}
              handleMouseEnter={handleMouseEnter}
              handleMouseUp={handleMouseUp}
            />
            <select value={algo1} onChange={(e) => setAlgo1(e.target.value)}>
              <option value="DFS">DFS</option>
              <option value="BFS">BFS</option>
            </select>
          </div>

          <div className='grid-wrapper'>
            <Grid 
              mazeData={maze2}
              handleMouseDown={handleMouseDown}
              handleMouseEnter={handleMouseEnter}
              handleMouseUp={handleMouseUp}
            />
            <select value={algo2} onChange={(e) => setAlgo2(e.target.value)}>
              <option value="DFS">DFS</option>
              <option value="BFS">BFS</option>
            </select>
          </div>
        </div>
        <button onClick={handleTarget} style={{marginTop: "10px", marginBottom: "10px"}}> Set Target </button>
        <button onClick={handleReset}> Reset Board </button>
        
      </div>
    </>
  )
};

export default App