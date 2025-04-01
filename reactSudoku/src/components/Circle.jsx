import React from "react";
import '../index.css'

function Circle() {
    return (
        <>
            <p className="loading-title">Sudoku is Loading</p>
            <div id="spinner" className="spinner"></div>
        </>
    );
}

export default Circle;