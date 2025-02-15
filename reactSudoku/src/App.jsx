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
      <div>
        <p>Hello there</p>
      </div>
    </>
  )
}

export default App
