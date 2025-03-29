import React, { useState, useEffect } from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SudokuPage from './pages/SudokuPage';
import Test from './pages/Test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sudokuPage/:type" element={<SudokuPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App

