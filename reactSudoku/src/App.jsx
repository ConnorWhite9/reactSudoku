import React, { useState, useEffect } from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import SudokuPage from './pages/SudokuPage';
import Test from './pages/Test';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sudokuPage/:type" element={<SudokuPage />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </>
  );
}

export default App

