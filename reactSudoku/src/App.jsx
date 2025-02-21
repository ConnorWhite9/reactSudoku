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
      <div>
        {object.sudoku.row.map(num => {
          return (
            <div className="row">
              {object.sudoku.column.map(num2 => {
                
                  let key = `${num},${num2}`;
                  return (<div className="column"><h1 key={key}>{object.playerboard.get(key)}</h1></div>);  // Explicit return
                
              })}
            </div>
          );
        })}
      </div>
    </>
  )
}

export default App

