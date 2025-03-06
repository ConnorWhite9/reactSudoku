import React, { useState, useEffect } from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SudokuPage from './pages/SudokuPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sudokuPage" element={<SudokuPage />} />
        
      </Routes>
    </Router>
  );
}

export default App

