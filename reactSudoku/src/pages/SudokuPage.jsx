import React, { useState, useEffect } from "react";
import tester from "../utils/logic.js";
import SubmitButton from "../components/SubmitButton";
import "../App.css";

const SudokuPage = () => {
  const [count, setCount] = useState(0);
  const [answers, setAnswers] = useState({}); // Use object for answers
  const [sudokuObject, setSudokuObject] = useState(null); // Store the board

  // Initialize Sudoku board only on first render
  useEffect(() => {
    const storedObject = localStorage.getItem("mySudokuObject");

    if (storedObject) {
      // Convert back to object
      const retrievedObject = JSON.parse(storedObject);
      setSudokuObject(retrievedObject );
    } else {
      // Generate a new board
      const object = tester();
      setSudokuObject(object);
      addSudokuToStorage(object);
    }
  }, []); // Empty dependency array ensures it runs only once

  const addAnswer = (id, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: value,
    }));
  };

  const addSudokuToStorage = (sudoku) => {
    localStorage.setItem("mySudokuObject", JSON.stringify(sudoku));
  };
  console.log("sudokuObject", sudokuObject);
  // Add object to local storage
  if (!sudokuObject) return <p>Loading Sudoku...</p>;

  return (
    <>
      <table
        id="grid"
        className="myTable"
        style={{
          marginTop: "5%",
          borderColor: "white",
          borderWidth: "4px",
          borderStyle: "solid",
        }}
      >
        <tbody>
          {sudokuObject.sudoku.row.map((num) => {
            return (
              <tr className="row" key={num}>
                {sudokuObject.sudoku.column.map((num2) => {
                  let key = `${num},${num2}`;
                  return (
                    <td key={key} id="hello" className={`sudokuSlot ${sudokuObject.sudoku.vertical.includes(num) ? "verticalEdge": ""} ${sudokuObject.sudoku.sides.includes(num2) ? "sideEdge" : ""}`}>
                      {sudokuObject.incomplete?.[key] ? (
                        <text>{sudokuObject.playerboard[key]}</text>
                      ) : (
                        <input
                          onChange={(e) => addAnswer(key, e.target.value)}
                          className="sudokuInput"
                          type="text"
                        />
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <SubmitButton />
    </>
  );
};

export default SudokuPage;
