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
        <p>Hello there</p>
      </div>
    </>
  )
}

export default App
