import { useState } from 'react'
import './App.css'
import { dfs, bfs } from './algorithms'

function App() {
  const [maze, setMaze] = useState(() => {
    return Array(10).fill().map(() => Array(10).fill(0));
  })

  const handleCell = (row, col, newValue) => {
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
  };

  const visualizePathDFS = () => {
    let mazeCopy = JSON.parse(JSON.stringify(maze));
    let history = [];
    
    dfs(0, 0, [2, 2], mazeCopy, new Set(), history);

    history.forEach((step, index) => {
      setTimeout(() => {
        handleCell(step.r, step.c, step.val);
      }, 100 * index);
    });
  };

  const visualizePathBFS = () => {
    let mazeCopy = JSON.parse(JSON.stringify(maze));
    let history = [];
    
    bfs(0, 0, [2, 2], mazeCopy, new Set(), history);

    history.forEach((step, index) => {
      setTimeout(() => {
        handleCell(step.r, step.c, step.val);
      }, 100 * index);
    });
  };

  return (
    <>
      <div id='container'>
        <button onClick={() => visualizePathDFS()}> DFS Visualization </button>
        <button onClick={() => visualizePathBFS()}> BFS Visualization </button>
        <p className='grid'>{maze.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((item, itemIndex) => (
              <button key={itemIndex} onClick={() => handleCell(rowIndex, itemIndex, 1)} className='cell' style={{
                backgroundColor: 
                  item === 1 ? "black" 
                  : item === 2 ? "rgba(247, 244, 86, 1)" 
                  : item === 3 ? "rgba(97, 178, 70, 1)" 
                  : item === 4 ? "red" 
                  : "rgb(233, 233, 233)"
              }}>
                
              </button>
            ))}
          </div>
        ))}</p>
      </div>
    </>
  )
};

export default App
