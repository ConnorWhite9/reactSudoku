import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import tester from './utils/logic.js';

function App() {
  const [count, setCount] = useState(0)
  const [answers, setAnswers] = useState(new Map())

  const addAnswer = (id, value) => {
    setAnswers((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(id, value);
      console.log("newMap", newMap);
      return newMap;
    })
  }
  //Add object to local storage
  const object = tester();
  return (
    <>
      <table id="grid" class="myTable" style={{ marginTop: "5%", borderColor: "white", borderWidth: "4px", borderStyle: "solid" }}     >
        {object.sudoku.row.map(num => {
          return (
            <tr className="row">
              {object.sudoku.column.map(num2 => {
                let key = `${num},${num2}`;
                return (
                  <td
                    key={key}
                    id="hello"
                    className={`sudokuSlot ${object.sudoku.vertical.includes(num) ? "verticalEdge" : ""} ${object.sudoku.sides.includes(num2) ? "sideEdge" : ""}`}
                  >
                    {object.incomplete?.get(key) ? <text>{object.playerboard.get(key)}</text> : <input onChange={(e) => addAnswer(key, e.target.value)} className="sudokuInput" type="text" />}
                  </td>
                );
              })}
            </tr>

          );
        })}
      </table>
    </>
  )
}

export default App

