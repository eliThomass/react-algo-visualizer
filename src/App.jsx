import { useState } from 'react'
import './App.css'
import { dfs, bfs } from './algorithms'

function App() {

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [drawValue, setDrawValue] = useState(1);

  const [maze, setMaze] = useState(() => {
    return Array(15).fill().map(() => Array(15).fill(0));
  })
  const [maze2, setMaze2] = useState(() => {
    return Array(15).fill().map(() => Array(15).fill(0));
  })

  const handleCell = (type, row, col, newValue) => {
    if(type == 'DFS') {
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
    if(type == 'BFS') {
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
    setIsMouseDown(true);
    
    const newVal = currentVal === 1 ? 0 : 1; 
    setDrawValue(newVal);
    handleCell(row, col, newVal);
    handleCell('DFS', row, col, drawValue);
    handleCell('BFS', row, col, drawValue);
  };

  const handleMouseEnter = (row, col) => {
    if (isMouseDown) {
      handleCell('DFS', row, col, drawValue);
      handleCell('BFS', row, col, drawValue);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const visualizePath = () => {
    let mazeCopy = JSON.parse(JSON.stringify(maze));
    let historyDFS = [];
    let mazeCopy2 = JSON.parse(JSON.stringify(maze));
    let historyBFS = [];
    
    bfs(0, 0, [10, 10], mazeCopy, new Set(), historyBFS);
    dfs(0, 0, [10, 10], mazeCopy2, new Set(), historyDFS);

    const maxSteps = Math.max(historyDFS.length, historyBFS.length);

    for (let i = 0; i < maxSteps; i++) {
      setTimeout(() => {
        if (i < historyDFS.length) {
          const stepA = historyDFS[i];
          handleCell('DFS', stepA.r, stepA.c, stepA.val);
        }

        if (i < historyBFS.length) {
          const stepB = historyBFS[i];
          handleCell('BFS', stepB.r, stepB.c, stepB.val);
        }

      }, 40 * i);
    }
  };

  return (
    <>
      <div id='container' onMouseUp={handleMouseUp}>
        <button onClick={() => visualizePath()}> DFS Visualization </button>

        <div className='grids'>
          <p className='grid' onMouseLeave={handleMouseUp}>{maze.map((row, rowIndex) => (
            <div key={rowIndex} className='row'>
              {row.map((item, itemIndex) => (
                <button key={itemIndex} 
                  onMouseDown={() => handleMouseDown(rowIndex, itemIndex, item)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, itemIndex)}
                  className='cell' style={{
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
         ))}
        </p>

        <p className='grid' onMouseLeave={handleMouseUp}>{maze2.map((row, rowIndex) => (
          <div key={rowIndex} className='row'>
            {row.map((item, itemIndex) => (
              <button key={itemIndex} 
                onMouseDown={() => handleMouseDown(rowIndex, itemIndex, item)}
                onMouseEnter={() => handleMouseEnter(rowIndex, itemIndex)}
                className='cell' style={{
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
          ))}
        </p>
        </div>
        
      </div>
    </>
  )
};

export default App
