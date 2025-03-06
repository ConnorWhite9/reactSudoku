import React from "react";
import { useState, useEffect } from 'react';
import tester from '../utils/logic.js';
import SubmitButton from '../components/SubmitButton';


const SudokuPage = () =>{
    const [count, setCount] = useState(0)
    const [answers, setAnswers] = useState(new Map())

    const [sudokuObject, setSudokuObject] = useState(null); // Store the board

    // Initialize Sudoku board only on first render
    useEffect(() => {
        const object = tester();
        setSudokuObject(object);
    }, []); // Empty dependency array ensures it runs only once

    const addAnswer = (id, value) => {
        setAnswers((prevMap) => {
        const newMap = new Map(prevMap);
        newMap.set(id, value);
        console.log("newMap", newMap);
        return newMap;
        })
    }
    //Add object to local storage
    if (!sudokuObject) return <p>Loading Sudoku...</p>;

    return (
        <>
        <table id="grid" class="myTable" style={{ marginTop: "5%", borderColor: "white", borderWidth: "4px", borderStyle: "solid" }}     >
            {sudokuObject.sudoku.row.map(num => {
            return (
                <tr className="row">
                {sudokuObject.sudoku.column.map(num2 => {
                    let key = `${num},${num2}`;
                    return (
                    <td
                        key={key}
                        id="hello"
                        className={`sudokuSlot ${sudokuObject.sudoku.vertical.includes(num) ? "verticalEdge" : ""} ${sudokuObject.sudoku.sides.includes(num2) ? "sideEdge" : ""}`}
                    >
                        {sudokuObject.incomplete?.get(key) ? <text>{sudokuObject.playerboard.get(key)}</text> : <input onChange={(e) => addAnswer(key, e.target.value)} className="sudokuInput" type="text" />}
                    </td>
                    );
                })}
                </tr>

            );
            })}
        </table>
        <SubmitButton />
        </>
    )
}

export default SudokuPage;