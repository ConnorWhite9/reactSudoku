import React, { useState, useEffect, useRef } from "react";
import tester from "../utils/logic.js";
import checker from "../utils/checker.js";
import SubmitButton from "../components/SubmitButton";
import Modal from "../components/Modal";
import "../App.css";

const SudokuPage = () => {
  const [count, setCount] = useState(0);
  const [answers, setAnswers] = useState({}); // Use object for answers
  const [sudokuObject, setSudokuObject] = useState(null); // Store the board
  const childRef = useRef(null);

  // Initialize Sudoku board only on first render
  useEffect(() => {
    const storedObject = localStorage.getItem("mySudokuObject");
    //If sudoku is in local storage
    if (storedObject) {
      // Convert back to object
      const retrievedObject = JSON.parse(storedObject);

      //Grab answers dictionary from local storage
      const storedAnswers = localStorage.getItem("answers");
      const retrievedAnswers = JSON.parse(storedAnswers);

      //Set useStates to the values grabbed from localStorage
      setSudokuObject(retrievedObject);
      setAnswers(retrievedAnswers);
      
    } else {
      // Generate a new board
      const object = tester();
      try {
        localStorage.removeItem("answers");
      } finally {
        console.log("Your answers should have been removed if they existed.");
      }
      setSudokuObject(object);
      addSudokuToStorage(object);
    }
  }, []); // Empty dependency array ensures it runs only once

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]); // Sync answers to local storage whenever it updates

  const addAnswer = (id, value) => {
    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers, [id]: value };
      console.log("newAnswers", newAnswers)
      return newAnswers;
    });

  };

  const addSudokuToStorage = (sudoku) => {
    localStorage.setItem("mySudokuObject", JSON.stringify(sudoku));
  };

  const showChild = () => {
    if (childRef.current) {
    childRef.current.style.display = "block";  // Show the child component
    }
  };

  const hideChild = () => {
      if (childRef.current) {
      childRef.current.style.display = "none";  // Hide the child component
      }
  }; 

  const checkAnswers = () => {
    let completed = answers;
    for (const slot in sudokuObject.incomplete) {
      completed[slot] = sudokuObject.incomplete[slot];
    }
    console.log("completed", completed);
    if (checker) {
      console.log("it was right");
    } else {
      console.log("It was wrong");
    }
  }

  // Add object to local storage
  if (!sudokuObject) return <p>Loading Sudoku...</p>;

  return (
    <>
      <Modal ref={childRef} />
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
                      {/*If number for this tile given represent it as a piece of text*/}
                      {sudokuObject.incomplete?.[key] ? (
                        <text>{sudokuObject.playerboard[key]}</text>
                      ) : (
                        <input
                          onChange={(e) => addAnswer(key, Number(e.target.value))}
                          className="sudokuInput"
                          type="number"
                          value={ answers?.[key] ? answers?.[key]:""}
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
      <SubmitButton action={checkAnswers} />
    </>
  );
};

export default SudokuPage;
