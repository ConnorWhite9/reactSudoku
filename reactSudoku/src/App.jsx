import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import tester from './utils/logic.js';

function App() {
  const [count, setCount] = useState(0)
  const object = tester();
  return (
    <>
      <table id="grid" class="myTable" style={{ marginTop: "5%", borderColor: "white", borderWidth: "4px", borderStyle: "solid" }}     >
        {object.sudoku.row.map(num => {
          return (
            <tr className="row" >
              {object.sudoku.column.map(num2 => {
                
                  let key = `${num},${num2}`;
                  return (<td  id="hello" className={`sudokuSlot ${object.sudoku.vertical.includes(num) ? "verticalEdge" : ""} ${object.sudoku.sides.includes(num2) ? "sideEdge" : ""}`}>{object.playerboard.get(key)}</td>);  // Explicit return
                
              })}
            </tr>
          );
        })}
      </table>
    </>
  )
}

export default App

