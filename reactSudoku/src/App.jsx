import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import tester from './utils/logic.js';

function App() {
  const [count, setCount] = useState(0)
  const object = tester();
  const vertical4 = [2];
  const vertical9 = [3, 6];
  const sides4 = [1];
  const sides9 = [2, 5];
  return (
    <>
      <table id="grid" class="myTable" style={{ marginTop: "5%", borderColor: "white", borderWidth: "4px", borderStyle: "solid" }}     >
        {object.sudoku.row.map(num => {
          return (
            <tr className="row" >
              {object.sudoku.column.map(num2 => {
                
                  let key = `${num},${num2}`;
                  return (<td style={{width: "50px", borderStyle: "solid", borderWidth: "2px"}}id="hello" className="{{choice}} piece identifier" >{object.playerboard.get(key)}</td>);  // Explicit return
                
              })}
            </tr>
          );
        })}
      </table>
    </>
  )
}

export default App

