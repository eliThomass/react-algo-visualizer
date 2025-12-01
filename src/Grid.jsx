const Grid = ({ mazeData, handleMouseDown, handleMouseEnter, handleMouseUp }) => {
  return (
    <p className='grid' onMouseLeave={handleMouseUp}>
      {mazeData.map((row, rowIndex) => (
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
                : item === 5 ? "rgba(131, 255, 247, 1)"
                : "rgb(233, 233, 233)"
            }}>
              
            </button>
          ))}
        </div>
      ))}
    </p>
  )
}

export default Grid