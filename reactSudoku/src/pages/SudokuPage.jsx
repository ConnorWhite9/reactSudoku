import React, { useState, useEffect, useRef } from "react";
import tester from "../utils/logic.js";
import checker from "../utils/checker.js";
import SubmitButton from "../components/SubmitButton";
import Modal from "../components/Modal";
import Error from "../components/Error";
import Circle from "../components/Circle";
import "../App.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SudokuPage = () => {
  const [count, setCount] = useState(0);
  const [answers, setAnswers] = useState({}); // Use object for answers
  const [sudokuObject, setSudokuObject] = useState(null); // Store the board
  const [error, setError] = useState("not enough");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const childRef = useRef(null);
  const errorRef = useRef(null);
  const [boolean, setBoolean] = useState(null);
  const { type } = useParams();
  const navigate = useNavigate();
  // Initialize Sudoku board only on first render
  useEffect(() => {
    const storedObject = localStorage.getItem("mySudokuObject");
    //If sudoku is in local storage
      if (storedObject) {
        // Convert back to object
        const retrievedObject = JSON.parse(storedObject);
        if (retrievedObject.sudoku.type !== type){
          const object = tester(type);
          try {
            localStorage.removeItem("mySudokuObject");
            localStorage.removeItem("answers");
          } finally {
            console.log("Your answers and previous board should have been removed if they existed.");
          }
          setSudokuObject(object);
          addSudokuToStorage(object);
        }
        //Grab answers dictionary from local storage
        const storedAnswers = localStorage.getItem("answers");
        const retrievedAnswers = JSON.parse(storedAnswers);
  
        //Set useStates to the values grabbed from localStorage
        setSudokuObject(retrievedObject);
        setAnswers(retrievedAnswers);
        
      } else {
        // Generate a new board
        const object = tester(type);
        try {
          localStorage.removeItem("answers");
        } finally {
          console.log("Your answers should have been removed if they existed.");
        }
        setSudokuObject(object);
        addSudokuToStorage(object);
      }
      setLoading(false);
    
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

  const reload = () => {
    localStorage.removeItem("mySudokuObject");
    localStorage.removeItem("answers");
    navigate("/");
  }

  const showChild = () => {
    if (childRef.current) {
    childRef.current.style.display = "block";  // Show the child component
    }
    setIsOpen(true);
  };

  const hideChild = () => {
      if (childRef.current) {
      childRef.current.style.display = "none";  // Hide the child component
      }
  }; 

  const showError = () => {
    if (errorRef.current) {
      errorRef.current.style.display = "block";
    }
  }

  const hideError = () => {
    if (errorRef.current) {
      errorRef.current.style.display = "none";
    }
  }

  const checkAnswers = () => {
    if (Object.keys(sudokuObject.playerboard).length - Object.keys(sudokuObject.incomplete).length != Object.keys(answers).length) {
      setError("Your Sudoku is not complete");
      showError();
      return; 
    }
    let completed = { ...answers }; 
    for (const slot in sudokuObject.incomplete) {
      completed[slot] = sudokuObject.incomplete[slot];
    }
    if (checker(completed)) {
      setBoolean(true);
      showChild()
      console.log("it was right");
    } else {
      setBoolean(false);
      showChild();
      console.log("It was wrong");
    }
  }

  // Add object to local storage
  if (loading) return <Circle />;

  return (
    <>
      <Modal boolean={boolean} setIsOpen={setIsOpen} ref={childRef} />
      <div className={isOpen ? "blur-background" : ""}>
        <table
          id="grid"
          className="myTable"
          style={{
            marginTop: "5%",
            borderColor: "white",
            borderWidth: "4px",
            borderStyle: "solid",
            marginLeft: "auto",
            marginRight: "auto"
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
                          <text className="purple">{sudokuObject.playerboard[key]}</text>
                        ) : (
                          <input
                            onChange={(e) => addAnswer(key, Number(e.target.value))}
                            className="sudokuInput"
                            type="text"
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
        <Error ref={errorRef} error={error} />
      </div>
    </>
  );
};

export default SudokuPage;
